import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

import * as moment from 'moment';

import {
  OrderReceipt,
  PackageChange,
  PackageFeatures,
  UpgradePackageDtoModel,
} from '@api/packages/packages.models';
import {
  PackageTypeIds,
  PaymentPrograms,
  PaymentTypes,
  SubscriptionChangeTypes,
} from '@api/shared/shared.enums';
import {
  BasePaymentProfile,
  PromoCode,
} from '@api/financials/financials.models';
import { UserModelDto } from '@api/users/users.models';

import { DATE_FORMATS } from '@components/payment/credit-card/credit-card.component';

import { createCreditCardPaymentForm } from 'src/app/domain/billing/utils/billing-payment-profile.form';

import {
  DISCOUNT,
  pidID,
  PROMO_DISCOUNT,
  STATES,
  YEAR,
} from './submit-plan.consts';
import { SubmitPlanService } from './submit-plan.service';
import { MatSelectChange } from '@angular/material/select';
import { QueryParams } from './submit-plan.modal';
import { Observable } from 'rxjs/internal/Observable';
import { AdditionalCredit } from '@api/lookups/lookups.models';
import { EMPTY, forkJoin, of } from 'rxjs';
import { PrepayOptionIds } from '@shared/models/enums/billing';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PurchaseRevenueService } from '@core/services/purchase-revenue-service/purchase-revenue.service';
import {
  CreditsTracker,
  PackageTracker,
} from '@core/services/purchase-revenue-service/purchase-revenue.models';

declare global {
  interface Window {
    Trustpilot: any;
  }
}
window.Trustpilot = window.Trustpilot || {};
@Component({
  selector: 'app-submit-plan',
  templateUrl: './submit-plan.component.html',
  styleUrls: ['./submit-plan.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class SubmitPlanComponent implements OnInit {
  readonly STATES = STATES;
  readonly DISCOUNT = DISCOUNT;
  readonly PROMO_DISCOUNT = PROMO_DISCOUNT;
  readonly YEAR = YEAR;

  contactListControl = new FormControl();
  promoCodeControl = new FormControl(null);
  paymentForm: FormGroup;

  packageFeatures: AdditionalCredit | PackageFeatures[];
  packageSelect: (AdditionalCredit & PackageFeatures)[];

  renewsDate: string;
  queryParamsID: number;
  today = new Date();

  creditsModeOn: boolean;
  isValidPromoCode = false;
  showOneYearInterface = true;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    public submitPlanService: SubmitPlanService,
    private _purchaseRevenueService: PurchaseRevenueService,
  ) {
    this.packageFeatures = this._route.snapshot.data.packageFeatures;
  }

  get shouldDisableSubmit(): boolean {
    return this.paymentForm.invalid;
  }

  ngOnInit(): void {
    this.reloadTrustpilotWidget();
    this.paymentForm = createCreditCardPaymentForm();
    this._route.queryParams.subscribe((params: QueryParams) => {
      this.queryParamsID = +params.pid;
    });
    this.setInitContactControlValue();
    this.setInterfaceDisplay();
    this.getRenewsDate();
  }

  private setInitContactControlValue(): void {
    Number.isNaN(this.queryParamsID)
      ? this.contactListControl.setValue(94)
      : this.contactListControl.setValue(this.queryParamsID);
  }
  private setInterfaceDisplay(): void {
    this.queryParamsID === pidID.PayAsYouGo
      ? (this.creditsModeOn = true)
      : (this.creditsModeOn = false);

    Number.isNaN(this.queryParamsID)
      ? (this.showOneYearInterface = false)
      : (this.showOneYearInterface = true);
  }

  private reloadTrustpilotWidget(): void {
    const trustboxRef = document.getElementById('trustbox');
    window.Trustpilot.loadFromElement(trustboxRef);
  }

  private getRenewsDate(): void {
    const firstDate = new Date();
    const year = firstDate.getFullYear() + 1;
    const month = firstDate.getMonth() + 1;
    this.showOneYearInterface
      ? firstDate.setFullYear(year)
      : firstDate.setMonth(month);
    this.renewsDate = firstDate.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }

  setYearMonthDiscountCheckbox({ checked }: MatCheckboxChange): void {
    checked
      ? (this.showOneYearInterface = true)
      : (this.showOneYearInterface = false);

    this.getRenewsDate();
  }

  setPackage({ value }: MatSelectChange): void {
    if (this.queryParamsID === pidID.PayAsYouGo) {
      this.packageSelect = this.packageFeatures[0].filter(
        (feature: AdditionalCredit) => feature.id === value.id,
      );
    }
    if (
      this.queryParamsID !== pidID.PayAsYouGo ||
      Number.isNaN(this.queryParamsID)
    ) {
      this.packageSelect = this.packageFeatures[1].filter(
        (feature: PackageFeatures) => feature.id === value,
      );
    }
    this.contactListControl.setValue(value);
  }

  chosenYearHandler(normalizedYear: moment.Moment) {
    const control = this.paymentForm.get('expirationNotice');
    const value = control.value ? control.value : moment();
    value.year(normalizedYear.year());

    control.setValue(value);
  }

  chosenMonthHandler(
    normalizedMonth: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>,
  ) {
    const control = this.paymentForm.get('expirationNotice');

    const value = control.value ? control.value : moment();

    value.month(normalizedMonth.month());
    control.setValue(value);
    datepicker.close();
  }

  setPromoValue(promo: PromoCode): void {
    Object.keys(promo).length === 0 || promo === null
      ? this.setPromoValueNull()
      : (this.isValidPromoCode = true);
  }

  setPromoValueNull(): void {
    this.promoCodeControl.setValue(null);
    this.isValidPromoCode = false;
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      return;
    }

    this.createPurchaseStream().subscribe(
      () => {
        this._router.navigate(['/dashboard']);
        this.submitPlanService.removeLoader();
        this.submitPlanService.openSuccessSnackbar(
          'Your subscription has been successfully upgraded!',
        );
      },
      (error) => {
        console.error(error);
        this.submitPlanService.removeLoader();
        this.submitPlanService.openErrorSnackbar('Something went wrong');
      },
    );
  }

  private createPurchaseStream(): Observable<
    UpgradePackageDtoModel | [OrderReceipt, UpgradePackageDtoModel]
  > {
    return this.submitPlanService.findUserData().pipe(
      tap(() => this.submitPlanService.addLoader()),
      take(1),
      switchMap((userInfo) => {
        return this.submitPlanService
          .createPaymentProfile(this.createPaymentProfilePayload(userInfo))
          .pipe(
            catchError((err) => {
              this.submitPlanService.removeLoader();
              this.submitPlanService.openErrorSnackbar(err.error[0]);

              return EMPTY;
            }),
            switchMap(([paymentProfile]) => {
              if (
                // 24 - buy 0 credits
                this.contactListControl.value === 24 ||
                this.queryParamsID !== pidID.PayAsYouGo
              ) {
                return this.submitPlanService
                  .submitUpgradeRequest(
                    this.createUpgradePayloadModel(userInfo, paymentProfile),
                  )
                  .pipe(
                    tap((totalDue) => {
                      const packageTracker: PackageTracker = {
                        totalDue: totalDue.totalDue,
                        id: this.packageSelect[0].id,
                        packageName: this.packageSelect[0].packageName,
                      };
                      this._purchaseRevenueService.sendPackagePurchaseRevenueEvent(
                        packageTracker,
                      );
                    }),
                  );
              }

              return this.submitPlanService
                .createCreditsRequestPayload(
                  this.contactListControl.value,
                  paymentProfile,
                  userInfo,
                  this.promoCodeControl.value,
                )
                .pipe(
                  switchMap((purchaseCreditsPayload) => {
                    return forkJoin([
                      this.submitPlanService
                        .submitCreditsUpdate(purchaseCreditsPayload)
                        .pipe(
                          tap((creditsResult) => {
                            const creditsTracker: CreditsTracker = {
                              amountPaid: creditsResult.amountPaid,
                              transactionNumber:
                                creditsResult.transactionNumber,
                              creditCount:
                                purchaseCreditsPayload.creditUpgradeModel
                                  .creditAmount,
                            };
                            this._purchaseRevenueService.sendCreditsPurchaseRevenueEvent(
                              creditsTracker,
                            );
                          }),
                        ),
                      userInfo.package.packageTypeId !==
                      PackageTypeIds.PayAsYouGo
                        ? this.submitPlanService.upgradePackage(
                            purchaseCreditsPayload,
                            userInfo,
                          )
                        : of(null),
                    ]).pipe(
                      catchError(() => {
                        this.submitPlanService.removeLoader();
                        this.submitPlanService.openErrorSnackbar(
                          'Something went wrong.',
                        );

                        return EMPTY;
                      }),
                    );
                  }),
                );
            }),
          );
      }),
    );
  }

  private createPaymentProfilePayload(userInfo: UserModelDto) {
    return {
      selectedPaymentProgram: PaymentPrograms.creditCard,
      creditCard: {
        cardCode: this.paymentForm.value.cardCode,
        cardNumber: this.paymentForm.value.creditCardNumber,
        city: this.paymentForm.value.city,
        emailAddress: this.paymentForm.value.emailAddress,
        state: this.paymentForm.value.state,
        zip: this.paymentForm.value.zip,
        address1: this.paymentForm.value.address1,
        expirationMonth: this.paymentForm.value.expirationNotice.month(),
        expirationYear: this.paymentForm.value.expirationNotice.year(),
        isPrimary: true,
        paymentType: PaymentTypes.creditCard,
        ownerID: userInfo.id,
        customerProfileID: userInfo.customerProfileID,
      },
    };
  }

  private createUpgradePayloadModel(
    userInfo: UserModelDto,
    paymentProfile: BasePaymentProfile,
  ): Partial<PackageChange> {
    return {
      paymentProfileId: paymentProfile.paymentProfileID,
      changeToPackageId: this.contactListControl.value,
      promoCode: this.showOneYearInterface
        ? ''
        : this.promoCodeControl.value?.code,
      createStep: 'payment',
      currentPackageId: userInfo.package.id,
      customerProfileId: paymentProfile.customerProfileID,
      newPackageResults: '',
      // 1 for now: 0, -- 0 = Purchase 1 Month, 1 = 6 Months Purchase,
      // 2 = 12 Months, 3 = 24 Months, 4 = Extend By another month, 5 = 3 Months.
      prepayOptionId: this.showOneYearInterface
        ? PrepayOptionIds.TwelveMonths
        : PrepayOptionIds.OneMonth,
      subscriptionChangeType: SubscriptionChangeTypes.upgrade,
      isSettingUpForTrialPackage: false,
      receivedHalfOff: 0, // TODO: default to zero
      rewardMoneyBalance: 0,
      suspendReason: 0,
      isPayPal: false,
    };
  }
}

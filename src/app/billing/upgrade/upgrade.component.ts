import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageTracker } from '@core/services/purchase-revenue-service/purchase-revenue.models';
import { PurchaseRevenueService } from '@core/services/purchase-revenue-service/purchase-revenue.service';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import {
  PaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from 'src/app/api/financials/financials.models';
import { FinancialsService } from 'src/app/api/financials/financials.service';
import { PrePayOption } from 'src/app/api/lookups/lookups.models';
import {
  PackageChange,
  SubscriptionUpgrade,
} from 'src/app/api/packages/packages.models';
import { SubscriptionChangeTypes } from 'src/app/api/shared/shared.enums';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { PrepayOptionIds } from 'src/app/shared/models/enums/billing';

import { UpgradeDataResolverModel } from './upgrade.models';
import { UpgradeService } from './upgrade.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
})
export class UpgradeComponent implements OnInit, OnDestroy {
  paymentControl = new FormControl(null, [Validators.required]);
  termControl = new FormControl({ value: null, disabled: true });
  promoCode = new FormControl(null, [Validators.required]);

  userPackageName$: Observable<string>;
  paymentProfiles$ = new BehaviorSubject<
    (PaymentProfileBankAccount & PaymentProfileCreditCard)[]
  >([]);
  selectedPackageData$: Observable<SubscriptionUpgrade>;

  upgradeData: UpgradeDataResolverModel;

  private _packageSelect$ = new Subject<PrePayOption>();
  private _submitUpgrade$ = new Subject<void>();
  private _subscriptions = new Subscription();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userFacade: UserFacade,
    private _financialsService: FinancialsService,
    private _upgradeService: UpgradeService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _purchaseRevenueService: PurchaseRevenueService,
  ) {
    this.upgradeData = this._route.snapshot.data.upgradeData;
  }

  get is1MonthTermSelected(): boolean {
    return this.termControl.value.id === PrepayOptionIds.OneMonth;
  }

  get isYearTermOrLonger(): boolean {
    return (
      this.termControl.value.id === PrepayOptionIds.TwelveMonths ||
      this.termControl.value.id === PrepayOptionIds.TwentyFourMonths
    );
  }

  ngOnInit(): void {
    this.termControl.setValue(
      this._route.snapshot.data.upgradeData.prepayOptions.find(
        (prePay) => prePay.prePayMonths === 12,
      ),
    );

    this.userPackageName$ = this._userFacade.userPackage$.pipe(
      map((data) => data.packageName),
    );

    this.selectedPackageData$ = combineLatest([
      this._packageSelect$,
      this._userFacade.currentUserInfo$,
    ]).pipe(
      filter(() => !!this.paymentControl.value),
      switchMap(([_, userData]) =>
        this._upgradeService.packageChange(
          this.createPackageChangeModel(
            userData,
            this.paymentControl.value.paymentProfileID,
          ),
        ),
      ),
    );

    this._subscriptions.add(
      combineLatest([this._userFacade.customerProfileId$])
        .pipe(
          switchMap(([customerProfile]) =>
            customerProfile === 0
              ? of([])
              : this._financialsService.getPaymentProfiles(customerProfile),
          ),
        )
        .subscribe((profiles) => {
          this.paymentProfiles$.next(profiles);
          this.paymentControl.setValue(
            profiles.find((profile) => profile.isPrimary),
          );

          if (this.paymentControl.valid) {
            this.termControl.enable();
          }

          this._packageSelect$.next(this.termControl.value);
        }),
    );

    this._subscriptions.add(
      this.createUpgradeRequest().subscribe(
        () => {
          this._userFacade.fetchUser();
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Success,
            `Congratulations!! You have been changed to the ${this.upgradeData.packageFeatures.packageName}`,
          );
          this._router.navigate(['/billing']);
        },
        () => {
          this._loaderService.removeLoader();
          this._toastService.addToast(ToastType.Error, `Something went wrong.`);
        },
      ),
    );
  }

  ngOnDestroy(): void {
    this._packageSelect$.complete();
    this._submitUpgrade$.complete();
    this.paymentProfiles$.complete();
    this._subscriptions.unsubscribe();
  }

  cancelUpgrade(): void {
    this._router.navigate(['../../', 'plan-details'], {
      relativeTo: this._route,
    });
  }

  onPlanChange({ value }: MatSelectChange): void {
    this._packageSelect$.next(value);
  }

  onPromoCodeApply(): void {
    this._packageSelect$.next(this.termControl.value);
  }

  submitUpgrade(): void {
    this._submitUpgrade$.next();
  }

  addNewPayment(paymentData: Partial<PaymentProfile>): void {
    this._loaderService.showLoader();
    this._subscriptions.add(
      combineLatest([this._userFacade.currentUserInfo$])
        .pipe(
          switchMap(([userModel]) =>
            this._upgradeService.createPaymentProfile(paymentData, userModel),
          ),
        )
        .subscribe(
          (
            profiles: (PaymentProfileBankAccount & PaymentProfileCreditCard)[],
          ) => {
            this.paymentProfiles$.next(profiles);
            this.paymentControl.setValue(
              profiles.find((profile) => profile.isPrimary),
            );
            this._packageSelect$.next(this.termControl.value);
            this._loaderService.removeLoader();
          },
        ),
    );
  }

  private createPackageChangeModel(
    userData: MainUserInfoModel,
    paymentProfileId: number,
  ): Partial<PackageChange> {
    return {
      paymentProfileId,
      changeToPackageId: parseInt(this._route.snapshot.params.id, 10),
      promoCode: this.promoCode.value,
      createStep: 'payment',
      currentPackageId: userData.package.id,
      customerProfileId: userData.customerProfileID,
      newPackageResults: '',
      prepayOptionId: this.termControl.value.id,
      subscriptionChangeType: SubscriptionChangeTypes.upgrade,
    };
  }

  private createUpgradeRequest() {
    return combineLatest([
      this._submitUpgrade$,
      this._userFacade.currentUserInfo$,
    ]).pipe(
      take(1),
      tap(() => this._loaderService.showLoader()),
      switchMap(([_, userData]) =>
        this._upgradeService
          .submitPackageUpgrade(
            this.createPackageChangeModel(
              userData,
              this.paymentControl.value.paymentProfileID,
            ),
          )
          .pipe(
            tap((totalDue) => {
              const packageTracker: PackageTracker = {
                totalDue: totalDue.totalDue,
                id: this.upgradeData.packageFeatures.id,
                packageName: this.upgradeData.packageFeatures.packageName,
              };
              this._purchaseRevenueService.sendPackagePurchaseRevenueEvent(
                packageTracker,
              );
            }),
          ),
      ),
    );
  }
}

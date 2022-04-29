import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';

import moment from 'moment';
import { noop } from 'rxjs';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { PaymentProfile } from 'src/app/api/financials/financials.models';
import { BillingPaymentProfile } from 'src/app/billing/details/billing-details.models';

import { nonValue } from '@shared/utils/verifications/value-check';

import { BillingFacade } from '../../billing/state/billing.facade';
import { KeywordsService } from '../../api/keywords/keywords.service';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { KeywordsFacade } from 'src/app/core/store/features/keywords/keywords.facade';
import {
  ToastType,
  ToastService,
} from '@shared/components/toast/service/toast.service';

@Component({
  selector: 'app-keyword-renewal',
  templateUrl: './keyword-renewal.component.html',
  styleUrls: ['./keyword-renewal.component.scss'],
})
export class KeywordRenewalComponent implements OnInit, OnDestroy {
  form: FormGroup;

  endDate$ = this._activatedRoute.queryParams;
  loadingProfiles$ = this._billingFacade.loadingProfiles$;

  selectedKeyword$ = this._activatedRoute.params.pipe(
    map((params) => params['keyword'])
  );
  paymentProfiles$ = this._billingFacade.paymentProfiles$.pipe(
    tap((profiles) => this.setDefaultPaymentProfile(profiles))
  );
  prepayOptions$ = this._keywordsServices
    .getPrepayOptions()
    .pipe(tap((prepayTerms) => this.setDefaultPrepayTerm(prepayTerms)));

  private subscriptions = new Subscription();

  monthOrMonths: string;
  monthsKeywordOption: any;

  costPerKeyword: number;
  totalKeywordOptionCost: number;

  isKeywordFree: boolean;
  totalFreeKeyWords: number;
  freeKeywordsRemaining: number;

  keywordEndDate: Date;
  keywordRenewalDate: Date;

  constructor(
    private _router: Router,
    private _userFacade: UserFacade,
    private _loaderFacade: LoaderFacade,
    private _toastService: ToastService,
    private _billingFacade: BillingFacade,
    private _activatedRoute: ActivatedRoute,
    private _keywordsFacade: KeywordsFacade,
    private _keywordsServices: KeywordsService
  ) {
    this.initializeForm();
    this.getRenewalDate();
  }

  ngOnInit(): void {
    const userPackage$ = this._userFacade.userPackage$;
    const allKeywords$ = this._keywordsFacade.allKeywords$;

    this.subscriptions.add(
      combineLatest([userPackage$, allKeywords$]).subscribe(
        ([userPackage, allKeywords]) => {
          if (userPackage && allKeywords) {
            this.totalFreeKeyWords = userPackage.keywords;
            this.costPerKeyword = userPackage.additionalKeywordCost;
            this.freeKeywordsRemaining =
              userPackage.keywords - allKeywords.length;

            if (this.freeKeywordsRemaining < 0) {
              this.freeKeywordsRemaining = 0;
            }

            if (userPackage.keywords > allKeywords.length) {
              this.isKeywordFree = true;
            } else {
              this.isKeywordFree = false;
            }
          }
        }
      )
    );
  }

  onPaymentProfileCreate(data: Partial<PaymentProfile>): void {
    this._loaderFacade.showLoader();
    this._billingFacade.createPaymentProfile(data);
  }

  onNewPaymentAdd(data: Partial<PaymentProfile>): void {
    this._loaderFacade.showLoader();
    this._billingFacade.createPaymentProfile(data);
    this.subscriptions.add(
      this._userFacade.customerProfileId$
        .pipe(
          filter((id) => !!id),
          take(1),
          switchMap((id) => this._keywordsServices.fetchPaymentProfiles(id))
        )
        .subscribe((profiles) =>
          this._billingFacade.setPaymentProfiles(
            profiles as BillingPaymentProfile[]
          )
        )
    );
    this.subscriptions.add(
      this._billingFacade.paymentProfiles$.subscribe(
        (paymentProfiles: BillingPaymentProfile[]) => {
          const currentAddedProfile = paymentProfiles.find((p) => p.isPrimary);
          this.form.patchValue({
            paymentProfileID: currentAddedProfile?.paymentProfileID,
          });
        }
      )
    );
  }

  onKeywordPaymentOptionChanged(op: any) {
    this.setRenewalDate(this.keywordEndDate, op.months);

    this.monthsKeywordOption = op.months;
    this.totalKeywordOptionCost =
      this.costPerKeyword *
      this.monthsKeywordOption *
      ((100 - op.discount) / 100);
    if (op.months > 1) {
      this.monthOrMonths =
        op.months + ' months @ ' + op.discount + '% discount';
    } else {
      this.monthOrMonths = 'month';
    }
  }

  onConfirmKeyword() {
    if (!this.isKeywordFree) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
    }
    this._loaderFacade.showLoader();

    const formValues = this.form?.value;
    // const paymentProfileID = formValues?.paymentProfileID || 0;
    // const prepayOptionId = formValues?.prepayOptionId || 1;
    // const keywords = [formValues.keywordName];

    this.subscriptions.add(
      this.selectedKeyword$
        .pipe(
          map((keyword) => {
            // this._keywordsServices.deleteSpecificKeyword(keyword);
            // this._keywordsServices.purchaseKeyword(paymentProfileID, {
            //   keywords: [keyword],
            //   prepayOptionId: prepayOptionId,
            // });
          })
        )
        .subscribe(
          noop,
          (err) => {
            this._loaderFacade.removeLoader();
          },
          () => {
            this._loaderFacade.removeLoader();
            this._router.navigate(['../view', formValues.keywordName], {
              relativeTo: this._activatedRoute,
            });
          }
        )
    );
  }

  async renewKeywordOnClick(): Promise<void> {
    if (!this.isKeywordFree) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
    }
    this._loaderFacade.showLoader();

    const formValues = this.form?.value;
    const paymentProfileID = formValues?.paymentProfileID || 0;
    const prepayOptionId = formValues?.prepayOptionId || 1;

    this.selectedKeyword$.pipe(take(1)).subscribe((keyword) => {
      this.subscriptions.add(
        this._keywordsServices
          .purchaseKeyword(paymentProfileID, {
            keywords: [keyword],
            prepayOptionId: prepayOptionId,
          })
          .subscribe(
            noop,
            (err) => {
              this._loaderFacade.removeLoader();
            },
            () => {
              this._loaderFacade.removeLoader();
              this._toastService.addToast(
                ToastType.Success,
                'Keyword renewing successfully'
              );
              this._router.navigate(['../assign', keyword], {
                relativeTo: this._activatedRoute,
              });
            }
          )
      );
    });
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      // TODO: remove keyword name and its references
      // keywordName: new FormControl('', [
      //   Validators.minLength(4),
      //   Validators.maxLength(32),
      //   Validators.required,
      //   Validators.pattern(/^[\w\s]+$/),
      // ]),
      prepayOptionId: new FormControl('', [Validators.required]),
      paymentProfileID: new FormControl('', [Validators.required]),
    });
  }

  private formControl(name: string): AbstractControl {
    return this.form.controls[name];
  }

  private getRenewalDate(): void {
    this.endDate$
      .pipe(
        filter((params) => params.endDate),
        take(1),
        tap((params) => {
          this.keywordEndDate = params.endDate;
          this.setRenewalDate(params.endDate, 1);
        })
      )
      .subscribe();
  }

  private setRenewalDate(renewalDate: Date, monthsToAdd: number) {
    this.keywordRenewalDate = moment(renewalDate)
      .add(monthsToAdd, 'M')
      .toDate();
  }

  private setDefaultPrepayTerm(prepayTerms: any): void {
    if (nonValue(prepayTerms)) {
      return;
    }

    const [firstTerm] = prepayTerms;
    this.formControl('prepayOptionId').setValue(firstTerm.id);
    this.onKeywordPaymentOptionChanged(firstTerm);
  }

  private setDefaultPaymentProfile(paymentProfiles: any): void {
    if (nonValue(paymentProfiles)) {
      return;
    }

    const [firstProfile] = paymentProfiles;
    this.formControl('paymentProfileID').setValue(
      firstProfile.paymentProfileID
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

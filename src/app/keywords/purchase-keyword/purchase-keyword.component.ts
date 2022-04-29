import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, noop, Observable, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { PaymentProfile } from 'src/app/api/financials/financials.models';
import { BillingPaymentProfile } from 'src/app/billing/details/billing-details.models';
import { KeywordsFacade } from 'src/app/core/store/features/keywords/keywords.facade';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { KeywordsService } from '../../api/keywords/keywords.service';
import { BillingFacade } from '../../billing/state/billing.facade';

@Component({
  selector: 'app-purchase-keyword',
  templateUrl: './purchase-keyword.component.html',
  styleUrls: ['./purchase-keyword.component.scss'],
})
export class PurchaseKeywordComponent implements OnInit, OnDestroy {
  paymentProfiles$ = this._billingFacade.paymentProfiles$;
  loadingProfiles$ = this._billingFacade.loadingProfiles$;
  prepayOptions$: Observable<any>;
  form: FormGroup;
  private subscriptions = new Subscription();

  isKeywordFree: boolean;
  commingFrom: string;
  isKeywordValid = true;
  costPerKeyword: number;
  totalFreeKeyWords: number;
  freeKeywordsRemaining: number;
  userPackageName: string;
  totalKeywordOptionCost: number;
  monthskeywordOption: any;
  monthOrMonths: string;

  constructor(
    private _keywordsServices: KeywordsService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _loaderFacade: LoaderFacade,
    private _billingFacade: BillingFacade,
    private _userFacade: UserFacade,
    private _keywordsFacade: KeywordsFacade
  ) {}

  ngOnInit(): void {
    this.commingFrom = history?.state?.commingFrom || 'leftNav';

    const userPackage$ = this._userFacade.userPackage$;
    const allKeywords$ = this._keywordsFacade.allKeywords$;
    combineLatest([userPackage$, allKeywords$]).subscribe(
      ([userPackage, allKeywords]) => {
        if (userPackage && allKeywords) {
          this.userPackageName = userPackage.packageName;
          this.costPerKeyword = userPackage.additionalKeywordCost;
          this.totalFreeKeyWords = userPackage.keywords;
          this.freeKeywordsRemaining =
            userPackage.keywords - allKeywords.length;
          if (this.freeKeywordsRemaining < 0) {
            this.freeKeywordsRemaining = 0;
          }
          this.buildForm();
          if (userPackage.keywords > allKeywords.length) {
            this.isKeywordFree = true;
          } else {
            this.isKeywordFree = false;
          }
        }
      }
    );
    this.prepayOptions$ = this._keywordsServices.getPrepayOptions();
  }

  private buildForm() {
    this.form = new FormGroup({
      keywordName: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(32),
        Validators.required,
        Validators.pattern(/^[\w\s]+$/),
      ]),
      prepayOptionId: new FormControl('', [Validators.required]),
      paymentProfileID: new FormControl('', [Validators.required]),
    });
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
    this.monthskeywordOption = op.months;
    this.totalKeywordOptionCost =
      this.costPerKeyword *
      this.monthskeywordOption *
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
    const paymentProfileID = formValues?.paymentProfileID || 0;
    const prepayOptionId = formValues?.prepayOptionId || 1;
    const keywords = [formValues.keywordName];

    this.subscriptions.add(
      this._keywordsServices
        .getKeywordValidOrNot(formValues.keywordName)
        .pipe(
          switchMap((isValid) => {
            if (!isValid) {
              this.isKeywordValid = false;
              return;
            }
            return this._keywordsServices.purchaseKeyword(paymentProfileID, {
              keywords: keywords,
              prepayOptionId: prepayOptionId,
            });
          })
        )
        .subscribe(
          noop,
          (err) => {
            this._loaderFacade.removeLoader();
          },
          () => {
            this._loaderFacade.removeLoader();
            this._router.navigate(['../assign', formValues.keywordName], {
              relativeTo: this._route,
            });
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

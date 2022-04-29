import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
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
  BasePaymentProfile,
  PaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from 'src/app/api/financials/financials.models';
import { FinancialsService } from 'src/app/api/financials/financials.service';
import { PrePayOption } from 'src/app/api/lookups/lookups.models';
import {
  PackageChange,
  SubscriptionUpgrade,
  UpgradePackageDtoModel,
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

import { ExtendDataResolverModel } from './extend.models';
import { ExtendService } from './extend.service';

@Component({
  selector: 'app-extend',
  templateUrl: './extend.component.html',
  styleUrls: ['./extend.component.scss'],
})
export class ExtendComponent implements OnInit, OnDestroy {
  termControl = new FormControl({ value: null, disabled: true });
  paymentControl = new FormControl(null, [Validators.required]);
  promoCode = new FormControl(null, [Validators.required]);

  extendData: ExtendDataResolverModel;

  userPackageName$: Observable<string>;
  paymentProfiles$ = new BehaviorSubject<
    (PaymentProfileBankAccount & PaymentProfileCreditCard)[]
  >([]);
  selectedPackageData$: Observable<SubscriptionUpgrade>;

  private _packageSelect$ = new Subject<PrePayOption>();
  private _submitExtend$ = new Subject<void>();
  private _subscriptions = new Subscription();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userFacade: UserFacade,
    private _financialsService: FinancialsService,
    private _extendService: ExtendService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
  ) {
    this.extendData = this._route.snapshot.data.extendData;
  }

  ngOnInit(): void {
    this.termControl.setValue(
      this._route.snapshot.data.extendData.prepayOptions.find(
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
        this._extendService.packageChange(
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
      this.createExtendRequest().subscribe(
        () => {
          this._userFacade.fetchUser();
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Success,
            `Congratulations!! You have extended your ${this.extendData.packageFeatures.packageName} plan`,
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

  addNewPayment(paymentData: Partial<PaymentProfile>): void {
    this._loaderService.showLoader();
    this._subscriptions.add(
      combineLatest([this._userFacade.currentUserInfo$])
        .pipe(
          switchMap(([userModel]) =>
            this._extendService.createPaymentProfile(paymentData, userModel),
          ),
        )
        .subscribe((profiles) => {
          this.paymentProfiles$.next(profiles);
          this.paymentControl.setValue(
            profiles.find((profile) => profile.isPrimary),
          );
          this._packageSelect$.next(this.termControl.value);
          this._loaderService.removeLoader();
        }),
    );
  }

  ngOnDestroy(): void {
    this._packageSelect$.complete();
    this._submitExtend$.complete();
    this.paymentProfiles$.complete();
    this._subscriptions.unsubscribe();
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

  cancelExtend(): void {
    this._router.navigate(['../../', 'plan-details'], {
      relativeTo: this._route,
    });
  }

  onTermChange({ value }: MatSelectChange): void {
    this._packageSelect$.next(value);
  }

  onPromoCodeApply(): void {
    this._packageSelect$.next(this.termControl.value);
  }

  submitExtend(): void {
    this._submitExtend$.next();
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
      subscriptionChangeType: SubscriptionChangeTypes.extend,
    };
  }

  private createExtendRequest(): Observable<UpgradePackageDtoModel> {
    return combineLatest([
      this._submitExtend$,
      this._userFacade.currentUserInfo$,
    ]).pipe(
      take(1),
      tap(() => this._loaderService.showLoader()),
      switchMap(([_, userData]) =>
        this._extendService.submitPackageUpgrade(
          this.createPackageChangeModel(
            userData,
            this.paymentControl.value.paymentProfileID,
          ),
        ),
      ),
    );
  }
}

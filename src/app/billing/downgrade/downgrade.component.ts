import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import {
  BasePaymentProfile,
  PaymentProfile,
} from 'src/app/api/financials/financials.models';
import { FinancialsService } from 'src/app/api/financials/financials.service';
import {
  PackageChange,
  PackageFeatures,
  SubscriptionDowngrade,
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

import { DowngradeService } from './downgrade.service';

@Component({
  selector: 'app-downgrade',
  templateUrl: './downgrade.component.html',
  styleUrls: ['./downgrade.component.scss'],
})
export class DowngradeComponent implements OnInit, OnDestroy {
  downgradeDataLoaded = false;
  paymentControl = new FormControl(null, [Validators.required]);
  downgradePackage: PackageFeatures;

  paymentProfiles$ = new BehaviorSubject<BasePaymentProfile[]>([]);
  userPackageName$: Observable<string>;
  downgradeData: SubscriptionDowngrade;

  private _submitDowngrade$ = new Subject<void>();

  private _subscriptions = new Subscription();
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userFacade: UserFacade,
    private _financialsService: FinancialsService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _downgradeService: DowngradeService,
  ) {
    this.downgradePackage = this._route.snapshot.data.package;
  }

  ngOnInit(): void {
    this.userPackageName$ = this._userFacade.userPackage$.pipe(
      map((data) => data.packageName),
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
          const primaryProfile = profiles.find((profile) => profile.isPrimary);

          if (primaryProfile) {
            this.paymentControl.setValue(primaryProfile);
          } else {
            this.paymentControl.disable();
          }

          if (!profiles.length) {
            this.downgradeDataLoaded = true;
          }
        }),
    );

    this._subscriptions.add(
      combineLatest([this._userFacade.currentUserInfo$, this.paymentProfiles$])
        .pipe(
          filter(([, profiles]) => !!profiles.length),
          switchMap(([userData, profiles]) =>
            forkJoin([
              this._downgradeService.packageChange(
                this.createPackageChangeModel(userData, profiles),
              ),
              this._downgradeService.downgradeRequest(
                userData.package.id,
                this.downgradePackage.id,
              ),
            ]).pipe(
              map(([changeRequestData, downgradeRequestData]) => ({
                ...changeRequestData,
                ...downgradeRequestData,
              })),
            ),
          ),
        )
        .subscribe((downgradeData) => {
          this.downgradeData = downgradeData;
          this.downgradeDataLoaded = true;
        }),
    );

    this._subscriptions.add(
      this.submitDowngradeRequest().subscribe(
        () => {
          this._userFacade.fetchUser();
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Success,
            `Congratulations!! Your subscription has been scheduled to be Downgraded on your next scheduled billing date.`,
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

  cancelDowngrade(): void {
    this._router.navigate(['../../', 'plan-details'], {
      relativeTo: this._route,
    });
  }

  onPackageDowngrade(): void {
    this._submitDowngrade$.next();
  }

  ngOnDestroy(): void {
    this._submitDowngrade$.complete();
    this.paymentProfiles$.complete();
    this._subscriptions.unsubscribe();
  }

  addNewPayment(paymentData: Partial<PaymentProfile>): void {
    this.downgradeDataLoaded = false;
    this._subscriptions.add(
      combineLatest([this._userFacade.currentUserInfo$])
        .pipe(
          switchMap(([userModel]) =>
            this._downgradeService.createPaymentProfile(paymentData, userModel),
          ),
        )
        .subscribe((profiles) => {
          this.paymentProfiles$.next(profiles);
          this.paymentControl.setValue(
            profiles.find((profile) => profile.isPrimary),
          );
          if (this.paymentControl.disabled) {
            this.paymentControl.enable();
          }
        }),
    );
  }

  private submitDowngradeRequest(): Observable<UpgradePackageDtoModel> {
    return combineLatest([
      this._submitDowngrade$,
      this._userFacade.currentUserInfo$,
      this.paymentProfiles$,
    ]).pipe(
      take(1),
      tap(() => this._loaderService.showLoader()),
      switchMap(([_, userData, profiles]) =>
        this._downgradeService.submitPackageDowngrade(
          this.createPackageChangeModel(userData, profiles),
        ),
      ),
    );
  }

  private createPackageChangeModel(
    userData: MainUserInfoModel,
    profiles: BasePaymentProfile[],
  ): Partial<PackageChange> {
    const primaryProfileId = profiles.find(
      (profile) => profile.isPrimary,
    ).paymentProfileID;

    return {
      paymentProfileId: primaryProfileId,
      changeToPackageId: parseInt(this._route.snapshot.params.id, 10),
      promoCode: '',
      createStep: 'payment',
      currentPackageId: userData.package.id,
      customerProfileId: userData.customerProfileID,
      newPackageResults: '',
      prepayOptionId: 0,
      subscriptionChangeType: SubscriptionChangeTypes.queueDowngrade,
    };
  }
}

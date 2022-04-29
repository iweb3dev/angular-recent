import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '@api/packages/packages.service';
import { hasValue } from '@shared/utils/verifications/value-check';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { PaymentProfile } from 'src/app/api/financials/financials.models';
import { PackageFeatures } from 'src/app/api/packages/packages.models';
import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';

import { BillingPaymentProfile } from '../billing-details.models';

import { PaymentProfileViewInfo } from './billing-info.models';
import { BillingInfoService } from './billing-info.service';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent implements OnInit {
  @Input()
  set paymentProfiles(profiles: BillingPaymentProfile[]) {
    this._viewProfiles = this._billingInfoService.createCardViewInfo(profiles);
    this._profiles = profiles;
  }

  get viewProfiles(): PaymentProfileViewInfo[] {
    return this._viewProfiles;
  }

  @Input()
  userInfo: MainUserInfoModel;

  @Output()
  createNewPaymentProfile = new EventEmitter<Partial<PaymentProfile>>();

  @Output()
  deleteProfile = new EventEmitter<BillingPaymentProfile>();

  @Output()
  paymentUpdate = new EventEmitter<{
    data: Partial<PaymentProfile>;
    profile: BillingPaymentProfile;
  }>();

  private _viewProfiles: PaymentProfileViewInfo[] = [];
  private _profiles: BillingPaymentProfile[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _billingInfoService: BillingInfoService,
    private _confirmDialogService: ConfirmDialogService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _userFacade: UserFacade,
    private _packageService: PackageService,
  ) {}

  get isOnPlan(): boolean {
    return (
      this.userInfo.package.packageTypeId === PackageTypeIds.Essentials ||
      this.userInfo.package.packageTypeId === PackageTypeIds.Standard ||
      this.userInfo.package.packageTypeId === PackageTypeIds.Premium
    );
  }

  get isDueForSuspension(): boolean {
    return (
      this.userInfo.userSubscription.isSuspended ||
      this.userInfo.userSubscription.isSuspendedOnNextChargeDate
    );
  }

  ngOnInit(): void {}

  onPaymentDelete(index: number): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Delete Profile',
        detail: 'Are you sre you want to delete profile?',
      })
      .pipe(filter((value) => !!value))
      .subscribe(() => this.deleteProfile.emit(this._profiles[index]));
  }

  onPaymentUpdate(index: number): void {
    this._billingInfoService
      .openPaymentUpdate(this._profiles[index], {
        isMobileView: window.innerWidth <= 599,
      })
      .pipe(filter((value) => !!value))
      .subscribe((value) =>
        this.paymentUpdate.emit({
          data: value,
          profile: this._profiles[index],
        }),
      );
  }

  unpauseMonthlyBilling() {
    this.createUnsuspendStream().subscribe(
      (packages) => {
        const userMemberCount = this.userInfo.package.memberCount;

        const newPackageId = packages
          .filter(
            (pack) =>
              pack.packageTypeId === this.userInfo.package.packageTypeId,
          )
          .sort((a, b) => a.memberCount - b.memberCount)
          .find((pack) => pack.memberCount > userMemberCount)?.id;

        if (hasValue(newPackageId)) {
          this._router.navigate(['../', 'plan-upgrade', newPackageId], {
            relativeTo: this._route,
          });
        } else {
          this._router.navigate(['../', 'plan-details'], {
            relativeTo: this._route,
          });
        }

        this._toastService.addToast(
          ToastType.Success,
          'Account has been successfully reactivated!',
        );
        this._userFacade.fetchUser();
      },
      () => {
        this._toastService.addToast(ToastType.Error, 'Something went wrong');
      },
    );
  }

  onAccountPause(): void {
    this._router.navigate(['billing', 'pause-account']);
  }

  viewHistory(): void {
    this._router.navigate(['billing', 'history']);
  }

  private createUnsuspendStream(): Observable<PackageFeatures[]> {
    return this._confirmDialogService
      .showDialog({
        confirmBtn: 'ACTIVATE',
        header: 'Welcome Back!',
        detail: 'Please confirm to re-activate your account.',
      })
      .pipe(
        take(1),
        filter((value) => !!value),
        tap(() => this._loaderService.showLoader()),
        switchMap(() =>
          this._billingInfoService
            .unsuspendRequest(this.userInfo.package.id)
            .pipe(
              switchMap(() => this._packageService.getAllPackageFeatures()),
            ),
        ),
      );
  }
}

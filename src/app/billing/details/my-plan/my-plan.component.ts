import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { PackageService } from 'src/app/api/packages/packages.service';
import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';

@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.scss'],
})
export class MyPlanComponent implements OnInit {
  isCancellingDowngrade = false;
  readonly packageTypeIds = PackageTypeIds;

  @Input()
  set userInfo(userInfo: MainUserInfoModel) {
    this._userInfo = userInfo;

    if (!userInfo.userSubscription.downgradeOnNextChargeDate) {
      this.isCancellingDowngrade = false;
    }
  }

  get userInfo(): MainUserInfoModel {
    return this._userInfo;
  }

  get isOnPlan(): boolean {
    return (
      this.userInfo.package.packageTypeId === this.packageTypeIds.Essentials ||
      this.userInfo.package.packageTypeId === this.packageTypeIds.Standard ||
      this.userInfo.package.packageTypeId === this.packageTypeIds.Premium
    );
  }

  private _userInfo: MainUserInfoModel;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _packagesService: PackageService,
    private _userFacade: UserFacade,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
  ) {}

  ngOnInit(): void {}

  onPlanChange(): void {
    this._router.navigate(['../', 'plan-details'], {
      relativeTo: this._activatedRoute,
    });
  }

  onDowngradeCancel(): void {
    this._loaderService.showLoader();
    this.isCancellingDowngrade = true;
    this._packagesService
      .cancelSubscriptionDowngrade()
      .pipe(take(1))
      .subscribe(
        () => {
          this._userFacade.fetchUser();
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Success,
            `Downgrade request has been successfully cancelled!`,
          );
        },
        () => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            `Something went wrong cancelling downgrade request.`,
          );
        },
      );
  }
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  BasePaymentProfile,
  PaymentProfile,
} from 'src/app/api/financials/financials.models';
import {
  PackageChange,
  SubscriptionChangeValidation,
  SubscriptionDowngrade,
  UpgradePackageDtoModel,
} from 'src/app/api/packages/packages.models';
import { PackageService } from 'src/app/api/packages/packages.service';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { PaymentManagerService } from 'src/app/domain/payment/payment-manager/payment-manager.service';

@Injectable()
export class DowngradeService {
  constructor(
    private _packageService: PackageService,
    private _paymentManagerService: PaymentManagerService,
  ) {}

  packageChange(
    updateModel: Partial<PackageChange>,
  ): Observable<SubscriptionChangeValidation> {
    return this._packageService.packageChange(updateModel);
  }

  downgradeRequest(
    currentPackageId: number,
    targetPackageId: number,
  ): Observable<SubscriptionDowngrade> {
    return this._packageService.canUserDowngrade(
      currentPackageId,
      targetPackageId,
    );
  }

  submitPackageDowngrade(
    updateModel: Partial<PackageChange>,
  ): Observable<UpgradePackageDtoModel> {
    return this._packageService.updatePackage(updateModel);
  }

  createPaymentProfile(
    data: Partial<PaymentProfile>,
    userInfo: MainUserInfoModel,
  ): Observable<BasePaymentProfile[]> {
    return this._paymentManagerService.createNewProfile(data, userInfo);
  }
}

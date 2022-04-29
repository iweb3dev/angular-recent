import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import {
  PackageFeatures,
  PurchaseCredits,
  PurchaseDomainName,
  PackageChange,
  SubscriptionDowngrade,
  SubscriptionPrepay,
  SubscriptionUpgrade,
  SubscriptionSuspendUnsuspend,
  SubscriptionChangeDowngrade,
  SuspensionReasons,
  UpgradePackageDtoModel,
  SubscriptionChangeValidation,
} from '../packages/packages.models';
import {
  GET_ALL_PACKAGE_FEATURES,
  GET_FEATURES_BY_PACKAGEID,
  CANCEL_SUBSCRIPTION_DOWNGRADE,

  // Commented out as this was duplicated in the usercredits controller
  // PURCHASE_CREDITS,
  PURCHASE_DOMAIN,
  CAN_USER_DOWNGRADE,
  VALIDATE_PACKAGE_CHANGE,
  GET_PAYMENT_PROFILE_TEST,
  PAYPAL_CREDIT_PURCHASE,
  GET_SUSPENSION_REASONS,
  GET_PACKAGES_BY_TYPE_ID,
  PACKAGES_API,
  PACKAGE_CHANGE,
} from '../packages/packages.api';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private _http: Http) {}

  getAllPackageFeatures(): Observable<PackageFeatures[]> {
    return this._http.get<PackageFeatures[]>(GET_ALL_PACKAGE_FEATURES);
  }

  updatePackage(
    updateModel: Partial<PackageChange>,
  ): Observable<UpgradePackageDtoModel> {
    return this._http.put<UpgradePackageDtoModel, Partial<PackageChange>>(
      PACKAGES_API,
      updateModel,
    );
  }

  getFeaturesByPackageId(packageId: number): Observable<PackageFeatures> {
    return this._http.get<PackageFeatures>(
      GET_FEATURES_BY_PACKAGEID(packageId),
    );
  }

  cancelSubscriptionDowngrade(): Observable<object> {
    return this._http.delete(CANCEL_SUBSCRIPTION_DOWNGRADE);
  }

  // Commented out as this was duplicated in the usercredits controller
  // purchaseCredits(purchase: PurchaseCredits):
  //   Observable<string> {
  //   return this._http
  //     .post<string>(PURCHASE_CREDITS, purchase);
  // }

  purchaseDomain(purchase: PurchaseDomainName): Observable<string> {
    return this._http.post<string>(PURCHASE_DOMAIN, purchase);
  }

  canUserDowngrade(
    currentPackageId: number,
    targetPackageId: number,
  ): Observable<SubscriptionDowngrade> {
    return this._http.get(
      CAN_USER_DOWNGRADE(currentPackageId, targetPackageId),
    );
  }

  validatePackageChange(
    packageChange: PackageChange,
  ): Observable<
    | SubscriptionDowngrade
    | SubscriptionPrepay
    | SubscriptionUpgrade
    | SubscriptionSuspendUnsuspend
  > {
    return this._http.put(VALIDATE_PACKAGE_CHANGE, packageChange);
  }

  getPaymentProfileTest(): Observable<SubscriptionChangeDowngrade> {
    return this._http.get(GET_PAYMENT_PROFILE_TEST);
  }

  paypalCreditPurchase(purchase: PurchaseCredits): Observable<string> {
    return this._http.post<string>(PAYPAL_CREDIT_PURCHASE, purchase);
  }

  getSuspensionReasons(isPublic: boolean): Observable<SuspensionReasons[]> {
    return this._http.get(GET_SUSPENSION_REASONS(isPublic));
  }

  getPackageFeaturesByPackageId(
    packageId: number,
  ): Observable<PackageFeatures[]> {
    return this._http.get(GET_PACKAGES_BY_TYPE_ID(packageId));
  }

  packageChange(
    updateChangeModel: Partial<PackageChange>,
  ): Observable<SubscriptionChangeValidation> {
    return this._http.put(PACKAGE_CHANGE, updateChangeModel);
  }
}

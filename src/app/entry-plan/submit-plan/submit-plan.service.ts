import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  OrderReceipt,
  PackageChange,
  PackageFeatures,
  PurchaseCredits,
  UpgradePackageDtoModel,
} from '@api/packages/packages.models';
import { PackageService } from '@api/packages/packages.service';
import {
  PackageTypeIds,
  SubscriptionChangeTypes,
} from '@api/shared/shared.enums';
import {
  BasePaymentProfile,
  PaymentProfile,
  PromoCode,
} from '@api/financials/financials.models';
import { FinancialsService } from '@api/financials/financials.service';
import { UsersService } from '@api/users/users.service';
import { UserModelDto } from '@api/users/users.models';
import {
  ToastService,
  ToastType,
} from '@shared/components/toast/service/toast.service';
import { LoaderService } from '@shared/components/loader/loader.service';
import { AdditionalCredit } from '@api/lookups/lookups.models';
import { LookupsService } from '@api/lookups/lookups.service';
import { UserCreditsService } from '@api/usercredits/usercredits.service';
import { pidID } from './submit-plan.consts';

@Injectable()
export class SubmitPlanService {
  constructor(
    private _userService: UsersService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _packageService: PackageService,
    private _financialsService: FinancialsService,
    private _lookupsService: LookupsService,
    private _userCreditsService: UserCreditsService,
  ) {}

  openErrorSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Error, message);
  }

  openSuccessSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Success, message);
  }

  addLoader(): void {
    this._loaderService.showLoader();
  }

  removeLoader(): void {
    this._loaderService.removeLoader();
  }

  fetchAdditionalCredits(): Observable<AdditionalCredit[]> {
    return this._lookupsService
      .getAdditionalCredits()
      .pipe(map((credits) => credits.filter((credit) => credit.version === 5)));
  }

  setPackageType(id: number): number {
    let packageType;
    if (id === pidID.Premium) {
      packageType = PackageTypeIds.Premium;
    }
    if (id === pidID.Standard) {
      packageType = PackageTypeIds.Standard;
    }
    if (id === pidID.Essentials) {
      packageType = PackageTypeIds.Essentials;
    }
    if (id === pidID.PayAsYouGo) {
      packageType = PackageTypeIds.PayAsYouGo;
    }
    return packageType;
  }
  fetchMembers(id: number): Observable<PackageFeatures[]> {
    return this._packageService
      .getAllPackageFeatures()
      .pipe(
        map((packs) =>
          packs
            .filter((pack) => pack.packageTypeId === this.setPackageType(id))
            .sort((a, b) => a.memberCount - b.memberCount),
        ),
      );
  }

  fetchOneMonthPremium(): Observable<PackageFeatures[]> {
    return this._packageService
      .getAllPackageFeatures()
      .pipe(map((packs) => packs.filter((pack) => pack.id === pidID.Premium)));
  }

  findUserData(): Observable<UserModelDto> {
    return this._userService.fetchUser();
  }

  createPaymentProfile(
    profile: Partial<PaymentProfile>,
  ): Observable<BasePaymentProfile[]> {
    return this._financialsService.savePaymentProfile(profile);
  }

  submitUpgradeRequest(
    model: Partial<PackageChange>,
  ): Observable<UpgradePackageDtoModel> {
    return this._packageService.updatePackage(model);
  }

  createCreditsRequestPayload(
    additionalCredit: AdditionalCredit,
    paymentProfile: BasePaymentProfile,
    userInfo: UserModelDto,
    promoCode: PromoCode,
  ): Observable<{
    creditUpgradeModel: PurchaseCredits;
    paymentProfile: BasePaymentProfile;
    promoCode: PromoCode;
  }> {
    return of({
      creditUpgradeModel: this.createCreditsPurchaseModel(
        additionalCredit,
        paymentProfile,
        userInfo,
        promoCode,
      ),
      paymentProfile,
      promoCode,
    });
  }

  upgradePackage(
    creditsData: {
      creditUpgradeModel: PurchaseCredits;
      paymentProfile: BasePaymentProfile;
      promoCode: PromoCode;
    },
    userInfo: UserModelDto,
  ): Observable<UpgradePackageDtoModel> {
    return this._packageService.updatePackage(
      this.createUpdatePackageModel(creditsData, userInfo),
    );
  }

  submitCreditsUpdate(creditsData: {
    creditUpgradeModel: PurchaseCredits;
    paymentProfile: BasePaymentProfile;
    promoCode: PromoCode;
  }): Observable<OrderReceipt> {
    return this._userCreditsService.postResultOfUserCreditPurchase(
      creditsData.creditUpgradeModel,
    );
  }

  private createUpdatePackageModel(
    creditsModel: {
      creditUpgradeModel: PurchaseCredits;
      paymentProfile: BasePaymentProfile;
      promoCode: PromoCode;
    },
    userInfo: UserModelDto,
  ): Partial<PackageChange> {
    return {
      changeToPackageId: pidID.PayAsYouGo, // PayAsYouGo package id is 11
      createStep: 'payment',
      currentPackageId: userInfo.package.id,
      customerProfileId: creditsModel.paymentProfile.customerProfileID,
      newPackageResults: '',
      paymentProfileId: creditsModel.paymentProfile.paymentProfileID,
      prepayOptionId: 0,
      promoCode: creditsModel.promoCode?.code ?? '',
      receivedHalfOff: 0, // TODO: default to zero
      subscriptionChangeType: SubscriptionChangeTypes.downgrade,
      isPayPal: false,
      isSettingUpForTrialPackage: false,
    };
  }

  private createCreditsPurchaseModel(
    additionalCredit: AdditionalCredit,
    primaryProfile: BasePaymentProfile,
    userInfo: UserModelDto,
    promoCode: PromoCode,
  ): PurchaseCredits {
    return {
      additionalCreditsID: additionalCredit.id,
      claimedMoneyBalance: 0,
      cost: additionalCredit.cost,
      creditAmount: additionalCredit.creditCount,
      customerProfileID: userInfo.customerProfileID,
      discountCost: `${additionalCredit.cost}`,
      initialCost: `${additionalCredit.cost}`,
      paymentProfileID: primaryProfile.paymentProfileID,
      ownerID: primaryProfile.ownerID,
      ownerCurrentPackageID: userInfo.package.id,
      description: '',
      emailAddress: primaryProfile.emailAddress,
      paymentType: primaryProfile.paymentType,
      promoCode: promoCode,
    };
  }
}

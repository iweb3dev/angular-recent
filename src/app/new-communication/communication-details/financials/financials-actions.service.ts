import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import {
  BasePaymentProfile,
  FinancialProfileDtoModel,
  PromoCode,
} from 'src/app/api/financials/financials.models';
import { AdditionalCredit } from 'src/app/api/lookups/lookups.models';
import { LookupsService } from 'src/app/api/lookups/lookups.service';
import {
  CPCPromoCode,
  OrderReceipt,
  PackageChange,
  PackageFeatures,
  PurchaseCredits,
  UpgradePackageDtoModel,
} from 'src/app/api/packages/packages.models';
import { PackageService } from 'src/app/api/packages/packages.service';
import { PayPalBuyCreditsResponseModel } from 'src/app/api/paypal/paypal.models';
import { PayPalService } from 'src/app/api/paypal/paypal.service';
import { RewardsUser } from 'src/app/api/rewards/rewards.models';
import { RewardsService } from 'src/app/api/rewards/rewards.service';
import {
  PackageTypeIds,
  SubscriptionChangeTypes,
} from 'src/app/api/shared/shared.enums';
import { UserCreditsService } from 'src/app/api/usercredits/usercredits.service';
import { PayPalCaptureModel } from 'src/app/components/paypal/paypal.models';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { PaymentManagerService } from 'src/app/domain/payment/payment-manager/payment-manager.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { hasValue } from 'src/app/shared/utils/verifications/value-check';

import {
  AdditionalCreditsModel,
  PurchaseCreditsDialogData,
} from './add-credits/add-credits.models';
import { AddCreditsDialogComponent } from './add-credits/dialog/add-credits-dialog.component';
import { AddCreditsSheetComponent } from './add-credits/sheet/add-credits-sheet.component';
import { GoUnlimitedDialogComponent } from './go-unlimited/dialog/go-unlimited-dialog.component';
import { GoUnlimitedDialogDataModel } from './go-unlimited/go-unlimited.models';
import { GoUnlimitedSheetComponent } from './go-unlimited/sheet/go-unlimited-sheet.component';

@Injectable()
export class FinancialsActionsService {
  constructor(
    private _lookupsService: LookupsService,
    private _userCreditsService: UserCreditsService,
    private _packageService: PackageService,
    private _bottomSheet: MatBottomSheet,
    private _toastService: ToastService,
    private _matDialog: MatDialog,
    private _loaderService: LoaderService,
    private _paymentManagerService: PaymentManagerService,
    private _rewardsService: RewardsService,
    private _payPalService: PayPalService,
  ) {}

  openErrorSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Error, message);
  }

  openSuccessSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Success, message);
  }

  fetchPurchaseCreditsData(
    userInfo: MainUserInfoModel,
  ): Observable<[BasePaymentProfile[], RewardsUser, AdditionalCreditsModel[]]> {
    return forkJoin([
      this._paymentManagerService.findPaymentProfiles(
        userInfo.customerProfileID,
      ),
      this._rewardsService
        .getRewardsUser()
        .pipe(map((rewards) => rewards ?? ({} as RewardsUser))),
      this.fetchAdditionalCredits(),
    ]).pipe(
      catchError(() => {
        this.removeLoader();
        this.openErrorSnackbar('Something went wrong.');

        return EMPTY;
      }),
    );
  }

  fetchPlanUpgradeData(
    userInfo: MainUserInfoModel,
  ): Observable<[PackageFeatures[], BasePaymentProfile[]]> {
    return forkJoin([
      this.fetchPremiumPackages(userInfo),
      this._paymentManagerService.findPaymentProfiles(
        userInfo.customerProfileID,
      ),
    ]);
  }

  openUpgradePlan(
    upgradePackages: PackageFeatures[],
    paymentProfiles: BasePaymentProfile[],
  ): Observable<GoUnlimitedDialogDataModel> {
    const isMobileView = window.innerWidth <= 599;

    if (isMobileView) {
      return this._bottomSheet
        .open(GoUnlimitedSheetComponent, {
          data: { upgradePackages, paymentProfiles },
        })
        .afterDismissed()
        .pipe(filter((value) => !!value));
    }

    return this._matDialog
      .open(GoUnlimitedDialogComponent, {
        minWidth: '535px',
        data: { upgradePackages, paymentProfiles },
      })
      .afterClosed()
      .pipe(filter((value) => !!value));
  }

  purchaseCredits(
    purchaseCreditsModel: PurchaseCredits,
  ): Observable<OrderReceipt> {
    return this._userCreditsService.postResultOfUserCreditPurchase(
      purchaseCreditsModel,
    );
  }

  openAddCredits(
    userInfo: MainUserInfoModel,
    paymentProfiles: BasePaymentProfile[],
    rewardBalance: RewardsUser,
    additionalCredits: AdditionalCreditsModel[],
  ): Observable<PurchaseCreditsDialogData> {
    const isMobileView = window.innerWidth <= 599;
    if (isMobileView) {
      return this._bottomSheet
        .open<AddCreditsSheetComponent>(AddCreditsSheetComponent, {
          data: {
            userInfo,
            paymentProfiles,
            rewardBalance,
            additionalCredits,
          },
        })
        .afterDismissed()
        .pipe(filter((value) => !!value));
    }

    return this._matDialog
      .open<AddCreditsDialogComponent>(AddCreditsDialogComponent, {
        data: {
          userInfo,
          paymentProfiles,
          rewardBalance,
          additionalCredits,
        },
        minWidth: '535px',
      })
      .afterClosed()
      .pipe(filter((value) => !!value));
  }

  createCreditsRequestPayload(
    creditsDialogDataModel: PurchaseCreditsDialogData,
    userInfo: MainUserInfoModel,
    rewardBalance: RewardsUser,
    paymentProfile: BasePaymentProfile,
  ): Observable<PurchaseCredits> {
    const hasNewPayment = hasValue(creditsDialogDataModel.paymentData);

    if (hasNewPayment) {
      return this._paymentManagerService
        .createNewProfile(creditsDialogDataModel.paymentData, userInfo)
        .pipe(
          map(([newPrimaryProfile]) =>
            this.createCreditsPurchaseModel(
              creditsDialogDataModel.additionalCredit,
              newPrimaryProfile,
              rewardBalance,
              userInfo,
              creditsDialogDataModel.promocode,
            ),
          ),
          catchError(({ error }) => {
            this.removeLoader();
            this._toastService.createValidatorToast(error[0]);

            return EMPTY;
          }),
        );
    }

    return of(
      this.createCreditsPurchaseModel(
        creditsDialogDataModel.additionalCredit,
        paymentProfile,
        rewardBalance,
        userInfo,
        creditsDialogDataModel.promocode,
      ),
    );
  }

  addLoader(): void {
    this._loaderService.showLoader();
  }

  removeLoader(): void {
    this._loaderService.removeLoader();
  }

  submitUpgradeRequest(
    model: Partial<PackageChange>,
  ): Observable<UpgradePackageDtoModel> {
    return this._packageService.updatePackage(model);
  }

  createPackageUpgradePayload(
    userInfo: MainUserInfoModel,
    upgradeData: GoUnlimitedDialogDataModel,
    paymentProfile: BasePaymentProfile,
  ): Observable<Partial<PackageChange>> {
    const hasNewPayment = hasValue(upgradeData.paymentData);

    if (hasNewPayment) {
      return this._paymentManagerService
        .createNewProfile(upgradeData.paymentData, userInfo)
        .pipe(
          map(([newPrimaryProfile]) =>
            this.createUpgradePayloadModel(
              userInfo,
              upgradeData,
              newPrimaryProfile,
            ),
          ),
          catchError(({ error }) => {
            this.removeLoader();
            this._toastService.createValidatorToast(error[0]);

            return EMPTY;
          }),
        );
    }

    return of(
      this.createUpgradePayloadModel(userInfo, upgradeData, paymentProfile),
    );
  }

  createPayPalCreditsTransaction(
    captureModel: PayPalCaptureModel,
    promocode: CPCPromoCode,
    additionalCredit: AdditionalCredit,
    userInfo: MainUserInfoModel,
    rewardsBalance: RewardsUser,
  ): Observable<PayPalBuyCreditsResponseModel> {
    return this._payPalService.executePayPalTransaction({
      payPalPaymentId: captureModel.id,
      promocode,
      payPalPayerId: captureModel.payer.payer_id,
      userId: userInfo.id,
      creditsId: additionalCredit.id,
      email: userInfo.emailAddresses.find((address) => address.isPrimary).email,
      claimedMoneyBalance: rewardsBalance?.claimedMoneyBalance,
    });
  }

  private createCreditsPurchaseModel(
    additionalCredit: AdditionalCredit,
    primaryProfile: BasePaymentProfile,
    rewardBalance: RewardsUser,
    userInfo: MainUserInfoModel,
    promoCode: PromoCode,
  ): PurchaseCredits {
    const creditCost =
      additionalCredit.cost - rewardBalance.claimedMoneyBalance;

    return {
      additionalCreditsID: additionalCredit.id,
      claimedMoneyBalance: rewardBalance.claimedMoneyBalance,
      cost: creditCost < 1 ? 0 : creditCost,
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

  private createUpgradePayloadModel(
    userInfo: MainUserInfoModel,
    upgradeData: GoUnlimitedDialogDataModel,
    paymentProfile: BasePaymentProfile,
  ): Partial<PackageChange> {
    return {
      paymentProfileId: paymentProfile.paymentProfileID,
      changeToPackageId: upgradeData.contract.id,
      promoCode: upgradeData.promocode?.code,
      createStep: 'payment',
      currentPackageId: userInfo.package.id,
      customerProfileId: userInfo.customerProfileID,
      newPackageResults: '',
      // 1 for now: 0, -- 0 = Purchase 1 Month, 1 = 6 Months Purchase,
      // 2 = 12 Months, 3 = 24 Months, 4 = Extend By another month, 5 = 3 Months.
      prepayOptionId: 1,
      subscriptionChangeType: SubscriptionChangeTypes.upgrade,
      isSettingUpForTrialPackage: false,
      receivedHalfOff: 0, // TODO: default to zero
      rewardMoneyBalance: 0,
      suspendReason: 0,
      isPayPal: false,
    };
  }

  private fetchAdditionalCredits(): Observable<AdditionalCreditsModel[]> {
    return this._lookupsService.getAdditionalCredits().pipe(
      map((credits) => credits.filter((credit) => credit.version === 5)),
      map((credits) =>
        credits.map((credit) => ({
          displayValue: `${credit.creditCount} Credits ($${credit.cost})`,
          ...credit,
        })),
      ),
    );
  }

  private fetchPremiumPackages(
    userInfo: MainUserInfoModel,
  ): Observable<PackageFeatures[]> {
    return this._packageService.getAllPackageFeatures().pipe(
      map((packages) =>
        packages.filter(
          (pack) => pack.packageTypeId === PackageTypeIds.Premium,
        ),
      ),
      map((packages) =>
        packages.map((pack) => ({
          ...pack,
          packageName: `Up to ${pack.memberCount} Contracts ($${pack.cost}$/month)`,
        })),
      ),
    );
  }
}

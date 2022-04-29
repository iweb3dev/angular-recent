import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import {
  BasePaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
  PromoCode,
} from 'src/app/api/financials/financials.models';
import { AdditionalCredit } from 'src/app/api/lookups/lookups.models';
import { LookupsService } from 'src/app/api/lookups/lookups.service';
import { CPCPromoCode, OrderReceipt, PackageChange, PurchaseCredits, UpgradePackageDtoModel } from 'src/app/api/packages/packages.models';
import { PackageService } from 'src/app/api/packages/packages.service';
import { PayPalService } from 'src/app/api/paypal/paypal.service';
import { RewardsUser } from 'src/app/api/rewards/rewards.models';
import { RewardsService } from 'src/app/api/rewards/rewards.service';
import { SubscriptionChangeTypes } from 'src/app/api/shared/shared.enums';
import { UserCreditsService } from 'src/app/api/usercredits/usercredits.service';
import { PayPalCaptureModel } from 'src/app/components/paypal/paypal.models';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { PaymentManagerService } from 'src/app/domain/payment/payment-manager/payment-manager.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { hasValue } from 'src/app/shared/utils/verifications/value-check';
import { AppState } from 'src/app/store/app-state';
import { CreditsPurchaseConfigModel, CreditsPurchaseDialogData } from './credits.models';
import { PurchaseCreditsDialogComponent } from './purchase-credits/dialog/purchase-credits-dialog.component';
import { PurchaseCreditsSheetComponent } from './purchase-credits/sheet/purchase-credits-sheet.component';

@Injectable()
export class CreditsService {
  constructor(
    private _store: Store<AppState>,
    private _lookupsService: LookupsService,
    private _matBottomSheet: MatBottomSheet,
    private _matDialog: MatDialog,
    private _paymentManagerService: PaymentManagerService,
    private _rewardsService: RewardsService,
    private _userCreditsService: UserCreditsService,
    private _packageService: PackageService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _payPalService: PayPalService
  ) {}

  fetchAdditionalCredits(packageType: number): Observable<AdditionalCredit[]> {
    return this._lookupsService.getAdditionalCredits().pipe(map((credits) => credits.filter((credit) => credit.version === packageType)));
  }

  fetchPurchaseCreditsData(
    userInfo: MainUserInfoModel
  ): Observable<[(PaymentProfileBankAccount & PaymentProfileCreditCard)[], RewardsUser]> {
    return forkJoin([
      this._paymentManagerService.findPaymentProfiles(userInfo.customerProfileID),
      this._rewardsService.getRewardsUser().pipe(map((rewards) => rewards ?? ({} as RewardsUser))),
    ]).pipe(
      catchError(() => {
        this._loaderService.removeLoader();
        this.addErrorToast('Something went wrong.');

        return EMPTY;
      })
    );
  }

  openPurchaseCreditsWindow(
    additionalCredit: AdditionalCredit,
    paymentProfiles: (PaymentProfileBankAccount & PaymentProfileCreditCard)[],
    rewardBalance: RewardsUser
  ): Observable<CreditsPurchaseDialogData> {
    const isMobileView = window.innerWidth <= 599;

    if (isMobileView) {
      return this._matBottomSheet
        .open<PurchaseCreditsSheetComponent, CreditsPurchaseConfigModel, CreditsPurchaseDialogData>(PurchaseCreditsSheetComponent, {
          data: {
            credits: additionalCredit,
            paymentProfiles,
            rewardBalance,
          },
        })
        .afterDismissed()
        .pipe(filter((value) => !!value));
    }

    return this._matDialog
      .open<PurchaseCreditsDialogComponent, CreditsPurchaseConfigModel, CreditsPurchaseDialogData>(PurchaseCreditsDialogComponent, {
        data: { credits: additionalCredit, paymentProfiles, rewardBalance },
        minWidth: '535px',
        autoFocus: false,
      })
      .afterClosed()
      .pipe(filter((value) => !!value));
  }

  createCreditsRequestPayload(
    creditsDialogDataModel: CreditsPurchaseDialogData,
    userInfo: MainUserInfoModel,
    additionalCredit: AdditionalCredit,
    rewardBalance: RewardsUser,
    paymentProfile: BasePaymentProfile
  ): Observable<{
    creditUpgradeModel: PurchaseCredits;
    paymentProfile: BasePaymentProfile;
    promoCode: PromoCode;
  }> {
    const hasNewPayment = hasValue(creditsDialogDataModel.paymentData);

    if (hasNewPayment) {
      return this._paymentManagerService.createNewProfile(creditsDialogDataModel.paymentData, userInfo).pipe(
        map(([newPrimaryProfile]) => ({
          creditUpgradeModel: this.createCreditsPurchaseModel(
            additionalCredit,
            newPrimaryProfile,
            rewardBalance,
            userInfo,
            creditsDialogDataModel.promocode
          ),
          paymentProfile: newPrimaryProfile,
          promoCode: creditsDialogDataModel.promocode,
        })),
        catchError(({ error }) => {
          this.removeLoader();
          this._toastService.createValidatorToast(error[0]);

          return EMPTY;
        })
      );
    }

    return of({
      creditUpgradeModel: this.createCreditsPurchaseModel(
        additionalCredit,
        paymentProfile,
        rewardBalance,
        userInfo,
        creditsDialogDataModel.promocode
      ),
      paymentProfile,
      promoCode: creditsDialogDataModel.promocode,
    });
  }

  submitCreditsUpdate(creditsData: {
    creditUpgradeModel: PurchaseCredits;
    paymentProfile: BasePaymentProfile;
    promoCode: PromoCode;
  }): Observable<OrderReceipt> {
    return this._userCreditsService.postResultOfUserCreditPurchase(creditsData.creditUpgradeModel);
  }

  downgradePackage(
    creditsData: {
      creditUpgradeModel: PurchaseCredits;
      paymentProfile: BasePaymentProfile;
      promoCode: PromoCode;
    },
    userInfo: MainUserInfoModel
  ): Observable<UpgradePackageDtoModel> {
    return this._packageService.updatePackage(this.createUpdatePackageModel(creditsData, userInfo));
  }

  addSuccessToast(message: string): void {
    this._toastService.addToast(ToastType.Success, message);
  }

  addErrorToast(message: string): void {
    this._toastService.addToast(ToastType.Error, message);
  }

  addLoader(): void {
    this._loaderService.showLoader();
  }

  removeLoader(): void {
    this._loaderService.removeLoader();
  }

  createPayPalCreditsTransaction(
    captureModel: PayPalCaptureModel,
    promocode: CPCPromoCode,
    additionalCredit: AdditionalCredit,
    userInfo: MainUserInfoModel,
    rewardsBalance: RewardsUser
  ) {
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

  private createUpdatePackageModel(
    creditsModel: {
      creditUpgradeModel: PurchaseCredits;
      paymentProfile: BasePaymentProfile;
      promoCode: PromoCode;
    },
    userInfo: MainUserInfoModel
  ): Partial<PackageChange> {
    return {
      changeToPackageId: 11, // PayAsYouGo package id is 11
      createStep: 'select',
      currentPackageId: userInfo.package.packageTypeId,
      customerProfileId: userInfo.customerProfileID,
      newPackageResults: '',
      paymentProfileId: creditsModel.paymentProfile.paymentProfileID,
      prepayOptionId: 0,
      promoCode: creditsModel.promoCode?.code ?? '',
      receivedHalfOff: 0, // TODO: default to zero
      subscriptionChangeType: SubscriptionChangeTypes.downgrade,
    };
  }

  private createCreditsPurchaseModel(
    additionalCredit: AdditionalCredit,
    primaryProfile: BasePaymentProfile,
    rewardBalance: RewardsUser,
    userInfo: MainUserInfoModel,
    promoCode: PromoCode
  ): PurchaseCredits {
    const creditCost = additionalCredit.cost - rewardBalance.claimedMoneyBalance;

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
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

import { BuildCommuniationsQueue } from 'src/app/api/communications/communications.models';
import {
  OrderReceipt,
  UpgradePackageDtoModel,
} from 'src/app/api/packages/packages.models';
import { PayPalBuyCreditsResponseModel } from 'src/app/api/paypal/paypal.models';
import {
  PackageTypeIds,
  PaymentPrograms,
} from 'src/app/api/shared/shared.enums';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { ToastService } from 'src/app/shared/components/toast/service/toast.service';
import { nonValue } from 'src/app/shared/utils/verifications/value-check';

import { FinancialsActionsService } from './financials-actions.service';

@Component({
  selector: 'app-financials',
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.scss'],
})
export class FinancialsComponent implements OnInit {
  @Input()
  communicationsQueue: BuildCommuniationsQueue;

  @Input()
  currentUserInfo: MainUserInfoModel;

  @Output()
  addCredits = new EventEmitter<void>();

  @Output()
  upgradePlan = new EventEmitter<void>();

  constructor(
    private _financialActionsService: FinancialsActionsService,
    private _userFacade: UserFacade,
  ) {}

  ngOnInit(): void {}

  get isOnPayAsGo(): boolean {
    return (
      this.currentUserInfo.package.packageTypeId === PackageTypeIds.PayAsYouGo
    );
  }

  get isOnFreeTrial(): boolean {
    return (
      this.currentUserInfo.package.packageTypeId !==
        PackageTypeIds.PayAsYouGo &&
      this.currentUserInfo.userSubscription.packagePrice < 1
    );
  }

  get canSendNow(): boolean {
    if (nonValue(this.communicationsQueue)) {
      return false;
    }

    return (
      this.communicationsQueue.currentBalance >=
      this.communicationsQueue.neededBalance
    );
  }

  onAddCredits(): void {
    this._financialActionsService.addLoader();

    this.createPurchaseCreditsStream().subscribe(() => {
      this._userFacade.fetchUser();
      this._financialActionsService.removeLoader();
      this._financialActionsService.openSuccessSnackbar(
        'Credits have been successfully added.',
      );
    });
  }

  onUpgrade(): void {
    this._financialActionsService.addLoader();

    this.createUpgradeStream(this.currentUserInfo).subscribe(() => {
      this._userFacade.fetchUser();
      this._financialActionsService.removeLoader();
      this._financialActionsService.openSuccessSnackbar(
        'Your plan has been successfully upgraded.',
      );
    });
  }

  private createUpgradeStream(
    userInfo: MainUserInfoModel,
  ): Observable<UpgradePackageDtoModel> {
    return this._financialActionsService.fetchPlanUpgradeData(userInfo).pipe(
      take(1),
      tap(() => this._financialActionsService.removeLoader()),
      switchMap(([premiumPackages, paymentProfiles]) =>
        this._financialActionsService
          .openUpgradePlan(premiumPackages, paymentProfiles)
          .pipe(
            tap(() => this._financialActionsService.addLoader()),
            switchMap((upgradeData) =>
              this._financialActionsService
                .createPackageUpgradePayload(
                  userInfo,
                  upgradeData,
                  upgradeData.selectedPaymentProfile,
                )
                .pipe(
                  switchMap((upgradePayload) =>
                    this._financialActionsService
                      .submitUpgradeRequest(upgradePayload)
                      .pipe(
                        catchError(() => {
                          this._financialActionsService.removeLoader();
                          this._financialActionsService.openErrorSnackbar(
                            'Something went wrong.',
                          );

                          return EMPTY;
                        }),
                      ),
                  ),
                ),
            ),
          ),
      ),
    );
  }

  private createPurchaseCreditsStream(): Observable<
    OrderReceipt | PayPalBuyCreditsResponseModel
  > {
    return this._financialActionsService
      .fetchPurchaseCreditsData(this.currentUserInfo)
      .pipe(
        take(1),
        tap(() => this._financialActionsService.removeLoader()),
        switchMap(([paymentProfiles, rewardBalance, additionalCredit]) =>
          this._financialActionsService
            .openAddCredits(
              this.currentUserInfo,
              paymentProfiles,
              rewardBalance,
              additionalCredit,
            )
            .pipe(
              tap(() => this._financialActionsService.addLoader()),
              switchMap((creditsDialogDataModel) => {
                const payPalSelected =
                  creditsDialogDataModel.paymentData?.selectedPaymentProgram ===
                  PaymentPrograms.payPal;

                if (payPalSelected) {
                  return this._financialActionsService.createPayPalCreditsTransaction(
                    creditsDialogDataModel.payPalData,
                    creditsDialogDataModel.promocode,
                    creditsDialogDataModel.additionalCredit,
                    this.currentUserInfo,
                    rewardBalance,
                  );
                }

                return this._financialActionsService
                  .createCreditsRequestPayload(
                    creditsDialogDataModel,
                    this.currentUserInfo,
                    rewardBalance,
                    creditsDialogDataModel.selectedPaymentProfile,
                  )
                  .pipe(
                    switchMap((purchaseCreditsPayload) =>
                      this._financialActionsService
                        .purchaseCredits(purchaseCreditsPayload)
                        .pipe(
                          catchError(() => {
                            this._financialActionsService.removeLoader();
                            this._financialActionsService.openErrorSnackbar(
                              'Something went wrong.',
                            );

                            return EMPTY;
                          }),
                        ),
                    ),
                  );
              }),
            ),
        ),
      );
  }
}

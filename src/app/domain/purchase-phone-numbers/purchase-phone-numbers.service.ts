import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import {
  BasePaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from 'src/app/api/financials/financials.models';
import { TwilioService } from 'src/app/api/twilio/twilio.service';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { PaymentManagerService } from '../payment/payment-manager/payment-manager.service';
import { CustomPhoneDialogComponent } from './custom-phone/dialog/custom-phone-dialog.component';
import { CustomPhoneSheetComponent } from './custom-phone/sheet/custom-phone-sheet.component';
import { PhonePurchaseDataModel } from './purchase-phone-numbers.models';

@Injectable()
export class PurchasePhoneNumbersService {
  constructor(
    private _matDialog: MatDialog,
    private _toastService: ToastService,
    private _bottomSheet: MatBottomSheet,
    private _twilioService: TwilioService,
    private _loaderService: LoaderService,
    private _paymentManagerService: PaymentManagerService,
  ) {}

  openErrorSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Error, message);
  }

  openSuccessSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Success, message);
  }

  showSpinner(): void {
    this._loaderService.showLoader();
  }

  removeSpinner(): void {
    this._loaderService.removeLoader();
  }

  fetchPhoneConfiguratorData(
    customerProfileId: number,
  ): Observable<BasePaymentProfile[]> {
    return this._paymentManagerService.findPaymentProfiles(customerProfileId);
  }

  completePhonePurchase(
    purchaseData: PhonePurchaseDataModel,
    userInfo: MainUserInfoModel,
  ): Observable<string> {
    if (!purchaseData.paymentData) {
      return this.completeTollFreeNumberPurchase(
        purchaseData,
        purchaseData.selectedPaymentProfile.paymentProfileID,
      );
    }

    return this._paymentManagerService
      .createNewProfile(purchaseData.paymentData, userInfo)
      .pipe(
        catchError((err) => {
          this.openErrorSnackbar(err.error[0]);
          this.removeSpinner();
          return EMPTY;
        }),
        switchMap(([newProfile]) =>
          this.completeTollFreeNumberPurchase(
            purchaseData,
            newProfile.paymentProfileID,
          ),
        ),
      );
  }

  completeTollFreeNumberPurchase(
    purchaseData: PhonePurchaseDataModel,
    paymentProfileId: number,
  ): Observable<string> {
    return this._twilioService
      .purchaseTollFreePhoneNumber(
        paymentProfileId,
        purchaseData.phoneNumber,
        purchaseData.prepayOptionId,
      )
      .pipe(map(() => purchaseData.phoneNumber.replace(/\+/, '')));
  }

  createConfigurator(
    primaryProfiles: (PaymentProfileBankAccount & PaymentProfileCreditCard)[],
    existingPhoneNumber?: string,
    endDate?: string
  ): Observable<PhonePurchaseDataModel> {
    const isMobileView = window.innerWidth <= 959;

    if (!isMobileView) {
      return this.openTextCustomPhoneSelectorDialog(
        primaryProfiles,
        existingPhoneNumber,
        endDate
      );
    }

    return this.openTextCustomPhoneSelectorSheet(
      primaryProfiles,
      existingPhoneNumber,
      endDate
    );
  }

  private openTextCustomPhoneSelectorDialog(
    paymentProfiles: BasePaymentProfile[],
    existingPhoneNumber?: string,
    endDate?: string
  ): Observable<PhonePurchaseDataModel> {
    return this.openMatDialog(CustomPhoneDialogComponent, {
      paymentProfiles,
      existingPhoneNumber,
      endDate
    })
      .afterClosed()
      .pipe(filter((data) => !!data));
  }

  private openTextCustomPhoneSelectorSheet(
    paymentProfiles: (PaymentProfileBankAccount & PaymentProfileCreditCard)[],
    existingPhoneNumber?: string,
    endDate?: string
  ): Observable<PhonePurchaseDataModel> {
    return this._bottomSheet
      .open(CustomPhoneSheetComponent, {
        backdropClass: 'bottom-sheet-backdrop',
        panelClass: 'bottom-sheet-container',
        data: { paymentProfiles, existingPhoneNumber, endDate },
      })
      .afterDismissed()
      .pipe(filter((data) => !!data));
  }

  private openMatDialog<T>(
    component: ComponentType<T>,
    data: {
      paymentProfiles: BasePaymentProfile[];
      existingPhoneNumber?: string;
      endDate?: string
    },
  ): MatDialogRef<T> {
    return this._matDialog.open(component, {
      panelClass: 'custom-phone-renewal-dialog',
      height: 'min-content',
      disableClose: true,
      autoFocus: false,
      width: '580px',
      data,
    });
  }
}

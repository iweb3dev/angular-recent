import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import * as moment from 'moment';

import {
  BankAccountTypeLabels,
  CartTypesLabels,
} from 'src/app/shared/constants/financials.constants';
import { PaymentProfile } from 'src/app/api/financials/financials.models';
import {
  PaymentTypes,
  SubscriptionChangeTypes,
} from 'src/app/api/shared/shared.enums';
import { PackageService } from 'src/app/api/packages/packages.service';

import { BillingPaymentProfile } from '../billing-details.models';

import { PaymentProfileViewInfo } from './billing-info.models';
import { UpdatePaymentSheetComponent } from './update-payment/sheet/update-payment-sheet.component';
import { UpdatePaymentDialogComponent } from './update-payment/dialog/update-payment-dialog.component';
import { UpgradePackageDtoModel } from 'src/app/api/packages/packages.models';

@Injectable()
export class BillingInfoService {
  constructor(
    private _matBottomSheet: MatBottomSheet,
    private _matDialog: MatDialog,
    private _packageService: PackageService,
  ) {}

  openPaymentUpdate(
    profile: BillingPaymentProfile,
    { isMobileView },
  ): Observable<Partial<PaymentProfile>> {
    if (isMobileView) {
      return this._matBottomSheet
        .open(UpdatePaymentSheetComponent, { data: profile })
        .afterDismissed();
    }

    return this._matDialog
      .open(UpdatePaymentDialogComponent, {
        width: '580px',
        height: '660px',
        autoFocus: false,
        data: profile,
      })
      .afterClosed();
  }

  createCardViewInfo(
    profiles: BillingPaymentProfile[],
  ): PaymentProfileViewInfo[] {
    return profiles.map((profile) => {
      switch (profile.paymentType) {
        case PaymentTypes.creditCard:
          const cardNumber = profile.creditCardNumber;
          return {
            cardAccountNumberInfo: `${
              CartTypesLabels[profile.cardType]
            } ending in ${cardNumber.substring(cardNumber.length - 4)}`,
            profileDetails: `Expires: ${moment(profile.expirationNotice).format(
              'MM/yyyy',
            )}`,
            isPrimary: profile.isPrimary,
          };
        case PaymentTypes.echeck:
          const accountNumber = profile.accountNumber;
          return {
            cardAccountNumberInfo: `${
              BankAccountTypeLabels[profile.accountType]
            } ending in ${accountNumber.substring(accountNumber.length - 4)}`,
            profileDetails: profile.bankName,
            isPrimary: profile.isPrimary,
          };
      }
    });
  }

  unsuspendRequest(
    currentPackageId: number,
  ): Observable<UpgradePackageDtoModel> {
    return this._packageService.updatePackage({
      currentPackageId,
      subscriptionChangeType: SubscriptionChangeTypes.unsuspend,
    });
  }
}

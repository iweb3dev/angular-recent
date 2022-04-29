import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { PaymentProfile } from 'src/app/api/financials/financials.models';

import { AddPaymentDialogComponent } from './add-payment/dialog/add-payment-dialog.component';
import { AddPaymentSheetComponent } from './add-payment/sheet/add-payment-sheet.component';

@Directive({
  selector: '[appAddNewPayment]',
})
export class AddNewPaymentDirective {
  constructor(
    private _matBottomSheet: MatBottomSheet,
    private _matDialog: MatDialog,
  ) {}

  @Output()
  paymentProfileData = new EventEmitter<Partial<PaymentProfile>>();

  @HostListener('click')
  openAddDialog(): void {
    this.createDialog()
      .pipe(
        filter((value) => !!value),
        take(1),
      )
      .subscribe((profileData) => this.paymentProfileData.emit(profileData));
  }

  private createDialog(): Observable<Partial<PaymentProfile>> {
    const isMobileView = window.innerWidth <= 599;

    if (isMobileView) {
      return this._matBottomSheet
        .open(AddPaymentSheetComponent, {})
        .afterDismissed();
    }

    return this._matDialog
      .open(AddPaymentDialogComponent, {
        width: '580px',
        height: '680px',
        autoFocus: false,
      })
      .afterClosed();
  }
}

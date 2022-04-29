import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

import * as moment from 'moment';

import { PaymentTypes } from 'src/app/api/shared/shared.enums';
import { createPaymentProfileUpdateForm } from 'src/app/domain/billing/utils/billing-payment-profile.form';

import { BillingPaymentProfile } from '../../../billing-details.models';

@Component({
  selector: 'app-update-payment-sheet',
  templateUrl: './update-payment-sheet.component.html',
  styleUrls: ['./update-payment-sheet.component.scss'],
})
export class UpdatePaymentSheetComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public profile: BillingPaymentProfile,
    private _bottomSheetRef: MatBottomSheetRef,
  ) {}

  get creditCardForm(): FormGroup {
    return this.paymentForm.get('creditCard') as FormGroup;
  }

  get bankAccountForm(): FormGroup {
    return this.paymentForm.get('bankAccount') as FormGroup;
  }

  ngOnInit(): void {
    this.paymentForm = createPaymentProfileUpdateForm();

    this.updatePaymentForm();
  }

  onCancel(): void {
    this._bottomSheetRef.dismiss();
  }

  onSaveUpdate(): void {
    const paymentData = this.paymentForm.getRawValue();

    this._bottomSheetRef.dismiss({
      selectedPaymentProgram: this.profile.paymentType,
      bankAccount: paymentData.bankAccount,
      creditCard: {
        ...paymentData.creditCard,
        expirationNotice: paymentData.creditCard?.expirationNotice?.toDate(),
      },
    });
  }

  private updatePaymentForm(): void {
    const bankAccount = this.paymentForm.get('bankAccount') as FormGroup;
    const creditCard = this.paymentForm.get('creditCard') as FormGroup;

    creditCard.addControl('isPrimary', new FormControl(false));
    bankAccount.addControl('isPrimary', new FormControl(false));
    creditCard.get('creditCardNumber').disable();
    bankAccount.get('accountNumber').disable();

    if (this.profile.paymentType === PaymentTypes.creditCard) {
      bankAccount.disable();
      creditCard.patchValue({
        ...this.profile,
        emailAddress: this.profile.ccEmailAddress,
        expirationNotice: moment(this.profile.expirationNotice),
      });
    }

    if (this.profile.paymentType === PaymentTypes.echeck) {
      creditCard.disable();
      bankAccount.patchValue({
        ...this.profile,
        routingNumber: this.profile.maskedRoutingNumber,
      });
    }
  }
}

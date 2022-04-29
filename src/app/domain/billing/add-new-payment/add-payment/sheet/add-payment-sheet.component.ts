import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { PaymentProfile } from 'src/app/api/financials/financials.models';
import { PaymentPrograms } from 'src/app/api/shared/shared.enums';

import { createPaymentProfileForm } from '../../../utils/billing-payment-profile.form';

@Component({
  selector: 'app-add-payment-sheet',
  templateUrl: './add-payment-sheet.component.html',
  styleUrls: ['./add-payment-sheet.component.scss'],
})
export class AddPaymentSheetComponent implements OnInit {
  paymentForm: FormGroup;
  selectedPaymentProgram: PaymentPrograms = PaymentPrograms.creditCard;

  constructor(private _bottomSheetRef: MatBottomSheetRef) {}

  get creditCardForm(): FormGroup {
    return this.paymentForm.get('creditCard') as FormGroup;
  }

  get bankAccountForm(): FormGroup {
    return this.paymentForm.get('bankAccount') as FormGroup;
  }

  ngOnInit(): void {
    this.paymentForm = createPaymentProfileForm();
  }

  onCancel(): void {
    this._bottomSheetRef.dismiss();
  }

  onSave(): void {
    const creditCardValue = this.paymentForm.get('creditCard').value;
    const bankAccountValue = this.paymentForm.get('bankAccount').value;

    const value = {
      selectedPaymentProgram: this.selectedPaymentProgram,
    } as Partial<PaymentProfile>;
    if (this.selectedPaymentProgram === PaymentPrograms.creditCard) {
      value.creditCard = {
        ...creditCardValue,
        expirationNotice: creditCardValue.expirationNotice.toDate(),
      };
    }
    if (this.selectedPaymentProgram === PaymentPrograms.bankCreditCard) {
      value.bankAccount = bankAccountValue;
    }

    this._bottomSheetRef.dismiss(value);
  }
}

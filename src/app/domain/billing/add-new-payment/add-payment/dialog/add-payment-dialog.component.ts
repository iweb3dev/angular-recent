import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { PaymentProfile } from 'src/app/api/financials/financials.models';
import { PaymentPrograms } from 'src/app/api/shared/shared.enums';

import { createPaymentProfileForm } from '../../../utils/billing-payment-profile.form';

@Component({
  selector: 'app-add-payment-dialog',
  templateUrl: './add-payment-dialog.component.html',
  styleUrls: ['./add-payment-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPaymentDialogComponent implements OnInit {
  paymentForm: FormGroup;
  selectedPaymentProgram: PaymentPrograms = PaymentPrograms.creditCard;

  constructor(private _matDialogRef: MatDialogRef<AddPaymentDialogComponent>) {}

  get creditCardForm(): FormGroup {
    return this.paymentForm.get('creditCard') as FormGroup;
  }

  get bankAccountForm(): FormGroup {
    return this.paymentForm.get('bankAccount') as FormGroup;
  }

  ngOnInit(): void {
    this.paymentForm = createPaymentProfileForm();
  }

  onCloseDialog(): void {
    this._matDialogRef.close();
  }

  onPaymentSave(): void {
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

    this._matDialogRef.close(value);
  }
}

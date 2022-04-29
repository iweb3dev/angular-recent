import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentPrograms } from 'src/app/api/shared/shared.enums';
import { PayPalCaptureModel } from 'src/app/components/paypal/paypal.models';
import { createPaymentProfileForm } from 'src/app/domain/billing/utils/billing-payment-profile.form';

import {
  hasValue,
  nonValue,
} from 'src/app/shared/utils/verifications/value-check';
import {
  AddCreditsDialogConfigModel,
  AdditionalCreditsModel,
} from '../add-credits.models';

@Component({
  selector: 'app-add-credits-dialog',
  templateUrl: './add-credits-dialog.component.html',
  styleUrls: ['./add-credits-dialog.component.scss'],
})
export class AddCreditsDialogComponent implements OnInit {
  paymentForm: FormGroup;
  creditsControl = new FormControl({ displayValue: '', id: null });
  promoCodeControl = new FormControl(null);
  paymentControl = new FormControl(null);
  selectedPaymentProgram: PaymentPrograms = PaymentPrograms.creditCard;

  creditOptions$: Observable<AdditionalCreditsModel[]>;

  get creditCardForm(): FormGroup {
    return this.paymentForm.get('creditCard') as FormGroup;
  }

  get bankAccountForm(): FormGroup {
    return this.paymentForm.get('bankAccount') as FormGroup;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: AddCreditsDialogConfigModel,
    private _dialogRef: MatDialogRef<AddCreditsDialogComponent>,
  ) {}

  get actualPrice(): number {
    const { rewardBalance } = this.data;
    const price =
      this.creditsControl.value.cost - (rewardBalance.claimedMoneyBalance ?? 0);

    return price < 1 ? 0 : price;
  }

  get shouldDisabledSubmit(): boolean {
    const hasValidForm =
      this.paymentForm.get('bankAccount').valid ||
      this.paymentForm.get('creditCard').valid;

    return !this.data.paymentProfiles.length && !hasValidForm;
  }

  ngOnInit(): void {
    this.paymentControl.setValue(
      this.data.paymentProfiles.find((profile) => profile.isPrimary),
    );

    this.creditOptions$ = this.creditsControl.valueChanges.pipe(
      map((value) => (value?.displayValue ? value : { displayValue: value })),
      map(({ displayValue }) =>
        hasValue(displayValue)
          ? this.filterCredits(displayValue)
          : this.data.additionalCredits,
      ),
    );

    this.paymentForm = createPaymentProfileForm();
  }

  onCloseDialog(): void {
    this._dialogRef.close();
  }

  onPayPalTransactionComplete(event: PayPalCaptureModel): void {
    this._dialogRef.close({
      payPalData: event,
      promocode: this.promoCodeControl.value,
      additionalCredit: this.creditsControl.value,
      paymentData: {
        selectedPaymentProgram: this.selectedPaymentProgram,
      },
    });
  }

  onCreditsPurchase(): void {
    const creditCardForm = this.paymentForm.get('creditCard');
    const bankAccountForm = this.paymentForm.get('bankAccount');

    let value = {
      promocode: this.promoCodeControl.value,
      paymentData: null,
      additionalCredit: this.creditsControl.value,
      selectedPaymentProfile: this.paymentControl.value,
    };
    if (
      this.selectedPaymentProgram === PaymentPrograms.creditCard &&
      creditCardForm.valid
    ) {
      value = {
        ...value,
        paymentData: {
          selectedPaymentProgram: this.selectedPaymentProgram,
          creditCard: {
            ...creditCardForm.value,
            expirationNotice: creditCardForm.value.expirationNotice.toDate(),
          },
        },
      };
    }

    if (
      this.selectedPaymentProgram === PaymentPrograms.bankCreditCard &&
      bankAccountForm.valid
    ) {
      value = {
        ...value,
        paymentData: {
          selectedPaymentProgram: this.selectedPaymentProgram,
          bankAccount: bankAccountForm.value,
        },
      };
    }

    this._dialogRef.close(value);
  }

  getDisplayValue(option: AdditionalCreditsModel): string {
    return option?.displayValue ?? '';
  }

  private filterCredits(value: string): AdditionalCreditsModel[] {
    const filterValue = value.toLowerCase();

    return this.data.additionalCredits.filter((option) =>
      option.displayValue.toLowerCase().includes(filterValue),
    );
  }
}

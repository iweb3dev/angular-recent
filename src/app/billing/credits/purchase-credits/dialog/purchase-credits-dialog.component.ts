import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentPrograms } from 'src/app/api/shared/shared.enums';
import { PayPalCaptureModel } from 'src/app/components/paypal/paypal.models';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { createPaymentProfileForm } from 'src/app/domain/billing/utils/billing-payment-profile.form';
import { nonValue } from 'src/app/shared/utils/verifications/value-check';

import { CreditsPurchaseConfigModel } from '../../credits.models';

@Component({
  selector: 'app-purchase-credits-dialog',
  templateUrl: './purchase-credits-dialog.component.html',
  styleUrls: ['./purchase-credits-dialog.component.scss'],
})
export class PurchaseCreditsDialogComponent implements OnInit {
  userCredits$: Observable<number>;

  promoCodeControl = new FormControl(null);
  paymentControl = new FormControl(null);
  paymentForm: FormGroup;
  selectedPaymentProgram: PaymentPrograms = PaymentPrograms.creditCard;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: CreditsPurchaseConfigModel,
    private _userFacade: UserFacade,
    private _dialogRef: MatDialogRef<PurchaseCreditsDialogComponent>,
  ) {}


  get creditCardForm(): FormGroup {
    return this.paymentForm.get('creditCard') as FormGroup;
  }

  get bankAccountForm(): FormGroup {
    return this.paymentForm.get('bankAccount') as FormGroup;
  }

  get actualPrice(): number {
    const { credits, rewardBalance } = this.data;

    const price = credits.cost - (rewardBalance.claimedMoneyBalance ?? 0);

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
    this.userCredits$ = this._userFacade.currentUserInfo$.pipe(
      map((data) => data.userCredits),
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
      paymentData: {
        selectedPaymentProgram: this.selectedPaymentProgram,
      },
    });
  }

  addCredits(): void {
    const creditCardForm = this.paymentForm.get('creditCard');
    const bankAccountForm = this.paymentForm.get('bankAccount');

    let value = {
      promocode: this.promoCodeControl.value,
      paymentData: null,
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
}

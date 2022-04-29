import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountTypes } from 'src/app/shared/models/enums/financials';
import { AppValidators } from 'src/app/shared/utils/validators/validators';

export function createPaymentProfileForm() {
  return new FormGroup({
    creditCard: new FormGroup({
      creditCardNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(12),

        AppValidators.creditCardValidator(),
      ]),
      expirationNotice: new FormControl(null, [Validators.required]),
      cardCode: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d{3,4}$/),
      ]),
      emailAddress: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      address1: new FormControl(null, [Validators.required]),
      zip: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?!0{3})[0-9]{3,5}$/),
      ]),

      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
    }),
    bankAccount: new FormGroup({
      routingNumber: new FormControl(null, [Validators.required]),
      nameOnAccount: new FormControl(null, [Validators.required]),
      bankName: new FormControl(null, [Validators.required]),
      accountNumber: new FormControl(null, [Validators.required]),
      accountType: new FormControl(AccountTypes.Checking),
    }),
  });
}

export function createPaymentProfileUpdateForm() {
  return new FormGroup({
    creditCard: new FormGroup({
      creditCardNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(12),
        AppValidators.creditCardValidator(),
      ]),
      expirationNotice: new FormControl(null, [Validators.required]),
      cardCode: new FormControl(null, [Validators.pattern(/^\d{3,4}$/)]),
      emailAddress: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      address1: new FormControl(null, [Validators.required]),
      zip: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?!0{3})[0-9]{3,5}$/),
      ]),

      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
    }),
    bankAccount: new FormGroup({
      routingNumber: new FormControl(null, [Validators.required]),
      nameOnAccount: new FormControl(null, [Validators.required]),
      bankName: new FormControl(null, [Validators.required]),
      accountNumber: new FormControl(null, [Validators.required]),
      accountType: new FormControl(AccountTypes.Checking),
    }),
  });
}

export function createCreditCardPaymentForm() {
  return new FormGroup({
    creditCardNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(12),

      AppValidators.creditCardValidator(),
    ]),
    expirationNotice: new FormControl(null, [Validators.required]),
    cardCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\d{3,4}$/),
    ]),
    emailAddress: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    address1: new FormControl(null, [Validators.required]),
    zip: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?!0{3})[0-9]{3,5}$/),
    ]),

    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
  });
}

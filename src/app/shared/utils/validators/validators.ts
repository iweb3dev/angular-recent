import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const cardValidate = (cardNumber: string): boolean => {
  if (!cardNumber?.length) {
    return;
  }

  cardNumber = cardNumber.replace(/\s/g, '');

  const lastDigit = Number(cardNumber[cardNumber.length - 1]);

  const reverseCardNumber = cardNumber
    .slice(0, cardNumber.length - 1)
    .split('')
    .reverse()
    .map((x) => Number(x));

  let sum = 0;

  for (let i = 0; i <= reverseCardNumber.length - 1; i += 2) {
    reverseCardNumber[i] = reverseCardNumber[i] * 2;
    if (reverseCardNumber[i] > 9) {
      reverseCardNumber[i] = reverseCardNumber[i] - 9;
    }
  }

  sum = reverseCardNumber.reduce((acc, currValue) => acc + currValue, 0);

  return (sum + lastDigit) % 10 === 0;
};

export class AppValidators {
  static requiredIf(predicate: () => boolean): ValidatorFn {
    return (control: FormControl) => {
      return predicate() ? Validators.required(control) : null;
    };
  }

  static creditCardValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const isValid = cardValidate(control.value);
      return isValid ? null : { cardValidate: isValid };
    };
  }
}

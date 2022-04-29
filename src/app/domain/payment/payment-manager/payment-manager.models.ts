import {
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from 'src/app/api/financials/financials.models';
import { CPCPromoCode } from 'src/app/api/packages/packages.models';

export interface PaymentUpdateBankDetailsModel {
  promoCode?: CPCPromoCode;
  bankAccount: PaymentProfileBankAccount;
  creditCard: CreditCardPaymentType;
}

export interface CreditCardPaymentType
  extends Omit<PaymentProfileCreditCard, 'expirationNotice'> {
  expirationNotice: moment.Moment;
}

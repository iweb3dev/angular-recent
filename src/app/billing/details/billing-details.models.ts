import {
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from 'src/app/api/financials/financials.models';

export interface BillingStateModel {
  paymentProfiles: BillingPaymentProfile[];
  loadingProfiles: boolean;
  historySearchValue: string;
}

export type BillingPaymentProfile = PaymentProfileCreditCard &
  PaymentProfileBankAccount;

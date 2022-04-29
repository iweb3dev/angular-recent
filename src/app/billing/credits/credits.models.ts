import {
  BasePaymentProfile,
  PaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
  PromoCode,
} from 'src/app/api/financials/financials.models';
import { AdditionalCredit } from 'src/app/api/lookups/lookups.models';
import { RewardsUser } from 'src/app/api/rewards/rewards.models';
import { PayPalCaptureModel } from 'src/app/components/paypal/paypal.models';

export interface CreditsPurchaseConfigModel {
  credits: AdditionalCredit;
  paymentProfiles: (PaymentProfileBankAccount & PaymentProfileCreditCard)[];
  rewardBalance: RewardsUser;
}

export interface CreditsPurchaseDialogData {
  promocode: PromoCode;
  paymentData: Partial<PaymentProfile>;
  payPalData?: PayPalCaptureModel;
  selectedPaymentProfile: BasePaymentProfile;
}

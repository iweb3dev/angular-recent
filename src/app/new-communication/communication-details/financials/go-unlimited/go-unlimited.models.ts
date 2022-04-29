import {
  BasePaymentProfile,
  PaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
  PromoCode,
} from 'src/app/api/financials/financials.models';
import { PackageFeatures } from 'src/app/api/packages/packages.models';

export interface GoUnlimitedDialogModel {
  paymentProfiles: (PaymentProfileBankAccount & PaymentProfileCreditCard)[];
  upgradePackages: PackageFeatures[];
}

export interface GoUnlimitedDialogDataModel {
  promocode: PromoCode;
  paymentData: Partial<PaymentProfile>;
  contract: PackageFeatures;
  selectedPaymentProfile: BasePaymentProfile;
}

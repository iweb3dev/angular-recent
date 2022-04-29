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
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { PaymentUpdateBankDetailsModel } from 'src/app/domain/payment/payment-manager/payment-manager.models';

export interface CreditsUpgradeModel extends PaymentUpdateBankDetailsModel {
  additionalCreditsID: number;
}

export interface AddCreditsDialogConfigModel {
  userInfo: MainUserInfoModel;
  paymentProfiles: (PaymentProfileBankAccount & PaymentProfileCreditCard)[];
  rewardBalance: RewardsUser;
  additionalCredits: AdditionalCreditsModel[];
}

export type AdditionalCreditsModel = AdditionalCredit & {
  displayValue: string;
};

export interface PurchaseCreditsDialogData {
  promocode: PromoCode;
  paymentData: Partial<PaymentProfile>;
  additionalCredit: AdditionalCreditsModel;
  payPalData?: PayPalCaptureModel;
  selectedPaymentProfile: BasePaymentProfile;
}

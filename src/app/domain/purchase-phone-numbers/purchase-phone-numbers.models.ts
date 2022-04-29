import {
  BasePaymentProfile,
  PaymentProfile,
} from 'src/app/api/financials/financials.models';
import { PaymentUpdateBankDetailsModel } from 'src/app/domain/payment/payment-manager/payment-manager.models';

export interface CustomPhoneListDataModel {
  friendlyName: string;
  phoneNumber: string;
}

export interface PhonePurchaseDataModel extends PaymentUpdateBankDetailsModel {
  phoneNumber: string;
  prepayOptionId: number;
  paymentData: Partial<PaymentProfile>;
  selectedPaymentProfile: BasePaymentProfile;
}

import { BasePurchase } from '../packages/packages.models';
import {
  PaymentPrograms,
  BankAccountTypes,
  CardTypes,
  PaymentTypes,
} from '../shared/shared.enums';

import { CAPIBase } from '../shared/shared.models';

export interface FinancialProfileDtoModel {
  addressLine1: string;
  addressLine2: string;
  cardCode: string;
  cardNumber: string;
  cardType: 4; // TODO
  ccEmailAddress: string;
  city: string;
  country: string;
  creditCardNumber: string;
  customerProfileID: string;
  emailAddress: string;
  expirationMonth: number;
  expirationNotice: string;
  expirationYear: number;
  firstName: string;
  flaggedForDelete: boolean;
  id: number;
  isPrimary: boolean;
  lastName: string;
  ownerID: number;
  paymentProfileID: number;
  paymentType: number; // TODO
  phoneNumber: number;
  state: string;
  zip: number;
}

export interface BasePaymentProfile extends CAPIBase {
  paymentType: PaymentTypes;
  ownerID: number;
  customerProfileID: number;
  paymentProfileID: number;
  isPrimary: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  emailAddress: string;
  ccEmailAddress: string;
  expirationNotice?: Date;
}

export interface PaymentProfileBankAccount extends BasePaymentProfile {
  routingNumber: string;
  accountNumber: string;
  bankName: string;
  maskedRoutingNumber: string;
  nameOnAccount: string;
  accountType: BankAccountTypes;
}

export interface PaymentProfileCreditCard extends BasePaymentProfile {
  paymentType: PaymentTypes;
  creditCardNumber: string;
  expirationNotice: Date;
  cardType: CardTypes;
  cardNumber: string;
  expirationMonth: number;
  expirationYear: number;
  cardCode: string;
  isExpiring: boolean;
}

export interface PaymentProfilePayPal extends BasePaymentProfile {
  paymentType: PaymentTypes;
}

export interface PaymentProfile {
  selectedPaymentProgram: PaymentPrograms;
  bankAccount: Partial<PaymentProfileBankAccount>;
  creditCard: Partial<PaymentProfileCreditCard>;
  payPal: PaymentProfilePayPal;
}

export interface PromoCode extends CAPIBase {
  code: string;
  codeType: number;
  codeDescription: string;
  startDate: Date;
  endDate: Date;
  isOneTimeUse: boolean;
  allowedUserId: number;
  discount: number;
  referralCodeId: number;
}

export interface RestrictedPromoCode extends PromoCode {
  restrictedPackages: string[];
}

export interface PurchasePhoneNumber extends BasePurchase {
  phoneNumber: string;
  phoneNumberVendorId: number;
  prePayOptionId: number;
  twilioPhoneNumberPathId: string;
  autoBill: boolean;
  phoneNumberCost: number;
}

export interface PromoCodeValidateModel {
  allowedUserID: number;
  code: string;
  codeDescription: string;
  codeType: PromoCodeTypes;
  discount: number;
  endDate: Date;
  flaggedForDelete: boolean;
  id: number;
  isOneTimeUse: boolean;
  referralCodeID: number;
  startDate: Date;
}

export enum PromoCodeTypes {
  Credits = '2',
  Monthly = '1',
}

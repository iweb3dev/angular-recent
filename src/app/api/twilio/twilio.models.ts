import { PrepayOptions } from 'src/app/shared/models/phone-number/phone-number.enumts';

export interface TwilioResponseDto {
  address_requirements: 'none'; // TODO: find out enum
  beta: boolean;
  capabilities: TwilioCapabilities;
  friendly_name: string;
  iso_country: string;
  lata: null; // TODO: find out
  latitude: null; // TODO: find out
  locality: null; // TODO: find out
  longitude: null; // TODO: find out
  phone_number: string;
  postal_code: null; // TODO: find out
  rate_center: null;
  region: null; // TODO: find out
}

export interface TwilioCapabilities {
  mms: boolean;
  sms: boolean;
  voice: boolean;
  fax: boolean;
}

export interface TwilioResponseModel {
  addressRequirements: 'none'; // TODO: find out enum
  beta: boolean;
  capabilities: TwilioCapabilities;
  friendlyName: string;
  isoCountry: string;
  lata: null; // TODO: find out
  latitude: null; // TODO: find out
  locality: null; // TODO: find out
  longitude: null; // TODO: find out
  phoneNumber: string;
  postalCode: null; // TODO: find out
  rateCenter: null;
  region: null; // TODO: find out
}

export interface PrepayOptionsDtoModel {
  discount: number;
  displayOrder: number;
  id: number;
  months: number;
  prepayOption: PrepayOptions;
}

export interface TollFreeNumberPurchaseDtoModel {
  amountPaid: number;
  approvalCode: string;
  description: string;
  invoiceNumber: string;
  lineItems: any[];
  orderID: number;
  paymentStatus: number;
  postingDateTime: string;
  processDateTime: string;
  profileIDUsed: number;
  promoCode: string;
  subscriptionID: number;
  transactionNumber: string;
  userID: number;
  wasDeclined: boolean;
}

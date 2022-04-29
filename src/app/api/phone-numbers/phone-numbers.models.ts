export interface PhoneNumbers {
  blackListedPhoneNumber: boolean;
  callForwardPhoneNumber: string;
  callOrder: number;
  countryCode: number;
  flaggedForDeletion: boolean;
  id: number;
  isActive: boolean;
  isDirty: boolean;
  isEditable: boolean;
  isPrimary: boolean;
  isValidated: boolean;
  memberID: number;
  phoneNumber: string;
  phoneNumberLocation: number;
  phoneNumberStatus: number;
  phoneNumberType: number;
  productID: number;
  shortCodeSMSStatus: number;
  timeZone: number;
  tollFreeSMSStatus: number;
  utcOffset: string;
  validationErrors: Array<any>;
  verificationType: number;
}

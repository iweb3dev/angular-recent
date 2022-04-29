import { Guid } from 'guid-typescript';
import {
  GivingFrequency, MediaType, ReceiverAccountTypes,
  PhoneNumberLocations, EmailAddressLocations, AddressLocations,
  AddressStatuses, PhoneNumberStatuses, PhoneNumberTypes, SMSStatuses, EmailAddressStatuses
} from './shared.enums';

export interface DTOException {
  exceptionID: number;
  exceptionMessage: string;
  staceTrace: string;
}

export interface SMSTranslateMe {
  dstLanguageCode: string;
  smsMessage: string;
}

export interface SuccessResult {
  id: number;
  success: boolean;
}

export interface GPBase {
  id: number;
  productID: number;
  isDirty: boolean;
  validationErrors: string[];
}

export interface TimeZone {
  id: number;
  timeZoneID: string;
  displayName: string;
  supportsDayLightSavingTime: boolean;
  isAvailable: boolean;
  utcOffSet: string;
  utcOffSetAsTimeSpan: string;
  timeZoneAbbreviation: string;
}

export interface SuccessResultDetail {
  passedInID: number;
  returnedID: number;
  exceptionDetails: string;
  validationErrorDetails: string;
  success: boolean;
  hasExceptions: boolean;
  hasValidationErrors: boolean;
}

export interface PagedList<T> {
  totalRecords: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  pagedObjects: T[];
}

export interface CAPIBase {
  id: number;
  flaggedForDelete: boolean;
}

export interface DateAndTimeSettings {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface PaymentProgramPayment {
  paymentProgramPaymentId: number;
  paymentProgramID: number;
  userId: number;
  transactionId: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  manualPayment: boolean;
  cvv: string;
  profileId: string;
  givingFrequency: GivingFrequency;
  recurranceRule: string;
  amount: number;
  notes: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  creditCardNumber: string;
  expMonth: number;
  expYear: number;
  financialAccountId: number;
  callingPostIdentifier: Guid;
  groupId: number;
}

export interface FinancialAccount {
  financialAccountID: number;
  userId: number;
  userName: string;
  password: string;
  description: string;
  name: string;
  other: string;
  isActive: boolean;
  receiverAccountType: ReceiverAccountTypes;
  payPalEmailAddress: string;
  isBusinessProAccount: boolean;
}

export interface BaseSignMeUpMember {
  id: number;
  phonenumber: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  timeZone: TimeZone;
}

export interface SignMeUpMember extends BaseSignMeUpMember {
  groupId: number;
}

export interface DtoResponse<T> {
  validationErrors: string[];
  exceptions: DTOException[];
  requestID: Guid;
  userId: number;
  hasExceptions: boolean;
  hasValidationErrors: boolean;
  wasSuccessful: boolean;
  returnValue: T;
}

export interface Picture {
  imageID: number;
  tempImage: number[];
  attachmentFilePath: string;
  fileName: string;
  imageContents: string;
  pictureType: number;
}

export interface Announcement {
  id: number;
  title: string;
  news: string;
  postDate?: Date;
  displayOrder: number;
}

export interface Contact {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface VideoLink {
  id: number;
  name: string;
  link: string;
}

export interface Media {
  uploadedMediaPathAndFilename: string;
  fileKeyName: string;
  userId: number;
  groupId: number;
  type: MediaType;
  caption: string;
  dispplayOrder: number;
  lastModified: Date;
  size: number;
  bucketName: string;
}

export interface WebsiteMedia {
  id: number;
  groupId: number;
  mediaTypeId: number;
  useAws: boolean;
  url: string;
  caption: string;
  displayOrder: number;
  length?: number;
  fileName: string;
  displayDate: Date;
  insertedByUserId: number;
  modifiedByUserID: number;
  websitePicture: Picture;
}

export interface AddressDetail extends GPBase {
  memberID: number;
  addressLine1: string;
  addressLine2: string;
  addressLocation: AddressLocations;
  addressStatus: AddressStatuses;
  city: string;
  state: string;
  zip: string;
  country: string;
  latitude: number;
  longitude: number;
  flaggedForDeletion: boolean;
  isActive: boolean;
  isPrimary: boolean;
  isMappingPostConfirmedAddress: boolean;
}

export interface PhoneNumberDetail extends GPBase {
  countryCode: number;
  isEditable: boolean;
  phoneNumber: string;
  callOrder: number;
  timeZone: number;
  utcOffset: string;
  phoneNumberLocation: PhoneNumberLocations;
  phoneNumberStatus: PhoneNumberStatuses;
  phoneNumberType: PhoneNumberTypes;
  flaggedForDeletion: boolean;
  isActive: boolean;
  isPrimary: boolean;
  memberID: number;
  shortCodeSMSStatus: SMSStatuses;
  tollFreeSMSStatus: SMSStatuses;
  isValidated: boolean;
  blackListedPhoneNumber: boolean;
  verificationType: number;
  callForwardPhoneNumber: string;
}

export interface EmailAddressDetail extends GPBase {
  isValidated: boolean;
  isEditable: boolean;
  emailAddressIsBlackListed?: boolean;
  email: string;
  emailLocation: EmailAddressLocations;
  emailStatus: EmailAddressStatuses;
  flaggedForDeletion: boolean;
  isActive: boolean;
  isPrimary: boolean;
  memberID: number;
}

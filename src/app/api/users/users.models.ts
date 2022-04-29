import { DateAndTimeSettings, TimeZone } from '../shared/shared.models';

import {
  UserSystemSettingCategories,
  EmailAddressLocations,
  EmailAddressStatuses,
  CommunicationStatsTimePeriod,
  PackageTypeIds,
} from '../shared/shared.enums';

export interface AllUserMemberCount {
  // TODO: TBD
  item1: number;
  item2: number;
  item3: number;
}

export interface EmailAddressDetail {
  isValidated: boolean;
  isEditable: boolean;
  emailAddressIsBlackListed?: boolean;
  email: string;
  emailLocation: EmailAddressLocations;
  emailStatus: EmailAddressStatuses;
  elaggedForDeletion: boolean;
  esActive: boolean;
  esPrimary: boolean;
  eemberID: number;
  id: number;
  productID: number;
  isDirty: boolean;
  validationErrors: string[];
}

export interface Address {
  memberID: number;
  addressLine1: string;
  addressLine2: string;
  addressLocation: number;
  addressStatus: number;
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
  id: number;
  productID: number;
  isDirty: boolean;
  validationErrors: any[]; // TODO: get valid model
}

export interface PhoneNumber {
  countryCode: number;
  isEditable: boolean;
  phoneNumber: string;
  callOrder: number;
  timeZone: number;
  utcOffset: string;
  phoneNumberLocation: number;
  phoneNumberStatus: number;
  phoneNumberType: number;
  flaggedForDeletion: boolean;
  isActive: boolean;
  isPrimary: boolean;
  memberID: number;
  shortCodeSMSStatus: number;
  tollFreeSMSStatus: number;
  isValidated: boolean;
  blackListedPhoneNumber: boolean;
  verificationType: number;
  callForwardPhoneNumber?: any;
  id: number;
  productID: number;
  isDirty: boolean;
  validationErrors: any[];
}

export interface EmailAddress {
  isValidated: boolean;
  isEditable: boolean;
  emailAddressIsBlackListed: boolean;
  email: string;
  emailLocation: number;
  emailStatus: number;
  flaggedForDeletion: boolean;
  isActive: boolean;
  isPrimary: boolean;
  memberID: number;
  id: number;
  productID: number;
  isDirty: boolean;
  validationErrors: any[];
}

export interface CallerId {
  callerID: string;
  phoneDisplayName: string;
}

export interface LaT {
  callerID: string;
  phoneDisplayName: string;
}

export interface BoughtPhoneNumber {
  countryCode: number;
  isEditable: boolean;
  phoneNumber: string;
  callOrder: number;
  timeZone: number;
  utcOffset: string;
  phoneNumberLocation: number;
  phoneNumberStatus: number;
  phoneNumberType: number;
  flaggedForDeletion: boolean;
  isActive: boolean;
  isPrimary: boolean;
  memberID: number;
  shortCodeSMSStatus: number;
  tollFreeSMSStatus: number;
  isValidated: boolean;
  blackListedPhoneNumber: boolean;
  verificationType: number;
  callForwardPhoneNumber?: any;
  id: number;
  productID: number;
  isDirty: boolean;
  validationErrors: any[];
}

export interface Package {
  version: number;
  displayOrder: number;
  cost: number;
  monthlyCredits: number;
  additionalCreditDiscount: number;
  packageName: string;
  packageDescription: string;
  voiceMessage: boolean;
  emailMessage: boolean;
  smsMessage: boolean;
  callerID: boolean;
  afterHourMessaging: boolean;
  publicGroupPageLimit: number;
  eventTools: boolean;
  payPalIntegration: boolean;
  volunteerTools: boolean;
  mapping: boolean;
  demographicTools: boolean;
  pbx: boolean;
  groupLimit: number;
  membersPerGroupLimit: number;
  mappingReports: number;
  voiceMessageLength: number;
  multiLanguageMessages: boolean;
  twoWayTextSurveys: boolean;
  emailMessagingLimit: number;
  additionalMessageCost: number;
  eventVolunteer: boolean;
  sharedGroupAccess: boolean;
  dataStorage?: any;
  keywords: number;
  smsLength: number;
  ttsLength: number;
  memberCount: number;
  rewardProgramAccess: boolean;
  keywordTrial: number;
  emailTemplates: boolean;
  rewardProgramMultiplier: number;
  reminders: boolean;
  trailer: string;
  straightToVoicemail: boolean;
  twentyFourSevenMessaging: boolean;
  liveAnswerTransfer: boolean;
  sendRecordingAsTextEmail: boolean;
  maxRecordingLength: number;
  afterHourMessagingCost: number;
  twentyFourSevenMessagingCost: number;
  reducedTrailer: boolean;
  reducedTrailerCost: number;
  noTrailer: boolean;
  noTrailerCost: number;
  liveAnswerTransferCost: number;
  straightToVoicemailCost: number;
  additionalKeywordCost: number;
  packageTypeId: PackageTypeIds;
  costType: string;
  emailCPBranding: boolean;
  emailMergeTags: boolean;
  wallMapDisplay: number;
  tollFreePhoneNumberCost: number;
  callForwardMinutes: number;
  id: number;
  flaggedForDelete: boolean;
}

export interface UsersSubscription {
  id: number;
  userID: number;
  packageID: number;
  packageType: number;
  cycleDate: Date;
  packageStartDate: Date;
  packageEndDate: Date;
  packagePrice: number;
  packageMonthlyCredits: number;
  packageAdditionalCreditDiscount: number;
  appliedDiscount: number;
  isSuspendedOnNextChargeDate: boolean;
  isSuspended: boolean;
  transactionNumber: string;
  promoCodeID: number;
  statusCode: number;
  downgradeOnNextChargeDate: boolean;
  downgradePackageID: number;
  trialStatusCode: number;
  trialEmailStatusCode: number;
  receivedHalfOff: number;
}

export interface UserModelDto {
  totalNotificationsCount: number;
  userMemberPhoneCount: number;
  allUserMemberCounts: AllUserMemberCount[];
  displayAdditionalInfoToUser: boolean;
  displayName: string;
  communicationPreference: number;
  userCredits: number;
  organization: string;
  organizationTypesValue: number;
  organizationSubTypesValue: number;
  accountRepresentativeName?: any; // TODO: get model
  accountRepresentativeEmail?: any; // TODO: get model
  accountRepresentativePhoneNumber?: any; // TODO: get model
  username: string;
  telUserName: string;
  telPassword?: any;
  password: string;
  userType: number;
  pin: number;
  timeZone: TimeZone;
  settings: any[];
  isLocked: boolean;
  insertedDateTime: Date;
  groupCreated: boolean;
  memberCreated: boolean;
  messageCreated: boolean;
  communicationSent: boolean;
  purchaseMade: boolean;
  pbxCreated: boolean;
  eventCreated: boolean;
  websiteCreated: boolean;
  isAccountActivated: boolean;
  customerProfileID: number;
  addresses: Address[];
  phoneNumbers: PhoneNumber[];
  emailAddresses: EmailAddress[];
  paymentProfiles: any[];
  groupsUserLeads: any[];
  groupsManagerUserManages: any[];
  userGroupRoles: any[];
  isAccountAdmin: boolean;
  isAccountBeingManaged: boolean;
  accountManagerName?: any; // TODO: get valid value
  accountManagerUserId: number;
  accountsManaged: AccountsManaged[];
  callerIds: CallerId[];
  laTs: LaT[];
  boughtPhoneNumbers: BoughtPhoneNumber[];
  hasValidatedPhoneNumber: boolean;
  isSingleSignOn: boolean;
  package: Package;
  usersSubscription: UsersSubscription;
  isTmpPassword: boolean;
  userPicture?: any;
  pictureID: number;
  lastLoginDateTime: Date;
  lastPurchaseDateTime: Date;
  lastCommunicationDateTime: Date;
  lastPurchaseOrderType: string;
  accountType: number;
  canAddGroup: number;
  canAddVoiceMessage: number;
  canAddEmailMessage: number;
  canAddSMSMessage: number;
  canAddCallerID: number; // TODO: TBD
  canUserAfterHourMessaging: number;
  canAddPublicGroupPage: number;
  publicGroupPageEnabled: number;
  canUseEventTools: number;
  canUsePayPal: number;
  canUseVolunteerTools: number;
  canUseMapping: number;
  canUseDemographicTools: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  temporarilyRemoved: boolean;
  memberStatus: number;
  isUser: boolean;
  additionalFieldValues?: any; // TODO: get valid model
  isPrimaryPhoneValidated: boolean;
  id: number;
  productID: number;
  isDirty: boolean;
  validationErrors: any[];
}

export type UserModel = UserModelDto;

export interface AdditionalOrgInfo {
  additionalOrgInfo: string;
}

export interface GetUserByUserName {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  productID: number;
  pin: number;
  isActive: boolean;
  isUser: boolean;
}

export interface UserSurvey {
  howDidYouHearId: number;
  howDidYouHearString: string;
  userId: number;
}

export interface RequestUpdateUserProfile {
  userID: number;
  firstName: string;
  lastName: string;
  timeZoneId: number;
  organization: string;
  organizationTypesValue: number;
  organizationSubTypesValue: number;
  pictureID: number;
  telUserName: string;
}

export interface ResponseUpdateUserProfile {
  passedInID: number;
  returnedID: number;
  exceptionDetails: string;
  validationErrorDetails: string;
  success: boolean;
  hasExceptions: boolean;
  hasValidationErrors: boolean;
}

export interface RequestGetUserNameByEmailAddress {
  emailAddress: string;
}

export interface BaseUserSystemSettings {
  name: string;
  description: string;
  settingValue: string;
  isUserEditable: boolean;
  acceptedDataTypesID: number;
}

export interface ResponseUserSystemSettings extends BaseUserSystemSettings {
  id: number;
  settingID: number;
  userID: number;
  category: UserSystemSettingCategories;
  displayPriorityOrder: number;
}

export interface RequestChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RequestResetPassword {
  productAPIKey: string;
  userName: string;
}

export interface RequestTrialStatusCodeId {
  trialStatusCodeId: number;
}

export interface RequestReferralInfo {
  name: string;
  email: string;
}

export interface RequestVerifyAccount {
  productAPIKey: string;
  pin: number;
  login: string;
  productId: number;
  userId: number;
}

export interface RequestSystemEmail {
  toAddress: string;
  fromAddress: string;
  replyToAddress: string;
  subject: string;
  body: string;
  GroupID: number;
  NotificationID: number;
  EmailType?: number;
}

export interface SubAccountUser {
  id: number;
  requestEmailAddress: string;
  requestID: string;
  requestStatusCode: number;
  allowAccessToAllGroups: boolean;
  creditLimit?: number;
  mFA_UsersID: number;
  modifiedByDateTime: Date;
  modifiedByUserID: number;
}

export interface UserGroupRole {
  memberID: number;
  userID: number;
  groupID: number;
  roleID: number;
  displayName: string;
  webUserName: string;
  subAccountUserID: number;
  groupName: string;
  isEditable: boolean;
  flaggedForDeletion: boolean;
  id: number;
  productID: number;
  isDirty: boolean;
  validationErrors: string[];
}

export interface RequestSubAccountUserUserGroupRoles {
  userGroupRoles: UserGroupRole[];
}

export interface ResponseCallForward {
  phoneNumberID: number;
  phoneNumberToForwardTo: string;
  maxMinutesAllowed: number;
  userId: number;
}

export interface ResponseUserProfileDateTime {
  timeZone: TimeZone;
  dateAndTimeSetting: DateAndTimeSettings;
}

export interface ResponseCommunicationsSentStats {
  phoneMessagesSent: number;
  textMessagesSent: number;
  emailMessagesSent: number;
  totalMessagesSent: number;
  statsTimePeriod: CommunicationStatsTimePeriod;
  displayPeriod: string;
}

export interface ResponseAccountQuickViewStats {
  memberCreationDateTime: Date;
  groupCount: number;
  totalMembers: number;
  communicationsSentStats: ResponseCommunicationsSentStats[];
}

export interface ResponseAccountUserManage {
  ownerID: number;
  webUserName: string;
  organizationName: string;
  firstName: string;
  lastName: string;
  primaryEmailAddressID: number;
  primaryPhoneNumberID: number;
  emailAddress: string;
  phoneNumber: string;
}

export interface ResponseUsersIManage {
  id: number;
  allowAccessToAllGroups: boolean;
  creditLimit?: number;
  webUserName: string;
  firstname: string;
  lastName: string;
  roleName: string;
  subAccountUserID?: number;
}

export interface ResponseUsersIManageGroupDisplay {
  id: number;
  allowAccessToAllGroups: boolean;
  creditLimit?: number;
  webUserName: string;
  groups: UserGroupRole[];
  firstname: string;
  lastName: string;
  roleName: string;
  subAccountUserID?: number;
}

export enum VendorVerificationStatuses {
  success = 'Your phone verification has been sent to your phone.',
  failure = 'Too many requests. Please wait to try again.',
}

export interface ResponseSuccessResult {
  id: number;
  success: boolean;
}

export interface RequestUserSettingsValueSave {
  id: number;
  settingsID: number;
  settingValue: string;
}

export interface AccountsManaged {
  emailAddress: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  ownerID: number;
  phoneNumber: string;
  primaryEmailAddressID: number;
  primaryPhoneNumberID: number;
  webUserName: string;
}

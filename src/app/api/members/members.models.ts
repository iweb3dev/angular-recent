import { Guid } from 'guid-typescript';
import {
  IsActiveStatuses, GroupMemberStatuses, SMSStatuses, AddressLocations, AddressStatuses,
  PhoneNumberTypes, PhoneNumberLocations, PhoneNumberStatuses,
  EmailAddressStatuses, EmailAddressLocations, AddNewMemberResults, ImportMessageType,
  MemberProfileSaveTypes, SaveMemberEndpointResults
} from '../shared/shared.enums';

import {
  GPBase, SuccessResultDetail, TimeZone, Picture,
  AddressDetail, PhoneNumberDetail, EmailAddressDetail
} from '../shared/shared.models';

export interface GroupMemberDisplay {
  memberPicture: Picture;
  rowNumber: number;
  userMemberIDAdditionalName: string;
  groupStaticMemberID: number;
  id: number;
  groupID: number;
  firstName: string;
  lastName: string;
  memberOwnerID: number;
  isUser: boolean;
  isActive: IsActiveStatuses;
  memberStatus: GroupMemberStatuses;
  pendingName: string;
  phoneNumber: string;
  blackListedPhoneNumber: boolean;
  blackListedEmailAddress: boolean;
  phoneNumberEndPointID: number;
  shortCodeSMSStatus: SMSStatuses;
  tollFreeSMSStatus: SMSStatuses;
  activePhoneNumbers: number;
  activeEmailAddresses: number;
  activeAddresses: number;
  hasActiveEmailAddresses: boolean;
  hasActiveAddresses: boolean;
  hasActivePhoneNumbers: boolean;
  groups: string[];
  pictureID: number;
  emailAddress: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

export interface GroupMembersDisplay {
  groupID: number;
  groupName: string;
  totalRecords: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  members: GroupMemberDisplay[];
  totalGroupMembers: number;
  totalActivePhoneNumbers: number;
  totalActiveEmailAddresses: number;
  totalActiveAddresses: number;
}



export interface MemberStaticGroup extends GPBase {
  groupsStaticMemberID: number;
  userMembersID: number;
  groupName: string;
  groupID: number;
  groupOwnerID: number;
  isActive: boolean;
}

export interface BaseUserMember {
  id: number;
  displayName: string;
  firstName: string;
  lastName: string;
  pin: number;
  additionalFieldValues: AdditionalFieldValue[];
}

export interface UserMember extends BaseUserMember {
  displayName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  temporarilyRemoved: boolean;
  memberStatus: GroupMemberStatuses;
  isUser: boolean;
  pin: number;
  additionalFieldValues: AdditionalFieldValue[];
  isPrimaryPhoneValidated: boolean;
}

export interface Member extends UserMember {
  ownerID: number;
  groupStaticMemberID: number;
  groupID: number;
  phoneNumber: string;
  activePhoneNumbers: number;
  activeEmailAddresses: number;
  activeAddresses: number;
  addresses: AddressDetail[];
  phoneNumbers: PhoneNumberDetail[];
  emailAddresses: EmailAddressDetail[];
  memberStaticGroups: MemberStaticGroup[];
  memberPicture: Picture;
  pictureID: number;
}

export interface MFABMember {
  modifiedByUserID?: number;
  modifiedByDatetime?: Date;
  firstName: string;
  lastName: string;
  pin: number;
  userTypeValue: number;
  timeZone: TimeZone;
  isUser: boolean;
  pictureID: number;
}

export interface PhoneNumber {
  countryCode: number;
  phoneNumber: string;
  callOrder: number;
  timeZone: number;
  utcOffset: string;
  phoneNumberLocation: PhoneNumberLocations;
  phoneNumberType: PhoneNumberTypes;
  postMessageDigits: number;
  preMessageDigits: number;
  isActive: boolean;

}

export interface SaveMemberPhoneNumber extends PhoneNumber {
  id: number;
  delete: boolean;
  userMemberID: number;
  phoneNumberStatus: PhoneNumberStatuses;
}

export interface EmailAddress {
  emailAddress: string;
  emailAddressLocation: EmailAddressLocations;
  isActive: boolean;
}

export interface SaveMemberEmailAddress extends EmailAddress {
  id: number;
  delete: boolean;
  userMemberID: number;
  emailAddressStatus: EmailAddressStatuses;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  zip: string;
  addressLocation: AddressLocations;
  isActive: boolean;
}

export interface SaveMemberAddress extends Address {
  id: number;
  delete: boolean;
  userMembersID: number;
  addressStatus: AddressStatuses;
}

export interface ComparisonOperator {
  id: number;
  operator: string;
}

export interface AcceptedValue {
  id: number;
  value: string;
}

export interface AcceptedDataType {
  id: number;
  displayName: string;
  dataType: string;
  comparisonOperators: ComparisonOperator[];
  acceptedValues: AcceptedValue[];
}

export interface AdditionalField {
  fieldID: number;
  fieldName: string;
  fieldDefaultValue: string;
  canBeModifiedByMember: boolean;
  canBeViewedByMember: boolean;
  acceptedDataType: AcceptedDataType;
  ownerID: number;
  flaggedForDelete: boolean;
}

export interface AdditionalFieldValue extends AdditionalField {
  fieldValueID: number;
  fieldValue: number;
  memberID: number;
  groupID: number;
}

export interface MemberInsertComplete extends BaseUserMember {
  isQuickAdd: boolean;
  phoneNumbers: SaveMemberPhoneNumber[];
  emailAddresses: SaveMemberEmailAddress[];
  addresses: SaveMemberAddress[];
  additionalFieldValues: AdditionalFieldValue[];
  groupID: number;
}

export interface ImportResultsDetail {
  importResultsID: number;
  messageType: ImportMessageType;
  message: string;
  value: string;
  groupStaticMemberID: number;
}

export interface ResponseMemberInsertComplete {
  memberID: number;
  memberFirstName: string;
  memberLastName: string;
  addNewMemberResult: AddNewMemberResults;
  requiresApproval: boolean;
  importResultsDetail: ImportResultsDetail[];
  requiresApprovalForQuickAdd: boolean;
}

export interface ResponseSignMeUpMember {
  memberId: number;
  id: number;
  addNewMemberResult: AddNewMemberResults;
  requiresApproval: boolean;
}

export interface SaveMemberEndpointDetail extends SuccessResultDetail {
  memberId: number;
  profileSaveType: MemberProfileSaveTypes;
  address: string;
  result: SaveMemberEndpointResults;
}

export interface OptinRequest {
  phoneNumber: string;
  memberId: number;
  groupId: number;
}

export interface RequestBase {
  pageSize: number;
  pageNumber: number;
}

export interface RequestFilterValues {
  id: string;
  filterOrder: number;
  selectedAndOr: number;
  selectedFilterFieldID: string;
  selectedComparisonOperator: number;
  selectedAcceptedValue: number;
  currentValue: string;
}

export interface RequestPagingFiltering extends RequestBase {
  requestInt: number;
  sortExpression: string;
  filters: RequestFilterValues[];
}

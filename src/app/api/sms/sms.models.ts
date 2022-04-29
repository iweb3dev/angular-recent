export interface SMSKeyword {
  smsShortCodeGroupID: number;
  userId: number;
  keyword: string;
  description: string;
  parentKeywordID?: number;
  dualOptInRequired: boolean;
  groupName: string;
  groupId?: number;
}

export interface KeywordPrepayOption {
  id: number;
  prePayOption: string;
  months: number;
  discount: number;
  displayOrder: number;
}

export interface KeywordMembers {
  groupName: string;
  member: KeywordMember;
}

export interface KeywordMember {
  activeAddresses: number;
  activeEmailAddresses: number;
  activePhoneNumbers: number;
  firstName: string;
  groupID: number;
  groupStaticMemberID: number;
  id: number;
  isActive: boolean;
  isUser: boolean;
  lastName: string;
  memberStatus: number;
  modifiedByDatetime: string;
  modifiedByUserID: number;
  phoneNumber: string;
  pictureID: number;
  pin: number;
  userTypeValue: number;
  emailAddress: string;
}

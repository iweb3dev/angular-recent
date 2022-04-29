export interface Keyword {
  description: string;
  dualOptInRequired: boolean;
  endDate: Date;
  groupId: string;
  groupName: string;
  keyword: string;
  parentKeywordID: number;
  smsShortCodeGroupID: number;
  userID: number;
  flaggedForDelete: boolean;
}

export interface KeywordStateModel {
  keywords: Keyword[];
  showDeleteSelection: boolean;
}

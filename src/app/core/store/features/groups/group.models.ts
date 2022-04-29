export interface Group {
  activeEmailCount: number;
  activePhoneCount: number;
  activeSMSCount: number;
  domainName: string;
  fileName: File;
  groupName: string;
  hostedGroupPageName: string;
  id: number;
  isHostingSuspended: boolean;
  keyword: string;
  lastAccessed: Date;
  memberCount: number;
  ownerID: number;
  totalGroups: number;
}

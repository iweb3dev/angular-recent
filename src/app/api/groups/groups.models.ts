import { AdditionalField, Member } from '../members/members.models';
import { GPBase } from '../shared/shared.models';
import { UserGroupRole } from '../users/users.models';
import { ImportFileTypes } from '../shared/shared.enums';

export interface GroupsDtoResponse {
  pageNumber: number;
  pageSize: number;
  pagedObjects: PagedObjectsDto[];
  totalPages: number;
  totalRecords: number;
}

export interface PagedObjectsDto {
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

export interface GroupDisplay {
  id: number;
  ownerID: number;
  groupName: string;
  hostedGroupPageName: string;
  isHostSuspended: boolean;
  memberCount: number;
  activePhoneCount: number;
  activeSMSCount: number;
  activeEmailCount: number;
  totalGroups: number;
  domainName: string;
  fileName: string;
  keyword: string;
  lastAccessed: Date;
}



export interface Group extends GPBase {
  groupName: string;
  members: Member[];
  groupPageContent: string;
  smsShortCodeGroupsID: number;
  credits: number;
  pgid: string;
  accessKey: string;
  callerID: number;
  groupDescription: string;
  isDynamicGroup: boolean;
  groupPageHostingName: string;
}

export interface GroupDetails {
  group: Group;
  additionalFields: AdditionalField[];
  groupManagers: UserGroupRole[];
}

export interface ExtendedGroupDetails extends GroupDetails {
  pathForward: string;
}

export interface GroupStats {
  memberCount: number;
  activeMemberCount: number;
  phoneCount: number;
  emailCount: number;
  textCount: number;
  addressCount: number;
}

export interface GroupWithStats {
  groupDetails: GroupDetails;
  groupStats: GroupStats;
}

export interface ImportModel extends GPBase {
  memberID: number;
  userID: number;
  organizationsId: number;
  fileLocation: string;
  fileName: string;
  worksheetName: string;
  firstRowHeader: boolean;
  importMappings: ImportMappingField[];
  importFileType: ImportFileTypes;
  addToMyContacts: boolean;
  createGroup: boolean;
  groupId: number;
  groupName: string;
  saveMapping: boolean;
  mappingName: string;
  importedMembers: number;
  duplicateMembers: number;
  notImported: number;
  editedMembers: number;
  resultCode: number;
}

export interface ImportMappingField extends GPBase {
  memberId: number;
  identifier: string;
  fieldName: string;
  fieldId: number;
  importFieldName: string;
  importColumnNumber: number;
  isAdditionalField: boolean;
  doNotImport: boolean;
}

export interface ImportDetail {
  name: string;
  mappingField: ImportMappingField;
}

export interface ImportRows {
  isHeader: boolean;
  details: ImportDetail[];
}

export interface ImportFileDetails {
  rows: ImportRows[];
}

export interface SuggestedGroup {
  id: number;
  groupName: string;
  additionalFields: AdditionalField[];
}

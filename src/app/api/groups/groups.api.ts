export const GROUP_API_BASE = `/api/groups`;
export const DELETE_ALL_GROUPS = `${GROUP_API_BASE}`;

export const GET_GROUPS_USER_LEADS
  = (pageSize?: number, pageIndex?: number, callIn?: boolean) =>
    `${GROUP_API_BASE}?pageSize=${pageSize}&pageIndex=${pageIndex}&callIn=${callIn}`;

export const INSERT_GROUP
  = `${GROUP_API_BASE}`;

export const GET_GROUP_WITH_STATS
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}`;

export const DELETE_GROUP
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}`;

export const INSERT_GROUP_ADDITIONAL_FIELD
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/additionalfields`;

export const DELETE_GROUP_ADDITIONAL_FIELD
  = (groupId: number, fieldId: number) =>
    `${GROUP_API_BASE}/${groupId}/additionalfields/${fieldId}`;

export const UPDATE_GROUP_ADDITIONAL_FIELD
  = (groupId: number, fieldId: number) =>
    `${GROUP_API_BASE}/${groupId}/additionalfields/${fieldId}`;

export const REMOVE_BAD_NUMBERS_FROM_SPECIFIC_GROUP
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/badnumbers`;

export const REMOVE_BAD_NUMBERS_FROM_ALL_GROUPS
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/badnumbersallgroups`;

export const GET_BAD_PHONENUMBER_DETAILS_FOR_EXPORT
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/badphonenumberdetails`;

export const GET_BITLY
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/bitly`;

export const UPDATE_GROUP_NAME
  = (groupId: number, groupName: string) =>
    `${GROUP_API_BASE}/${groupId}/${groupName}`;

export const IMPORT_GROUP_MEMBERS_FROM_FILE
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/imports`;

export const INSERT_GROUP_MANAGER
  = (groupId: number) =>
  `${GROUP_API_BASE}/${groupId}/managers`;

export const DELETE_GROUP_MANAGER
  = (groupId: number, managerId: number) =>
    `${GROUP_API_BASE}/${groupId}/managers/${managerId}`;

export const GET_GROUP_MEMBER
  = (groupId: number, memberId: number, includePhoto?: boolean) =>
    `${GROUP_API_BASE}/${groupId}/members/${memberId}?includePhoto=${includePhoto}`;

export const GET_GROUP_MEMBER_PHOTO
  = (groupId: number, memberId: number) =>
    `${GROUP_API_BASE}/${groupId}/members/${memberId}/picture`;

export const DELETE_ALL_GROUP_MEMBERS
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/members`;

export const GET_GROUP_CONTACTS
  = (groupId: number, pageSize?: number, pageIndex?: number) =>
    `${GROUP_API_BASE}/${groupId}/members?pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const DELETE_SELECTED_GROUP_MEMBERS
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/members`;

export const ACTIVATE_GROUP_MEMBERS_BY_MEMBER_ID
  = (groupId: number) =>
  `${GROUP_API_BASE}/${groupId}/members/activate`;

export const ACTIVATE_ALL_GROUP_MEMBERS
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/members/activate/all`;

export const DEACTIVATE_GROUP_MEMBERS_BY_MEMBER_ID
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/members/deactivate`;

export const DEACTIVATE_ALL_GROUP_MEMBERS
  = (groupId: number) =>
    `${GROUP_API_BASE}/${groupId}/members/deactivate/all`;

export const ACTIVATE_OR_DEACTIVATE_SPECIFIC_GROUP_MEMBER_BY_GSM_ID
  = (groupId: number, groupsStaticMemberID: number) =>
    `${GROUP_API_BASE}/${groupId}/members/${groupsStaticMemberID}/isActive`;

export const GET_GROUP_MEMBERS_FOR_EXPORT
  = (groupId: number, pageSize?: number, pageIndex?: number) =>
    `${GROUP_API_BASE}/${groupId}/membersincludedetails?pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const SEARCH_GROUP_CONTACTS
  = (groupId: number, includePhotos?: boolean) =>
    `${GROUP_API_BASE}/${groupId}/members/search?includePhotos=${includePhotos}`;

export const SEARCH_MEMBERS_NOT_IN_GROUP
  = (groupId: number, includePhotos?: boolean) =>
    `${GROUP_API_BASE}/${groupId}/members/searchmembersnotingroup?includePhotos=${includePhotos}`;

export const GET_NOT_OPTED_IN_MEMBER_DETAILS
  = (groupId: number, pageSize?: number, pageIndex?: number) =>
    `${GROUP_API_BASE}/${groupId}/notoptedinmemberdetails?pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const GET_IMPORT_FILE_DATA
  = (encryptedFileName: string, groupId: number) =>
    `${GROUP_API_BASE}/${encryptedFileName}/${groupId}`;

export const GET_GROUPS_USER_LEADS_SORTED
  = (requestedSortOrder: string, pageSize?: number, pageIndex?: number) =>
    `${GROUP_API_BASE}/sorted/${requestedSortOrder}?pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const GET_GROUPS_BY_SORT_ORDER
  = (requestedSortOrder: string, pageSize?: number, pageIndex?: number) =>
    `${GROUP_API_BASE}/sort/?requestedsortorder=${requestedSortOrder}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const GET_GROUP_NAME_SEARCH
  = (searchString?: string, sortOrder?: number, pageSize?: number, pageIndex?: number) =>
    `${GROUP_API_BASE}/groupnamesearch?searchstring=${searchString}&sortorder=${sortOrder}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const GET_SUGGESTED_GROUPS_BY_ORG_SUB_TYPE
  = (subOrgType: number) =>
  `${GROUP_API_BASE}/suggested/${subOrgType}`;

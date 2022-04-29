import { environment } from '../../../environments/environment';
export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const MEMBERS_API_BASE = `/api/members`;

export const GET_MY_CONTACTS
  = (pageSize?: number, pageIndex?: number) =>
    `${MEMBERS_API_BASE}?pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const DELETE_MEMBERS_FROM_CONTACTS
  = `${MEMBERS_API_BASE}`;

export const GET_MEMBER
  = (memberId: number) =>
    `${MEMBERS_API_BASE}/${memberId}`;

export const INSERT_MEMBER
  = (groupId: number) =>
    `${MEMBERS_API_BASE}/${groupId}`;

export const POST_QUICKADD_MEMBER_TO_GROUP
  = (groupId: number) =>
    `${ALLOW_ANONYMOUS}${MEMBERS_API_BASE}/${groupId}/quickadd`;

export const DELETE_MEMBER
  = (memberId: number) =>
    `${MEMBERS_API_BASE}/${memberId}`;

export const UPDATE_MEMBER
  = (memberId: number) =>
    `${MEMBERS_API_BASE}/${memberId}`;

export const UPDATE_ADDITIONAL_FIELD
  = (memberId: number, fieldId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/additionalFieldValues/${fieldId}`;

export const DELETE_ADDRESS
  = (memberId: number, addressId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/addresses/${addressId}`;

export const SAVE_ADDRESS
  = (memberId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/addresses`;

export const SAVE_MEMBER_ADDRESS
  = (memberId: number, addressId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/addresses/${addressId}`;

export const DELETE_EMAILADDRESS
  = (memberId: number, emailAddressId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/emailAddresses/${emailAddressId}`;

export const SAVE_MEMBER_EMAIL_ADDRESS
  = (memberId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/emailAddresses`;

export const UPDATE_MEMBER_EMAIL_ADDRESS
  = (memberId: number, emailAddressId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/emailAddresses/${emailAddressId}`;

export const DELETE_PHONE_NUMBER
  = (memberId: number, phoneNumberId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/phoneNumbers/${phoneNumberId}`;

export const UPDATE_MEMBER_PHONE_NUMBER
  = (memberId: number, phoneNumberId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/phoneNumbers/${phoneNumberId}`;

export const SAVE_MEMEBER_PHONE_NUMBER
  = (memberId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/phoneNumbers`;

export const DELETE_MEMBER_PICTURE
  = (memberId: number, pictureId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/pictures/${pictureId}`;

export const OPTIN_FROM_EMAIL_OR_SMSREQUEST
  = (memberId: number) =>
    `${ALLOW_ANONYMOUS}${MEMBERS_API_BASE}/${memberId}/optinfromemailorsmsrequest`;

export const OPTIN_OVER_WEB
  = (memberId: number) =>
    `${ALLOW_ANONYMOUS}${MEMBERS_API_BASE}/${memberId}/optinrequest`;

export const QUICK_UPDATE_MEMBER
  = (memberId: number) =>
    `${MEMBERS_API_BASE}/${memberId}/quickupdate`;

export const ACTIVATE_MEMBERS_FROM_CONTACTS
  = `${MEMBERS_API_BASE}/activate`;

export const ACTIVATE_ALL_MEMBERS_FROM_CONTACTS
  = `${MEMBERS_API_BASE}/activate/all`;

export const DEACTIVATE_MEMBERS_FROM_CONTACTS
  = `${MEMBERS_API_BASE}/deactivate`;

export const DEACTIVATE_ALL_MEMBERS_FROM_CONTACTS
  = `${MEMBERS_API_BASE}/deactivate/all`;

export const GET_MY_CONTACTS_NOT_IN_GROUP
  = (excludedGroupId: number, pageSize?: number, pageIndex?: number, includePhotos?: boolean) =>
    `${MEMBERS_API_BASE}/group/${excludedGroupId}?pageSize=${pageSize}&pageIndex=${pageIndex}&includePhotos=${includePhotos}`;

export const ADD_EXISTING_MEMBERS_TO_GROUP
  = (groupId: number) =>
    `${MEMBERS_API_BASE}/group/${groupId}/membersToAdd`;

export const MCA_ADD_BLOCK_NUMBER
  = (phoneNumberToBlock: string) =>
    `${ALLOW_ANONYMOUS}${MEMBERS_API_BASE}/mcaAddBlockedNumber?phoneNumberToBlock=${phoneNumberToBlock}`;

export const SEARCH_MY_CONTACTS
  = `${MEMBERS_API_BASE}/search`;

export const SUBSCRIBE_TO_CALLINGPOST_EMAILS
  = (memberEmailAddress: string) =>
    `${ALLOW_ANONYMOUS}${MEMBERS_API_BASE}/subscribe?memberEmailAddress=${memberEmailAddress}`;

export const UNSUBSCRIBE_TO_ALL_CALLINGPOST_EMAILS
  = (args: string) =>
    `${ALLOW_ANONYMOUS}${MEMBERS_API_BASE}/unsubscribe?args=${args}`;

export const VERIFY_SUBSCRIBED_TO_CALLINGPOST_EMAILS
  = (args: string) =>
    `${ALLOW_ANONYMOUS}${MEMBERS_API_BASE}/verifysubscription?args=${args}`;

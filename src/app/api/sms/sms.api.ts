import { environment } from '../../../environments/environment';
export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const SMS_API = `/api/sms`;

export const SMS_KEYWORDS = `/api/sms/keywords`;
export const DELETE_ALL_KEYWORDS_BY_USER_ID = `${SMS_KEYWORDS}`;
export const DELETE_KEYWORD_BY_NAME = (keyword: string) => `${SMS_KEYWORDS}?keyword=${keyword}`;
export const GET_USER_KEYWORDS = (pageSize?: number, pageIndex?: number) => `${SMS_KEYWORDS}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const UPDATE_KEYWORD_GROUP_ASSIGNMENT = `${SMS_KEYWORDS}`;
export const PURCHASE_KEYWORDS = (paymentProfileId: number) => `${SMS_KEYWORDS}/${paymentProfileId}`;
export const GET_USER_INCLUDED_USED_KEYWORD_COUNT = `${SMS_KEYWORDS}/includedCount`;
export const LOOKUP_AVAILABLE_KEYWORD = (keyword: string) => `${SMS_KEYWORDS}/lookup?keyword=${keyword}`;
export const SAVE_MEMBER_RESPONSE = (groupId: number, memberId: number) => `${ALLOW_ANONYMOUS}${SMS_KEYWORDS}/member?groupId=${groupId}&memberId=${memberId}`;
export const GET_KEYWORD_PREPAY_OPTIONS = `${ALLOW_ANONYMOUS}${SMS_KEYWORDS}/prepayoptions`;
export const GET_KEYWORD_REQUEST_COUNT = `${SMS_KEYWORDS}/requestCount`;
export const GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS = (memberEncryptedString: string) => `${ALLOW_ANONYMOUS}${SMS_API}/member/decrypt/${memberEncryptedString}`;
export const OPT_IN_NUMBER = (phoneNumber: string) => `${ALLOW_ANONYMOUS}${SMS_API}/optinphonenumber?phoneNumber=${phoneNumber}`;
export const OPT_OUT_NUMBER = (phoneNumber: string) => `${ALLOW_ANONYMOUS}${SMS_API}/optoutphonenumber?phoneNumber=${phoneNumber}`;

export const KEYWORDS_API = `/api/sms/keywords`;
export const DELETE_ALL_KEYWORDS = `${KEYWORDS_API}`;
export const GET_ALL_PREPAY_OPTIONS = `${KEYWORDS_API}/prepayoptions`;
export const POST_PURCHASE_KEYWORD = (paymentProfileId: number) => `${KEYWORDS_API}/${paymentProfileId}`;
export const DELETE_SPECIFIC_KEYWORD = (keyword: string) => `/api/sms/keyword?keyword=${keyword}`;
export const LOOKUP_KEYWORD = (keyword: string) => `${KEYWORDS_API}/lookup?keyword=${keyword}`;
export const UPDATE_KEYWORD = `${KEYWORDS_API}`;
export const GET_USER_KEYWORDS = (pageSize?: number, pageIndex?: number) => `${KEYWORDS_API}?pageSize=${pageSize}&pageIndex=${pageIndex}`;

import { environment } from '../../../environments/environment';

export const EMAILS_API = `/api/emails`;
export const SEND_GROUP_PAGE_CONTACT_US_EMAIL = (groupId: number) => `${environment.api.base}${EMAILS_API}/${groupId}/contactus`;

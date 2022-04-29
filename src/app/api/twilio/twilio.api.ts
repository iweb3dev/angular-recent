import { environment } from '../../../environments/environment';
export const ALLOW_ANONYMOUS = `${environment.api.base}`;

export const TWIILIO_API_BASE = '/api/twilio';

export const DELETE_TWILIO_PHONENUMBER
  = (phoneNumberId: number) =>
    `${TWIILIO_API_BASE}/tollfreephonenumber?phoneNumberId=${phoneNumberId}`;

export const DELETE_ALL_TWILIO_PHONENUMBERS = `${TWIILIO_API_BASE}/tollfreephonenumbers`;

export const GET_LIST_OF_TWILIO_TOLLFREE_PHONE_NUMBERS
  = (areaCode: string, tollFreeSearchText: string) =>
    `${TWIILIO_API_BASE}/tollfreephonenumbers?areacode=${areaCode}&tollfreesearchtext=${tollFreeSearchText}`;

export const GET_PHONE_NUMBER_PREPAY_OPTIONS = `${ALLOW_ANONYMOUS}${TWIILIO_API_BASE}/tollfreephonenumbers/prepayoptions`;

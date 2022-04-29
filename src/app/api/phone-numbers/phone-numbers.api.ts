export const PHONE_NUMBERS_API = `/api/users`;
export const GET_ALL_PHONE_NUMBERS = `${PHONE_NUMBERS_API}/phoneNumbers/purchased`;
export const GET_PHONE_NUMBER_CALL_FORWARD = (phoneNumberForwarded: string) =>
  `${PHONE_NUMBERS_API}/phonenumber/callForward?phoneNumberForwarded=${phoneNumberForwarded}`;

export const UPDATE_CALL_FORWARD_PHONE_NUMBER =
  (boughtPhoneNumberId: number, forwardPhoneNumberTo: string) =>
    `${PHONE_NUMBERS_API}/phonenumber/callForward?boughtPhoneNumberId=${boughtPhoneNumberId}&forwardPhoneNumberTo=${forwardPhoneNumberTo}`;

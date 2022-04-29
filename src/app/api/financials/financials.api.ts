export const FINANCIALS_API = `/api/financials/paymentProfiles`;
export const PROMOCODES_API = `/api/financials/promocodes`;

export const SAVE_PAYMENT_PROFILE = `${FINANCIALS_API}`;

export const GET_PAYMENT_PROFILES = (
  customerProfileId: number,
  edit: boolean,
) => `${FINANCIALS_API}/${customerProfileId}?edit=${edit}`;

export const UPDATE_PAYMENT_PROFILE = (paymentProfileId: number) =>
  `${FINANCIALS_API}/${paymentProfileId}`;

export const UPDATE_PRIMARY_ACCOUNT = (
  paymentProfileId: number,
  customerProfileId: number,
) =>
  `${FINANCIALS_API}/${paymentProfileId}/customerProfiles/${customerProfileId}`;

export const DELETE_PAYMENT_PROFILE = (
  paymentProfileId: number,
  customerProfileId: number,
) =>
  `${FINANCIALS_API}/${paymentProfileId}/customerProfiles/${customerProfileId}`;

export const PROMO_CODE_VALIDATE = () => `${PROMOCODES_API}/validate`;

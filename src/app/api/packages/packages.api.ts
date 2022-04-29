export const PACKAGES_API = `/api/packages`;
export const GET_ALL_PACKAGE_FEATURES = `${PACKAGES_API}`;
export const GET_FEATURES_BY_PACKAGEID = (packageId: number) => `${PACKAGES_API}/${packageId}`;
export const CANCEL_SUBSCRIPTION_DOWNGRADE = `${PACKAGES_API}/canceldowngrade`;

// Commented out as this was duplicated in the usercredits controller
// export const PURCHASE_CREDITS = `${PACKAGES_API}/credits`;

export const PURCHASE_DOMAIN = `${PACKAGES_API}/domainpurchase`;
export const CAN_USER_DOWNGRADE
  = (currentPackageId: number, targetPackageId: number) =>
    `${PACKAGES_API}/downgrade/${currentPackageId}/${targetPackageId}`;

export const VALIDATE_PACKAGE_CHANGE = `${PACKAGES_API}/packageChange`;

export const GET_PAYMENT_PROFILE_TEST = `${PACKAGES_API}/paymentprofile`;

export const PAYPAL_CREDIT_PURCHASE = `${PACKAGES_API}/paypalcredits`;

export const GET_SUSPENSION_REASONS = (isPublic: boolean) => `${PACKAGES_API}/subscriptionsuspendreasons/${isPublic}`;

export const GET_PACKAGES_BY_TYPE_ID = (packageTypeId: number) => `${PACKAGES_API}/${packageTypeId}`;
export const PACKAGE_CHANGE =  `${PACKAGES_API}/packagechange`;

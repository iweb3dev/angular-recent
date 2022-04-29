"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_PACKAGES_BY_TYPE_ID = exports.GET_SUSPENSION_REASONS = exports.PAYPAL_CREDIT_PURCHASE = exports.GET_PAYMENT_PROFILE_TEST = exports.VALIDATE_PACKAGE_CHANGE = exports.CAN_USER_DOWNGRADE = exports.PURCHASE_DOMAIN = exports.CANCEL_SUBSCRIPTION_DOWNGRADE = exports.GET_FEATURES_BY_PACKAGEID = exports.GET_ALL_PACKAGE_FEATURES = exports.PACKAGES_API = void 0;
exports.PACKAGES_API = "api/packages";
exports.GET_ALL_PACKAGE_FEATURES = "" + exports.PACKAGES_API;
var GET_FEATURES_BY_PACKAGEID = function (packageId) { return exports.PACKAGES_API + "/" + packageId; };
exports.GET_FEATURES_BY_PACKAGEID = GET_FEATURES_BY_PACKAGEID;
exports.CANCEL_SUBSCRIPTION_DOWNGRADE = exports.PACKAGES_API + "/canceldowngrade";
// Commented out as this was duplicated in the usercredits controller
// export const PURCHASE_CREDITS = `${PACKAGES_API}/credits`;
exports.PURCHASE_DOMAIN = exports.PACKAGES_API + "/domainpurchase";
var CAN_USER_DOWNGRADE = function (currentPackageId, targetPackageId) {
    return exports.PACKAGES_API + "/downgrade/" + currentPackageId + "/" + targetPackageId;
};
exports.CAN_USER_DOWNGRADE = CAN_USER_DOWNGRADE;
exports.VALIDATE_PACKAGE_CHANGE = exports.PACKAGES_API + "/packageChange";
exports.GET_PAYMENT_PROFILE_TEST = exports.PACKAGES_API + "/paymentprofile";
exports.PAYPAL_CREDIT_PURCHASE = exports.PACKAGES_API + "/paypalcredits";
var GET_SUSPENSION_REASONS = function (isPublic) { return exports.PACKAGES_API + "/subscriptionsuspendreasons/" + isPublic; };
exports.GET_SUSPENSION_REASONS = GET_SUSPENSION_REASONS;
var GET_PACKAGES_BY_TYPE_ID = function (packageTypeId) { return exports.PACKAGES_API + "/" + packageTypeId; };
exports.GET_PACKAGES_BY_TYPE_ID = GET_PACKAGES_BY_TYPE_ID;
//# sourceMappingURL=packages.api.js.map
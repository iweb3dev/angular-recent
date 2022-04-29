"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERIFY_SUBSCRIBED_TO_CALLINGPOST_EMAILS = exports.UNSUBSCRIBE_TO_ALL_CALLINGPOST_EMAILS = exports.SUBSCRIBE_TO_CALLINGPOST_EMAILS = exports.SEARCH_MY_CONTACTS = exports.MCA_ADD_BLOCK_NUMBER = exports.ADD_EXISTING_MEMBERS_TO_GROUP = exports.GET_MY_CONTACTS_NOT_IN_GROUP = exports.DEACTIVATE_ALL_MEMBERS_FROM_CONTACTS = exports.DEACTIVATE_MEMBERS_FROM_CONTACTS = exports.ACTIVATE_ALL_MEMBERS_FROM_CONTACTS = exports.ACTIVATE_MEMBERS_FROM_CONTACTS = exports.QUICK_UPDATE_MEMBER = exports.OPTIN_OVER_WEB = exports.OPTIN_FROM_EMAIL_OR_SMSREQUEST = exports.DELETE_MEMBER_PICTURE = exports.SAVE_MEMEBER_PHONE_NUMBER = exports.UPDATE_MEMBER_PHONE_NUMBER = exports.DELETE_PHONE_NUMBER = exports.UPDATE_MEMBER_EMAIL_ADDRESS = exports.SAVE_MEMBER_EMAIL_ADDRESS = exports.DELETE_EMAILADDRESS = exports.SAVE_MEMBER_ADDRESS = exports.SAVE_ADDRESS = exports.DELETE_ADDRESS = exports.UPDATE_ADDITIONAL_FIELD = exports.UPDATE_MEMBER = exports.DELETE_MEMBER = exports.POST_QUICKADD_MEMBER_TO_GROUP = exports.INSERT_MEMBER = exports.GET_MEMBER = exports.DELETE_MEMBERS_FROM_CONTACTS = exports.GET_MY_CONTACTS = exports.MEMBERS_API_BASE = exports.ALLOW_ANONYMOUS = void 0;
var environment_1 = require("../../../environments/environment");
exports.ALLOW_ANONYMOUS = "" + environment_1.environment.api.base;
exports.MEMBERS_API_BASE = "/api/members";
var GET_MY_CONTACTS = function (pageSize, pageIndex) {
    return exports.MEMBERS_API_BASE + "?pageSize=" + pageSize + "&pageIndex=" + pageIndex;
};
exports.GET_MY_CONTACTS = GET_MY_CONTACTS;
exports.DELETE_MEMBERS_FROM_CONTACTS = "" + exports.MEMBERS_API_BASE;
var GET_MEMBER = function (memberId) {
    return exports.MEMBERS_API_BASE + "/" + memberId;
};
exports.GET_MEMBER = GET_MEMBER;
var INSERT_MEMBER = function (groupId) {
    return exports.MEMBERS_API_BASE + "/" + groupId;
};
exports.INSERT_MEMBER = INSERT_MEMBER;
var POST_QUICKADD_MEMBER_TO_GROUP = function (groupId) {
    return "" + exports.ALLOW_ANONYMOUS + exports.MEMBERS_API_BASE + "/" + groupId + "/quickadd";
};
exports.POST_QUICKADD_MEMBER_TO_GROUP = POST_QUICKADD_MEMBER_TO_GROUP;
var DELETE_MEMBER = function (memberId) {
    return exports.MEMBERS_API_BASE + "/" + memberId;
};
exports.DELETE_MEMBER = DELETE_MEMBER;
var UPDATE_MEMBER = function (memberId) {
    return exports.MEMBERS_API_BASE + "/" + memberId;
};
exports.UPDATE_MEMBER = UPDATE_MEMBER;
var UPDATE_ADDITIONAL_FIELD = function (memberId, fieldId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/additionalFieldValues/" + fieldId;
};
exports.UPDATE_ADDITIONAL_FIELD = UPDATE_ADDITIONAL_FIELD;
var DELETE_ADDRESS = function (memberId, addressId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/addresses/" + addressId;
};
exports.DELETE_ADDRESS = DELETE_ADDRESS;
var SAVE_ADDRESS = function (memberId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/addresses";
};
exports.SAVE_ADDRESS = SAVE_ADDRESS;
var SAVE_MEMBER_ADDRESS = function (memberId, addressId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/addresses/" + addressId;
};
exports.SAVE_MEMBER_ADDRESS = SAVE_MEMBER_ADDRESS;
var DELETE_EMAILADDRESS = function (memberId, emailAddressId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/emailAddresses/" + emailAddressId;
};
exports.DELETE_EMAILADDRESS = DELETE_EMAILADDRESS;
var SAVE_MEMBER_EMAIL_ADDRESS = function (memberId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/emailAddresses";
};
exports.SAVE_MEMBER_EMAIL_ADDRESS = SAVE_MEMBER_EMAIL_ADDRESS;
var UPDATE_MEMBER_EMAIL_ADDRESS = function (memberId, emailAddressId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/emailAddresses/" + emailAddressId;
};
exports.UPDATE_MEMBER_EMAIL_ADDRESS = UPDATE_MEMBER_EMAIL_ADDRESS;
var DELETE_PHONE_NUMBER = function (memberId, phoneNumberId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/phoneNumbers/" + phoneNumberId;
};
exports.DELETE_PHONE_NUMBER = DELETE_PHONE_NUMBER;
var UPDATE_MEMBER_PHONE_NUMBER = function (memberId, phoneNumberId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/phoneNumbers/" + phoneNumberId;
};
exports.UPDATE_MEMBER_PHONE_NUMBER = UPDATE_MEMBER_PHONE_NUMBER;
var SAVE_MEMEBER_PHONE_NUMBER = function (memberId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/phoneNumbers";
};
exports.SAVE_MEMEBER_PHONE_NUMBER = SAVE_MEMEBER_PHONE_NUMBER;
var DELETE_MEMBER_PICTURE = function (memberId, pictureId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/pictures/" + pictureId;
};
exports.DELETE_MEMBER_PICTURE = DELETE_MEMBER_PICTURE;
var OPTIN_FROM_EMAIL_OR_SMSREQUEST = function (memberId) {
    return "" + exports.ALLOW_ANONYMOUS + exports.MEMBERS_API_BASE + "/" + memberId + "/optinfromemailorsmsrequest";
};
exports.OPTIN_FROM_EMAIL_OR_SMSREQUEST = OPTIN_FROM_EMAIL_OR_SMSREQUEST;
var OPTIN_OVER_WEB = function (memberId) {
    return "" + exports.ALLOW_ANONYMOUS + exports.MEMBERS_API_BASE + "/" + memberId + "/optinrequest";
};
exports.OPTIN_OVER_WEB = OPTIN_OVER_WEB;
var QUICK_UPDATE_MEMBER = function (memberId) {
    return exports.MEMBERS_API_BASE + "/" + memberId + "/quickupdate";
};
exports.QUICK_UPDATE_MEMBER = QUICK_UPDATE_MEMBER;
exports.ACTIVATE_MEMBERS_FROM_CONTACTS = exports.MEMBERS_API_BASE + "/activate";
exports.ACTIVATE_ALL_MEMBERS_FROM_CONTACTS = exports.MEMBERS_API_BASE + "/activate/all";
exports.DEACTIVATE_MEMBERS_FROM_CONTACTS = exports.MEMBERS_API_BASE + "/deactivate";
exports.DEACTIVATE_ALL_MEMBERS_FROM_CONTACTS = exports.MEMBERS_API_BASE + "/deactivate/all";
var GET_MY_CONTACTS_NOT_IN_GROUP = function (excludedGroupId, pageSize, pageIndex, includePhotos) {
    return exports.MEMBERS_API_BASE + "/group/" + excludedGroupId + "?pageSize=" + pageSize + "&pageIndex=" + pageIndex + "&includePhotos=" + includePhotos;
};
exports.GET_MY_CONTACTS_NOT_IN_GROUP = GET_MY_CONTACTS_NOT_IN_GROUP;
var ADD_EXISTING_MEMBERS_TO_GROUP = function (groupId) {
    return exports.MEMBERS_API_BASE + "/group/" + groupId + "/membersToAdd";
};
exports.ADD_EXISTING_MEMBERS_TO_GROUP = ADD_EXISTING_MEMBERS_TO_GROUP;
var MCA_ADD_BLOCK_NUMBER = function (phoneNumberToBlock) {
    return "" + exports.ALLOW_ANONYMOUS + exports.MEMBERS_API_BASE + "/mcaAddBlockedNumber?phoneNumberToBlock=" + phoneNumberToBlock;
};
exports.MCA_ADD_BLOCK_NUMBER = MCA_ADD_BLOCK_NUMBER;
exports.SEARCH_MY_CONTACTS = exports.MEMBERS_API_BASE + "/search";
var SUBSCRIBE_TO_CALLINGPOST_EMAILS = function (memberEmailAddress) {
    return "" + exports.ALLOW_ANONYMOUS + exports.MEMBERS_API_BASE + "/subscribe?memberEmailAddress=" + memberEmailAddress;
};
exports.SUBSCRIBE_TO_CALLINGPOST_EMAILS = SUBSCRIBE_TO_CALLINGPOST_EMAILS;
var UNSUBSCRIBE_TO_ALL_CALLINGPOST_EMAILS = function (args) {
    return "" + exports.ALLOW_ANONYMOUS + exports.MEMBERS_API_BASE + "/unsubscribe?args=" + args;
};
exports.UNSUBSCRIBE_TO_ALL_CALLINGPOST_EMAILS = UNSUBSCRIBE_TO_ALL_CALLINGPOST_EMAILS;
var VERIFY_SUBSCRIBED_TO_CALLINGPOST_EMAILS = function (args) {
    return "" + exports.ALLOW_ANONYMOUS + exports.MEMBERS_API_BASE + "/verifysubscription?args=" + args;
};
exports.VERIFY_SUBSCRIBED_TO_CALLINGPOST_EMAILS = VERIFY_SUBSCRIBED_TO_CALLINGPOST_EMAILS;
//# sourceMappingURL=members.api.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPT_OUT_NUMBER = exports.OPT_IN_NUMBER = exports.GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS = exports.GET_KEYWORD_REQUEST_COUNT = exports.GET_KEYWORD_PREPAY_OPTIONS = exports.SAVE_MEMBER_RESPONSE = exports.LOOKUP_AVAILABLE_KEYWORD = exports.GET_USER_INCLUDED_USED_KEYWORD_COUNT = exports.PURCHASE_KEYWORDS = exports.UPDATE_KEYWORD_GROUP_ASSIGNMENT = exports.GET_USER_KEYWORDS = exports.DELETE_KEYWORD_BY_NAME = exports.DELETE_ALL_KEYWORDS_BY_USER_ID = exports.SMS_KEYWORDS = exports.SMS_API = exports.ALLOW_ANONYMOUS = void 0;
var environment_1 = require("../../../environments/environment");
exports.ALLOW_ANONYMOUS = "" + environment_1.environment.api.base;
exports.SMS_API = "/api/sms";
exports.SMS_KEYWORDS = "/api/sms/keywords";
exports.DELETE_ALL_KEYWORDS_BY_USER_ID = "" + exports.SMS_KEYWORDS;
var DELETE_KEYWORD_BY_NAME = function (keyword) { return exports.SMS_KEYWORDS + "?keyword=" + keyword; };
exports.DELETE_KEYWORD_BY_NAME = DELETE_KEYWORD_BY_NAME;
var GET_USER_KEYWORDS = function (pageSize, pageIndex) { return exports.SMS_KEYWORDS + "?pageSize=" + pageSize + "&pageIndex=" + pageIndex; };
exports.GET_USER_KEYWORDS = GET_USER_KEYWORDS;
exports.UPDATE_KEYWORD_GROUP_ASSIGNMENT = "" + exports.SMS_KEYWORDS;
var PURCHASE_KEYWORDS = function (paymentProfileId) { return exports.SMS_KEYWORDS + "/" + paymentProfileId; };
exports.PURCHASE_KEYWORDS = PURCHASE_KEYWORDS;
exports.GET_USER_INCLUDED_USED_KEYWORD_COUNT = exports.SMS_KEYWORDS + "/includedCount";
var LOOKUP_AVAILABLE_KEYWORD = function (keyword) { return exports.SMS_KEYWORDS + "/lookup?keyword=" + keyword; };
exports.LOOKUP_AVAILABLE_KEYWORD = LOOKUP_AVAILABLE_KEYWORD;
var SAVE_MEMBER_RESPONSE = function (groupId, memberId) { return "" + exports.ALLOW_ANONYMOUS + exports.SMS_KEYWORDS + "/member?groupId=" + groupId + "&memberId=" + memberId; };
exports.SAVE_MEMBER_RESPONSE = SAVE_MEMBER_RESPONSE;
exports.GET_KEYWORD_PREPAY_OPTIONS = "" + exports.ALLOW_ANONYMOUS + exports.SMS_KEYWORDS + "/prepayoptions";
exports.GET_KEYWORD_REQUEST_COUNT = exports.SMS_KEYWORDS + "/requestCount";
var GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS = function (memberEncryptedString) { return "" + exports.ALLOW_ANONYMOUS + exports.SMS_API + "/member/decrypt/" + memberEncryptedString; };
exports.GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS = GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS;
var OPT_IN_NUMBER = function (phoneNumber) { return "" + exports.ALLOW_ANONYMOUS + exports.SMS_API + "/optinphonenumber?phoneNumber=" + phoneNumber; };
exports.OPT_IN_NUMBER = OPT_IN_NUMBER;
var OPT_OUT_NUMBER = function (phoneNumber) { return "" + exports.ALLOW_ANONYMOUS + exports.SMS_API + "/optoutphonenumber?phoneNumber=" + phoneNumber; };
exports.OPT_OUT_NUMBER = OPT_OUT_NUMBER;
//# sourceMappingURL=sms.api.js.map
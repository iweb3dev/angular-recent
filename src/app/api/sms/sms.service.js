"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
var core_1 = require("@angular/core");
var sms_api_1 = require("./sms.api");
var SmsService = /** @class */ (function () {
    function SmsService(_http, __http) {
        this._http = _http;
        this.__http = __http;
    }
    SmsService.prototype.deleteAllKeywords = function () {
        return this._http
            .delete(sms_api_1.DELETE_ALL_KEYWORDS_BY_USER_ID);
    };
    SmsService.prototype.deleteKeywordByName = function (keyword) {
        return this._http
            .delete(sms_api_1.DELETE_KEYWORD_BY_NAME(keyword));
    };
    SmsService.prototype.getUserKeywordList = function (pageSize, pageIndex) {
        return this._http
            .get(sms_api_1.GET_USER_KEYWORDS(pageSize, pageIndex));
    };
    SmsService.prototype.updateKeywordGroupAssignment = function (keyword) {
        return this._http
            .put(sms_api_1.UPDATE_KEYWORD_GROUP_ASSIGNMENT, keyword);
    };
    SmsService.prototype.purchaseKeyword = function (paymentProfileId, keyword) {
        return this._http
            .post(sms_api_1.PURCHASE_KEYWORDS(paymentProfileId), keyword);
    };
    SmsService.prototype.getUserIncludedUsedKeywordCount = function () {
        return this._http
            .get(sms_api_1.GET_USER_INCLUDED_USED_KEYWORD_COUNT);
    };
    SmsService.prototype.LookupAvailableKeyword = function (keyword) {
        return this._http
            .get(sms_api_1.LOOKUP_AVAILABLE_KEYWORD(keyword));
    };
    SmsService.prototype.saveMemberResponse = function (groupId, memberId, member) {
        return this.__http
            .post(sms_api_1.SAVE_MEMBER_RESPONSE(groupId, memberId), member);
    };
    SmsService.prototype.getKeywordPrepayOptions = function () {
        return this.__http
            .get(sms_api_1.GET_KEYWORD_PREPAY_OPTIONS);
    };
    SmsService.prototype.getUserKeywordRequestCount = function () {
        return this._http
            .get(sms_api_1.GET_KEYWORD_REQUEST_COUNT);
    };
    SmsService.prototype.getCommunicationEndPointResponseArgs = function (memberEncryptedString) {
        return this.__http
            .get(sms_api_1.GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS(memberEncryptedString));
    };
    SmsService.prototype.optInNumber = function (phoneNumber) {
        return this.__http
            .post(sms_api_1.OPT_IN_NUMBER(phoneNumber), null);
    };
    SmsService.prototype.optOutNumber = function (phoneNumber) {
        return this.__http
            .post(sms_api_1.OPT_OUT_NUMBER(phoneNumber), null);
    };
    SmsService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], SmsService);
    return SmsService;
}());
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map
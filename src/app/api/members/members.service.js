"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
var core_1 = require("@angular/core");
var members_api_1 = require("./members.api");
var MemberService = /** @class */ (function () {
    function MemberService(_http, __http) {
        this._http = _http;
        this.__http = __http;
    }
    MemberService.prototype.deleteAllMembersFromContacts = function () {
        return this._http
            .delete(members_api_1.MEMBERS_API_BASE);
    };
    MemberService.prototype.getMyContacts = function (pageSize, pageIndex) {
        return this._http
            .get(members_api_1.GET_MY_CONTACTS(pageSize, pageIndex));
    };
    MemberService.prototype.deleteMembersFromContacts = function (membersToDelete) {
        return this._http
            .post(members_api_1.DELETE_MEMBERS_FROM_CONTACTS, membersToDelete);
    };
    MemberService.prototype.getMember = function (memberId) {
        return this._http
            .get(members_api_1.GET_MEMBER(memberId));
    };
    MemberService.prototype.insertMember = function (groupId, member) {
        return this._http
            .post(members_api_1.INSERT_MEMBER(groupId), member);
    };
    MemberService.prototype.postQuickAddMemberToGroup = function (groupId, member) {
        return this.__http
            .post(members_api_1.POST_QUICKADD_MEMBER_TO_GROUP(groupId), member);
    };
    MemberService.prototype.deleteMember = function (memberId) {
        return this._http
            .delete(members_api_1.DELETE_MEMBER(memberId));
    };
    MemberService.prototype.updateMember = function (memberId, memberToUpdate) {
        return this._http
            .put(members_api_1.UPDATE_MEMBER(memberId), memberToUpdate);
    };
    MemberService.prototype.updateAdditionalField = function (memberId, fieldId, additionalFieldValue) {
        return this._http
            .put(members_api_1.UPDATE_ADDITIONAL_FIELD(memberId, fieldId), additionalFieldValue);
    };
    MemberService.prototype.deleteAddress = function (memberId, addressId) {
        return this._http
            .delete(members_api_1.DELETE_ADDRESS(memberId, addressId));
    };
    MemberService.prototype.saveAddress = function (memberId, addressDetail) {
        return this._http
            .post(members_api_1.SAVE_ADDRESS(memberId), addressDetail);
    };
    MemberService.prototype.saveMemberAddress = function (memberId, addressId, addressDetail) {
        return this._http
            .put(members_api_1.SAVE_MEMBER_ADDRESS(memberId, addressId), addressDetail);
    };
    MemberService.prototype.deleteEmailAddress = function (memberId, emailAddressId) {
        return this._http
            .delete(members_api_1.DELETE_EMAILADDRESS(memberId, emailAddressId));
    };
    MemberService.prototype.saveMemberEmailAddress = function (memberId, emailAddress) {
        return this._http
            .post(members_api_1.SAVE_MEMBER_EMAIL_ADDRESS(memberId), emailAddress);
    };
    MemberService.prototype.updateMemberEmailAddress = function (memberId, emailAddressId, emailAddressDetail) {
        return this._http
            .put(members_api_1.UPDATE_MEMBER_EMAIL_ADDRESS(memberId, emailAddressId), emailAddressDetail);
    };
    MemberService.prototype.deletePhoneNumber = function (memberId, phoneNumberId) {
        return this._http
            .delete(members_api_1.DELETE_PHONE_NUMBER(memberId, phoneNumberId));
    };
    MemberService.prototype.updateMemberPhoneNumber = function (memberId, phoneNumberId, phoneNumberDetail) {
        return this._http
            .put(members_api_1.UPDATE_MEMBER_PHONE_NUMBER(memberId, phoneNumberId), phoneNumberDetail);
    };
    MemberService.prototype.saveMemberPhoneNumber = function (memberId, phoneNumberDetail) {
        return this._http
            .post(members_api_1.SAVE_MEMEBER_PHONE_NUMBER(memberId), phoneNumberDetail);
    };
    MemberService.prototype.deleteMemberPicture = function (memberId, pictureId) {
        return this._http
            .delete(members_api_1.DELETE_MEMBER_PICTURE(memberId, pictureId));
    };
    MemberService.prototype.optInFromEmailOrSmsRequest = function (memberId, optInRequest) {
        return this.__http
            .post(members_api_1.OPTIN_FROM_EMAIL_OR_SMSREQUEST(memberId), optInRequest);
    };
    MemberService.prototype.optInOverWeb = function (memberId, optInRequest) {
        return this.__http
            .post(members_api_1.OPTIN_OVER_WEB(memberId), optInRequest);
    };
    MemberService.prototype.quickUpdateMember = function (memberId, memberToUpdate) {
        return this._http
            .put(members_api_1.QUICK_UPDATE_MEMBER(memberId), memberToUpdate);
    };
    MemberService.prototype.activateMembersFromContacts = function (members) {
        return this._http
            .post(members_api_1.ACTIVATE_MEMBERS_FROM_CONTACTS, members);
    };
    MemberService.prototype.activateAllMembersFromContacts = function () {
        return this._http
            .post(members_api_1.ACTIVATE_ALL_MEMBERS_FROM_CONTACTS, null);
    };
    MemberService.prototype.deactivateMembersFromContacts = function (members) {
        return this._http
            .post(members_api_1.DEACTIVATE_MEMBERS_FROM_CONTACTS, members);
    };
    MemberService.prototype.deactivateAllMembersFromContacts = function () {
        return this._http
            .post(members_api_1.DEACTIVATE_ALL_MEMBERS_FROM_CONTACTS, null);
    };
    MemberService.prototype.getMyContactsNotInGroup = function (excludedGroupId, pageSize, pageIndex, includePhotos) {
        return this._http
            .get(members_api_1.GET_MY_CONTACTS_NOT_IN_GROUP(excludedGroupId, pageSize, pageIndex, includePhotos));
    };
    MemberService.prototype.addExistingMembersToGroup = function (groupId, membersToAdd) {
        return this._http
            .post(members_api_1.ADD_EXISTING_MEMBERS_TO_GROUP(groupId), membersToAdd);
    };
    MemberService.prototype.mcaAddBlockedNumber = function (phoneNumberToBlock) {
        return this.__http
            .post(members_api_1.MCA_ADD_BLOCK_NUMBER(phoneNumberToBlock), null);
    };
    MemberService.prototype.searchMyContacts = function (filter) {
        return this._http
            .post(members_api_1.SEARCH_MY_CONTACTS, filter);
    };
    MemberService.prototype.subscribeToCallingPostEmails = function (memberEmailAddress) {
        return this.__http
            .post(members_api_1.SUBSCRIBE_TO_CALLINGPOST_EMAILS(memberEmailAddress), null);
    };
    MemberService.prototype.unsubscribeToAllCallingPostEmails = function (args) {
        return this.__http
            .post(members_api_1.UNSUBSCRIBE_TO_ALL_CALLINGPOST_EMAILS(args), null);
    };
    MemberService.prototype.verifySubscribedToCallingPostEmails = function (args) {
        return this.__http
            .post(members_api_1.VERIFY_SUBSCRIBED_TO_CALLINGPOST_EMAILS(args), null);
    };
    MemberService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MemberService);
    return MemberService;
}());
exports.MemberService = MemberService;
//# sourceMappingURL=members.service.js.map
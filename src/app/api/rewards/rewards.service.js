"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsService = void 0;
var core_1 = require("@angular/core");
var rewards_api_1 = require("./rewards.api");
var RewardsService = /** @class */ (function () {
    function RewardsService(_http, __http) {
        this._http = _http;
        this.__http = __http;
    }
    RewardsService.prototype.getListOfAllAvailableRewards = function () {
        return this.__http
            .get(rewards_api_1.GET_ALL_AVAILABLE_REWARDS);
    };
    RewardsService.prototype.insertClaimedReward = function (rewardClaimedId) {
        return this._http
            .post(rewards_api_1.INSERT_CLAIMED_REWARD, rewardClaimedId);
    };
    RewardsService.prototype.getListOfAllClaimableRewards = function () {
        return this.__http
            .get(rewards_api_1.GET_CLAIMABLE_REWARDS);
    };
    RewardsService.prototype.enrollUserIntoRewardsProgram = function () {
        return this._http
            .post(rewards_api_1.ENROLL_REWARDS_USER, null);
    };
    RewardsService.prototype.submitRewardsReferralEmails = function (emailAddresses) {
        return this._http
            .post(rewards_api_1.SUBMIT_REWARD_REFERRAL_EMAILS, emailAddresses);
    };
    RewardsService.prototype.recordRewardForFacebookShare = function () {
        return this._http
            .post(rewards_api_1.RECORD_REWARD_FACEBOOK_SHARE, null);
    };
    RewardsService.prototype.submitUserRewardsReview = function (reviewScore, reviewText) {
        return this._http
            .post(rewards_api_1.SUBMIT_USER_REWARDS_REVIEW(reviewScore), reviewText);
    };
    RewardsService.prototype.getUserRewardsTransactions = function (pageSize, pageIndex) {
        return this._http
            .get(rewards_api_1.GET_USER_REWARDS_TRANSACTIONS(pageSize, pageIndex));
    };
    RewardsService.prototype.getRewardsUser = function () {
        return this._http
            .get(rewards_api_1.GET_REWARDS_USER);
    };
    RewardsService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], RewardsService);
    return RewardsService;
}());
exports.RewardsService = RewardsService;
//# sourceMappingURL=rewards.service.js.map
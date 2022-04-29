"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUBMIT_CLAIM_REWARDS = exports.GET_REWARDS_USER = exports.GET_USER_REWARDS_TRANSACTIONS = exports.SUBMIT_USER_REWARDS_REVIEW = exports.RECORD_REWARD_FACEBOOK_SHARE = exports.SUBMIT_REWARD_REFERRAL_EMAILS = exports.ENROLL_REWARDS_USER = exports.GET_CLAIMABLE_REWARDS = exports.INSERT_CLAIMED_REWARD = exports.GET_ALL_AVAILABLE_REWARDS = exports.REWARDS_API = exports.ALLOW_ANONYMOUS = void 0;
var environment_1 = require("../../../environments/environment");
exports.ALLOW_ANONYMOUS = "" + environment_1.environment.api.base;
exports.REWARDS_API = "/api/rewards";
exports.GET_ALL_AVAILABLE_REWARDS = "" + exports.ALLOW_ANONYMOUS + exports.REWARDS_API;
exports.INSERT_CLAIMED_REWARD = "" + exports.REWARDS_API;
exports.GET_CLAIMABLE_REWARDS = "" + exports.ALLOW_ANONYMOUS + exports.REWARDS_API + "/claimable";
exports.ENROLL_REWARDS_USER = exports.REWARDS_API + "/enroll";
exports.SUBMIT_REWARD_REFERRAL_EMAILS = exports.REWARDS_API + "/emailReferral";
exports.RECORD_REWARD_FACEBOOK_SHARE = exports.REWARDS_API + "/facebook";
var SUBMIT_USER_REWARDS_REVIEW = function (reviewScore) { return exports.REWARDS_API + "/submitreview/" + reviewScore; };
exports.SUBMIT_USER_REWARDS_REVIEW = SUBMIT_USER_REWARDS_REVIEW;
var GET_USER_REWARDS_TRANSACTIONS = function (pageSize, pageIndex) { return exports.REWARDS_API + "/transactions?pageSize=" + pageSize + "&pageIndex=" + pageIndex; };
exports.GET_USER_REWARDS_TRANSACTIONS = GET_USER_REWARDS_TRANSACTIONS;
exports.GET_REWARDS_USER = exports.REWARDS_API + "/user";
exports.SUBMIT_CLAIM_REWARDS = exports.REWARDS_API + "/claim";
//# sourceMappingURL=rewards.api.js.map
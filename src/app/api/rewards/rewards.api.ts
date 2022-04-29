import { environment } from '../../../environments/environment';
export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const REWARDS_API = `/api/rewards`;

export const GET_ALL_AVAILABLE_REWARDS = `${ALLOW_ANONYMOUS}${REWARDS_API}`;
export const INSERT_CLAIMED_REWARD = `${REWARDS_API}`;
export const GET_CLAIMABLE_REWARDS = `${ALLOW_ANONYMOUS}${REWARDS_API}/claimable`;
export const ENROLL_REWARDS_USER = `${REWARDS_API}/enroll`;
export const SUBMIT_REWARD_REFERRAL_EMAILS = `${REWARDS_API}/emailReferral`;
export const RECORD_REWARD_FACEBOOK_SHARE = `${REWARDS_API}/facebook`;
export const SUBMIT_USER_REWARDS_REVIEW = (reviewScore: number) => `${REWARDS_API}/submitreview/${reviewScore}`;
export const GET_USER_REWARDS_TRANSACTIONS = (pageSize?: number, pageIndex?: number) => `${REWARDS_API}/transactions?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const GET_REWARDS_USER = `${REWARDS_API}/user`;
export const SUBMIT_CLAIM_REWARDS = `${REWARDS_API}/claim`;

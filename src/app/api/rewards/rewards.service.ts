import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '../../core/http/http.service';

import {
  GET_ALL_AVAILABLE_REWARDS,
  INSERT_CLAIMED_REWARD,
  GET_CLAIMABLE_REWARDS,
  ENROLL_REWARDS_USER,
  SUBMIT_REWARD_REFERRAL_EMAILS,
  RECORD_REWARD_FACEBOOK_SHARE,
  SUBMIT_USER_REWARDS_REVIEW,
  GET_USER_REWARDS_TRANSACTIONS,
  GET_REWARDS_USER,
  SUBMIT_CLAIM_REWARDS,
} from './rewards.api';
import { Rewards, RewardsClaimable, RewardsTransactionHistory, RewardsUser } from './rewards.models';

@Injectable({
  providedIn: 'root',
})

export class RewardsService {

  constructor(private _http: Http, private _httpClient: HttpClient, ) {}

  getListOfAllAvailableRewards():
    Observable<Rewards[]> {
    return this._httpClient
      .get<Rewards[]>(GET_ALL_AVAILABLE_REWARDS);
  }

  insertClaimedReward(rewardClaimedId: number): Observable<RewardsUser> {
    return this._http
      .post<RewardsUser>(INSERT_CLAIMED_REWARD, rewardClaimedId);
  }

  getListOfAllClaimableRewards():
    Observable<RewardsClaimable[]> {
    return this._httpClient
      .get<RewardsClaimable[]>(GET_CLAIMABLE_REWARDS);
  }

  enrollUserIntoRewardsProgram(): Observable<RewardsUser> {
    return this._http
      .post<RewardsUser>(ENROLL_REWARDS_USER, null);
  }

  submitRewardsReferralEmails(emailAddresses: string[]):
    Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' });
    const options = { headers: headers };
    const body = JSON.stringify(emailAddresses);
    return this._http
      .post<boolean>(SUBMIT_REWARD_REFERRAL_EMAILS, body, options);
  }

  recordRewardForFacebookShare():
    Observable<boolean> {
    return this._http
      .post<boolean>(RECORD_REWARD_FACEBOOK_SHARE, null);
  }

  submitUserRewardsReview(reviewScore: number, reviewText: string):
    Observable<boolean> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json' });
    const options = { headers: headers };
    const body = JSON.stringify(reviewText);
    return this._http
      .post<boolean>(SUBMIT_USER_REWARDS_REVIEW(reviewScore), body, options);
  }

  getUserRewardsTransactions(pageSize?: number, pageIndex?: number):
    Observable<RewardsTransactionHistory[]> {
    return this._http
      .get<RewardsTransactionHistory[]>(GET_USER_REWARDS_TRANSACTIONS(pageSize, pageIndex));
  }

  getRewardsUser(): Observable<RewardsUser> {
    return this._http
      .get<RewardsUser>(GET_REWARDS_USER);
  }

  submitClaimReward(id: number): Observable<RewardsUser> {
    return this._http
      .post<RewardsUser>(SUBMIT_CLAIM_REWARDS, id);
  }
}

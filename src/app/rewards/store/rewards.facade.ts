import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { fetchAvailableRewards, fetchClaimableRewards, fetchUserRewardsBalance, fetchUserRewardsTransactions, submitClaimReward } from './rewards.actionts';
import { selectRewards, selectRewardsBalance, selectRewardsClaimable, selectRewardsTransactions } from './rewards.selectors';
import { RewardsState } from './rewards.store';

@Injectable({
  providedIn: 'root'
})
export class RewardsFacade {
  rewards$ = this._store.select(selectRewards);
  rewardsClaimable$ = this._store.select(selectRewardsClaimable);
  rewardsBalance$ = this._store.select(selectRewardsBalance);
  rewardsTransactions$ = this._store.select(selectRewardsTransactions);

  constructor(private _store: Store<RewardsState>) {}

  fetchAvailableRewards() {
    this._store.dispatch(fetchAvailableRewards());
  }

  fetchClaimableRewards() {
    this._store.dispatch(fetchClaimableRewards());
  }

  fetchUserRewardsBalance() {
    this._store.dispatch(fetchUserRewardsBalance());
  }

  fetchUserRewardsTransactions() {
    this._store.dispatch(fetchUserRewardsTransactions());
  }

  submitClaimReward(id: number) {
    this._store.dispatch(submitClaimReward({id}));
  }
}

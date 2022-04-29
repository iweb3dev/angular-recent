import { createReducer, on } from '@ngrx/store';
import { RewardsStateModel } from './rewards.model';

import * as RewardsAction from './rewards.actionts';

export const rewardsSlice = 'rewards';

const initialRewardsState: RewardsStateModel = {
  rewards: null,
  rewardsClaimable: null,
  rewardsBalance: null,
  rewardsTransactions: null,
};

export const reducer = createReducer(
  initialRewardsState,
  on(RewardsAction.setAvailableRewards, (state, action) => ({ ...state, rewards: action.rewards })),
  on(RewardsAction.setClaimableRewards, (state, action) => ({ ...state, rewardsClaimable: action.rewardsClaimable })),
  on(RewardsAction.setUserRewardsBalance, (state, action) => ({ ...state, rewardsBalance: action.rewardsBalance })),
  on(RewardsAction.setUserUserRewardsTransactions, (state, action) => ({ ...state, rewardsTransactions: action.rewardsTransactions })),
);

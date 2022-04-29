import { createSelector } from '@ngrx/store';

import { RewardsStateModel } from './rewards.model';

export const selectRewardsState = (state) => {
  return state.rewardsStore.rewards;
};

export const selectRewards = createSelector(
  selectRewardsState,
  (state: RewardsStateModel) => {
    return state.rewards ? state.rewards : null;
  },
);

export const selectRewardsClaimable = createSelector(
  selectRewardsState,
  (state: RewardsStateModel) => {
    return state.rewardsClaimable ?? null;
  },
);

export const selectRewardsBalance = createSelector(
  selectRewardsState,
  (state: RewardsStateModel) => {
    return state.rewardsClaimable ? state.rewardsBalance : null;
  },
);

export const selectRewardsTransactions = createSelector(
  selectRewardsState,
  (state: RewardsStateModel) => {
    return state.rewardsClaimable ? state.rewardsTransactions : [];
  },
);

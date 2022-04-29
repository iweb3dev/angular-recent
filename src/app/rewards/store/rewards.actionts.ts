import { createAction, props } from '@ngrx/store';
import {
  Rewards,
  RewardsClaimable,
  RewardsUser,
} from 'src/app/api/rewards/rewards.models';
import { RewardHistoryRewardsTransactionHistoryModel } from '../components/reward-history/reward-history.model';

export const fetchAvailableRewards = createAction(
  '[Rewards] Fetch Available Rewards',
);
export const setAvailableRewards = createAction(
  '[Rewards] Set Available Rewards',
  props<{ rewards: Rewards[] }>(),
);

export const fetchClaimableRewards = createAction(
  '[Rewards] Fetch Claimable Rewards',
);
export const setClaimableRewards = createAction(
  '[Rewards] Set Claimable Rewards',
  props<{ rewardsClaimable: RewardsClaimable[] }>(),
);

export const fetchUserRewardsBalance = createAction(
  '[Rewards] Fetch User Rewards Balance',
);
export const setUserRewardsBalance = createAction(
  '[Rewards] Set User Rewards Balance',
  props<{ rewardsBalance: RewardsUser }>(),
);

export const fetchUserRewardsTransactions = createAction(
  '[Rewards] Fetch User Rewards Transactions',
);
export const setUserUserRewardsTransactions = createAction(
  '[Rewards] Set User Rewards Transactions',
  props<{
    rewardsTransactions: RewardHistoryRewardsTransactionHistoryModel[];
  }>(),
);

export const submitClaimReward = createAction(
  '[Rewards] Claim Reward',
  props<{ id: number }>(),
);

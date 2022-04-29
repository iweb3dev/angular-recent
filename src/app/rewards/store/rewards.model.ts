import {
  Rewards,
  RewardsClaimable,
  RewardsUser,
} from 'src/app/api/rewards/rewards.models';
import { RewardHistoryRewardsTransactionHistoryModel } from '../components/reward-history/reward-history.model';

export interface RewardsStateModel {
  rewards: Rewards[];
  rewardsClaimable: RewardsClaimable[];
  rewardsBalance: RewardsUser;
  rewardsTransactions: RewardHistoryRewardsTransactionHistoryModel[];
}

export interface CustomRewards {
  icon: string;
  newLink: string;
  rewardName: string;
  rewardValue: number;
  rewardDescription: string;
}

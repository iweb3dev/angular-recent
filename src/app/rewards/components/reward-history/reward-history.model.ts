import { RewardsTransactionHistory } from 'src/app/api/rewards/rewards.models';

export enum RewardHistoryColumns {
  Description = 'description',
  RewardDate = 'rewardDate',
  Points = 'points'
}

export interface RewardHistoryRewardsTransactionHistoryModel
  extends Omit<
    RewardsTransactionHistory,
    'rewardDate'
  > {
    rewardDate: string;
  }

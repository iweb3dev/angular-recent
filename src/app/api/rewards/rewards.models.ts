export interface Rewards {
  id: number;
  rewardName: string;
  rewardDescription: string;
  rewardValue: number;
  moneyValue: number;
  rewardPeriod: number;
  link: string;
  isDeleted: boolean;
  sortOrder: number;
  insertedDateTime: Date;
}

export interface RewardsUser {
  id: number;
  userId: number;
  remainingRewardBalance: number;
  claimedRewardBalance: number;
  claimedMoneyBalance: number;
  insertedDateTime: Date;
  modifiedDateTime: Date;
}

export interface RewardsClaimable {
  id: number;
  rewardName: string;
  rewardDescription: string;
  rewardValue: number;
  moneyValue: number;
  isDeleted: boolean;
  sortOrder: number;
  insertedDateTime: Date;
  modifiedDateTime: Date;
}

export interface RewardsTransactionHistory {
  id: number;
  description: string;
  rewardId: number;
  rewardDate: Date;
  points: number;
}

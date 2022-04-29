import { ActionReducerMap } from '@ngrx/store';
import { RewardsEffects } from './rewards.effects';
import { RewardsStateModel } from './rewards.model';
import * as fromRewards from './rewards.reducer';

export const featureStore = 'rewardsStore';

export interface RewardsState {
  [fromRewards.rewardsSlice]: RewardsStateModel;
}

export const reducers: ActionReducerMap<any> = {
  [fromRewards.rewardsSlice]: fromRewards.reducer,
};

export const effects = [
  RewardsEffects
];

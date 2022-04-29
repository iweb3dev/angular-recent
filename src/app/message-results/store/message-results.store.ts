import { ActionReducerMap } from '@ngrx/store';
import { MessageResultsDetailEffects } from '../message-results-detail/store/message-results-detail.effects';
import * as fromMessageResultsDetail from '../message-results-detail/store/message-results-detail.reducer';

export const featureStore = 'messageResultsStore';

export interface MessageResultsState {
  [fromMessageResultsDetail.messageResultsDetailSlice]: fromMessageResultsDetail.MessageResultsDetailState;
}

export const reducers: ActionReducerMap<MessageResultsState> = {
  [fromMessageResultsDetail.messageResultsDetailSlice]: fromMessageResultsDetail.reducer
};

export const effects = [
  MessageResultsDetailEffects
];

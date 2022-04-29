import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CoreState } from '../../core.store';

import { NewMessageStateModel } from './new-message.models';
import { newMessageFeatureKey } from './new-message.reducer';

const selectFeatureState = createFeatureSelector<CoreState>('coreStore');

export const selectCreateMessageState = createSelector(
  selectFeatureState,
  (state) => state[newMessageFeatureKey],
);

export const selectMessage = createSelector(
  selectCreateMessageState,
  (state: NewMessageStateModel) => state.messageReducer,
);

export const selectAudioRecordingUrl = createSelector(
  selectCreateMessageState,
  (state: NewMessageStateModel) => state.messageReducer.audioRecordingUrl,
);

export const selectConfirm = createSelector(
  selectCreateMessageState,
  (state: NewMessageStateModel) => state.confirmReducer,
);

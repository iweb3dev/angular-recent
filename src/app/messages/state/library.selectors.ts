import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LibraryStateModel } from '../messages.models';

import { messageLibraryFeatureKey } from './library,reducer';

export const selectLibraryState = createFeatureSelector<LibraryStateModel>(
  messageLibraryFeatureKey,
);

export const selectMessageLibraryState = createSelector(
  selectLibraryState,
  (state: LibraryStateModel) => state.messageLibraryReducer,
);

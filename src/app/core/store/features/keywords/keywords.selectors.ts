import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '../../core.store';
import * as fromKeywords from './keywords.reducer';

const getFeatureSlice = createFeatureSelector<fromCore.CoreState>('coreStore');

export const getKeywordsState = createSelector(
  getFeatureSlice,
  (state) => state.keywords
);

export const getAllKeywords = createSelector(
  getKeywordsState,
  (state) => Object.values(state.entities)
);


export const selectShowDeleteSelection = createSelector(
  getKeywordsState,
  (state) => state.showDeleteSelection,
);

export const selectAllKeywords = createSelector(
  getKeywordsState,
  fromKeywords.selectAllKeywords
);

export const selectKeywordsToDelete = createSelector(
  selectAllKeywords,
  state => state.filter((keyword) => keyword.flaggedForDelete).map((keyword) => keyword.keyword),
);

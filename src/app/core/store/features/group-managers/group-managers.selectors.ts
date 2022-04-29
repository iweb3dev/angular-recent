import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '../../core.store';
import * as fromGroupManagers from './group-managers.reducer';

const getFeatureSlice = createFeatureSelector<fromCore.CoreState>('coreStore');

export const getGroupManagersState = createSelector(
  getFeatureSlice,
  (state) => state.groupManagers
);

export const getAllGroupManagers = createSelector(
  getGroupManagersState,
  fromGroupManagers.selectAllGroupManagers
);

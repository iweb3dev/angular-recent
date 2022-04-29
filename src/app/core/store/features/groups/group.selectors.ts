import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '../../core.store';

const getFeaturSlice = createFeatureSelector<fromCore.CoreState>(fromCore.featureStore);

export const getGroupState = createSelector(
  getFeaturSlice,
  (state) => state.groups
);

export const getAllGroups = createSelector(
  getGroupState,
  (state) => Object.values(state.entities)
);

export const getGroupById = createSelector(
  getAllGroups,
  (groups) => (id: number) => groups.find(s => s.id === id)
);

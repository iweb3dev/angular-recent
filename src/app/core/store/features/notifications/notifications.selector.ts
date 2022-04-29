import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '../../core.store';

const getFeaturSlice = createFeatureSelector<fromCore.CoreState>(fromCore.featureStore);

const getNotificationSlice = createSelector(
  getFeaturSlice,
  (state) => state.notifications
);

export const getLatestNotifications = createSelector(
  getNotificationSlice,
  (state) => Object.values(state.entities).sort((a, b) => a.id > b.id ? 1 : -1)
);

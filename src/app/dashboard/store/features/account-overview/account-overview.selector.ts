import * as fromDashboard from '../../dashboard.store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getFeatureSlice = createFeatureSelector<fromDashboard.DashboardState>(
  fromDashboard.featureStore
);

const getAccountOverviewState = createSelector(
  getFeatureSlice,
  (state) => state.accountOverview
);

export const getAccountOverview = createSelector(
  getAccountOverviewState,
  (state) => ({
    totalGroupMembers: state.totalGroupMembers,
    totalActiveAddresses: state.totalActiveAddresses,
    totalActivePhoneNumbers: state.totalActivePhoneNumbers,
    totalActiveEmailAddresses: state.totalActiveEmailAddresses,
  })
);

export const getAccountOverviewHasLoaded = createSelector(
  getAccountOverviewState,
  (state) => state.hasLoaded
);

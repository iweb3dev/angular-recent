import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDashboard from '../../dashboard.store';

const getFeaturSlice = createFeatureSelector<fromDashboard.DashboardState>(
  fromDashboard.featureStore
);

const getDasboardSummaryState = createSelector(
  getFeaturSlice,
  (state) => state.dashboardSummary
);

export const getDashboardSummary = createSelector(
  getDasboardSummaryState,
  (state) => ({
    endpointsSendTo: state.endpointsSentTo,
    communicationsSent: state.communicationsSent,
    timeSavings: state.timeSavings,
    callsAttempted: state.callsAttempted,
    emailsAttempted: state.emailsAttempted,
    smsAttempted: state.smsAttempted,
  })
);

export const getDashboardSummaryHasLoaded = createSelector(
  getDasboardSummaryState,
  (state) => state.hasLoaded
);

import { ActionReducerMap } from '@ngrx/store';

import * as fromAccountOverview from './features/account-overview/account-overview.reducer';
import * as fromDashboardSummary from './features/dashboard-summary/dashboard-summary.reducer';

import { AccountOverviewEffects } from './features/account-overview/account-overview.effects';
import { DashboardSummaryEffects } from './features/dashboard-summary/dashboard-summary.effects';

export const featureStore = 'dashboardStore';

export interface DashboardState {
  [fromAccountOverview.accountOverviewsSlice]: fromAccountOverview.AccountOverviewState;
  [fromDashboardSummary.dashboardSummarysSlice]: fromDashboardSummary.DashboardSummaryState;
}

export const reducers: ActionReducerMap<DashboardState> = {
  [fromAccountOverview.accountOverviewsSlice]: fromAccountOverview.reducer,
  [fromDashboardSummary.dashboardSummarysSlice]: fromDashboardSummary.reducer,
};

export const effects = [AccountOverviewEffects, DashboardSummaryEffects];

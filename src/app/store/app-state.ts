import * as fromDashboard from '../dashboard/store/dashboard.store';
import * as fromRouter from './router/router.store';
import * as fromCore from '../core/store/core.store';
import * as fromMessageResults from '../message-results/store/message-results.store';

export interface AppState
  extends fromRouter.RouterState {
  [fromDashboard.featureStore]: fromDashboard.DashboardState;
  [fromCore.featureStore]: fromCore.CoreState;
  [fromMessageResults.featureStore]: fromMessageResults.MessageResultsState;
}

import { Action, createReducer, on } from '@ngrx/store';
import { getDashboardSummaryResolve } from './dashboard-summary.actions';

export const dashboardSummarysSlice = 'dashboardSummary';

export interface DashboardSummaryState {
  communicationsSent: number;
  endpointsSentTo: number;
  emailsAttempted: number;
  callsAttempted: number;
  smsAttempted: number;
  timeSavings: string;
  hasLoaded: boolean;
}

const dashboardSummaryInitialState: DashboardSummaryState = {
  communicationsSent: 0,
  emailsAttempted: 0,
  endpointsSentTo: 0,
  callsAttempted: 0,
  hasLoaded: false,
  smsAttempted: 0,
  timeSavings: '',
};

const dashboardSummaryReducer = createReducer(
  dashboardSummaryInitialState,
  on(
    getDashboardSummaryResolve,
    (
      state,
      {
        endpointsSentTo,
        timeSavings,
        communicationsSent,
        smsAttempted,
        callsAttempted,
        emailsAttempted,
      }
    ) => ({
      ...state,
      endpointsSentTo: endpointsSentTo,
      timeSavings: timeSavings,
      communicationsSent: communicationsSent,
      smsAttempted: smsAttempted,
      callsAttempted: callsAttempted,
      emailsAttempted: emailsAttempted,
      hasLoaded: true,
    })
  )
);

export function reducer(state: DashboardSummaryState, action: Action) {
  return dashboardSummaryReducer(state, action);
}

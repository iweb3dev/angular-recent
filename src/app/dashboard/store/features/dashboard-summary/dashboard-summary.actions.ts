import { createAction, props } from '@ngrx/store';

export const getDashboardSummaryStart = createAction(
  '[Dashboard Summary] Get Start',
  props<{ startDate?: string; endDate?: string }>()
);
export const getDashboardSummaryResolve = createAction(
  '[Dashboard Summary] Get Resolve',
  props<{
    timeSavings: string;
    smsAttempted: number;
    callsAttempted: number;
    emailsAttempted: number;
    endpointsSentTo: number;
    communicationsSent: number;
  }>()
);


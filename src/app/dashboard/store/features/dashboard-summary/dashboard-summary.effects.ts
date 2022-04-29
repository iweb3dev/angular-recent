import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { DashboardService } from 'src/app/api/dashboard/dashboard.service';
import { IDashboardSummaryResponse } from 'src/app/shared/models/contracts/IDashboardSummaryResponse.interface';
import {
  getDashboardSummaryResolve,
  getDashboardSummaryStart,
} from './dashboard-summary.actions';

@Injectable({
  providedIn: 'root',
})
export class DashboardSummaryEffects {
  constructor(
    private actions$: Actions,
    private _dasboardService: DashboardService
  ) {}

  getDashboardSummaryStart = createEffect(() =>
    this.actions$.pipe(
      ofType(getDashboardSummaryStart),
      switchMap(({ startDate, endDate }) =>
        this._dasboardService.getDashboardSummary(startDate, endDate).pipe(
          switchMap((summary: IDashboardSummaryResponse) => {
            return [
              getDashboardSummaryResolve({
                communicationsSent: summary.communicationsSent,
                endpointsSentTo: summary.endpointsSentTo,
                timeSavings: summary.timeSavings,
                callsAttempted: summary.callsAttempted,
                emailsAttempted: summary.emailsAttempted,
                smsAttempted: summary.smsAttempted,
              }),
            ];
          })
        )
      )
    )
  );
}

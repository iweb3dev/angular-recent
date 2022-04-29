import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { getDashboardSummary, getDashboardSummaryHasLoaded } from './dashboard-summary.selectors';
import { getDashboardSummaryStart } from './dashboard-summary.actions';


@Injectable({
  providedIn: 'root'
})
export class DashboardSummaryFacade {
  hasLoaded$ = this._store.select(getDashboardSummaryHasLoaded);
  dashboardSummary$ = this._store.select(getDashboardSummary);

  constructor(private _store: Store<AppState>) {}

  getDashboardSummary = (startDate?: string, endDate?: string) => this._store.dispatch(getDashboardSummaryStart({
    endDate: endDate,
    startDate: startDate
  }))
}

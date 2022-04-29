import { Http } from '../../core/http/http.service';
import { Injectable } from '@angular/core';
import { DASHBOARD_GET_SUMMARY_BY_DATES } from './dashboard.api';
import { CommunicationsSummaryByDateRange } from '../communications/communications.models';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: Http) {}

  getDashboardSummary(startDate?: string, endDate?: string) {
    return this._http
      .get(DASHBOARD_GET_SUMMARY_BY_DATES(startDate, endDate));
  }
}

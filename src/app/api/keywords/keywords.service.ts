import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Http } from '../../core/http/http.service';
import { PagedList } from '../shared/shared.models';
import {
  GET_USER_KEYWORDS,
  DELETE_SPECIFIC_KEYWORD,
  DELETE_ALL_KEYWORDS,
  GET_ALL_PREPAY_OPTIONS,
  POST_PURCHASE_KEYWORD,
  LOOKUP_KEYWORD,
  UPDATE_KEYWORD,
} from './keywords.api';
import { Keyword } from './keywords.models';
import { BasePaymentProfile } from 'src/app/api/financials/financials.models';
import { FinancialsService } from 'src/app/api/financials/financials.service';

@Injectable({
  providedIn: 'root',
})
export class KeywordsService {
  constructor(
    private _Http: Http,
    private _financialsService: FinancialsService
  ) {}

  fetchPaymentProfiles(
    customerProfileId: number,
  ): Observable<BasePaymentProfile[]> {
    return this._financialsService.getPaymentProfiles(customerProfileId);
  }

  getUserKeywords(
    pageSize?: number,
    pageIndex?: number,
  ): Observable<PagedList<Keyword>> {
    return this._Http.get<PagedList<Keyword>>(
      GET_USER_KEYWORDS(pageSize, pageIndex),
    );
  }

  deleteSpecificKeyword(keyword: string): Observable<object> {
    return this._Http.delete(DELETE_SPECIFIC_KEYWORD(keyword));
  }

  deleteAllKeywords(): Observable<object> {
    return this._Http.delete(DELETE_ALL_KEYWORDS);
  }

  getPrepayOptions(): Observable<any> {
    return this._Http.get(GET_ALL_PREPAY_OPTIONS);
  }

  purchaseKeyword(
    paymentProfileId: number,
    data: { keywords: Array<string>; prepayOptionId: number },
  ): Observable<object> {
    return this._Http.post(POST_PURCHASE_KEYWORD(paymentProfileId), data);
  }

  getKeywordValidOrNot(keyword: string): Observable<boolean> {
    return this._Http.get(LOOKUP_KEYWORD(keyword));
  }

  updateKeyword(keywordObj: Keyword) {
    return this._Http.put(UPDATE_KEYWORD, keywordObj);
  }
}

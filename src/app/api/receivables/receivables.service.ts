import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import { FinancialAccount } from '../shared/shared.models';
import {

  DELETE_RECEIVABLE_ACCOUNT,
  GET_RECEIVABLE_ACCOUNTS,
  CREATE_RECEIVABLE_ACCOUNT,
  GET_RECEIVABLE_ACCOUNT,
  UPDATE_RECEIVABLE_ACCOUNT,
  UPDATE_RECEIVABLE_ACCOUNT_STATUS,

} from './receivables.api';

@Injectable({
  providedIn: 'root',
})

export class ReceivablesService {

  constructor(private _http: Http) {}

  getReceivableAccounts(pageSize: number, pageIndex: number):
    Observable<FinancialAccount[]> {
    return this._http
      .get<FinancialAccount[]>(GET_RECEIVABLE_ACCOUNTS(pageSize, pageIndex));
  }

  saveReceivableAccount(account: FinancialAccount):
    Observable<number> {
    return this._http
      .post<number>(CREATE_RECEIVABLE_ACCOUNT, account);
  }

  deleteReceivableAccount(accountId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_RECEIVABLE_ACCOUNT(accountId));
  }

  getReceivableAccount(accountId: number, pageSize?: number, pageIndex?: number):
    Observable<FinancialAccount> {
    return this._http
      .get<FinancialAccount>(GET_RECEIVABLE_ACCOUNT(accountId, pageSize, pageIndex));
  }

  // Save Receivable Account Changes
  updateReceivableAccount(accountId: number, account: FinancialAccount):
    Observable<number> {
    return this._http
      .put<number>(UPDATE_RECEIVABLE_ACCOUNT(accountId), account);
  }

  // Save Receivable Account Status
  updateReceivableAccountStatus(accountId: number, isActive: boolean):
    Observable<number> {
    return this._http
      .put<number>(UPDATE_RECEIVABLE_ACCOUNT_STATUS(accountId, isActive), null);
  }
}

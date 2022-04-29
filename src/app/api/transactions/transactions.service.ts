import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import {
  BaseOrderReceiptLineItem,
  OrderReceipt,
} from '../packages/packages.models';
import { PagedList } from '../shared/shared.models';
import {
  GET_SPECIFIC_ORDER_DETAILS,
  GET_SPECIFIC_ORDER_RECEIPT,
  GET_TRANSACTIONS,
  GET_USERS_ORDER_RECEIPTS_LIST,
} from './transactions.api';
import { TransactionsModelDto } from './transactions.models';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private _http: Http) {}

  getUserOrdersReceiptList(
    pageSize: number = 1500,
    pageIndex?: number,
  ): Observable<PagedList<OrderReceipt>> {
    return this._http.get<PagedList<OrderReceipt>>(
      GET_USERS_ORDER_RECEIPTS_LIST(pageSize, pageIndex),
    );
  }

  getSpecificOrderReceipt(orderId: number): Observable<OrderReceipt> {
    return this._http.get<OrderReceipt>(GET_SPECIFIC_ORDER_RECEIPT(orderId));
  }

  getSpecificOrderDetails(
    orderId: number,
  ): Observable<BaseOrderReceiptLineItem[]> {
    return this._http.get<BaseOrderReceiptLineItem[]>(
      GET_SPECIFIC_ORDER_DETAILS(orderId),
    );
  }

  getTransactions(
    pageIndex = 0,
    pageSize = 1500,
  ): Observable<TransactionsModelDto[]> {
    return this._http.get(GET_TRANSACTIONS(pageSize, pageIndex));
  }
}

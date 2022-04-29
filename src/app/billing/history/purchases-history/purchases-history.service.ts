import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { PagedList } from 'src/app/api/shared/shared.models';
import { TransactionsService } from 'src/app/api/transactions/transactions.service';
import { OrderReceiptDataSource } from './purchases-history.models';

@Injectable({ providedIn: 'root' })
export class PurchasesHistoryService {
  constructor(private _transactionsService: TransactionsService) {}

  fetchTransactions(
    pageIndex: number,
  ): Observable<PagedList<OrderReceiptDataSource>> {
    return this._transactionsService
      .getUserOrdersReceiptList(25, pageIndex)
      .pipe(
        map((data) => ({
          ...data,
          pagedObjects: data.pagedObjects.map((page) => ({
            ...page,
            processDateTime: moment(page.processDateTime).format('M/D/YYYY'),
          })),
        })),
      );
  }
}

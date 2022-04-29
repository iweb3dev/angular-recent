import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TransactionsService } from 'src/app/api/transactions/transactions.service';
import { TransactionTypesLabels } from 'src/app/shared/constants/financials.constants';

import { CreditsHistoryTransactionsModel } from './credits-history.models';

@Injectable({ providedIn: 'root' })
export class CreditsHistoryService {
  constructor(private _transactionsService: TransactionsService) {}

  fetchTransactions(
    pageIndex: number,
  ): Observable<CreditsHistoryTransactionsModel[]> {
    return this._transactionsService.getTransactions(pageIndex).pipe(
      map((data) =>
        data.map((datum) => ({
          ...datum,
          transactionDateTime: moment(datum.transactionDateTime).format(
            'M/D/YYYY; h:mm a',
          ),
          transactionType: TransactionTypesLabels[datum.transactionType],
        })),
      ),
    );
  }
}

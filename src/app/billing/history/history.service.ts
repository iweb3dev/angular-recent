import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { TransactionsService } from 'src/app/api/transactions/transactions.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

import { DownloadAllModel } from './history.models';

@Injectable()
export class HistoryService {
  constructor(
    private _loaderService: LoaderService,
    private _transactionsService: TransactionsService,
  ) {}

  downloadAll(): Observable<string> {
    this._loaderService.showLoader();
    return this._transactionsService.getUserOrdersReceiptList().pipe(
      tap(() => this._loaderService.removeLoader()),
      map((data) =>
        data.pagedObjects.map((datum) => ({
          amount: datum.amountPaid,
          invoice: datum.invoiceNumber,
          date: moment(datum.processDateTime).format('M/D/YYYY'),
        })),
      ),
      map((data) => this.convertToCsv(data)),
    );
  }

  private convertToCsv(data: DownloadAllModel[]): string {
    const array = [Object.keys(data[0]), ...data];
    const csvTable = array
      .map((row) =>
        Object.values(row)
          .map((value) =>
            typeof value === 'string' ? JSON.stringify(value) : value,
          )
          .toString(),
      )
      .join('\n');

    return `data:text/csv;charset=utf-8, ${csvTable}`;
  }
}

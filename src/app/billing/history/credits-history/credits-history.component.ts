import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BillingFacade } from '../../state/billing.facade';
import { COLUMN_DEFINITIONS } from './credits-history-consts';

import {
  CreditsHistoryColumns,
  CreditsHistoryTransactionsModel,
} from './credits-history.models';

import { CreditsHistoryService } from './credits-history.service';

@Component({
  selector: 'app-credits-history',
  templateUrl: './credits-history.component.html',
  styleUrls: ['./credits-history.component.scss'],
})
export class CreditsHistoryComponent implements OnInit, OnDestroy {
  readonly COLUMN_DEFINITIONS = COLUMN_DEFINITIONS;

  dataSource$: Observable<CreditsHistoryTransactionsModel[]>;

  private _sortChanged$ = new BehaviorSubject<Sort>(null);

  constructor(
    private _billingFacade: BillingFacade,
    private _creditsHistoryService: CreditsHistoryService,
  ) {}

  get isMobileView(): boolean {
    return window.innerWidth <= 599;
  }

  ngOnInit(): void {
    this.dataSource$ = combineLatest([
      this._creditsHistoryService.fetchTransactions(0),
      this._sortChanged$,
      this._billingFacade.historySearchValue$,
    ]).pipe(
      map(([transactions, sort, searchValue]) =>
        this.sortTableData(transactions, sort).filter((row) =>
          this.filterTableData(row, searchValue),
        ),
      ),
    );
  }

  sortData(event: Sort): void {
    this._sortChanged$.next(event);
  }

  ngOnDestroy(): void {
    this._billingFacade.resetSearch();
    this._sortChanged$.complete();
  }

  private sortTableData(
    transactions: CreditsHistoryTransactionsModel[],
    sort: Sort,
  ): CreditsHistoryTransactionsModel[] {
    if (!sort) {
      return transactions;
    }

    return transactions.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case CreditsHistoryColumns.Adjustment:
          return compare(a.balanceAdjustment, b.balanceAdjustment, isAsc);
        case CreditsHistoryColumns.Comment:
          return compare(a.comment, b.comment, isAsc);
        case CreditsHistoryColumns.User:
          return compare(a.createdBy, b.createdBy, isAsc);
        case CreditsHistoryColumns.TransactionType:
          return compare(a.transactionType, b.transactionType, isAsc);
        case CreditsHistoryColumns.ProcessedDateTime:
          return compare(
            new Date(a.transactionDateTime),
            new Date(b.transactionDateTime),
            isAsc,
          );
        default:
          return 0;
      }
    });
  }

  private filterTableData(
    row: CreditsHistoryTransactionsModel,
    searchValue: string,
  ): boolean {
    if (!searchValue) {
      return true;
    }
    searchValue = searchValue.toLowerCase();
    return (
      row[CreditsHistoryColumns.Adjustment]
        .toString()
        .toLowerCase()
        .includes(searchValue) ||
      row[CreditsHistoryColumns.Comment].toLowerCase().includes(searchValue) ||
      row[CreditsHistoryColumns.ProcessedDateTime]
        .toLowerCase()
        .includes(searchValue) ||
      row[CreditsHistoryColumns.TransactionType]
        .toLowerCase()
        .includes(searchValue) ||
      row[CreditsHistoryColumns.User].toLowerCase().includes(searchValue)
    );
  }
}

function compare(
  a: number | string | Date,
  b: number | string | Date,
  isAsc: boolean,
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

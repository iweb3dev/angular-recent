import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  map,
  tap,
  filter,
  startWith,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { PaymentStatuses } from '@api/shared/shared.enums';

import {
  OrderReceiptDataSource,
  PurchaseHistoryColumns,
} from './purchases-history.models';

import { BillingFacade } from '../../state/billing.facade';
import { PurchasesHistoryService } from './purchases-history.service';

@Component({
  selector: 'app-purchases-history',
  templateUrl: './purchases-history.component.html',
  styleUrls: ['./purchases-history.component.scss'],
})
export class PurchasesHistoryComponent implements OnDestroy, OnInit {
  @ViewChild(MatSort) sort: MatSort;

  readonly currencyIcon = '$';
  readonly PaymentStatuses = PaymentStatuses;
  readonly PurchaseHistoryColumns = PurchaseHistoryColumns;

  displayedColumns: string[] = [
    PurchaseHistoryColumns.Invoice,
    PurchaseHistoryColumns.Date,
    PurchaseHistoryColumns.TransactionNumber,
    PurchaseHistoryColumns.Amount,
    PurchaseHistoryColumns.PaymentStatus,
  ];

  pages = 0;
  loadingData = true;

  dataSource: MatTableDataSource<OrderReceiptDataSource>;

  private _complete$ = new Subject<void>();
  private _pageNumberSubject$ = new Subject<number>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _billingFacade: BillingFacade,
    private _purchasesHistoryService: PurchasesHistoryService
  ) {}

  ngOnInit(): void {
    this.createDataSourceStream()
      .pipe(withLatestFrom(this._billingFacade.historySearchValue$))
      .subscribe(([dataSource, filterValue]) => {
        this.dataSource = dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.filter = filterValue ?? '';
      });

    this._billingFacade.historySearchValue$
      .pipe(
        takeUntil(this._complete$),
        filter(() => !!this.dataSource)
      )
      .subscribe(
        (value) => (this.dataSource.filter = value?.trim().toLowerCase() ?? '')
      );
  }

  ngOnDestroy(): void {
    this._billingFacade.resetSearch();
    this._complete$.next();
    this._complete$.complete();
    this._pageNumberSubject$.complete();
  }

  onPageChange(page: number): void {
    this._pageNumberSubject$.next(page);
  }

  onInvoiceClick(receipt: OrderReceiptDataSource): void {
    this._router.navigate(['../../', 'purchase-invoice', receipt.orderID], {
      relativeTo: this._route,
    });
  }

  private createDataSourceStream(): Observable<
    MatTableDataSource<OrderReceiptDataSource>
  > {
    return this._pageNumberSubject$.pipe(
      startWith(0),
      takeUntil(this._complete$),
      tap(() => (this.loadingData = true)),
      switchMap((pageNumber) =>
        this._purchasesHistoryService.fetchTransactions(pageNumber).pipe(
          tap((result) => {
            this.pages = result.totalPages;
            this.loadingData = false;
          }),
          map((data) => {
            data.pagedObjects.forEach(
              (record) =>
                ((<unknown>record.processDateTime) = new Date(
                  record.processDateTime
                ).setHours(0, 0, 0, 0))
            );
            return new MatTableDataSource(data.pagedObjects);
          })
        )
      )
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';

import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { PurchaseInvoiceModel } from './purchase-invoice.models';

import { PurchaseInvoiceService } from './purchase-invoice.service';

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.scss'],
})
export class PurchaseInvoiceComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userFacade: UserFacade,
    private _purchaseInvoiceService: PurchaseInvoiceService
  ) {}

  invoiceDataStream$: Observable<PurchaseInvoiceModel>;

  userTimeZone = null;

  ngOnInit(): void {
    this.invoiceDataStream$ = this.createInvoiceDataStream();
  }

  showAllPurchases(): void {
    this._router.navigate(['../../', 'history', 'purchases'], {
      relativeTo: this._route,
    });
  }

  downloadInvoice(invoiceData: PurchaseInvoiceModel): void {
    const csvData = this._purchaseInvoiceService.createPurchaseCsv(invoiceData);
    const encodedUri = encodeURI(csvData);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'purchase_history.csv');
    document.body.appendChild(link);

    link.click();
  }

  private createInvoiceDataStream(): Observable<PurchaseInvoiceModel> {
    return this._userFacade.currentUserInfo$.pipe(
      filter((user) => !!user),
      take(1),
      tap((user) => this.userTimeZone = user.timeZone.utcOffSet),
      mergeMap((userInfo) =>
        forkJoin([
          this._purchaseInvoiceService.fetchReceipt(
            this._route.snapshot.params.id
          ),
          this._purchaseInvoiceService.fetchReceiptDetail(
            this._route.snapshot.params.id
          ),
        ]).pipe(
          map(([receiptData, receiptDetailData]) =>
            this._purchaseInvoiceService.createInvoiceParams(
              userInfo,
              receiptData,
              receiptDetailData
            )
          )
        )
      )
    );
  }
}

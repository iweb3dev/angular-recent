import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PurchaseInvoiceModel } from './purchase-invoice.models';
import { OrderReceipt } from 'src/app/api/packages/packages.models';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { BaseOrderReceiptLineItem } from './../../api/packages/packages.models';

import { TransactionsService } from 'src/app/api/transactions/transactions.service';

@Injectable()
export class PurchaseInvoiceService {
  constructor(private _transactionService: TransactionsService) {}

  createInvoiceParams(
    userInfo: MainUserInfoModel,
    orderReceipt: OrderReceipt,
    orderReceiptData: BaseOrderReceiptLineItem[]
  ): PurchaseInvoiceModel {
    return {
      merchant: 'CallingPost Communications',
      description: this.purchaseInvoiceDescription(
        orderReceipt,
        orderReceiptData
      ),
      invoiceNumber: orderReceipt.invoiceNumber,
      customerId: userInfo.username,
      name: userInfo.displayName,
      email:
        userInfo.emailAddresses?.find((address) => address.isPrimary)?.email ??
        '',
      phone:
        userInfo.phoneNumbers?.find((phone) => phone.isPrimary)?.phoneNumber ??
        '',
      dateTime: orderReceipt.processDateTime,
      transactionId: orderReceipt.transactionNumber,
      total: orderReceipt.amountPaid,
    };
  }

  fetchReceipt(id: number): Observable<OrderReceipt> {
    return this._transactionService.getSpecificOrderReceipt(id);
  }

  fetchReceiptDetail(id: number): Observable<BaseOrderReceiptLineItem[]> {
    return this._transactionService.getSpecificOrderDetails(id);
  }

  createPurchaseCsv(invoiceData: PurchaseInvoiceModel): string {
    const array = [Object.keys(invoiceData), invoiceData];
    const csvTable = array
      .map((row) =>
        Object.values(row)
          .map((value) =>
            typeof value === 'string' ? JSON.stringify(value) : value
          )
          .toString()
      )
      .join('\n');

    return `data:text/csv;charset=utf-8, ${csvTable}`;
  }

  private purchaseInvoiceDescription(
    orderReceipt: OrderReceipt,
    baseOrderReceipt: Array<BaseOrderReceiptLineItem>
  ): string {
    const [baseOrderReceiptInfo] = baseOrderReceipt;

    return orderReceipt.description
      ? orderReceipt.description
      : baseOrderReceiptInfo.description;
  }
}

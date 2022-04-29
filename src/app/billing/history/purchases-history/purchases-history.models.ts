import { OrderReceipt } from 'src/app/api/packages/packages.models';

export enum PurchaseHistoryColumns {
  Invoice = 'invoiceNumber',
  Date = 'processDateTime',
  Amount = 'amountPaid',
  TransactionNumber = 'transactionNumber',
  PaymentStatus = 'paymentStatus',
}

export interface OrderReceiptDataSource
  extends Omit<OrderReceipt, 'processDateTime'> {
  processDateTime: string;
}

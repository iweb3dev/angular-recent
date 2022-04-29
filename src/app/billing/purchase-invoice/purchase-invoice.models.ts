export interface PurchaseInvoiceModel {
  merchant: 'CallingPost Communications';
  description: string;
  invoiceNumber: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  dateTime: Date;
  transactionId: string;
  total: number;
}

import { TransactionsModelDto } from 'src/app/api/transactions/transactions.models';

export enum CreditsHistoryColumns {
  ProcessedDateTime = 'transactionDateTime',
  TransactionType = 'transactionType',
  Adjustment = 'balanceAdjustment',
  Comment = 'comment',
  User = 'createdBy',
}

export interface CreditsHistoryTransactionsModel
  extends Omit<
    TransactionsModelDto,
    'transactionDateTime' | 'transactionType'
  > {
  transactionDateTime: string;
  transactionType: string;
}

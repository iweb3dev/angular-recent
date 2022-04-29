import { TransactionTypes } from '../shared/shared.enums';

export interface TransactionsModelDto {
  balanceAdjustment: number;
  comment: string;
  createdBy: string;
  id: number;
  modifiedByDatetime: string;
  modifiedByUserID: number;
  postingDate: Date;
  sourceID: number;
  status: number; // TODO: possibly enum
  transactionDateTime: Date;
  transactionType: TransactionTypes;
}

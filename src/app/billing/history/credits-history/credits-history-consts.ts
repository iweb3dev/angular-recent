import { VirtualTableColDef } from 'src/app/shared/components/virtual-table/virtual-table.models';
import { CreditsHistoryColumns } from './credits-history.models';

// .mat-column-transactionType,
// .mat-column-balanceAdjustment {
//   min-width: 120px;
// }

// .mat-column-transactionDateTime {
//   min-width: 180px;
// }

// .mat-column-comment {
//   min-width: 350px;
// }

// .mat-column-createdBy {
//   min-width: 220px;
// }

export const COLUMN_DEFINITIONS: VirtualTableColDef[] = [
  {
    displayedColumn: CreditsHistoryColumns.ProcessedDateTime,
    columnName: 'Processed Date/Time',
    width: 180,
  },
  {
    displayedColumn: CreditsHistoryColumns.TransactionType,
    columnName: 'Type',
    width: 120,
  },
  {
    displayedColumn: CreditsHistoryColumns.Adjustment,
    columnName: 'Adjustment',
    width: 120,
  },
  {
    displayedColumn: CreditsHistoryColumns.Comment,
    columnName: 'Comment',
    width: 350,
  },
  {
    displayedColumn: CreditsHistoryColumns.User,
    columnName: 'User',
    width: 220,
  },
];

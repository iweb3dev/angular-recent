import { VirtualTableColDef } from 'src/app/shared/components/virtual-table/virtual-table.models';
import { RewardHistoryColumns } from './reward-history.model';

export const COLUMN_DEFINITIONS: VirtualTableColDef[] = [
  {
    displayedColumn: RewardHistoryColumns.Description,
    columnName: 'REWARD',
    width: 180,
  },
  {
    displayedColumn: RewardHistoryColumns.RewardDate,
    columnName: 'DATE',
    width: 120,
  },
  {
    displayedColumn: RewardHistoryColumns.Points,
    columnName: 'POINTS',
    width: 120,
  },
];

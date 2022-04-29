import { AccountsManaged } from '@api/users/users.models';

export interface DialogData {
  id: number;
  accounts: AccountsManaged[];
}

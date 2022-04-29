import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GroupMemberDisplay } from 'src/app/api/members/members.models';

@Component({
  selector: 'app-group-member-print',
  templateUrl: './group-member-print.component.html',
  styleUrls: ['./group-member-print.component.scss'],
})
export class GroupMemberPrintComponent {
  constructor(
    public _dialogRef: MatDialogRef<GroupMemberPrintComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      groupName: string;
      memberCount: number;
      members: Array<GroupMemberDisplay>;
    }
  ) {}

  public printOnClick(): void {
    window.print();
  }

  public closeOnClick(): void {
    this._dialogRef.close();
  }
}

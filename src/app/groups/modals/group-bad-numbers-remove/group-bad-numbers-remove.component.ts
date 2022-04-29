import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GroupMemberService } from '../../services/group-member.service';

@Component({
  selector: 'app-group-bad-numbers-remove',
  templateUrl: './group-bad-numbers-remove.component.html',
  styleUrls: ['./group-bad-numbers-remove.component.scss'],
})
export class GroupBadNumbersRemoveComponent implements OnInit {
  constructor(
    private _groupMemberService: GroupMemberService,
    private _dialogRef: MatDialogRef<GroupBadNumbersRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { groupId: number; groupName: string }
  ) {}

  ngOnInit(): void {}

  public closeOnClick(): void {
    this._dialogRef.close();
  }

  public yesOnClick(): void {
    this._groupMemberService.removeBadNumbersFromGroup(this.data.groupId);
    this._dialogRef.close();
  }

  public downloadOnClick(): void {
    this._groupMemberService.exportBadNumbers(
      this.data.groupId,
      this.data.groupName
    );
    this._dialogRef.close();
  }
}

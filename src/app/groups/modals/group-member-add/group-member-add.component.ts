import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-group-member-add',
  templateUrl: './group-member-add.component.html',
  styleUrls: ['./group-member-add.component.scss'],
})
export class GroupMemberAddComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      addExistingMembers: boolean;
    }
  ) {}
}

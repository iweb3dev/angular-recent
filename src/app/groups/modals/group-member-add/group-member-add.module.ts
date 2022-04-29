import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { GroupMemberAddComponent } from './group-member-add.component';

@NgModule({
  declarations: [GroupMemberAddComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule],
})
export class GroupMemberAddModule {}

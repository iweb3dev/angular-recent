import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { MemberListModule } from 'src/app/members/member-list/member-list.module';

import { GroupTabsComponent } from './group-tabs.component';
import { GroupListModule } from '../group-list/group-list.module';

@NgModule({
  declarations: [GroupTabsComponent],
  imports: [CommonModule, MatTabsModule, GroupListModule, MemberListModule],
})
export class GroupTabsModule {}

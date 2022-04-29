import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NoMemberModule } from 'src/app/shared/components/member/no-member/no-member.module';

import { GroupMemberListDesktopComponent } from './group-member-list-desktop.component';
import { MemberVirtualTableDesktopModule } from 'src/app/shared/components/member/desktop/member-virtual-table-desktop/member-virtual-table-desktop.module';

@NgModule({
  declarations: [GroupMemberListDesktopComponent],
  imports: [
    CommonModule,
    RouterModule,

    LoaderModule,
    NoMemberModule,
    MemberVirtualTableDesktopModule,
  ],
  exports: [GroupMemberListDesktopComponent],
})
export class GroupMemberListDesktopModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NoMemberModule } from 'src/app/shared/components/member/no-member/no-member.module';
import { MemberVirtualTableDesktopModule } from 'src/app/shared/components/member/desktop/member-virtual-table-desktop/member-virtual-table-desktop.module';

import { MemberListDesktopComponent } from './member-list-desktop.component';

@NgModule({
  declarations: [MemberListDesktopComponent],
  imports: [
    RouterModule,
    CommonModule,

    LoaderModule,
    NoMemberModule,
    MemberVirtualTableDesktopModule,
  ],
  exports: [MemberListDesktopComponent],
})
export class MemberListDesktopModule {}

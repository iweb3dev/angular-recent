import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NoMemberModule } from 'src/app/shared/components/member/no-member/no-member.module';
import { MemberVirtualListMobileModule } from 'src/app/shared/components/member/mobile/member-virtual-list-mobile/member-virtual-list-mobile.module';

import { GroupMemberListMobileComponent } from './group-member-list-mobile.component';

@NgModule({
  declarations: [GroupMemberListMobileComponent],
  imports: [
    CommonModule,
    RouterModule,

    LoaderModule,
    NoMemberModule,
    MemberVirtualListMobileModule,
  ],
  exports: [GroupMemberListMobileComponent],
})
export class GroupMemberListMobileModule {}

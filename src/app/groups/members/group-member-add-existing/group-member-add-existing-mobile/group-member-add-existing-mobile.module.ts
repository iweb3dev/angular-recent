import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NoMemberModule } from 'src/app/shared/components/member/no-member/no-member.module';
import { MemberVirtualListMobileModule } from 'src/app/shared/components/member/mobile/member-virtual-list-mobile/member-virtual-list-mobile.module';

import { GroupMemberAddExistingMobileComponent } from './group-member-add-existing-mobile.component';

@NgModule({
  declarations: [GroupMemberAddExistingMobileComponent],
  imports: [
    RouterModule,
    CommonModule,

    LoaderModule,
    NoMemberModule,
    MemberVirtualListMobileModule,
  ],
  exports: [GroupMemberAddExistingMobileComponent],
})
export class GroupMemberAddExistingMobileModule {}

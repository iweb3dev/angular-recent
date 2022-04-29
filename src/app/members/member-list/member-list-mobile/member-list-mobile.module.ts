import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NoMemberModule } from 'src/app/shared/components/member/no-member/no-member.module';
import { MemberVirtualListMobileModule } from 'src/app/shared/components/member/mobile/member-virtual-list-mobile/member-virtual-list-mobile.module';

import { MemberListMobileComponent } from './member-list-mobile.component';

@NgModule({
  declarations: [MemberListMobileComponent],
  imports: [
    RouterModule,
    CommonModule,

    LoaderModule,
    NoMemberModule,
    MemberVirtualListMobileModule,
  ],
  exports: [MemberListMobileComponent],
})
export class MemberListMobileModule {}

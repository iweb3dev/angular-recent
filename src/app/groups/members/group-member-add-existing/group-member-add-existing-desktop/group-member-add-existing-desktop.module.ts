import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NoMemberModule } from 'src/app/shared/components/member/no-member/no-member.module';
import { MemberVirtualTableDesktopModule } from 'src/app/shared/components/member/desktop/member-virtual-table-desktop/member-virtual-table-desktop.module';

import { GroupMemberAddExistingDesktopComponent } from './group-member-add-existing-desktop.component';

@NgModule({
  declarations: [GroupMemberAddExistingDesktopComponent],
  imports: [
    CommonModule,

    LoaderModule,
    NoMemberModule,
    MemberVirtualTableDesktopModule,
  ],
  exports: [GroupMemberAddExistingDesktopComponent],
})
export class GroupMemberAddExistingDesktopModule {}

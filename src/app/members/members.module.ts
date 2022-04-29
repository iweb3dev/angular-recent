import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';

import { MemberEditModule } from './member-edit/member-edit.module';
import { MemberListModule } from './member-list/member-list.module';

import { MembersComponent } from './members.component';

import { MemberEditResolver } from './member-edit/member-edit.resolver';

@NgModule({
  declarations: [MembersComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,

    MemberEditModule,
    MemberListModule,
  ],
  providers: [MemberEditResolver],
})
export class MembersModule {}

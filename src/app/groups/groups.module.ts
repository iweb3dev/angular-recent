import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupListModule } from './group-list/group-list.module';
import { GroupCreateModule } from './group-create/group-create.module';
import { GroupNameEditModule } from './modals/group-name-edit/group-name-edit.module';
import { GroupMemberAddModule } from './modals/group-member-add/group-member-add.module';
import { GroupMemberListModule } from './members/group-member-list/group-member-list.module';
import { GroupMemberEditModule } from './members/group-member-edit/group-member-edit.module';
import { GroupMemberPrintModule } from './modals/group-member-print/group-member-print.module';
import { GroupMemberAddManuallyModule } from './members/group-member-add-manually/group-member-add-manually.module';
import { GroupMemberAddExistingModule } from './members/group-member-add-existing/group-member-add-existing.module';
import { GroupMemberUploadModule } from './members/upload/group-member-upload-desktop/group-member-upload-desktop.module';
import { GroupMemberUploadContainerModule } from './members/upload/group-member-upload-container/group-member-upload-container.module';

import { GroupsComponent } from './groups.component';

import { GroupMemberEditResolver } from './members/group-member-edit/group-member-edit.resolver';
import { GroupTabsModule } from './group-tabs/group-tabs.module';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,

    GroupListModule,
    GroupTabsModule,
    GroupCreateModule,
    GroupNameEditModule,
    GroupMemberAddModule,
    GroupMemberEditModule,
    GroupMemberListModule,
    GroupMemberPrintModule,
    GroupMemberUploadModule,
    GroupMemberAddExistingModule,
    GroupMemberAddManuallyModule,
    GroupMemberUploadContainerModule,
  ],
  providers: [GroupMemberEditResolver],
})
export class GroupsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { GroupMemberImportModule } from '../group-member-import/group-member-import.module';
import { GroupMemberUploadModule } from '../group-member-upload-desktop/group-member-upload-desktop.module';
import { GroupMemberUploadMobileModule } from '../group-member-upload-mobile/group-member-upload-mobile.module';

import { GroupMemberUploadContainerComponent } from './group-member-upload-container.component';

@NgModule({
  declarations: [GroupMemberUploadContainerComponent],
  imports: [
    CommonModule,

    FlexLayoutModule,

    GroupMemberImportModule,
    GroupMemberUploadModule,
    GroupMemberUploadMobileModule,
  ],
})
export class GroupMemberUploadContainerModule {}

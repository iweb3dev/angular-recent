import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MobileHeaderModule } from 'src/app/shared/components/mobile-header/mobile-header.module';

import { GroupPipeModule } from 'src/app/groups/pipes/group-pipe.module';

import { GroupMemberUploadMobileComponent } from './group-member-upload-mobile.component';

@NgModule({
  declarations: [GroupMemberUploadMobileComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,

    GroupPipeModule,

    FlexLayoutModule,
    MobileHeaderModule,
  ],
  exports: [GroupMemberUploadMobileComponent],
})
export class GroupMemberUploadMobileModule {}

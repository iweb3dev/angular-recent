import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MobileHeaderModule } from 'src/app/shared/components/mobile-header/mobile-header.module';

import { GroupMemberUploadDesktopComponent } from './group-member-upload-desktop.component';

@NgModule({
  declarations: [GroupMemberUploadDesktopComponent],

  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    ScrollingModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,

    FlexLayoutModule,

    MobileHeaderModule,
  ],
  exports: [GroupMemberUploadDesktopComponent],
})
export class GroupMemberUploadModule {}

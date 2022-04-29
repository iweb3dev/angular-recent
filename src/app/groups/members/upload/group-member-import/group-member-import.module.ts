import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MobileHeaderModule } from 'src/app/shared/components/mobile-header/mobile-header.module';

import { GroupMemberImportComponent } from './group-member-import.component';

@NgModule({
  declarations: [GroupMemberImportComponent],
  imports: [
    FormsModule,
    CommonModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,

    FlexLayoutModule,

    MobileHeaderModule,
  ],
  exports: [GroupMemberImportComponent],
})
export class GroupMemberImportModule {}

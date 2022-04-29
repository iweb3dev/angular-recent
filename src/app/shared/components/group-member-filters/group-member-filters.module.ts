import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FlexLayoutModule } from '@angular/flex-layout';

import { GroupMemberFiltersComponent } from './group-member-filters.component';

@NgModule({
  declarations: [GroupMemberFiltersComponent],
  imports: [
    CommonModule,

    MatSelectModule,
    MatDividerModule,
    MatFormFieldModule,

    FlexLayoutModule,
  ],
  exports: [GroupMemberFiltersComponent],
})
export class GroupMemberFiltersModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GroupPipeModule } from '../../pipes/group-pipe.module';

import { GroupListDesktopComponent } from './group-list-desktop.component';

@NgModule({
  declarations: [GroupListDesktopComponent],
  imports: [
    CommonModule,
    RouterModule,

    CdkTableModule,
    ScrollingModule,

    MatSortModule,
    MatTableModule,
    MatCheckboxModule,

    GroupPipeModule,
  ],
  exports: [GroupListDesktopComponent],
})
export class GroupListDesktopModule {}

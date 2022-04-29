import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { LoaderModule } from '../../../loader/loader.module';
import { NoMemberModule } from '../../no-member/no-member.module';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MemberSharedPipeModule } from '../../pipes/member-shared-pipe.module';

import { MemberVirtualTableDesktopComponent } from './member-virtual-table-desktop.component';

@NgModule({
  declarations: [MemberVirtualTableDesktopComponent],
  imports: [
    FormsModule,
    CommonModule,

    CdkTableModule,
    ScrollingModule,
    FlexLayoutModule,

    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSlideToggleModule,

    LoaderModule,
    NoMemberModule,

    PipesModule,
    MemberSharedPipeModule,
  ],
  exports: [MemberVirtualTableDesktopComponent],
})
export class MemberVirtualTableDesktopModule {}

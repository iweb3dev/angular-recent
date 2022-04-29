import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { MemberListMobileModule } from './member-list-mobile/member-list-mobile.module';
import { MemberListDesktopModule } from './member-list-desktop/member-list-desktop.module';
import { GroupMemberFiltersModule } from '@shared/components/group-member-filters/group-member-filters.module';
import { MemberStatsHeaderModule } from 'src/app/shared/components/member/member-stats-header/member-stats-header.module';

import { MemberListContainerComponent } from './member-list-container.component';

@NgModule({
  declarations: [MemberListContainerComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,

    PipesModule,

    LoaderModule,
    MemberListMobileModule,
    MemberStatsHeaderModule,
    MemberListDesktopModule,
    GroupMemberFiltersModule,
  ],
  exports: [MemberListContainerComponent],
})
export class MemberListModule {}

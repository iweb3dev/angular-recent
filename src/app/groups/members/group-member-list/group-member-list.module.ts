import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { GroupPipeModule } from '../../pipes/group-pipe.module';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { MobileHeaderModule } from 'src/app/shared/components/mobile-header/mobile-header.module';
import { GroupMemberListMobileModule } from './group-member-list-mobile/group-member-list-mobile.module';
import { GroupMemberListDesktopModule } from './group-member-list-desktop/group-member-list-desktop.module';
import { GroupMemberFiltersModule } from '@shared/components/group-member-filters/group-member-filters.module';
import { MemberStatsHeaderModule } from 'src/app/shared/components/member/member-stats-header/member-stats-header.module';

import { GroupMemberListContainerComponent } from './group-member-list-container.component';

@NgModule({
  declarations: [GroupMemberListContainerComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    OverlayModule,

    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,

    PipesModule,
    GroupPipeModule,

    LoaderModule,
    MobileHeaderModule,
    MemberStatsHeaderModule,
    GroupMemberFiltersModule,
    GroupMemberListMobileModule,
    GroupMemberListDesktopModule,
  ],
  exports: [GroupMemberListContainerComponent],
})
export class GroupMemberListModule {}

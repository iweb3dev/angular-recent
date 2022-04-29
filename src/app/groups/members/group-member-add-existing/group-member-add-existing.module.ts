import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { MobileHeaderModule } from 'src/app/shared/components/mobile-header/mobile-header.module';
import { GroupMemberFiltersModule } from '@shared/components/group-member-filters/group-member-filters.module';
import { GroupMemberAddExistingMobileModule } from './group-member-add-existing-mobile/group-member-add-existing-mobile.module';
import { GroupMemberAddExistingDesktopModule } from './group-member-add-existing-desktop/group-member-add-existing-desktop.module';

import { GroupMemberAddExistingContainerComponent } from './group-member-add-existing-container.component';

@NgModule({
  declarations: [GroupMemberAddExistingContainerComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    OverlayModule,
    ScrollingModule,

    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatExpansionModule,

    PipesModule,

    LoaderModule,
    MobileHeaderModule,
    GroupMemberFiltersModule,
    GroupMemberAddExistingMobileModule,
    GroupMemberAddExistingDesktopModule,
  ],
})
export class GroupMemberAddExistingModule {}

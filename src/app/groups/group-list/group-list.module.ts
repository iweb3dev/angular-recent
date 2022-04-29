import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { GroupListMobileModule } from './group-list-mobile/group-list-mobile.module';
import { GroupSearchModule } from '@shared/components/group-search/group-search.module';
import { GroupListDesktopModule } from './group-list-desktop/group-list-desktop.module';
import { GroupMemberFiltersModule } from '@shared/components/group-member-filters/group-member-filters.module';

import { GroupListContainerComponent } from './group-list-container.component';

@NgModule({
  declarations: [GroupListContainerComponent],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,

    OverlayModule,
    ScrollingModule,
    FlexLayoutModule,

    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatAutocompleteModule,

    LoaderModule,
    GroupSearchModule,
    GroupListMobileModule,
    GroupListDesktopModule,
    GroupMemberFiltersModule,
  ],
  exports: [GroupListContainerComponent],
})
export class GroupListModule {}

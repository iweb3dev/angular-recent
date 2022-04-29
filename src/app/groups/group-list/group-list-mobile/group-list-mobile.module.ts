import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { GroupPipeModule } from '../../pipes/group-pipe.module';

import { GroupListMobileComponent } from './group-list-mobile.component';

@NgModule({
  declarations: [GroupListMobileComponent],
  imports: [
    CommonModule,
    RouterModule,

    ScrollingModule,
    FlexLayoutModule,

    MatCheckboxModule,

    GroupPipeModule,
  ],
  exports: [GroupListMobileComponent],
})
export class GroupListMobileModule {}

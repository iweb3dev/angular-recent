import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MemberSharedPipeModule } from '../../pipes/member-shared-pipe.module';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';

import { MemberVirtualListMobileComponent } from './member-virtual-list-mobile.component';

@NgModule({
  declarations: [MemberVirtualListMobileComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,

    ScrollingModule,
    FlexLayoutModule,

    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSlideToggleModule,

    LoaderModule,

    PipesModule,
    MemberSharedPipeModule,
  ],
  exports: [MemberVirtualListMobileComponent],
})
export class MemberVirtualListMobileModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { NgxPrintModule } from 'ngx-print';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { GroupMemberPrintComponent } from './group-member-print.component';

@NgModule({
  declarations: [GroupMemberPrintComponent],
  imports: [
    CommonModule,

    MatButtonModule,

    NgxPrintModule,
    FlexLayoutModule,

    PipesModule,
  ],
})
export class GroupMemberPrintModule {}

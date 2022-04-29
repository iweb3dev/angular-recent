import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CdkTableModule } from '@angular/cdk/table';

import { MessagePreviewModule } from 'src/app/components/message-preview/message-preview.module';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { MessageListDesktopComponent } from './message-list-desktop.component';
import { MessageActionsModule } from '../message-actions/message-actions.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [MessageListDesktopComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,

    MessagePreviewModule,
    LoaderModule,
    MessageActionsModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    CdkTableModule,
    PipesModule
  ],
  exports: [MessageListDesktopComponent],
})
export class MessageListDesktopModule {}

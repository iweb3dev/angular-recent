import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListMobileComponent } from './message-list-mobile.component';
import { MessageActionsModule } from '../message-actions/message-actions.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MessagePreviewModule } from 'src/app/components/message-preview/message-preview.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [MessageListMobileComponent],
  imports: [
    CommonModule,
    MessageActionsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MessagePreviewModule,
    PipesModule
  ],
  exports: [MessageListMobileComponent],
})
export class MessageListMobileModule {}

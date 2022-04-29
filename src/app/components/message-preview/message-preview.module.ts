import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MessagePreviewComponent } from './message-preview.component';
import { MessagePreviewService } from './message-preview.service';
import { TextPreviewModule } from '../text-preview/text-preview.module';
import { VoicePreviewModule } from '../voice-preview/voice-preview.module';
import { EmailPreviewModule } from '../email-preview/email-preview.module';

@NgModule({
  declarations: [MessagePreviewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    TextPreviewModule,
    VoicePreviewModule,
    EmailPreviewModule,
  ],
  exports: [MessagePreviewComponent],
  providers: [MessagePreviewService],
})
export class MessagePreviewModule {}

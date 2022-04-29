import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { EffectsModule } from '@ngrx/effects';

import { EmailPreviewModule } from '@components/email-preview/email-preview.module';
import { TextPreviewModule } from '@components/text-preview/text-preview.module';
import { VoicePreviewModule } from '@components/voice-preview/voice-preview.module';
import { UsePreviousMessageModule } from '@components/use-previous-message/use-previous-message.module';

import { NewCommunicationComponent } from './new-communication.component';
import { NewCommunicationRoutingModule } from './new-communication.routes';
import { SuccessModule } from './success/success.module';
import { ScheduleMessageffects } from './state/schedule-message.effects';

@NgModule({
  declarations: [NewCommunicationComponent],
  imports: [
    CommonModule,
    SuccessModule,
    TextPreviewModule,
    VoicePreviewModule,
    EmailPreviewModule,
    MatBottomSheetModule,
    UsePreviousMessageModule,
    NewCommunicationRoutingModule,
    EffectsModule.forFeature([ScheduleMessageffects]),
  ],
})
export class NewCommunicationModule {}

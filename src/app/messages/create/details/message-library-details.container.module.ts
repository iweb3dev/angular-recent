import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MessageNameModule } from '@components/message-name/message-name.module';

import { TextMessageModule } from 'src/app/components/text-message/text-message.module';
import { EmailMessageModule } from 'src/app/components/email-message/email-message.module';
import { VoiceMessageModule } from 'src/app/components/voice-message/voice-message.module';
import { MessageDetailsModule } from 'src/app/components/message-details/message-details.module';

import { MessageLibraryDetailsContainerComponent } from './message-library-details.container';
import { MessageLibraryDetailsService } from './message-library-details.service';
import { MessageCreatedModule } from './message-created/message-created.module';
import { MessageConfirmModule } from 'src/app/new-communication/communication-details/message-confirm/message-confirm.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MessageLibraryDetailsContainerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MessageNameModule,
    TextMessageModule,
    EmailMessageModule,
    VoiceMessageModule,
    MessageDetailsModule,
    MessageCreatedModule,
    MessageConfirmModule,
    MatDialogModule,
  ],
  providers: [MessageLibraryDetailsService],
})
export class MessageLibraryDetailsModule {}

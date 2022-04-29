import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { MessageNameModule } from '@components/message-name/message-name.module';
import { MessageDetailsModule } from '@components/message-details/message-details.module';
import { EmailMessageModule } from '@components/email-message/email-message.module';
import { TextMessageModule } from '@components/text-message/text-message.module';
import { VoiceMessageModule } from '@components/voice-message/voice-message.module';

import { NewMessageRoutingModule } from './communication-details.routes';
import { CommunicationDetailsContainerComponent } from './communications-details.container';
import { CommunicationDetailsService } from './communication-details.service';
import { MessageConfirmModule } from './message-confirm/message-confirm.module';
import { FinancialsModule } from './financials/financials.module';
import { MessageNameService } from '@components/message-name/message-name.service';

@NgModule({
  declarations: [CommunicationDetailsContainerComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FinancialsModule,
    FlexLayoutModule,
    MessageNameModule,
    TextMessageModule,
    EmailMessageModule,
    VoiceMessageModule,
    MessageDetailsModule,
    MessageConfirmModule,
    NewMessageRoutingModule,
  ],
  providers: [CommunicationDetailsService, MessageNameService],
})
export class CommunicationDetailsModule {}

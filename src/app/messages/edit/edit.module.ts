import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { EditRoutingModule } from './edit.routing.module';
import { MessageNameModule } from '@components/message-name/message-name.module';
import { TextMessageModule } from 'src/app/components/text-message/text-message.module';
import { EmailMessageModule } from 'src/app/components/email-message/email-message.module';
import { VoiceMessageModule } from 'src/app/components/voice-message/voice-message.module';

import { EditService } from './edit.service';
import { EditResolver } from './edit.resolver';
import { CanDeactivateEdit } from './edit-deactivate.guard';

import { EditComponent } from './edit.component';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatButtonToggleModule,

    FlexLayoutModule,
    EditRoutingModule,

    MessageNameModule,
    TextMessageModule,
    VoiceMessageModule,
    EmailMessageModule,
  ],
  providers: [
    EditService,
    EditResolver,
    CanDeactivateEdit,
  ],
})
export class EditModule {}

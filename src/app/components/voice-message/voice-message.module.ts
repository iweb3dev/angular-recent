import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { AudioPlayerModule } from 'src/app/shared/components/audio-player/audio-player.module';
import { DisableControlModule } from 'src/app/shared/directives/disable-control/disable-control.module';

import { VoiceMessageComponent } from './voice-message.component';
import { VoiceMessageService } from './voice-message.service';
import { CallInModule } from './call-in/call-in.module';
import { UploadModule } from './upload/wav-message.module';
import { TtsModule } from './tts/tts.module';
import { MicrophoneModule } from './microphone/microphone.module';
import { VoiceMessageContainerComponent } from './voice-message.container';
import { VoiceFacade } from './voice/voice.facade';
import {
  voiceMessageFeatureKey,
  voiceMessageReducerFactory,
  VOICE_MESSAGE_REDUCER_TOKEN,
} from './voice/voice.reducer';
import { VoiceEffects } from './voice/voice.effects';
import { UserFacade } from '@core/store/features/user/user.facade';

@NgModule({
  declarations: [VoiceMessageContainerComponent, VoiceMessageComponent],
  imports: [
    TtsModule,
    CallInModule,
    UploadModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    MicrophoneModule,
    FlexLayoutModule,
    MatCheckboxModule,
    AudioPlayerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DisableControlModule,
    MatBottomSheetModule,
    EffectsModule.forFeature([VoiceEffects]),
    StoreModule.forFeature(voiceMessageFeatureKey, VOICE_MESSAGE_REDUCER_TOKEN),
  ],
  exports: [VoiceMessageContainerComponent],
  providers: [
    {
      provide: VOICE_MESSAGE_REDUCER_TOKEN,
      useFactory: voiceMessageReducerFactory,
    },
    VoiceMessageService,
    VoiceFacade,
    UserFacade
  ],
})
export class VoiceMessageModule {}

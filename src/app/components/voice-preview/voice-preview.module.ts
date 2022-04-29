import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AudioPlayerModule } from 'src/app/shared/components/audio-player/audio-player.module';

import { VoicePreviewComponent } from './voice-preview.component';

@NgModule({
  declarations: [VoicePreviewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    AudioPlayerModule,
  ],
})
export class VoicePreviewModule {}

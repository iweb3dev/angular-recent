import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AudioPlayerComponent } from './audio-player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AudioPlayerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [AudioPlayerComponent],
})
export class AudioPlayerModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MicrophoneDialogComponent } from './dialog/microphone-dialog.component';
import { MicrophoneSheetComponent } from './sheet/microphone-sheet.component';
import { CloseDialogOnEmitModule } from 'src/app/shared/directives/close-dialog-on-emit/close-dialog-on-emit.module';
import { CloseBottomSheetOnEmitModule } from 'src/app/shared/directives/close-bottom-sheet-on-emit/close-bottom-sheet-on-emit.module';

@NgModule({
  declarations: [MicrophoneDialogComponent, MicrophoneSheetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    CloseDialogOnEmitModule,
    CloseBottomSheetOnEmitModule,
  ],
})
export class MicrophoneModule {}

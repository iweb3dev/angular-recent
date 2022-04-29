import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TtsDialogComponent } from './dialog/tts-dialog.component';
import { TtsSheetComponent } from './sheet/tts-sheet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [TtsDialogComponent, TtsSheetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class TtsModule {}

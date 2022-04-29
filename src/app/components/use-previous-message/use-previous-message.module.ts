import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';

import { MessagePreviewModule } from '../message-preview/message-preview.module';
import { UsePreviousSheetComponent } from './sheet/use-previous-sheet.component';
import { UsePreviousDialogComponent } from './dialog/use-previous-dialog.component';

@NgModule({
  declarations: [UsePreviousSheetComponent, UsePreviousDialogComponent],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    BottomSheetModule,
    MatFormFieldModule,
    MessagePreviewModule,
  ],
})
export class UsePreviousMessageModule {}

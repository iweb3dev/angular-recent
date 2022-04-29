import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';

import { CloseDialogOnEmitModule } from 'src/app/shared/directives/close-dialog-on-emit/close-dialog-on-emit.module';
import { CloseBottomSheetOnEmitModule } from 'src/app/shared/directives/close-bottom-sheet-on-emit/close-bottom-sheet-on-emit.module';

import { CallInSheetComponent } from './sheet/call-in-sheet.component';
import { CallInDialogComponent } from './dialog/call-in-dialog.component';

@NgModule({
  declarations: [CallInDialogComponent, CallInSheetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    CloseDialogOnEmitModule,
    CloseBottomSheetOnEmitModule,
  ],
})
export class CallInModule {}

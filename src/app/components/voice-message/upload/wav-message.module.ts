import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadDialogComponent } from './dialog/upload-dialog.component';
import { UploadSheetComponent } from './sheet/upload-sheet.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'src/app/shared/forms/file-upload/file-upload.module';

@NgModule({
  declarations: [UploadDialogComponent, UploadSheetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FileUploadModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class UploadModule {}

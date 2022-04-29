import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { EmailEditorModule } from 'angular-email-editor';

import { EmailMessageComponent } from './email-message.component';
import { EmailMessageService } from './email-message.service';
import { FileUploadModule } from 'src/app/shared/forms/file-upload/file-upload.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [EmailMessageComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    FileUploadModule,
    EmailEditorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [EmailMessageComponent],
  providers: [EmailMessageService],
})
export class EmailMessageModule {}

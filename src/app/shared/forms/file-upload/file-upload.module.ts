import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { FileUploadComponent } from './file-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    PipesModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}

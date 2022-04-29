import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EmailPreviewComponent } from './email-preview.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [EmailPreviewComponent],
  imports: [
    PipesModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
})
export class EmailPreviewModule {}

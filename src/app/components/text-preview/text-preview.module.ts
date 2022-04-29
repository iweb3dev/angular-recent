import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TextPreviewComponent } from './text-preview.component';

@NgModule({
  declarations: [TextPreviewComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule],
})
export class TextPreviewModule {}

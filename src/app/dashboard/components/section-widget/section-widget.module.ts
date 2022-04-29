import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

import { SectionWidgetComponent } from './section-widget.component';

@NgModule({
  declarations: [SectionWidgetComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,

    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
  ],
  exports: [SectionWidgetComponent],
})
export class SectionWidgetModule {}

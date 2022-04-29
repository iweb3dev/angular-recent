import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

import { SectionWidgetMobileComponent } from './section-widget-mobile.component';

@NgModule({
  declarations: [SectionWidgetMobileComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
  ],
  exports: [SectionWidgetMobileComponent],
})
export class SectionWidgetMobileModule {}

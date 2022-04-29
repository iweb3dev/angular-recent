import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';

import { SectionTitleComponent } from './section-title.component';

@NgModule({
  declarations: [SectionTitleComponent],
  imports: [CommonModule, MatDividerModule],
  exports: [SectionTitleComponent],
})
export class SectionTitleModule {}

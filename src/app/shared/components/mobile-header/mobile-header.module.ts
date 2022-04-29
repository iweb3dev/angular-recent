import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

import { MobileHeaderComponent } from './mobile-header.component';

@NgModule({
  declarations: [MobileHeaderComponent],
  imports: [CommonModule, MatDividerModule, FlexLayoutModule],
  exports: [MobileHeaderComponent],
})
export class MobileHeaderModule {}

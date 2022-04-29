import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { VirtualTableComponent } from './virtual-table.component';

@NgModule({
  declarations: [VirtualTableComponent],
  imports: [
    CommonModule,
    MatSortModule,
    CdkTableModule,
    MatTableModule,
    ScrollingModule,
  ],
  exports: [VirtualTableComponent],
})
export class VirtualTableModule {}

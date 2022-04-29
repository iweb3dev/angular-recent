import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { VirtualListComponent } from './virtual-list.component';

@NgModule({
  declarations: [VirtualListComponent],
  imports: [CommonModule, ScrollingModule],
  exports: [VirtualListComponent],
})
export class VirtualListModule {}

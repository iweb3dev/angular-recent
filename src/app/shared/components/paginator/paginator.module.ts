import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { PaginatorComponent } from './paginator.component';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, FlexLayoutModule],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}

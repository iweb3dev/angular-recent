import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [MultiSelectComponent],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  exports: [MultiSelectComponent],
})
export class MultiSelectModule {}

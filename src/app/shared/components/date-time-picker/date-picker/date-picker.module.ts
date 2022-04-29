import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

import { DatePickerComponent } from './date-picker.component';
import { DatePickerHeaderComponent } from './date-picker-header/date-picker-header.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DatePickerComponent, DatePickerHeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDatepickerModule,
  ],
  exports: [DatePickerComponent],
})
export class DatePickerModule {}

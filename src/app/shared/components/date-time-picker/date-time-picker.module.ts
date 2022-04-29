import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateTimePickerComponent } from './date-time-picker.component';
import { TimePickerModule } from './time-picker/time-picker.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [DateTimePickerComponent],
  imports: [
    CommonModule,
    TimePickerModule,
    DatePickerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [DateTimePickerComponent]
})
export class DateTimePickerModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { TimePickerComponent } from './time-picker.component';

@NgModule({
  declarations: [TimePickerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  exports: [TimePickerComponent],
})
export class TimePickerModule {}

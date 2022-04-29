import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';
import { DateTimePickerModule } from 'src/app/shared/components/date-time-picker/date-time-picker.module';

import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import { ScheduleSheetComponent } from './schedule-sheet/schedule-sheet.component';

@NgModule({
  declarations: [ScheduleDialogComponent, ScheduleSheetComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTooltipModule,
    BottomSheetModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DateTimePickerModule,
  ],
  exports: [ScheduleDialogComponent, ScheduleSheetComponent],
})
export class ScheduleModule {}

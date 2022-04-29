import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';
import { DateTimePickerModule } from 'src/app/shared/components/date-time-picker/date-time-picker.module';

import { ReactivateScheduleSheetComponent } from './sheet/reactivate-schedule-sheet.component';
import { ReactivateScheduleDialogComponent } from './dialog/reactivate-schedule-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ReactivateScheduleSheetComponent,
    ReactivateScheduleDialogComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    BottomSheetModule,
    ReactiveFormsModule,
    DateTimePickerModule,
  ],
})
export class ReactivateScheduleModule {}

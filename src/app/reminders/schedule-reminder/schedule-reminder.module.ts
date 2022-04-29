import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ScheduleReminderComponent } from './schedule-reminder.component';
import { RepeatDetailComponent } from './components/repeat-detail/repeat-detail.component';
import { ReviewReminderComponent } from './components/review-reminder/review-reminder.component';
import { ScheduleReminderDateSheetComponent } from './components/schedule-reminder-date-sheet/schedule-reminder-date-sheet.component';
import { ScheduleReminderDateDialogComponent } from './components/schedule-reminder-date-dialog/schedule-reminder-date-dialog.component';

import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DateTimePickerModule } from 'src/app/shared/components/date-time-picker/date-time-picker.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    RepeatDetailComponent,
    ReviewReminderComponent,
    ScheduleReminderComponent,
    ScheduleReminderDateDialogComponent,
    ScheduleReminderDateSheetComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,

    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,

    FlexLayoutModule,
    DateTimePickerModule,
    PipesModule
  ],
})
export class ScheduleReminderModule {}

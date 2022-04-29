import { Component, Inject } from '@angular/core';

import moment from 'moment';
import { Subject } from 'rxjs';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-schedule-reminder-date-sheet',
  templateUrl: './schedule-reminder-date-sheet.component.html',
  styleUrls: ['./schedule-reminder-date-sheet.component.scss'],
})
export class ScheduleReminderDateSheetComponent {
  noValueError = false;
  private value: moment.Moment;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private data: { next: Subject<any>; close: Subject<any> }
  ) {}

  onClose() {
    this.data.close.next();
  }

  onSetValue(val: moment.Moment) {
    this.value = val;
    this.noValueError = false;
  }

  onConfirm() {
    if (!this.value) {
      this.noValueError = true;
      return;
    }

    this.data.next.next(this.value);
  }
}

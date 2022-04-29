import { Component, Inject } from '@angular/core';

import { Subject } from 'rxjs';
import * as moment from 'moment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-reminder-date-dialog',
  templateUrl: './schedule-reminder-date-dialog.component.html',
  styleUrls: ['./schedule-reminder-date-dialog.component.scss'],
})
export class ScheduleReminderDateDialogComponent {
  noValueError = false;
  private value: moment.Moment;

  constructor(
    @Inject(MAT_DIALOG_DATA)
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

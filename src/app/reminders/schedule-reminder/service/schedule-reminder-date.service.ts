import { Injectable } from '@angular/core';

import moment from 'moment';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

import { ScheduleReminderDateSheetComponent } from '../components/schedule-reminder-date-sheet/schedule-reminder-date-sheet.component';
import { ScheduleReminderDateDialogComponent } from '../components/schedule-reminder-date-dialog/schedule-reminder-date-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ScheduleReminderDateService {
  _dialogRef: MatDialogRef<ScheduleReminderDateDialogComponent>;
  _bottomSheetRef: MatBottomSheetRef<ScheduleReminderDateSheetComponent>;

  close$ = new Subject();
  value$ = new Subject<moment.Moment>();

  constructor(
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) {}

  openPicker() {
    if (window.innerWidth > 1000) {
      this._dialogRef = this._dialog.open(ScheduleReminderDateDialogComponent, {
        height: '100%',
        width: '600px',
        data: { next: this.value$, close: this.close$ },
      });
    } else {
      this._bottomSheetRef = this._bottomSheet.open(
        ScheduleReminderDateSheetComponent,
        {
          data: { next: this.value$, close: this.close$ },
        }
      );
    }

    this.close$.pipe(take(1)).subscribe(() => this.closePicker());

    return this.value$.pipe(
      take(1),
      tap(() => this.closePicker())
    );
  }

  closePicker() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }

    if (this._bottomSheetRef) {
      this._bottomSheetRef.dismiss();
    }
  }
}

import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CommunicationReminder } from 'src/app/core/store/features/reminders/reminders.models';
import { ReviewReminderComponent } from '../components/review-reminder/review-reminder.component';

@Injectable({
  providedIn: 'root'
})
export class ReviewReminderService {
  _dialogRef: MatDialogRef<ReviewReminderComponent>;
  private _next$ = new Subject();
  // _bottomSheetRef: MatBottomSheetRef<ScheduleReminderDateComponent>;

  constructor(
    private _dialog: MatDialog,
    // private _bottomSheet: MatBottomSheet
    ) {}

  open(reminder: CommunicationReminder & { groupName: string }) {

    // if (window.innerWidth > 1000) {
      this._dialogRef = this._dialog.open(ReviewReminderComponent, {
        width: '600px',
        data: {
          reminder: reminder,
          next: this._next$,
        }
      });
    // } else {
    //   this._bottomSheetRef = this._bottomSheet.open(ScheduleReminderDateComponent);
    // }

    return this._next$.pipe(take(1), tap(() => this.close()));
  }

  close() {
    // if (this._dialogRef) {
      this._dialogRef.close();
    // }

    // if (this._bottomSheetRef) {
    //   this._bottomSheetRef.dismiss();
    // }
  }
}

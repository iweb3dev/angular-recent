import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reactivate-schedule-dialog',
  templateUrl: './reactivate-schedule-dialog.component.html',
  styleUrls: ['./reactivate-schedule-dialog.component.scss'],
})
export class ReactivateScheduleDialogComponent implements OnInit {
  date = new FormControl(null);

  constructor(
    private _matDialogRef: MatDialogRef<ReactivateScheduleDialogComponent>,
  ) {}

  ngOnInit(): void {}

  onCloseDialog(): void {
    this._matDialogRef.close();
  }

  updateSchedule(): void {
    this._matDialogRef.close(this.date.value);
  }
}

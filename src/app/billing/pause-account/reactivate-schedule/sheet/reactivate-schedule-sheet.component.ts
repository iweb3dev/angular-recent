import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-reactivate-schedule-sheet',
  templateUrl: './reactivate-schedule-sheet.component.html',
  styleUrls: ['./reactivate-schedule-sheet.component.scss'],
})
export class ReactivateScheduleSheetComponent implements OnInit {
  date = new FormControl(null);

  constructor(private _bottomSheetRef: MatBottomSheetRef) {}

  ngOnInit(): void {}

  onClose(): void {
    this._bottomSheetRef.dismiss();
  }

  updateSchedule(): void {
    this._bottomSheetRef.dismiss(this.date.value);
  }
}

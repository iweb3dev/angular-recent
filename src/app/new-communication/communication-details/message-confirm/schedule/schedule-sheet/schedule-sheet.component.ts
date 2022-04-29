import { ConvertTimeToTimeZone } from './../../../../../shared/pipes/convert-time-to-time-zone.pipe';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import * as moment from 'moment';

import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';

import { RepeatOptions } from '../schedule.consts';

@Component({
  selector: 'app-schedule-sheet',
  templateUrl: './schedule-sheet.component.html',
  styleUrls: ['./schedule-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSheetComponent implements OnInit {
  readonly RepeatOptions = RepeatOptions;

  dateForm: FormGroup;
  selectedDateInvalid = true;

  constructor(
    private convertTimeToTimeZone: ConvertTimeToTimeZone,
    private _bottomSheetRef: MatBottomSheetRef,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.dateForm = this._formBuilder.group({
      date: [null],
      repeatOptions: [RepeatOptions[0]],
    });
  }

  updateSchedule(): void {
    const date = moment(this.convertTimeToTimeZone.transform(this.dateForm.value.date, 'startTimeLocal'));
    const isInvalid = date.isSameOrBefore(moment(this.convertTimeToTimeZone.transform(moment().toISOString(), 'startTimeLocal')));

    if (isInvalid) {
      this._toastService.addToast(ToastType.Error, 'Start date should not be before current date.');

      return;
    }

    this._bottomSheetRef.dismiss(this.dateForm.value);
  }

  onDateChange(date: moment.Moment): void {
    this.selectedDateInvalid = date.isSameOrBefore(moment(this.convertTimeToTimeZone.transform(moment().toISOString(), 'startTimeLocal')));
  }

  onClose(): void {
    this._bottomSheetRef.dismiss();
  }
}

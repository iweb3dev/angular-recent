import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConvertTimeToTimeZone } from '@shared/pipes/convert-time-to-time-zone.pipe';

import * as moment from 'moment';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';

import { RepeatOptions } from '../schedule.consts';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDialogComponent implements OnInit {
  readonly RepeatOptions = RepeatOptions;

  dateForm: FormGroup;
  selectedDateInvalid = true;

  constructor(
    private convertTimeToTimeZone: ConvertTimeToTimeZone,
    private _dialogRef: MatDialogRef<ScheduleDialogComponent>,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.dateForm = this._formBuilder.group({
      date: [
        moment(
          new Date(
            this.convertTimeToTimeZone.transform(new Date(), 'startTimeLocal')
          )
        ).add(15, 'minutes'),
      ],
      repeatOptions: [RepeatOptions[0]],
    });
  }

  onCloseDialog(): void {
    this._dialogRef.close();
  }

  onDateChange(date: moment.Moment): void {
    this.selectedDateInvalid = date.isSameOrBefore(
      moment(
        this.convertTimeToTimeZone.transform(
          moment().toISOString(),
          'startTimeLocal'
        )
      )
    );
  }

  updateSchedule(): void {
    const date = moment(this.dateForm.value.date);
    const isInvalid = date.isSameOrBefore(
      moment(
        this.convertTimeToTimeZone.transform(
          moment().toISOString(),
          'startTimeLocal'
        )
      )
    );

    if (isInvalid) {
      this._toastService.addToast(
        ToastType.Error,
        'Start date should not be before current date.'
      );

      return;
    }

    this._dialogRef.close(this.dateForm.value);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DatePickerHeaderComponent } from './date-picker-header/date-picker-header.component';

import { DatePickerAdapter, DATE_PICKER_FORMATS } from './date-picker.adapter';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatePickerComponent,
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: DatePickerAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMATS },
  ],
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  readonly DatePickerHeaderComponent = DatePickerHeaderComponent;

  selected = new DateRange(null, null);

  private _onTouchedCb: () => void;
  private _onChangeCb: (value: Moment) => void;
  private _value: Moment;

  @Input()
  minDate = moment();

  @Input()
  set value(value: Moment) {
    this._value = value;
  }

  get value(): Moment {
    return this._value;
  }

  @Output()
  valueChange = new EventEmitter<Moment>();

  constructor() {}

  ngOnInit(): void {}

  onSelectedChange(event: Moment): void {
    this.value = event;
    this.emitNewValue();
    this.selected = new DateRange(event, null);
  }

  writeValue(value: Moment): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Moment) => void): void {
    this._onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCb = fn;
  }

  private emitNewValue(): void {
    this.valueChange.emit(this.value);

    if (this._onChangeCb) {
      this._onChangeCb(this.value);
    }
  }
}

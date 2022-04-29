import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateTimePickerComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {
  static ngAcceptInputType_timePickerHidden: BooleanInput;
  timeControl = new FormControl(null);

  private _selectedDate: string;
  private _value: Moment = moment();
  private _onTouchedCb: () => void;
  private _onChangeCb: (value: moment.Moment) => void;
  private _timePickerHidden = false;

  @Output()
  valueChange = new EventEmitter<moment.Moment>();

  @Input()
  minDate = moment();

  @Input()
  set hideTimePicker(value: boolean | string) {
    this._timePickerHidden = coerceBooleanProperty(value);
  }

  @Input()
  set value(value: Moment) {
    if (value) {
      this._value = value;
      this._selectedDate = this.createDisplayDate();
    }
  }

  get value(): Moment {
    return this._value;
  }

  get selectedDate(): string {
    return this._selectedDate;
  }

  get timePickerHidden(): boolean {
    return this._timePickerHidden;
  }

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: moment.Moment): void {
    this.value = value;
  }

  registerOnChange(fn: (value: moment.Moment) => void): void {
    this._onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCb = fn;
  }

  onDateChange(event: Moment): void {
    this.value = event;
    this.timeControl.setValue(null);
    this.emitNewValue();
  }

  onTimeChange(event: Moment): void {
    const newValue = this.value.clone();

    newValue.set('hour', event.hour());
    newValue.set('minute', event.minute());

    this.value = newValue;

    this.emitNewValue();
  }

  private createDisplayDate(): string {
    const displayDate = this.value.format('dddd, MMMM D YYYY, hh:mm A');

    return displayDate;
  }

  private emitNewValue(): void {
    this.valueChange.emit(this.value);

    this._onChangeCb?.(this.value);
  }
}

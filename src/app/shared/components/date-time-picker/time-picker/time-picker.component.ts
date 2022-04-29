import { ConvertTimeToTimeZone } from '@shared/pipes/convert-time-to-time-zone.pipe';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KeyboardKeyCodes } from 'src/app/shared/models/enums/keyboard';
import * as moment from 'moment';

import { Meridiem, TimePickerModel } from './time-picker.models';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TimePickerComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerComponent implements OnInit, ControlValueAccessor, OnDestroy {
  readonly Meridiem = Meridiem;

  maxMinutes = '59';
  maxHours = '11';

  timeForm: FormGroup;

  @Input()
  set value(value: moment.Moment) {
    this.timeForm.patchValue(this.parseTimeValue(value ?? moment()));
  }

  get parsedValue(): TimePickerModel {
    return this.timeForm.value;
  }

  @Output()
  valueChange = new EventEmitter<moment.Moment>();

  private _destroy$ = new Subject<void>();
  private _onTouchedCb: () => void;
  private _onChangeCb: (value: moment.Moment) => void;
  constructor(private _formBuilder: FormBuilder, private convertTimeToTimeZone: ConvertTimeToTimeZone) {}

  ngOnInit(): void {
    this.timeForm = this._formBuilder.group({
      hours: ['00'],
      minutes: ['00'],
      meridiem: [Meridiem.AM],
    });

    this.timeForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value) => this.emitNewValue(this.getMomentFromValue(value)));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  writeValue(value: moment.Moment): void {
    this.value = value ? value : moment.utc();
  }

  registerOnChange(fn: (value: moment.Moment) => void): void {
    this._onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCb = fn;
  }

  onHoursChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (+target.value > +this.maxHours) {
      target.value = this.maxHours;
    }
  }

  onMinutesChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (+target.value > +this.maxMinutes) {
      target.value = this.maxMinutes;
    }
  }

  onInputKeypress(event: KeyboardEvent): void {
    if (!/^[0-9]$/g.test(event.key)) {
      event.preventDefault();
    }
  }

  onHoursIncrement(): void {
    const hours = parseInt(this.timeForm.value.hours, 10);
    let newValue = this.maxHours;

    if (hours + 1 < +this.maxHours) {
      newValue = hours + 1 < 10 ? `0${hours + 1}` : `${hours + 1}`;
    }

    this.timeForm.patchValue({
      hours: newValue,
    });
  }

  onHoursDecrement(): void {
    const hours = parseInt(this.timeForm.value.hours, 10);

    let newValue = '00';

    if (hours - 1 > 0) {
      newValue = hours - 1 < 10 ? `0${hours - 1}` : `${hours - 1}`;
    }

    this.timeForm.patchValue({ hours: newValue });
  }

  onMinutesIncrement(): void {
    const minutes = parseInt(this.timeForm.value.minutes, 10);
    let newValue = this.maxMinutes;

    if (minutes + 1 < +this.maxMinutes) {
      newValue = minutes + 1 < 10 ? `0${minutes + 1}` : `${minutes + 1}`;
    }

    this.timeForm.patchValue({
      minutes: newValue,
    });
  }

  onMinutesDecrement(): void {
    const minutes = parseInt(this.timeForm.value.minutes, 10);
    let newValue = '00';

    if (minutes - 1 > 0) {
      newValue = minutes - 1 < 10 ? `0${minutes - 1}` : `${minutes - 1}`;
    }

    this.timeForm.patchValue({ minutes: newValue });
  }

  onHoursKeyDown(event: KeyboardEvent): void {
    if (event.code === KeyboardKeyCodes.ArrowUp) {
      this.onHoursIncrement();
    }
    if (event.code === KeyboardKeyCodes.ArrowDown) {
      this.onHoursDecrement();
    }
  }

  onMinutesKeydown(event: KeyboardEvent): void {
    if (event.code === KeyboardKeyCodes.ArrowUp) {
      this.onMinutesIncrement();
    }
    if (event.code === KeyboardKeyCodes.ArrowDown) {
      this.onMinutesDecrement();
    }
  }

  onHoursMouseWheel(event: WheelEvent): void {
    const isScrollingUp = event.deltaY < 0;
    const isScrollingDown = event.deltaY > 0;

    if (isScrollingUp) {
      this.onHoursIncrement();
    }
    if (isScrollingDown) {
      this.onHoursDecrement();
    }
  }

  onMinutesMouseWheel(event: WheelEvent): void {
    const isScrollingUp = event.deltaY < 0;
    const isScrollingDown = event.deltaY > 0;

    if (isScrollingUp) {
      this.onMinutesIncrement();
    }
    if (isScrollingDown) {
      this.onMinutesDecrement();
    }
  }

  private parseTimeValue(value: moment.Moment): TimePickerModel {
    const parsedValue = moment(this.convertTimeToTimeZone.transform(value.toISOString(), 'startTimeLocal')).add(15, 'minutes');

    const to12HourFormat = moment(parsedValue.clone().format('hh:mm'), 'hh:mm');

    return {
      hours: to12HourFormat.hour() < 10 ? `0${to12HourFormat.hour()}` : `${to12HourFormat.hour()}`,
      minutes: parsedValue.minutes() < 10 ? `0${parsedValue.minutes()}` : `${parsedValue.minutes()}`,
      meridiem: parsedValue.format('a').toUpperCase() as Meridiem,
    };
  }

  private getMomentFromValue(value: TimePickerModel): moment.Moment {
    return moment(`${value.hours}:${value.minutes} ${value.meridiem}`, ['h:mm A']);
  }

  private emitNewValue(value: moment.Moment): void {
    this.valueChange.emit(value);
    if (this._onChangeCb) {
      this._onChangeCb(value);
    }
  }
}

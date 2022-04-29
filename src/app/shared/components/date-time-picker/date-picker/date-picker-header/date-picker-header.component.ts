import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  DateAdapter,
  MatDateFormats,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-date-picker-header',
  templateUrl: './date-picker-header.component.html',
  styleUrls: ['./date-picker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerHeaderComponent implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<Moment>,
    private _dateAdapter: DateAdapter<Moment>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter.format(
      this._calendar.activeDate,
      this._dateFormats.display.monthYearLabel,
    );
  }

  previousClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
      this._calendar.activeDate,
      -1,
    );
  }

  nextClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
      this._calendar.activeDate,
      1,
    );
  }
}

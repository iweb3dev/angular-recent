import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'MM/YY',
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class CreditCardComponent implements OnInit {
  @Input()
  creditCardForm: FormGroup;

  today = new Date();

  constructor() {}

  ngOnInit(): void {}

  chosenYearHandler(normalizedYear: moment.Moment): void {
    const control = this.creditCardForm.get('expirationNotice');
    const value = control.value ? control.value : moment();
    value.year(normalizedYear.year());
    control.setValue(value);
  }

  chosenMonthHandler(
    normalizedMonth: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>,
  ) {
    const control = this.creditCardForm.get('expirationNotice');
    const value = control.value ? control.value : moment();

    value.month(normalizedMonth.month());

    control.setValue(value);
    datepicker.close();
  }
}

import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const DATE_PICKER_FORMATS = {
  parse: {
    dateInput: 'DD/MMM/YYYY',
  },
  display: {
    dateInput: 'DD/MMM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MMM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class DatePickerAdapter extends MomentDateAdapter {
  getDayOfWeekNames(): string[] {
    return ['SU', 'MU', 'TU', 'WE', 'TH', 'FR', 'SA'];
  }
}

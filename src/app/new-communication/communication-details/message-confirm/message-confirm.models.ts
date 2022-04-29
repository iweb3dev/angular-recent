import * as moment from 'moment';

export enum ScheduleRepeatOptions {
  NoRepeat = `Don't repeat`,
  Sundays = 'Every Sunday',
  Mondays = 'Every Monday',
  Tuesdays = 'Every Tuesday',
  Wednesdays = 'Every Wednesday',
  Thursdays = 'Every Thursday',
  Fridays = 'Every Friday',
  Saturdays = 'Every Saturday',
}

export interface ScheduleOptionsModel {
  date: moment.Moment;
  repeatOptions: ScheduleRepeatOptions;
}

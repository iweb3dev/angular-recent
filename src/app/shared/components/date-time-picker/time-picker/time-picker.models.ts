export enum Meridiem {
  AM = 'AM',
  PM = 'PM',
}

export interface TimePickerModel {
  hours: string;
  minutes: string;
  meridiem: Meridiem;
}

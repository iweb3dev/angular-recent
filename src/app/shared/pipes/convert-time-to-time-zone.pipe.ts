import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { UserFacade } from '@core/store/features/user/user.facade';
import * as moment from 'moment-timezone';

@Pipe({ name: 'convertTimeToTimeZone' })
export class ConvertTimeToTimeZone implements PipeTransform {
  constructor(private _userFacade: UserFacade, private datePipe: DatePipe) {}

  private convertLocalTimeToTimeZone(date: string | Date, timeZoneUtcOffSet: string): string {
    const formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy h:mm:ss a', 'en-En');

    const localTimeZone = moment().format('Z');
    const localHour = new Date().getHours();

    const makeDateFromString = new Date(formattedDate);
    const timeDiff = parseFloat(localTimeZone) - parseFloat(timeZoneUtcOffSet);

    if (timeDiff <= 0) {
      makeDateFromString.setHours(localHour + Math.abs(timeDiff));
    }
    if (timeDiff > 0) {
      makeDateFromString.setHours(localHour - Math.abs(timeDiff));
    }

    const transformDate = this.datePipe.transform(makeDateFromString, 'MM/dd/yyyy h:mm:ss a', 'en-En');

    return transformDate;
  }

  private convertInstanceTimeToTimeZone(date: string | Date, timeZoneUtcOffSet: string): string {
    const utcTimeZone = moment.utc().format('Z');
    const makeDateFromString = new Date(date);

    const apiHour = makeDateFromString.getHours();
    const timeDiff = parseFloat(utcTimeZone) - parseFloat(timeZoneUtcOffSet);

    if (timeDiff <= 0) {
      makeDateFromString.setHours(apiHour + Math.abs(timeDiff));
    }
    if (timeDiff > 0) {
      makeDateFromString.setHours(apiHour - Math.abs(timeDiff));
    }

    const transformDate = this.datePipe.transform(makeDateFromString, 'MM/dd/yyyy h:mm:ss a', 'en-En');
    return transformDate;
  }

  private convertProfileTimeToInstanceTimeZone(date: string | Date, timeZoneUtcOffSet: string): string {
    const localTimeZone = moment.utc().format('Z');
    const makeDateFromString = new Date(date);
    const timeDiff = parseFloat(localTimeZone) - parseFloat(timeZoneUtcOffSet);

    if (timeDiff <= 0) {
      makeDateFromString.setHours(makeDateFromString.getHours() - Math.abs(timeDiff));
    }
    if (timeDiff > 0) {
      makeDateFromString.setHours(makeDateFromString.getHours() + Math.abs(timeDiff));
    }

    const transformDate = this.datePipe.transform(makeDateFromString, 'MM/dd/yyyy h:mm:ss a', 'en-En');
    return transformDate;
  }

  transform(time: string | Date, pipeSetting = 'startTimeInstance' || 'startTimeLocal' || 'profileTimezoneToInstance'): string {
    if (time) {
      let timeZoneUtcOffSet;
      this._userFacade.currentUserFullInfo$.subscribe((timeZone) => {
        timeZoneUtcOffSet = timeZone?.timeZone.utcOffSet;
      });
      if (pipeSetting === 'startTimeInstance') {
        return `${this.convertInstanceTimeToTimeZone(time, timeZoneUtcOffSet)}`;
      } else if (pipeSetting === 'startTimeLocal') {
        return `${this.convertLocalTimeToTimeZone(time, timeZoneUtcOffSet)}`;
      } else {
        return `${this.convertProfileTimeToInstanceTimeZone(time, timeZoneUtcOffSet)}`;
      }
    }
    return;
  }
}

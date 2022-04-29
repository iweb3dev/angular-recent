import { Pipe, PipeTransform } from '@angular/core';
import { UserFacade } from '@core/store/features/user/user.facade';

@Pipe({ name: 'addTimeZoneAbbr' })
export class AddTimeZoneAbbr implements PipeTransform {
  constructor(private _userFacade: UserFacade) {}

  transform(time: string) {
    if (time) {
      let timeZoneAbbr;
      this._userFacade.currentUserFullInfo$.subscribe((timeZone) => {
        timeZoneAbbr = timeZone?.timeZone.timeZoneAbbreviation;
      });
      return `${time} ${timeZoneAbbr}`;
    }
    return;
  }
}

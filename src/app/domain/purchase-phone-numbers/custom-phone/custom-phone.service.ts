import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { PrepayOptionsDtoModel } from 'src/app/api/twilio/twilio.models';

import { TwilioService } from 'src/app/api/twilio/twilio.service';
import { AreaCodes } from 'src/app/shared/models/phone-number/phone-number.enumts';

import { CustomPhoneListDataModel } from '../purchase-phone-numbers.models';

@Injectable()
export class CustomPhoneService {
  constructor(private _twilioService: TwilioService) {}

  findPhoneNumbers(
    areaCode = AreaCodes.TollFree833,
    customNumber = '',
  ): Observable<CustomPhoneListDataModel[]> {
    return this._twilioService
      .fetchTollFreePhoneNumbers(customNumber, areaCode)
      .pipe(
        map((data) =>
          data.map(({ phoneNumber, friendlyName }) => ({
            phoneNumber,
            friendlyName,
          })),
        ),
      );
  }

  findPrepayOptions(): Observable<PrepayOptionsDtoModel[]> {
    return this._twilioService.fetchPrePayOptions();
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Http } from 'src/app/core/http/http.service';
import { AreaCodes } from 'src/app/shared/models/phone-number/phone-number.enumts';

import {
  TWIILIO_API_BASE,
  DELETE_TWILIO_PHONENUMBER,
  DELETE_ALL_TWILIO_PHONENUMBERS,
  GET_LIST_OF_TWILIO_TOLLFREE_PHONE_NUMBERS,
  GET_PHONE_NUMBER_PREPAY_OPTIONS,
} from './twilio.api';

import {
  PrepayOptionsDtoModel,
  TollFreeNumberPurchaseDtoModel,
  TwilioResponseDto,
  TwilioResponseModel,
} from './twilio.models';

@Injectable({
  providedIn: 'root',
})
export class TwilioService {
  constructor(private _http: Http, private _httpClient: HttpClient) {}

  fetchTollFreePhoneNumbers(
    searchText: string,
    areaCode: string = AreaCodes.TollFree833,
  ) {
    return this._http
      .get<TwilioResponseDto[]>(
        GET_LIST_OF_TWILIO_TOLLFREE_PHONE_NUMBERS(areaCode, searchText),
      )
      .pipe(map((dto) => this.mapTwilioResponseFromDto(dto)));
  }

  fetchPrePayOptions(): Observable<PrepayOptionsDtoModel[]> {
    return this._httpClient.get<PrepayOptionsDtoModel[]>(
      GET_PHONE_NUMBER_PREPAY_OPTIONS,
    );
  }

  purchaseTollFreePhoneNumber(
    paymentProfileId: number,
    phoneNumber: string,
    prepayOptionId: number,
  ): Observable<TollFreeNumberPurchaseDtoModel> {
    return this._http.post<
      TollFreeNumberPurchaseDtoModel,
      { phone_number: string; prepayOptionId: number }
    >(`${TWIILIO_API_BASE}/tollfreephonenumbers/${paymentProfileId}`, {
      phone_number: phoneNumber,
      prepayOptionId,
    });
  }

  private mapTwilioResponseFromDto(
    dto: TwilioResponseDto[],
  ): TwilioResponseModel[] {
    return dto.map((data) => ({
      addressRequirements: data.address_requirements,
      beta: data.beta,
      capabilities: data.capabilities,
      friendlyName: data.friendly_name,
      isoCountry: data.iso_country,
      lata: data.lata,
      latitude: data.latitude,
      locality: data.locality,
      longitude: data.longitude,
      phoneNumber: data.phone_number,
      postalCode: data.postal_code,
      rateCenter: data.rate_center,
      region: data.region,
    }));
  }

  deleteTwilioPhoneNumber(phoneNumberId: number): Observable<object> {
    return this._http.delete(DELETE_TWILIO_PHONENUMBER(phoneNumberId));
  }

  deleteAllTwilioPhoneNumbers(): Observable<object> {
    return this._http.delete(DELETE_ALL_TWILIO_PHONENUMBERS);
  }
}

import { Injectable } from '@angular/core';
import { Http } from 'src/app/core/http/http.service';
import { Observable } from 'rxjs';
import {
  GET_ALL_PHONE_NUMBERS,
  GET_PHONE_NUMBER_CALL_FORWARD,
  UPDATE_CALL_FORWARD_PHONE_NUMBER
  } from './phone-numbers.api';
import { PhoneNumbers } from './phone-numbers.models';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CallSheetComponent } from 'src/app/custom-phone-numbers/custom-numbers-detail/has-phone-numbers/phone-numbers-list/call-sheet/call-sheet.component';

@Injectable({
  providedIn: 'root'
})

export class PhoneNumbersService {

  constructor(
    private _Http: Http,
  ) {}

  getAllPhoneNumbers(): Observable<PhoneNumbers[]> {
      return this._Http.get<PhoneNumbers[]>(GET_ALL_PHONE_NUMBERS);
  }

  getPhoneNumberCallForward(phoneNumberForwarded: string) {
    return this._Http.get(GET_PHONE_NUMBER_CALL_FORWARD(phoneNumberForwarded));
  }

  updateCallForwarding(boughtPhoneNumberId: number, forwardPhoneNumberTo: string): Observable<any> {
    return this._Http.put(
      UPDATE_CALL_FORWARD_PHONE_NUMBER(boughtPhoneNumberId, forwardPhoneNumberTo), {});
  }




}

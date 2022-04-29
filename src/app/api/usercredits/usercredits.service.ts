import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import { OrderReceipt, PurchaseCredits } from '../packages/packages.models';

import { POST_RESULT_OF_USER_CREDIT_PURCHASE } from './usercredits.api';

@Injectable({
  providedIn: 'root',
})
export class UserCreditsService {
  constructor(private _http: Http) {}

  postResultOfUserCreditPurchase(
    purchase: PurchaseCredits,
  ): Observable<OrderReceipt> {
    return this._http.post<OrderReceipt>(
      POST_RESULT_OF_USER_CREDIT_PURCHASE,
      purchase,
    );
  }
}

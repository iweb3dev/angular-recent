import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';

import {
  DELETE_PAYMENT_PROFILE,
  FINANCIALS_API,
  GET_PAYMENT_PROFILES,
  PROMO_CODE_VALIDATE,
  SAVE_PAYMENT_PROFILE,
  UPDATE_PAYMENT_PROFILE,
  UPDATE_PRIMARY_ACCOUNT,
} from './financials.api';
import {
  BasePaymentProfile,
  PaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from './financials.models';

@Injectable({
  providedIn: 'root',
})
export class FinancialsService {
  constructor(private _http: Http) {}

  fetchFinancials(
    customerProfileId: number,
  ): Observable<(PaymentProfileBankAccount & PaymentProfileCreditCard)[]> {
    return this._http.get<
      (PaymentProfileBankAccount & PaymentProfileCreditCard)[]
    >(`${FINANCIALS_API}/${customerProfileId}`);
  }

  savePaymentProfile(
    profile: Partial<PaymentProfile>,
  ): Observable<(PaymentProfileBankAccount & PaymentProfileCreditCard)[]> {
    return this._http.post<
      (PaymentProfileBankAccount & PaymentProfileCreditCard)[]
    >(SAVE_PAYMENT_PROFILE, profile);
  }

  getPaymentProfiles(
    customerProfileId: number,
    edit = false,
  ): Observable<(PaymentProfileBankAccount & PaymentProfileCreditCard)[]> {
    return this._http.get<
      (PaymentProfileBankAccount & PaymentProfileCreditCard)[]
    >(GET_PAYMENT_PROFILES(customerProfileId, edit));
  }

  updatePaymentProfile(
    paymentProfileId: number,
    profile: Partial<PaymentProfile>,
  ): Observable<BasePaymentProfile[]> {
    return this._http.put<BasePaymentProfile[]>(
      UPDATE_PAYMENT_PROFILE(paymentProfileId),
      profile,
    );
  }

  updatePrimiaryAccount(
    paymentProfileId: number,
    customerProfileId: number,
  ): Observable<number> {
    return this._http.put<number>(
      UPDATE_PRIMARY_ACCOUNT(paymentProfileId, customerProfileId),
      null,
    );
  }

  deletePaymentProfile(
    paymentProfileId: number,
    customerProfileId: number,
  ): Observable<object> {
    return this._http.delete(
      DELETE_PAYMENT_PROFILE(paymentProfileId, customerProfileId),
    );
  }
}

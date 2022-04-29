import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import {
  GET_DOMAIN_STATUS,
  GET_DOMAIN_EMAIL_FORWARDERS,
  SET_ALL_DOMAIN_EMAIL_FORWARDERS,
  PURCHASE_DOMAIN_NAME,
  GET_SUGGESTED_DOMAIN_NAMES
} from './domainnames.api';
import {
  Domain,
  EmailForwarders,
  PurchaseDomain
} from './domainnames.models';

@Injectable({
  providedIn: 'root',
})
export class DomainNamesService {

  constructor(private _http: Http) {}

  getDomainStatus(name: string):
    Observable<Domain> {
    return this._http
      .get<Domain>(GET_DOMAIN_STATUS(name));
  }

  getDomainEmailForwarders(SLD: string, TLD: string):
    Observable<string[]> {
    return this._http
      .get<string[]>(GET_DOMAIN_EMAIL_FORWARDERS(SLD, TLD));
  }

  setAllDomainEmailForwarders(SLD: string, TLD: string, item: EmailForwarders):
    Observable<string[]> {
    return this._http
      .post<string[]>(SET_ALL_DOMAIN_EMAIL_FORWARDERS(SLD, TLD), item);
  }

  purchaseDomainName(domain: PurchaseDomain) {
    return this._http
      .post<object>(PURCHASE_DOMAIN_NAME, domain);
  }

  getSuggestedDomainNames(keyword: string):
    Observable<Domain[]> {
    return this._http
      .get<Domain[]>(GET_SUGGESTED_DOMAIN_NAMES(keyword));
  }
}

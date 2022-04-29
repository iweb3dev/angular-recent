import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ADD_EXTERNAL_LOGIN,
  ALLOW_ANONYMOUS,
  ASSOCIATED_ACCOUNTS_EXTERNAL_LOGIN,
  GET_LOGIN_INFO,
  INFO_EXTERNAL_LOGIN,
  REMOVE_LOGIN,
  SEARCH_USER,
} from './external-login.api';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ExternalLoginProvider,
  ExternalUserInfoModel,
  ExternalUserInfoReqModel,
  SocialAuthQueryModel,
} from './external-login.model';
import * as moment from 'moment';
import { Http } from 'src/app/core/http/http.service';
import {
  RegisterSocialUser,
  SearchSocialUserResponse,
} from 'src/app/auth/social-login/store/social-login.models';

@Injectable({ providedIn: 'root' })
export class ExternalLoginService {
  constructor(private __http: HttpClient, private _http: Http) {}

  addExternalLogin(token: string): Observable<any> {
    return this._http.post(ADD_EXTERNAL_LOGIN, { externalAccessToken: token });
  }

  getExternalUserInfo(): Observable<ExternalUserInfoModel> {
    const time_now = moment().valueOf().toString();
    const params: ExternalUserInfoReqModel = {
      returnUrl: 'externalLogin',
      generateState: 'true',
      rnd: time_now,
    };
    return this.__http.get<ExternalUserInfoModel>(INFO_EXTERNAL_LOGIN, {
      params: {
        returnUrl: params.returnUrl,
        generateState: params.generateState,
        rnd: params.rnd,
      },
    });
  }

  getSocialAuth(params: SocialAuthQueryModel, url: string) {
    return this.__http.get(`${ALLOW_ANONYMOUS}${url}`);
  }

  getUserInfoBeforeLogin(): Observable<ExternalLoginProvider[]> {
    const time_now = moment().valueOf().toString();
    const params: ExternalUserInfoReqModel = {
      returnUrl: 'externalLogin',
      generateState: 'true',
      rnd: time_now,
    };

    return this.__http.get<ExternalLoginProvider[]>(GET_LOGIN_INFO, {
      params: {
        returnUrl: params.returnUrl,
        generateState: params.generateState,
        rnd: params.rnd,
      },
    });
  }

  removeExternalLogin(
    loginProvider: string,
    providerKey: string
  ): Observable<boolean> {
    const body = {
      loginProvider,
      providerKey,
    };
    return this._http.post(REMOVE_LOGIN, body);
  }

  searchExternalLogin(
    provider: string,
    providerKey: string
  ): Observable<SearchSocialUserResponse> {
    let params = new HttpParams();

    params = params.append('provider', provider);
    params = params.append('providerKey', providerKey);
    return this.__http.get<SearchSocialUserResponse>(SEARCH_USER, { params });
  }

  addExternalUserLogin(
    registerSocialUser: RegisterSocialUser
  ): Observable<boolean> {
    return this._http.post<boolean>(ADD_EXTERNAL_LOGIN, registerSocialUser);
  }

  fetchAssociatedAccounts(): Observable<ExternalUserInfoModel> {
    return this._http.get<ExternalUserInfoModel>(
      ASSOCIATED_ACCOUNTS_EXTERNAL_LOGIN
    );
  }
}

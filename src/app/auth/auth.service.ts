import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LocalStorageService } from '../core/storage/local-storage.service';
import { AuthEnum, TokensEnum } from '../shared/models/enums/auth';

import {
  LoginModel,
  LoginResponseDto,
  LoginResponseModel,
} from './login/login.models';
import {
  RegisterFormModel,
  RegisterModelDto,
} from './register/register.models';
import { Http } from '../core/http/http.service';
import {
  ToastService,
  ToastType,
} from '@shared/components/toast/service/toast.service';

@Injectable()
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _Http: Http,
    private _localStorageService: LocalStorageService,
    private _toastService: ToastService,
  ) {}

  openErrorSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Error, message);
  }

  openSuccessSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Success, message);
  }

  login(data: LoginModel): Observable<LoginResponseModel> {
    const payload = `username=${data.login}&password=${data.password}&grant_type=password`;
    let response;
    if (data.ownerID) {
      response = this._http
        .post<LoginResponseDto>(
          `${environment.api.base}/token?lm=0&oid=${data.ownerID}`,
          payload,
        )
        .pipe(
          map((tokenData) => this.createLoginResponse(tokenData)),
          tap((tokens) => {
            this._localStorageService.set(AuthEnum.Manager, true);
            this._localStorageService.set(AuthEnum.Token, {
              [TokensEnum.AccessToken]: tokens.accessToken,
              [TokensEnum.Expires]: tokens.expires,
            });
          }),
        );
    } else {
      response = this._http
        .post<LoginResponseDto>(`${environment.api.base}/token?lm=0`, payload)
        .pipe(
          map((tokenData) => this.createLoginResponse(tokenData)),
          tap((tokens) => {
            this._localStorageService.set(AuthEnum.Manager, false);
            this._localStorageService.set(AuthEnum.Token, {
              [TokensEnum.AccessToken]: tokens.accessToken,
              [TokensEnum.Expires]: tokens.expires,
            });
          }),
        );
    }
    return response;
  }

  register(payload: RegisterFormModel): Observable<unknown> {
    const response = this._http.post(
      `${environment.api.base}/api/account/register`,
      this.createRegisterDtoRequest(payload),
    );

    return response;
  }

  invitedUserRegistration(invitedGroupManagerData) {
    return this._Http.post(
      `/api/users/invitedUserRegistration`,
      invitedGroupManagerData,
    );
  }

  private createLoginResponse(dto: LoginResponseDto): LoginResponseModel {
    return {
      accessToken: dto.access_token,
      expiresIn: dto.expires_in,
      tokenType: dto.token_type,
      expires: dto['.expires'],
    };
  }

  private createRegisterDtoRequest(
    payload: RegisterFormModel,
  ): RegisterModelDto {
    return {
      accessCode: 'IronMan2008',
      password: payload.password,
      emailAddress: payload.emailAddress,
      firstName: payload.firstName,
      lastName: '',
      organizationSubTypesValue: 0,
      organizationTypesValue: payload.organizationTypesValue,
      organizationName: '',
      referralCode: '',
      userPhoneNumber: payload.userPhoneNumber,
      webUserName: payload.userPhoneNumber,
      isTrialRegistration: true,
      howYouFoundOutAboutUsId: 0,
      signUpType: 2,
      packageId: 115,
      loginMethod: 0,
      usePhoneNumberAsId: true,
    };
  }
}

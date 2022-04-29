import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordResetResult } from 'src/app/api/shared/shared.enums';
import { RequestGetUserNameByEmailAddress, RequestResetPassword } from 'src/app/api/users/users.models';
import { environment } from '../../../environments/environment';

export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const USER_ENDPOINT = '/api/users';
export const RESET_USER_PASSWORD = `${ALLOW_ANONYMOUS}${USER_ENDPOINT}/resetPassword`;

@Injectable({providedIn: 'root'})
export class RecoverUserPasswordService {
  constructor(private _http: HttpClient) {}

  resetUserPassword(
    resetUserPassword: RequestResetPassword,
  ): Observable<PasswordResetResult> {
    return this._http.put<PasswordResetResult>(
      RESET_USER_PASSWORD,
      resetUserPassword,
    );
  }
}

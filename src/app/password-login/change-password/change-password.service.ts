import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '@core/http/http.models';
import { Http } from '@core/http/http.service';
import { Observable } from 'rxjs';
import { RequestChangePassword } from 'src/app/api/users/users.models';
import { environment } from '../../../environments/environment';

export const USER_ENDPOINT = '/api/users';
export const CHANGE_USER_PASSWORD = `${USER_ENDPOINT}/passwords`;

@Injectable({providedIn: 'root'})
export class ChangePasswordService {
  constructor(private _http: Http) {}

  changeUserPassword(changeUserPassword: RequestChangePassword):
    Observable<boolean> {
    return this._http.put<boolean>(CHANGE_USER_PASSWORD, changeUserPassword);
  }
}

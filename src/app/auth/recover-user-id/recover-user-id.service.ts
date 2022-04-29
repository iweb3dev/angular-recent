import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestGetUserNameByEmailAddress } from 'src/app/api/users/users.models';
import { environment } from '../../../environments/environment';

export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const USER_ENDPOINT = '/api/users';
export const GET_USERNAME_BY_EMAILADDRESS = `${ALLOW_ANONYMOUS}${USER_ENDPOINT}/getUsername`;

@Injectable({providedIn: 'root'})
export class RecoverUserIdService {
  constructor(private _http: HttpClient) {}

  getUserNameByEmailAddress(
    getUserNameByEmailAddess: RequestGetUserNameByEmailAddress):
    Observable<boolean> {
    return this._http.put<boolean>(GET_USERNAME_BY_EMAILADDRESS, getUserNameByEmailAddess);
  }
}

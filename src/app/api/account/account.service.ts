import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import { UserModelDto } from '../users/users.models';
import {
  LOGIN_USER_NAME,
  REGISTER,
} from './account.api';
import {
  AccountLoginModel,
  RegisterUserModel
} from './account.models';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private _Http: Http) {}

  login(accountModel: AccountLoginModel):
    Observable<UserModelDto> {
    return this._Http
      .post<UserModelDto>(LOGIN_USER_NAME, accountModel);
  }

  register(registerModel: RegisterUserModel):
    Observable<UserModelDto> {
    return this._Http
      .post<UserModelDto>(REGISTER, registerModel);
  }
}

import { Injectable } from '@angular/core';
import { AuthEnum, TokenModel } from 'src/app/shared/models/enums/auth';
import * as moment from 'moment';

import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  constructor(private _localStorageService: LocalStorageService) {}

  hasValidToken(): boolean {
    if (!this.getTokenModel()) {
      return false;
    }
    const expiry = this.getTokenModel().expires;

    return moment(expiry).isAfter(moment(new Date().toUTCString()));
  }

  get hasToken(): boolean {
    return !!this.getTokenModel();
  }

  get isManager(): boolean {
    return this._localStorageService.get(AuthEnum.Manager);
  }

  getAccessToken(): string {
    return this.getTokenModel()?.accessToken;
  }

  removeAccesToken(): void {
    this._localStorageService.remove(AuthEnum.Token);
  }

  private getTokenModel(): TokenModel {
    return this._localStorageService.get(AuthEnum.Token);
  }
}

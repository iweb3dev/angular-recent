import { Injectable } from '@angular/core';
import { AuthEnum } from 'src/app/shared/models/enums/auth';
import { TokensService } from './tokens.service';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  constructor(private _tokensService: TokensService) {}

  terminateSession(): void {
    this._tokensService.removeAccesToken();
  }

  get isAuthenticated(): boolean {
    return this._tokensService.hasValidToken();
  }

  get isManager(): boolean {
    return this._tokensService.isManager ? this._tokensService.isManager : false;
  }
}

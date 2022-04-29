import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { SocialAuthService } from 'angularx-social-login';
import { UserFacade } from '@core/store/features/user/user.facade';

@Component({
  selector: 'app-social-user-registered',
  templateUrl: './social-user-registered.component.html',
  styleUrls: ['./social-user-registered.component.scss'],
})
export class SocialUserRegisteredComponent {
  user$ = this._userFacade.currentUserInfo$;
  socialUser$ = this._socialAuthService.authState;

  constructor(
    private _userFacade: UserFacade,
    private _socialAuthService: SocialAuthService,
    public _dialogRef: MatDialogRef<SocialUserRegisteredComponent>
  ) {}

  closeOnClick(): void {
    this._dialogRef.close();
  }
}

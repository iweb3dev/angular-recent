import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { SocialUserDefaultState } from '../social-login/constants/default-social-user-state.const';

import { SocialAuthService } from 'angularx-social-login';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { SocialLoginFacade } from '../social-login/store/social-login.facade';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit, OnDestroy {
  private subscription$: Subscription;
  private isSocialUser$ = this._socialLoginFacade.isSocialUser$;

  constructor(
    private _userFacade: UserFacade,
    private _socialLoginFacade: SocialLoginFacade,
    private _socialAuthService: SocialAuthService
  ) {
    this.subscription$ = new Subscription();
  }

  ngOnInit(): void {
    this.logoutSocialUser();
    this._userFacade.logOut();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  logoutSocialUser(): void {
    this.subscription$.add(
      this.isSocialUser$
        .pipe(
          filter((user) => !!user),
          tap(() => {
            this._socialLoginFacade.logoutUser(SocialUserDefaultState);
            this._socialAuthService.signOut();
          })
        )
        .subscribe()
    );
  }
}

import { Params, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';

import { AppState } from 'src/app/store/app-state';
import { logIn, logInSuccess } from './store/login.actions';
import { fetchUser } from 'src/app/core/store/features/user/user.actions';
import { selectFormValidity, selectIsLoggingIn } from './store/login.selectors';
import { selectMainUserInfo } from 'src/app/core/store/features/user/user.selectors';

import { AuthEnum } from 'src/app/shared/models/enums/auth';

import { LoginModel } from './login.models';
import { AccountsManaged } from 'src/app/api/users/users.models';

import { LoaderFacade } from '@core/store/features/loader/loader.facade';
import { LocalStorageService } from 'src/app/core/storage/local-storage.service';

import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-login-container',
  templateUrl: './login.container.html',
})
export class LoginContainerComponent implements OnInit, OnDestroy {
  isLoggingIn$ = this._store.select(selectIsLoggingIn);
  formValidity$ = this._store.select(selectFormValidity);
  mainUserInfo$ = this._store.select(selectMainUserInfo);

  private _credentials: LoginModel;
  destroyed$ = new Subject<boolean>();

  private recoverPasswordPin: string;
  private currentPassword: string;

  constructor(
    private _router: Router,
    public _dialog: MatDialog,
    private _actions$: Actions,
    private _route: ActivatedRoute,
    private _store: Store<AppState>,
    private _loaderFacade: LoaderFacade,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      const userName = params['u'];
      const password = params['h'];
      const recoverPasswordQueryParams = params['tempPin'];
      if (userName && password) {
        const credentials = {
          login: userName,
          password: password,
        };
        this.onLogin(credentials);
        if (recoverPasswordQueryParams) {
          this.recoverPasswordPin = recoverPasswordQueryParams;
          this.currentPassword = password;
        }
      }
    });

    this._actions$.pipe(ofType(logInSuccess), takeUntil(this.destroyed$)).subscribe(() => {
      this._store.dispatch(fetchUser());
    });

    this.mainUserInfo$.pipe(takeUntil(this.destroyed$)).subscribe((user: any) => {
      if (user) {
        if (user.accountsManaged.length > 0) {
          const accounts: AccountsManaged[] = user.accountsManaged;

          this.openDialog(accounts);
        }
        if (this.recoverPasswordPin) {
          this.navigateToRecoveryPassword();
        } else {
          this.navigateToDashboard();
        }
      }
    });
  }

  onLogin(credentials: LoginModel): void {
    this._credentials = credentials;
    this._loaderFacade.showDetachedLoader();
    this._store.dispatch(logIn(credentials));
  }

  openDialog(accounts): void {
    const dialogRef = this._dialog.open(LoginModalComponent, {
      width: '500px',
      data: { id: 1, accounts },
      panelClass: 'login-modal',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result || result === 0) {
        if (result !== 0) {
          this._credentials.ownerID = result;
          this._localStorageService.set(AuthEnum.Manager, true);
          this._store.dispatch(logIn(this._credentials));
          this.destroyed$.next(true);
          this.destroyed$.complete();
          window.location.reload();
        }

        this.navigateToDashboard();
      } else {
        this._localStorageService.remove(AuthEnum.Token);
        this._localStorageService.remove(AuthEnum.Manager);
      }
    });
  }

  navigateToDashboard() {
    this._router.navigate(['/dashboard']);
  }

  navigateToRecoveryPassword() {
    this._router.navigate(['/password-login'], {
      queryParams: {
        tempPin: this.recoverPasswordPin,
      },
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

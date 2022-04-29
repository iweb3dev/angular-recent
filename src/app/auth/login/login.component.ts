import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Input,
  OnInit,
  Output,
  OnDestroy,
  Component,
  EventEmitter,
} from '@angular/core';

import { Subject } from 'rxjs';
import { tap, filter, takeUntil } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import { LoginErrors, LoginModel } from './login.models';

import { SocialLoginFacade } from '../social-login/store/social-login.facade';
import {
  ToastType,
  ToastService,
} from '@shared/components/toast/service/toast.service';

const googleLogoURL = '/assets/img/google.svg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  socialProvider: string;

  socialUser$ = this._socialLoginFacade.socialUser$;
  isNewSocialSignup$ = this._socialLoginFacade.isNewSocialSignUp$.pipe(
    tap((signup) => signup && window.scroll(0, 0))
  );

  @Input()
  isLoggingIn = false;

  @Output()
  logIn = new EventEmitter<LoginModel>();
  get hasUserRequiredError(): boolean {
    return (
      this.loginForm.get('login').invalid && this.loginForm.get('login').touched
    );
  }

  get hasPasswordRequiredError(): boolean {
    return (
      this.loginForm.get('password').invalid &&
      this.loginForm.get('password').touched
    );
  }

  get hasInvalidCredentialsError(): boolean {
    return this.loginForm.hasError('invalidCredentials');
  }

  private _destroy$ = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _domSanitizer: DomSanitizer,
    private _toastService: ToastService,
    private _matIconRegistry: MatIconRegistry,
    private _socialAuthService: SocialAuthService,
    private _socialLoginFacade: SocialLoginFacade
  ) {
    this._matIconRegistry.addSvgIcon(
      'logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL)
    );
    this.initializeForm();
  }

  ngOnInit(): void {
    this.intializeNewSocialLoginState();
  }

  @Input()
  set formValidity(formValidity: LoginErrors) {
    this.loginForm.setErrors({
      invalidCredentials: formValidity === LoginErrors.InvalidGrant,
    });
  }

  onSubmit(): void {
    this.logIn.emit(this.loginForm.value);
  }

  private initializeForm(): void {
    this.loginForm = this._formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private intializeNewSocialLoginState(): void {
    this.socialUser$
      .pipe(
        filter((user) => !!user),
        takeUntil(this._destroy$),
        tap((user) =>
          this.logIn.emit({
            login: user.webUserName,
            password: user.webPassword,
          })
        )
      )
      .subscribe();
  }

  private loginSocialUser(providerID: string): void {
    this._socialAuthService
      .signIn(providerID)
      .then((user) => {
        this.socialProvider = user.provider;
        this._socialLoginFacade.searchUser(user.provider, user.id);
      })
      .catch(() =>
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to get user from social provider'
        )
      );
  }

  public loginViaFacebookOnClick(): void {
    this.loginSocialUser(FacebookLoginProvider.PROVIDER_ID);
  }

  public loginViaGoogleOnClick(): void {
    this.loginSocialUser(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

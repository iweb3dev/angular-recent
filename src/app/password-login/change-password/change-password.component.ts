import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { BehaviorSubject, combineLatest, EMPTY, Subject } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import {
  tap,
  take,
  filter,
  takeUntil,
  switchMap,
  catchError,
} from 'rxjs/operators';

import { RequestChangePassword } from 'src/app/api/users/users.models';
import { ExternalUserInfoModel } from './../../api/external-logins/external-login.model';
import {
  SocialProvider,
  RegisterSocialUser,
} from 'src/app/auth/social-login/store/social-login.models';

import { capitalize } from '@shared/utils/format/captalize-string.helper';

import { ChangePasswordService } from './change-password.service';
import { UserFacade } from '@core/store/features/user/user.facade';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { SocialLoginFacade } from 'src/app/auth/social-login/store/social-login.facade';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

const googleLogoURL = '/assets/img/google.svg';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  newPassword: FormControl;
  currentPassword: FormControl;
  changePasswordForm: FormGroup;
  confirmNewPassword: FormControl;

  hasGoogleAccount = false;
  hasFacebookAccount = false;

  googleProvider: SocialProvider;
  facebookProvider: SocialProvider;

  private isNewSocialSignUp$ = this._socialLoginFacade.isNewSocialSignUp$;
  private associatedAccounts$ = this._socialLoginFacade.associatedAccounts$;
  private socialUserRegistered$ = this._socialLoginFacade.socialUserRegistered$;
  private combinedSocialLogin$ = combineLatest([
    this._socialAuthService.authState,
    this._userFacade.currentUserFullInfo$,
  ]).pipe(take(1));

  private _destroy$ = new Subject<void>();
  public showCurrentPassword = new BehaviorSubject<boolean>(true);

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userFacade: UserFacade,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _domSanitizer: DomSanitizer,
    private _loaderService: LoaderService,
    private _matIconRegistry: MatIconRegistry,
    private _socialAuthService: SocialAuthService,
    private _socialLoginFacade: SocialLoginFacade,
    private _changePasswordService: ChangePasswordService,
  ) {
    this._matIconRegistry.addSvgIcon(
      'logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL),
    );
  }

  ngOnInit(): void {
    this.initializeForm();

    this.setAssociatedAccounts();
    this._socialLoginFacade.associatedAccounts();

    this._route.queryParams.subscribe((params) => {
      const recoverPasswordPin = params['tempPin'];
      if (recoverPasswordPin) {
        this.changePasswordForm.patchValue({
          currentPassword: recoverPasswordPin,
        });
        this.showCurrentPassword.next(false);
      }
    });
  }

  private initializeForm(): void {
    this.newPassword = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('^[0-9]+$'),
      ]),
    );

    this.currentPassword = new FormControl(
      '',
      Validators.compose([Validators.required]),
    );
    this.confirmNewPassword = new FormControl(
      '',
      Validators.compose([Validators.required, this.confirmEquals()]),
    );

    this.changePasswordForm = this._formBuilder.group({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword,
    });
  }

  get passwordValue() {
    return this.newPassword.value;
  }

  private setExternalLoginsInfo(accounts: ExternalUserInfoModel): void {
    accounts.logins.forEach((login) => {
      const { loginProvider } = login;

      if (loginProvider.toLowerCase() === 'google') {
        this.hasGoogleAccount = true;
        this.googleProvider = { ...login };
      }

      if (loginProvider.toLowerCase() === 'facebook') {
        this.hasFacebookAccount = true;
        this.facebookProvider = { ...login };
      }
    });
  }

  private setAssociatedAccounts(): void {
    this.associatedAccounts$
      .pipe(
        takeUntil(this._destroy$),
        filter((accounts) => !!accounts),
      )
      .subscribe((accounts) => this.setExternalLoginsInfo(accounts));
  }

  onSave(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    this._loaderService.showLoader();
    const formValue = this.changePasswordForm.value;
    const dto: RequestChangePassword = {
      oldPassword: formValue.currentPassword,
      newPassword: formValue.newPassword,
      confirmPassword: formValue.confirmNewPassword,
    };

    this._changePasswordService
      .changeUserPassword(dto)
      .pipe(
        takeUntil(this._destroy$),
        catchError((error) => {
          this._loaderService.removeLoader();
          console.error(error);
          this._toastService.addToast(ToastType.Error, 'Something went wrong.');
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        this._loaderService.removeLoader();
        if (res) {
          this._toastService.addToast(
            ToastType.Success,
            'Password Change Success!',
          );
          this.redirectOnSuccess();
        } else {
          this._toastService.addToast(ToastType.Error, 'Something went wrong.');
        }
      });
  }

  private redirectOnSuccess(): void {
    this._router.navigate(['/dashboard']);
  }

  hasSpecificError(control: AbstractControl, error: string) {
    if (control.errors == null) {
      return false;
    }
    return (control.errors[error] && control.dirty) || control.errors[error];
  }

  confirmEquals(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value?.toLowerCase() === this.passwordValue.toLowerCase()
        ? null
        : { noMatch: true };
  }

  private getAssociatedAccounts(provider: string): void {
    this.socialUserRegistered$
      .pipe(
        filter((registered) => !!registered),
        take(1),
        tap(() => {
          this._socialLoginFacade.associatedAccounts();
          this._toastService.addToast(
            ToastType.Success,
            `${capitalize(provider)} account associated successfully`,
          );
        }),
      )
      .subscribe();
  }

  private associateSocialProvider(): void {
    this.isNewSocialSignUp$
      .pipe(
        filter((newSignup) => !!newSignup),
        take(1),
        switchMap(() => this.combinedSocialLogin$),
        tap(([socialUserState, localUserState]) => {
          const registerSocialUser: RegisterSocialUser = {
            ...socialUserState,
            user: localUserState,
          };
          this.getAssociatedAccounts(registerSocialUser.provider);
          this._socialLoginFacade.registerUser(registerSocialUser);
        }),
      )
      .subscribe();
  }

  private syncSocialProvider(providerID: string): void {
    this.associateSocialProvider();
    this._socialAuthService
      .signIn(providerID)
      .then((user) =>
        this._socialLoginFacade.searchUser(user.provider, user.id),
      )
      .catch(() =>
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to sync social provider',
        ),
      );
  }

  btnGoogleOnClick(hasGoogleAccount: boolean): void {
    if (hasGoogleAccount) {
      this._socialLoginFacade.socialUserRemoved$
        .pipe(
          filter((removed) => !!removed),
          take(1),
          tap(() => {
            this._toastService.addToast(
              ToastType.Success,
              'Google account removed successfully',
            );
            this.hasGoogleAccount = false;
            this._socialLoginFacade.resetRemoveUserState();
          }),
        )
        .subscribe();

      this._socialLoginFacade.removeUser(
        this.googleProvider.loginProvider,
        this.googleProvider.providerKey,
      );
    } else {
      this.syncSocialProvider(GoogleLoginProvider.PROVIDER_ID);
    }
  }

  btnFacebookOnClick(hasFacebookAccount: boolean): void {
    if (hasFacebookAccount) {
      this._socialLoginFacade.socialUserRemoved$
        .pipe(
          filter((removed) => !!removed),
          take(1),
          tap(() => {
            this._toastService.addToast(
              ToastType.Success,
              'Facebook account removed successfully',
            );
            this.hasFacebookAccount = false;
            this._socialLoginFacade.resetRemoveUserState();
          }),
        )
        .subscribe();

      this._socialLoginFacade.removeUser(
        this.facebookProvider.loginProvider,
        this.facebookProvider.providerKey,
      );
    } else {
      this.syncSocialProvider(FacebookLoginProvider.PROVIDER_ID);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this.showCurrentPassword.complete();
  }
}

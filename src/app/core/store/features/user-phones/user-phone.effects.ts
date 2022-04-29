import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { UsersService } from 'src/app/api/users/users.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { VerifyPhoneDialogService } from 'src/app/shared/components/verify-phone/services/verify-phone-dialog.service';
import { AppState } from 'src/app/store/app-state';
import { fetchUser } from '../user/user.actions';
import { selectUserId } from '../user/user.selectors';
import {
  deleteUserPhoneError,
  deleteUserPhoneResolve,
  deleteUserPhoneStart,
  updateUserPhoneError,
  updateUserPhoneResolve,
  updateUserPhoneStart,
  verifyPhoneError,
  verifyPhoneResolve,
  verifyPhoneStart,
  verifyPhoneWithPinError,
  verifyPhoneWithPinStart,
} from './user-phones.actions';
import { UserPhone } from './user-phones.model';
import { getAllUserPhones } from './user-phones.selector';

@Injectable({
  providedIn: 'root',
})
export class UserPhoneEffects {
  deleteUserPhone$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteUserPhoneStart),
      exhaustMap(({ phoneId }) =>
        this._userService.deleteUserPhone(phoneId).pipe(
          switchMap(() => [fetchUser(), deleteUserPhoneResolve({ phoneId: phoneId })]),
          catchError(() => of(deleteUserPhoneError())),
        ),
      ),
    ),
  );

  deleteUserPhoneResolve$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(deleteUserPhoneResolve),
        tap(() =>
          this._toastService.addToast(
            ToastType.Success,
            `Successfully deleted phone number`,
          ),
        ),
      ),
    { dispatch: false },
  );

  deleteUserPhoneError$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(deleteUserPhoneError),
        tap(() =>
          this._toastService.addToast(
            ToastType.Error,
            `Failed to delete phone number`,
          ),
        ),
      ),
    { dispatch: false },
  );

  updateUserPhone$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateUserPhoneStart),
      exhaustMap(({ phone }) =>
        this._userService.updateUserPhone(phone).pipe(
          withLatestFrom(this._store.select(getAllUserPhones)),
          switchMap(([res, userPhones]) => {
            const phones = userPhones.map((s) => {
              if (s.id === phone.id) {
                return { ...s, ...phone };
              } else {
                if (phone.isPrimary) {
                  return { ...s, isPrimary: false };
                }
                return { ...s };
              }
            });
            return [
              updateUserPhoneResolve({ phones: phones, updatedPhone: phone }),
            ];
          }),
          catchError(() => of(updateUserPhoneError({ phone: phone }))),
        ),
      ),
    ),
  );

  updateUserPhoneResolve$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateUserPhoneResolve),
        tap(({ updatedPhone }) =>
          this._toastService.addToast(
            ToastType.Success,
            `Successfully updated phone number ${updatedPhone.phoneNumber}`,
          ),
        ),
      ),
    { dispatch: false },
  );

  updateUserPhoneError$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateUserPhoneError),
        tap(({ phone }) =>
          this._toastService.addToast(
            ToastType.Error,
            `Failed to update phone number ${phone.phoneNumber}`,
          ),
        ),
      ),
    { dispatch: false },
  );

  verifyPhoneNumberStart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(verifyPhoneStart),
      exhaustMap(({ verification }) =>
        this._userService.verifyPhoneVendor(verification).pipe(
          switchMap(() => [verifyPhoneResolve({ verification: verification })]),
          catchError(() =>
            of(verifyPhoneError({ phoneNumber: verification.phoneNumber })),
          ),
        ),
      ),
    ),
  );

  verifyPhoneError$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(verifyPhoneError),
        tap(({ phoneNumber }) =>
          this._toastService.addToast(
            ToastType.Error,
            `Failed to send verification code to: ${phoneNumber}`,
          ),
        ),
      ),
    { dispatch: false },
  );

  verifyPhoneWithPinStart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(verifyPhoneWithPinStart),
      withLatestFrom(this._store.select(selectUserId)),
      exhaustMap(([{ verification }, userId]) =>
        this._userService.verifyVendorPin(verification, userId).pipe(
          switchMap((isValid) => {
            if (isValid) {
              this._verifyPhoneDialogService.closeVerifyPhoneDialog();
              this._toastService.addToast(
                ToastType.Success,
                `Successfully verified phone number.`,
              );
              return [fetchUser()];
            } else {
              this._toastService.addToast(
                ToastType.Error,
                `The pin you entered is not correct.`,
              );
              return [{ type: 'NOOP' }];
            }
          }),
          catchError(() => of(verifyPhoneWithPinError())),
        ),
      ),
    ),
  );

  verifyPhoneWithPinError$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(verifyPhoneError),
        tap(() =>
          this._toastService.addToast(
            ToastType.Error,
            `Failed to verify pin, this seems to be a problem on our end.`,
          ),
        ),
      ),
    { dispatch: false },
  );

  constructor(
    private _actions$: Actions,
    private _userService: UsersService,
    private _toastService: ToastService,
    private _verifyPhoneDialogService: VerifyPhoneDialogService,
    private _store: Store<AppState>,
  ) {}
}

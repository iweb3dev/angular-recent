import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { UsersService } from 'src/app/api/users/users.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import {
  createUserAddressError,
  createUserAddressResolve,
  createUserAddressStart,
  deleteUserAddressError,
  deleteUserAddressResolve,
  deleteUserAddressStart,
  updateUserAddressError,
  updateUserAddressResolve,
  updateUserAddressStart
 } from './user-address.actions';

@Injectable({
  providedIn: 'root'
})
export class UserAddressEffects {

  deleteUserAddress$ = createEffect(() => this._actions$.pipe(
    ofType(deleteUserAddressStart),
    exhaustMap(({ addresId }) => this._userService.deleteUserAddress(addresId)
    .pipe(switchMap(() => [
      deleteUserAddressResolve({ addresId: addresId })]),
    catchError(() => of(deleteUserAddressError()))))
  ));

  deleteUserAddressResolve$ = createEffect(() => this._actions$.pipe(
    ofType(deleteUserAddressResolve),
    tap(() => this._toastService.addToast(ToastType.Success, `Successfully deleted address`))
  ), { dispatch: false });

  deleteUserAddresError$ = createEffect(() => this._actions$.pipe(
    ofType(deleteUserAddressError),
    tap(() => this._toastService.addToast(ToastType.Error, `Failed to delete address`))
  ), { dispatch: false });

  createUserAddress$ = createEffect(() => this._actions$.pipe(
    ofType(createUserAddressStart),
    concatMap(({ address, withoutToast }) => this._userService.createUserAddress(address).pipe(
      switchMap(() => [createUserAddressResolve({ address: address, withoutToast: withoutToast })]),
      catchError(() => of(withoutToast ? { type: '[NOOP]'} : createUserAddressError()))
    ))
  ));

  createUserAddressResolve$ = createEffect(() => this._actions$.pipe(
    ofType(createUserAddressResolve),
    tap(({ withoutToast }) => !withoutToast && this._toastService.addToast(ToastType.Success, `Successfully created address`))
  ), { dispatch: false });

  createUserAddresError$ = createEffect(() => this._actions$.pipe(
    ofType(createUserAddressError),
    tap(() => this._toastService.addToast(ToastType.Error, `Failed to create address`))
  ), { dispatch: false });

  updateUserAddress$ = createEffect(() => this._actions$.pipe(
    ofType(updateUserAddressStart),
    concatMap(({ address, withoutToast }) => this._userService.updateUserAddress(address).pipe(
      switchMap(() => [updateUserAddressResolve({ address: address, withoutToast: withoutToast })]),
      catchError(() => of(withoutToast ? { type: '[NOOP]'} : updateUserAddressError()))
    ))
  ));

  updateUserAddressResolve$ = createEffect(() => this._actions$.pipe(
    ofType(updateUserAddressResolve),
    tap(({ withoutToast }) => !withoutToast && this._toastService.addToast(ToastType.Success, `Successfully updated address`))
  ), { dispatch: false });

  updateUserAddresError$ = createEffect(() => this._actions$.pipe(
    ofType(updateUserAddressError),
    tap(() => this._toastService.addToast(ToastType.Error, `Failed to update address`))
  ), { dispatch: false });


  constructor(private _actions$: Actions, private _userService: UsersService, private _toastService: ToastService) {}
}

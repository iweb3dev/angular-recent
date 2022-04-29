import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { RequestUserSettingsValueSave } from 'src/app/api/users/users.models';
import { UsersService } from 'src/app/api/users/users.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import {
   getSystemSettingsError,
   getSystemSettingsResolve,
   getSystemSettingsStart,
   updateSystemSettingsError,
   updateSystemSettingsResolve,
   updateSystemSettingsStart
  } from './system-settings.actions';
import { SystemSetting } from './system-settings.models';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsEffects {

  getSystemSettingsStart$ = createEffect(() => this._actions$.pipe(
    ofType(getSystemSettingsStart),
      exhaustMap(() => this._userService.getUserSystemSettings().pipe(
        switchMap((systemSettings) => [getSystemSettingsResolve({
            settings: systemSettings.map(s => ({ ...s }) as SystemSetting)
          })
        ]),
        catchError(() => of(getSystemSettingsError()))
    ))
  ));

  getSystemSettingsError$ = createEffect(() => this._actions$.pipe(
    ofType(getSystemSettingsError),
    tap(() => this._toastService.addToast(ToastType.Error, `Failed loading system settings!`))
  ), { dispatch: false });

  updateSystemSettingStart$ = createEffect(() => this._actions$.pipe(
    ofType(updateSystemSettingsStart),
    exhaustMap(({ setting }) => this._userService.saveUserSystemSetttings([{
      id: setting.id,
      settingValue: setting.settingValue,
      settingsID: setting.settingID
    }]).pipe(
      switchMap(() => [updateSystemSettingsResolve({ setting: setting })]),
      catchError(() => of(updateSystemSettingsError({ setting: setting })))
    ))
  ));

  updateSystemSettingResolve$ = createEffect(() => this._actions$.pipe(
    ofType(updateSystemSettingsResolve),
    tap(({ setting }) => this._toastService.addToast(ToastType.Success, `Successfully updated ${setting.description}`))
    ), { dispatch: false });

  updateSystemSettingError$ = createEffect(() => this._actions$.pipe(
    ofType(updateSystemSettingsError),
    tap(({ setting }) => this._toastService.addToast(ToastType.Error, `Failed updating ${setting.description}`))
  ), { dispatch: false });

  constructor(private _actions$: Actions,
     private _userService: UsersService,
     private _toastService: ToastService) {}

}

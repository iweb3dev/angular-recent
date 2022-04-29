import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { getSystemSettingsStart, updateSystemSettingsStart } from './system-settings.actions';
import { SystemSetting } from './system-settings.models';
import { findSystemSettingByDisplayName, getSystemSettings, findSystemSettingBySettingId } from './system-settings.selectors';


@Injectable({
  providedIn: 'root'
})
export class SystemSettingsFacade {
  settings$ = this._store.select(getSystemSettings);

  constructor(private _store: Store<AppState>) {}

  getSystemSettings() {
    this._store.dispatch(getSystemSettingsStart());
  }

  findSystemSettingByDisplayName(displayName: string): Observable<SystemSetting> {
    return this._store.select(findSystemSettingByDisplayName)
    .pipe(
      take(1),
      map(func => func(displayName)));
  }
  findSystemSettingBySettingId(settingId: number): Observable<SystemSetting> {
    return this._store.select(findSystemSettingBySettingId)
      .pipe(
        take(1),
        map(func => func(settingId)));
  }
  updateSystemSetting(setting: SystemSetting) {
    this._store.dispatch(updateSystemSettingsStart({
      setting: setting
    }));
  }

}

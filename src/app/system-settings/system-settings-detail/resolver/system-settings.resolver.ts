import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { LookupsFacade } from 'src/app/core/store/features/lookups/lookups.facade';
import { SystemSettingsFacade } from 'src/app/core/store/features/system-settings/system-settings.facade';
import { SYSTEM_SETTINGS_HELP_TOPICS } from '../constants/system-settings.constants';

@Injectable({ providedIn: 'root' })
export class SystemSettingsResolver implements Resolve<any> {
  constructor(
    private _systemSettingsFacade: SystemSettingsFacade,
    private _lookupsFacade: LookupsFacade,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    // Checks if data is already in store, fetch it from the api otherwise
    return combineLatest([
      this._systemSettingsFacade.settings$,
      forkJoin(
        SYSTEM_SETTINGS_HELP_TOPICS.map((s) =>
          this._lookupsFacade.getHelpTopicById(s),
        ),
      ),
    ]).pipe(
      take(1),
      tap((res) => {
        if (!res[0].length) {
          this._systemSettingsFacade.getSystemSettings();
        }
        if (
          !(
            res[1].filter((s) => s).length ===
            SYSTEM_SETTINGS_HELP_TOPICS.length
          )
        ) {
          const filtered = res[1].filter((s) => s);
          const toFetch = [
            ...SYSTEM_SETTINGS_HELP_TOPICS.filter(
              (s) => !filtered.map((ss) => ss.id).includes(s),
            ),
          ];
          toFetch.forEach((s) => this._lookupsFacade.fetchHelpTopicById(s));
        }
      }),
    );
  }
}

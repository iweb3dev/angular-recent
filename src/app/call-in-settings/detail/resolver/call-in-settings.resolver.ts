import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { LookupsFacade } from 'src/app/core/store/features/lookups/lookups.facade';

const CALL_IN_NUMBER_SETTING_ID = '49';

@Injectable({ providedIn: 'root' })
export class CallInSettingsResolver implements Resolve<any> {
  constructor(private _lookupsFacade: LookupsFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    // Checks if data is already in store, fetch it from the api otherwise
    return combineLatest([
      this._lookupsFacade.getGlobalLookupSettingById(CALL_IN_NUMBER_SETTING_ID)
    ])
    .pipe(
      take(1),
      tap((res) => {
        if (res[0] == null) {
          this._lookupsFacade.fetchGlobalSettingById(CALL_IN_NUMBER_SETTING_ID);
        }
      })
    );
  }
}

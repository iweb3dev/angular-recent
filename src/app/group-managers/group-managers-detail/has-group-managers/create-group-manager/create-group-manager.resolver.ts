import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { LookupsFacade } from 'src/app/core/store/features/lookups/lookups.facade';
import { GroupFacade } from '../../../../core/store/features/groups/group.facade';

const CALL_IN_NUMBER_SETTING_ID = '49';

@Injectable({ providedIn: 'root' })
export class CreateGroupManagerResolver implements Resolve<any> {
  constructor(
    private _lookupsFacade: LookupsFacade,
    private _groupsFacade: GroupFacade) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    // Checks if data is already in store, fetch it from the api otherwise
    return combineLatest([
      this._lookupsFacade.getGlobalLookupSettingById(CALL_IN_NUMBER_SETTING_ID),
      this._groupsFacade.allGroups$,
    ])
    .pipe(
      take(1),
      tap((res: any) => {
        if (res[0] == null) {
          this._lookupsFacade.fetchGlobalSettingById(CALL_IN_NUMBER_SETTING_ID);
        }
        if (!res[1].length) {
          this._groupsFacade.getAllGroups();
        }

      })
    );
  }
}

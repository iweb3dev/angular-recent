import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { LookupsFacade } from 'src/app/core/store/features/lookups/lookups.facade';

@Injectable({ providedIn: 'root' })
export class UserProfileDetailsResolver implements Resolve<any> {
  constructor(private _lookupsFacade: LookupsFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    // Checks if data is already in store, fetch it from the api otherwise
    return combineLatest([
      this._lookupsFacade.organizationTypes$,
      this._lookupsFacade.timeZones$,
    ]).pipe(
      take(1),
      tap((res) => {
        if (!res[0].length) {
          this._lookupsFacade.getOrganizationLookups();
        }
        if (!res[1].length) {
          this._lookupsFacade.getAllTimeZoneLookups();
        }
      }),
    );
  }
}

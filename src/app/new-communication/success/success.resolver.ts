import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { ConfirmFacade } from 'src/app/core/store/features/new-message/confirm/confirm.facade';
import { nonValue } from 'src/app/shared/utils/verifications/value-check';

@Injectable()
export class SuccessResolver implements Resolve<number> {
  constructor(private _confirmFacade: ConfirmFacade, private _router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<number> {
    return this._confirmFacade.communicationId$.pipe(
      tap((id) => {
        if (nonValue(id)) {
          this._router.navigate(['schedule-message', 'new-message', 'name']);
        }
      }),
      take(1),
    );
  }
}

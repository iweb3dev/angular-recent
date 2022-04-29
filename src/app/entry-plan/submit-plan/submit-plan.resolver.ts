import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { AdditionalCredit } from '@api/lookups/lookups.models';
import { PackageFeatures } from '@api/packages/packages.models';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SubmitPlanService } from './submit-plan.service';

@Injectable()
export class SubmitPlanResolver
  implements
    Resolve<
      | [AdditionalCredit[], PackageFeatures[]]
      | [PackageFeatures[], PackageFeatures[]]
    > {
  constructor(
    private _submitPlanService: SubmitPlanService,
    private _route: ActivatedRoute,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<
    | [AdditionalCredit[], PackageFeatures[]]
    | [PackageFeatures[], PackageFeatures[]]
  > {
    this._submitPlanService.addLoader();

    return Object.keys(route.queryParams).length
      ? forkJoin([
          this._submitPlanService.fetchAdditionalCredits(),
          this._submitPlanService.fetchMembers(+route.queryParams['pid']),
        ]).pipe(
          tap(() => {
            this._submitPlanService.removeLoader();
          }),
        )
      : forkJoin([
          this._submitPlanService.fetchOneMonthPremium(),
          this._submitPlanService.fetchMembers(94),
        ]).pipe(
          tap(() => {
            this._submitPlanService.removeLoader();
          }),
        );
  }
}

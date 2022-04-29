import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LookupsService } from 'src/app/api/lookups/lookups.service';
import { PackageService } from 'src/app/api/packages/packages.service';
import { RewardsUser } from 'src/app/api/rewards/rewards.models';
import { RewardsService } from 'src/app/api/rewards/rewards.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

import { UpgradeDataResolverModel } from './upgrade.models';

@Injectable()
export class UpgradeResolver implements Resolve<UpgradeDataResolverModel> {
  constructor(
    private _packageService: PackageService,
    private _loaderService: LoaderService,
    private _lookupsService: LookupsService,
    private _rewardsService: RewardsService,
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<UpgradeDataResolverModel> {
    if (!this._loaderService.hasLoaderAttached) {
      this._loaderService.showLoader();
    }

    return forkJoin([
      this._packageService.getFeaturesByPackageId(
        parseInt(route.params.id, 10),
      ),
      this._lookupsService
        .getPrePayments()
        .pipe(
          map((prePayments) =>
            prePayments.filter((prePay) => prePay.isUpgradeOption),
          ),
        ),
      this._rewardsService
        .getRewardsUser()
        .pipe(map((rewards) => rewards ?? ({} as RewardsUser))),
    ]).pipe(
      map(([packageFeatures, prepayOptions, rewardsBalance]) => ({
        packageFeatures,
        prepayOptions,
        rewardsBalance,
      })),
      tap(() => {
        if (this._loaderService.hasLoaderAttached) {
          this._loaderService.removeLoader();
        }
      }),
    );
  }
}

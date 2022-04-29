import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PackageFeatures } from 'src/app/api/packages/packages.models';
import { PackageService } from 'src/app/api/packages/packages.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Injectable()
export class PlanDetailsResolver implements Resolve<PackageFeatures[]> {
  constructor(
    private _packageService: PackageService,
    private _loaderService: LoaderService,
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<PackageFeatures[]> {
    this._loaderService.showLoader();
    return this._packageService
      .getAllPackageFeatures()
      .pipe(tap(() => this._loaderService.removeLoader()));
  }
}

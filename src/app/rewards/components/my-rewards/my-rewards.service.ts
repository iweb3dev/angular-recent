import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardsUser } from '@api/rewards/rewards.models';
import { RewardsService } from '@api/rewards/rewards.service';
import { LoaderService } from '@shared/components/loader/loader.service';
import { Observable } from 'rxjs';

@Injectable()
export class MyRewardsService {
  constructor(
    private _route: Router,
    private _router: ActivatedRoute,
    private _loaderService: LoaderService,
    private _rewardService: RewardsService,
  ) {}

  showLoader(): void {
    this._loaderService.showLoader();
  }

  hideLoader(): void {
    this._loaderService.removeLoader();
  }

  navigateToSubscriptionPage(): void {
    this._route.navigate(['/rewards/subscription'], {
      relativeTo: this._router,
    });
  }

  checkUserRewardsSubscription(): Observable<RewardsUser> {
    return this._rewardService.getRewardsUser();
  }
}

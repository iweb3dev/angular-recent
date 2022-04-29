import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import {
  ToastService,
  ToastType,
} from '@shared/components/toast/service/toast.service';
import { Subject, Subscription, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { MyRewardsService } from './my-rewards.service';

@Injectable()
export class MyRewardsResolver implements Resolve<Subscription>, OnDestroy {
  unsubscribeOnDestroy = new Subject();
  constructor(
    private _rewardService: MyRewardsService,
    private _toastService: ToastService,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Subscription {
    this._rewardService.showLoader();
    return this._rewardService
      .checkUserRewardsSubscription()
      .pipe(
        takeUntil(this.unsubscribeOnDestroy),
        catchError((err) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to check new user into rewards program',
          );
          return throwError(err);
        }),
      )
      .subscribe((isUserHaveReward) => {
        this._rewardService.hideLoader();
        if (!isUserHaveReward) {
          this._rewardService.navigateToSubscriptionPage();
        }
      });
  }
}

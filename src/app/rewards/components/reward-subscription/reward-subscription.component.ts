import { keyframes } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardsService } from '@api/rewards/rewards.service';
import {
  ToastService,
  ToastType,
} from '@shared/components/toast/service/toast.service';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-reward-subscription',
  templateUrl: './reward-subscription.component.html',
  styleUrls: ['./reward-subscription.component.scss'],
})
export class RewardSubscriptionComponent implements OnDestroy {
  unsubscribeOnDestroy = new Subject();

  constructor(
    private _rewardService: RewardsService,
    private _toastService: ToastService,
    private _route: Router,
    private _router: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  learnMoreClicked(): void {
    window.open('https://www.callingpost.com/rewards.html', '_blank');
  }

  enrollUserIntoRewardsProgram(): void {
    this._rewardService
      .enrollUserIntoRewardsProgram()
      .pipe(
        takeUntil(this.unsubscribeOnDestroy),
        catchError((err) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to enroll new user into rewards program',
          );
          return throwError(err);
        }),
      )
      .subscribe(() => this.navigateToRewards());
  }

  navigateToRewards(): void {
    this._route.navigate(['/rewards'], {
      relativeTo: this._router,
    });
  }
}

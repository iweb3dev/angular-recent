import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { RewardsService } from 'src/app/api/rewards/rewards.service';
import {
  fetchAvailableRewards,
  fetchClaimableRewards,
  fetchUserRewardsBalance,
  fetchUserRewardsTransactions,
  setAvailableRewards,
  setClaimableRewards,
  setUserRewardsBalance,
  setUserUserRewardsTransactions,
  submitClaimReward
} from './rewards.actionts';
import { RewardsUser } from 'src/app/api/rewards/rewards.models';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { RewardHistoryService } from '../components/reward-history/reward-history.service';

@Injectable()
export class RewardsEffects {
  fetchAvailableRewards$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchAvailableRewards),
      switchMap(() =>
        this._rewards.getListOfAllAvailableRewards().pipe(map((rewards) => setAvailableRewards({ rewards }))),
      ),
    ),
  );

  fetchClaimableRewards$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchClaimableRewards),
      switchMap(() =>
        this._rewards.getListOfAllClaimableRewards().pipe(map((rewardsClaimable) => setClaimableRewards({ rewardsClaimable }))),
      ),
    ),
  );

  fetchUserRewardsBalance$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchUserRewardsBalance),
      switchMap(() =>
        this._rewards.getRewardsUser().pipe(map((rewardsBalance) => setUserRewardsBalance({ rewardsBalance }))),
      ),
    ),
  );

  fetchUserRewardsTransactions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchUserRewardsTransactions),
      switchMap(() =>
        this._rewardHistoryService.getUserRewardsTransactions().pipe(map((rewardsTransactions) =>
          setUserUserRewardsTransactions({ rewardsTransactions }))),
      ),
    ),
  );

  submitClaimReward$ = createEffect(() =>
      this._actions$.pipe(
        ofType(submitClaimReward),
        switchMap(({ id }) =>
          this._rewards.submitClaimReward(id).pipe(
            map((reward: RewardsUser) => {
              this._toastService.addToast(
                ToastType.Success,
                `Reward is claimed. Remaining balance ${reward.remainingRewardBalance}`,
              );
              return fetchUserRewardsBalance();
            }),
            catchError(() => {
              this._toastService.addToast(
                ToastType.Error,
                'Unfortunately, this reward cannot be claimed.',
              );
              return of(fetchUserRewardsBalance());
            }),
          ),
        ),
      ),
  );

  constructor(
    private _actions$: Actions,
    private _rewards: RewardsService,
    private _toastService: ToastService,
    private _rewardHistoryService: RewardHistoryService,
  ) {}
}

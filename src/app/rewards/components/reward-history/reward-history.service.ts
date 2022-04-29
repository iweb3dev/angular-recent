import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RewardsService } from 'src/app/api/rewards/rewards.service';
import { RewardHistoryRewardsTransactionHistoryModel } from './reward-history.model';
import * as moment from 'moment';

@Injectable({providedIn: 'root'})
export class RewardHistoryService {
  constructor(private _rewardService: RewardsService) {}

  getUserRewardsTransactions(pageSize?: number, pageIndex?: number): Observable<RewardHistoryRewardsTransactionHistoryModel[]> {
    return this._rewardService.getUserRewardsTransactions(pageSize, pageIndex).pipe(
      map((data) =>
        data.map((datum) => ({
          ...datum,
          rewardDate: moment(datum.rewardDate).format(
            'M/D/YY',
          ),
        })),
      ),
    );
  }
}

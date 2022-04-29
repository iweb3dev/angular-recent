import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RewardsTransactionHistory } from 'src/app/api/rewards/rewards.models';
import { RewardsFacade } from '../../store/rewards.facade';
import { COLUMN_DEFINITIONS } from './reward-history-consts';
import { RewardHistoryColumns, RewardHistoryRewardsTransactionHistoryModel } from './reward-history.model';

@Component({
  selector: 'app-reward-history',
  templateUrl: './reward-history.component.html',
  styleUrls: ['./reward-history.component.scss']
})
export class RewardHistoryComponent implements OnInit {
  readonly COLUMN_DEFINITIONS = COLUMN_DEFINITIONS;

  dataSource$: Observable<RewardHistoryRewardsTransactionHistoryModel[]>;
  rewardsBalance$ = this._rewardsFacade.rewardsBalance$;

  private _sortChanged$ = new BehaviorSubject<{
    active: string;
    direction: 'asc' | 'desc';
  }>(null);

  constructor(
    private _rewardsFacade: RewardsFacade,
    private _router: Router) {}

  get isMobileView(): boolean {
    return window.innerWidth <= 599;
  }

  ngOnInit() {
    this._rewardsFacade.fetchUserRewardsTransactions();
    this._rewardsFacade.fetchUserRewardsBalance();

    this.dataSource$ = combineLatest([
      this._rewardsFacade.rewardsTransactions$,
      this._sortChanged$,
    ]).pipe(
      map(([transactions, sort]) =>
        this.sortTableData(transactions, sort),
      ),
    );
  }

  onNavigateBack() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this._router.navigate(['./rewards']));
  }

  sortData(event: { active: string; direction: 'asc' | 'desc' }): void {
    this._sortChanged$.next(event);
  }

  private sortTableData(
    transactions: RewardHistoryRewardsTransactionHistoryModel[],
    sort: { active: string; direction: 'asc' | 'desc' },
  ): RewardHistoryRewardsTransactionHistoryModel[] {
    if (!sort) {
      return transactions;
    }

    return transactions.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case RewardHistoryColumns.Description:
          return compare(a.description, b.description, isAsc);
        case RewardHistoryColumns.Points:
          return compare(a.points, b.points, isAsc);
        case RewardHistoryColumns.RewardDate:
          return compare(
            new Date(a.rewardDate),
            new Date(b.rewardDate),
            isAsc,
          );
        default:
          return 0;
      }
    });
  }
}

function compare(
  a: number | string | Date,
  b: number | string | Date,
  isAsc: boolean,
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

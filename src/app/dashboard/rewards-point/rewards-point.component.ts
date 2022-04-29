import { Router } from '@angular/router';
import {
  Input,
  OnChanges,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import { RewardsClaimable, RewardsUser } from '@api/rewards/rewards.models';

@Component({
  selector: 'app-rewards-point',
  templateUrl: './rewards-point.component.html',
  styleUrls: ['./rewards-point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RewardsPointComponent implements OnChanges {
  @Input() userRewardsBalance: RewardsUser;
  @Input() claimableRewards: Array<RewardsClaimable>;

  public nextReward: string;
  public totalPoints: number;

  public readonly gaugeInitialValue = 0;
  public readonly gaugeLabel = 'Points';
  public readonly gaugeType: NgxGaugeType = 'full';

  public readonly primaryChartThickness = 12;
  public readonly secondaryChartThickness = 16;

  public readonly primaryChartColors = {
    foreground: '#9357FF',
    background: '#B7D7FF',
  };
  public readonly secondaryChartColors = {
    foreground: '#60B4FF',
    background: '#CDB0FF',
  };

  constructor(private _router: Router) {}

  ngOnChanges(): void {
    if (this.userRewardsBalance && this.claimableRewards) {
      this.setNextRewardPoints();
    }
  }

  public setNextRewardPoints(): void {
    const { remainingRewardBalance } = this.userRewardsBalance;
    const output = this.claimableRewards.reduce((prev, curr) =>
      Math.abs(prev.rewardValue) > remainingRewardBalance ? prev : curr
    );

    this.totalPoints = output.rewardValue;
    this.nextReward = `${output.rewardDescription} (${output.rewardName})`;
  }

  public viewEarnRewardOnClick(): void {
    this._router.navigate(['/rewards']);
  }

  public viewDetailsOnClick(): void {
    // TODO: Change this accordingly
    this._router.navigate(['/rewards']);
  }
}

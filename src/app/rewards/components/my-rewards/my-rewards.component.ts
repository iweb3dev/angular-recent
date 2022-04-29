import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Rewards, RewardsUser, RewardsClaimable } from 'src/app/api/rewards/rewards.models';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { RewardsFacade } from '../../store/rewards.facade';
import { CustomRewards } from '../../store/rewards.model';

@Component({
  selector: 'app-my-rewards',
  templateUrl: './my-rewards.component.html',
  styleUrls: ['./my-rewards.component.scss']
})
export class MyRewardsComponent implements OnInit, OnDestroy {
  @ViewChild('fbAnchor') fbAnchor: ElementRef<HTMLElement>;
  rewardsData: CustomRewards[] = [];
  rewardsClaimable: RewardsClaimable[] = [];
  rewardsBalance: RewardsUser;

  private pointsBalance = 0;
  private _destroy$ = new Subject<void>();

  constructor(
    private _rewardsFacade: RewardsFacade,
    private _route: Router,
    private _router: ActivatedRoute,
    private _toastService: ToastService) {}

  ngOnInit() {
    this._rewardsFacade.fetchAvailableRewards();
    this._rewardsFacade.fetchClaimableRewards();
    this._rewardsFacade.fetchUserRewardsBalance();

    this._rewardsFacade.rewards$
      .pipe(takeUntil(this._destroy$))
      .subscribe((rewards: Rewards[]) => {
        if (!rewards) {
          return;
        }
        this.rewardsData = [];
        rewards.forEach((reward: Rewards) => {
          let newReward: CustomRewards;
          const mail_outline = 'mail_outline';
          const home = 'home';
          switch (reward.link) {
            case 'packagesChange':
              newReward = this.mapRewardData(reward, 'card_giftcard', '/billing/plan-details');
              this.rewardsData.push(newReward);
              break;
            case 'communicationSelectGroups':
              newReward = this.mapRewardData(reward, mail_outline, '/schedule-message/new-message/name');
              this.rewardsData.push(newReward);
              break;
            case 'emailReferral':
              newReward = this.mapRewardData(reward, mail_outline, '/rewards/refer');
              this.rewardsData.push(newReward);
              break;
            case 'cpreview':
              newReward = this.mapRewardData(reward, mail_outline, '/rewards/rate-review');
              this.rewardsData.push(newReward);
              break;
            default:
              if (reward.rewardName === 'Login') {
                newReward = this.mapRewardData(reward, home, null);
              } else {
                newReward = this.mapRewardData(reward, mail_outline, null);
              }
              this.rewardsData.push(newReward);
              break;
          }
        });
      });
      this._rewardsFacade.rewardsBalance$
      .pipe(takeUntil(this._destroy$))
      .subscribe((balance: RewardsUser) => {
        if (balance) {
          this.rewardsBalance = balance;
          this.pointsBalance = balance.remainingRewardBalance;
        }
      });

      this._rewardsFacade.rewardsClaimable$
      .pipe(takeUntil(this._destroy$))
      .subscribe((rewards: RewardsClaimable[]) => {
        if (rewards) {
          this.rewardsClaimable = rewards;
        }
      });
  }

  mapRewardData(reward: Rewards, icon: string, newLink: string): CustomRewards {
    return {
      rewardName: reward.rewardName,
      rewardValue: reward.rewardValue,
      icon: icon,
      newLink: newLink,
      rewardDescription: reward.rewardDescription
    };
  }

  onClaimReward(id: number) {
    const claimingPoint = this.rewardsClaimable.find(reward => reward.id === id);
    if (claimingPoint && claimingPoint.rewardValue > this.pointsBalance) {
      this._toastService.addToast(
        ToastType.Error,
        `You do not have enough points`,
      );
      return;
    }
    this._rewardsFacade.submitClaimReward(id);
  }

  learnMoreClicked() {
    window.open('https://www.callingpost.com/rewards.html', '_blank');
  }

  onFbShare() {
    const el: HTMLElement = this.fbAnchor.nativeElement;
    el.click();
  }

  navigateTo(link) {
    if (link) {
      this._route.navigateByUrl(link);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

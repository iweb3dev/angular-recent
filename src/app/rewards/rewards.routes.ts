import { RouteNames } from './../shared/models/enums/route-names';
import { RewardsComponent } from './rewards.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyRewardsComponent } from './components/my-rewards/my-rewards.component';
import { RewardHistoryComponent } from './components/reward-history/reward-history.component';
import { ReferComponent } from './components/refer/refer.component';
import { RateReviewComponent } from './components/rate-review/rate-review.component';
import { RewardSubscriptionComponent } from './components/reward-subscription/reward-subscription.component';
import { MyRewardsResolver } from './components/my-rewards/my-rewards.resolver';

const routes: Routes = [
  {
    path: '',
    component: RewardsComponent,
    children: [
      {
        path: '',
        component: MyRewardsComponent,
        data: {
          routeName: `My ${RouteNames.Rewards}`,
        },
        resolve: {isUserHaveSubscriptionOnRewards: MyRewardsResolver}
      },
      {
        path: 'subscription',
        component: RewardSubscriptionComponent,
        data: {
          routeName: `${RouteNames.Rewards}`
        },
        pathMatch: 'full'
      },
      {
        path: 'history',
        component: RewardHistoryComponent,
        data: {
          routeName: `${RouteNames.RewardHistory}`
        },
      },
      {
        path: 'refer',
        component: ReferComponent,
        data: {
          routeName: `My ${RouteNames.Rewards}`,
        },
      },
      {
        path: 'rate-review',
        component: RateReviewComponent,
        data: {
          routeName: `My ${RouteNames.Rewards}`,
        },
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardsRoutingModule {}

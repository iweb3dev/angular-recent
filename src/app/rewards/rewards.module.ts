import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MyRewardsComponent } from './components/my-rewards/my-rewards.component';
import { RewardHistoryComponent } from './components/reward-history/reward-history.component';

import { VirtualListModule } from '@shared/components/virtual-list/virtual-list.module';

import { RewardsComponent } from './rewards.component';
import { RewardsRoutingModule } from './rewards.routes';

import * as fromRewardsResults from './store/rewards.store';
import { VirtualTableModule } from '../shared/components/virtual-table/virtual-table.module';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReferComponent } from './components/refer/refer.component';
import { MatInputModule } from '@angular/material/input';
import { RateReviewComponent } from './components/rate-review/rate-review.component';
import { RewardSubscriptionComponent } from './components/reward-subscription/reward-subscription.component';
import { MyRewardsResolver } from './components/my-rewards/my-rewards.resolver';
import { MyRewardsService } from './components/my-rewards/my-rewards.service';

@NgModule({
  declarations: [
    RewardsComponent,
    MyRewardsComponent,
    RewardHistoryComponent,
    ReferComponent,
    RateReviewComponent,
    RewardSubscriptionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    VirtualListModule,
    RewardsRoutingModule,
    VirtualTableModule,
    MatFormFieldModule,
    StoreModule.forFeature(
      fromRewardsResults.featureStore,
      fromRewardsResults.reducers,
    ),
    EffectsModule.forFeature(fromRewardsResults.effects),
  ],
  providers: [MyRewardsResolver, MyRewardsService],
})
export class RewardsModule {}

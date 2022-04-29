import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromDashboard from './store/dashboard.store';
import * as fromRewardsResults from '../rewards/store/rewards.store';

import { DashboardRoutingModule } from './dashboard.routes';

import { AuthService } from '../auth/auth.service';

import { DashboardComponent } from './dashboard.component';

import { DashboardMainModule } from './dashboard-main/dashboard-main.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    StoreModule.forFeature(fromDashboard.featureStore, fromDashboard.reducers),
    EffectsModule.forFeature(fromDashboard.effects),
    DashboardRoutingModule,
    DashboardMainModule,
    CommonModule,
    StoreModule.forFeature(
      fromRewardsResults.featureStore,
      fromRewardsResults.reducers
    ),
    EffectsModule.forFeature(fromRewardsResults.effects),
  ],
  providers: [AuthService],
})
export class DashboardModule {}

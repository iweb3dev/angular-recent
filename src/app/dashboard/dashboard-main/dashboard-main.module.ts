import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { LoaderModule } from '@shared/components/loader/loader.module';

import { RewardsPointModule } from '../rewards-point/rewards-point.module';
import { AccountOverviewModule } from '../account-overview/account-overview.module';
import { PhoneMessageModule } from '../send-phone-message/send-phone-message.module';
import { DashboardToolbarModule } from '../dashboard-toolbar/dashboard-toolbar.module';
import { RecentMessageResultsModule } from '../recent-message-results/recent-message-results.module';
import { DownloadCallingpostAppModule } from '../download-callingpost-app/download-callingpost-app.module';

import { DashboardMainComponent } from './dashboard-main.component';
import { MemberOverviewModule } from '../member-overview/member-overview.module';

@NgModule({
  declarations: [DashboardMainComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,

    LoaderModule,

    PhoneMessageModule,
    RewardsPointModule,
    AccountOverviewModule,
    MemberOverviewModule,
    DashboardToolbarModule,
    RecentMessageResultsModule,
    DownloadCallingpostAppModule,
  ],
})
export class DashboardMainModule {}

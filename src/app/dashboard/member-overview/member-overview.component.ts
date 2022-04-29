import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import moment from 'moment';

import {
  DashboardOverviewType,
  DashboardCommunicationType,
} from '../enums/dashboard-items.enum';

import { MainUserInfoModel } from '@core/store/features/user/user.model';
import { AccountOverviewMembersResponse } from '../store/features/account-overview/account-overview.model';

import { IDashboardSummaryResponse } from '@shared/models/contracts/IDashboardSummaryResponse.interface';

import { DashboardSummaryFacade } from '../store/features/dashboard-summary/dashboard-summary.facade';
import { MemberOverview } from '../constants/member-items.const';

@Component({
  selector: 'app-member-overview',
  templateUrl: './member-overview.component.html',
  styleUrls: ['./member-overview.component.scss'],
})
export class MemberOverviewComponent {
  @Input() set communications(value) {
    this.setCommuncationDetails(value);
  }
  @Input() set userInfo(value: MainUserInfoModel) {
    this.setUserPlanInfo(value);
  }
  @Input() set overview(value: AccountOverviewMembersResponse) {
    this.setAccountOverviewDetails(value);
  }
  get isMobileView(): boolean {
    return window.innerWidth <= 599;
  }

  public memberOverview = [...MemberOverview];

  private getHoursToMinutes(timeInHours: string): number {
    return moment.duration(timeInHours).asMinutes();
  }

  constructor(
    private _router: Router,
    private _dashboardSummaryFacade: DashboardSummaryFacade
  ) {}

  private setUserPlanInfo(user: MainUserInfoModel) {
    this.memberOverview.forEach((item, index) => {
      if (item.type === DashboardOverviewType.Credits) {
        if (
          user?.package?.costType &&
          user.package.costType.toLowerCase() !== 'subscriber'
        ) {
          item.button = 'Add';
          item.icon = 'widgets';
          item.buttonIcon = 'add';
          item.secondaryText = 'Credits';
          item.primaryText = `${user.package.monthlyCredits}`;
        } else {
          this.memberOverview.splice(index, 1);
        }
      }
    });
  }

  private setAccountOverviewDetails(overview: AccountOverviewMembersResponse) {
    this.memberOverview.forEach((item) => {
      if (item.type === DashboardOverviewType.Members) {
        item.primaryText = `${overview.totalGroupMembers}`;
      }

      if (item.type === DashboardOverviewType.Phones) {
        item.primaryText = `${overview.totalActivePhoneNumbers}`;
      }

      if (item.type === DashboardOverviewType.Emails) {
        item.primaryText = `${overview.totalActiveEmailAddresses}`;
      }
    });
  }

  private setCommuncationDetails(
    communication: IDashboardSummaryResponse
  ): void {
    this.memberOverview.forEach((item) => {
      if (item.type === DashboardCommunicationType.Minutes) {
        item.primaryText = `${this.getHoursToMinutes(
          communication.timeSavings
        )}`;
      }

      if (item.type === DashboardCommunicationType.Calls) {
        item.primaryText = `${communication.callsAttempted}`;
      }

      if (item.type === DashboardCommunicationType.Texts) {
        item.primaryText = `${communication.smsAttempted}`;
      }

      if (item.type === DashboardCommunicationType.Emails) {
        item.primaryText = `${communication.emailsAttempted}`;
      }
    });
  }

  public communicationDurationOnChange(selection: string): void {
    const endDate = moment(new Date()).format('MM/DD/YYYY');
    const startDate = moment(new Date())
      .subtract(+selection, 'months')
      .format('MM/DD/YYYY');

    this._dashboardSummaryFacade.getDashboardSummary(startDate, endDate);
  }

  public btnClickedOnEmit(title: string): void {
    if (title.toLowerCase() === 'add') {
      this._router.navigate(['/billing/credits']);
    }
  }
}

import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { take, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { MemberSearchFilter } from '@shared/constants/member.constants';
import { CALL_IN_NUMBER_SETTING_ID } from './constants/account-items.const';

import { Communication } from '@shared/models/domain/communication.model';
import { GroupManagers } from '@api/group-managers/group-managers.models';
import { RewardsClaimable, RewardsUser } from '@api/rewards/rewards.models';

import { RewardsFacade } from '../rewards/store/rewards.facade';
import { LookupsFacade } from '@core/store/features/lookups/lookups.facade';
import { AccountOverviewFacade } from './store/features/account-overview/account-overview.facade';
import { GroupManagersFacade } from '../core/store/features/group-managers/group-managers.facade';
import { DashboardSummaryFacade } from './store/features/dashboard-summary/dashboard-summary.facade';
import { CommunicationsFacade } from 'src/app/core/store/features/communications/communications.facade';

@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<any> {
  constructor(
    private _lookupsFacade: LookupsFacade,
    private _rewardsFacade: RewardsFacade,
    private _groupManagersFacade: GroupManagersFacade,
    private _communicationsFacade: CommunicationsFacade,
    private _accountOverviewFacade: AccountOverviewFacade,
    private _dashboardSummaryFacade: DashboardSummaryFacade
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    // Checks if data is already in store, fetch it from the api otherwise
    return combineLatest([
      this._communicationsFacade.latestCommunications$,
      this._dashboardSummaryFacade.hasLoaded$,
      this._groupManagersFacade.allGroupManagers$,
      this._accountOverviewFacade.hasLoaded$,
      this._lookupsFacade.getGlobalLookupSettingById(CALL_IN_NUMBER_SETTING_ID),
      this._rewardsFacade.rewardsClaimable$,
      this._rewardsFacade.rewardsBalance$,
    ]).pipe(
      take(1),
      tap(
        ([
          recentMessages,
          communicationsSummary,
          groupManagers,
          accountOverview,
          callInSettings,
          claimableRewards,
          userRewards,
        ]: [
          Array<Communication>,
          boolean,
          Array<GroupManagers>,
          boolean,
          string,
          Array<RewardsClaimable>,
          RewardsUser
          ]) => {
          // This logic was preventing the dashboard from updating RPS 12/13/2021
          // if (!recentMessages.length) {
          //   this._communicationsFacade.getAllCommunications();
          // }
          this._communicationsFacade.getAllCommunications();

          if (!communicationsSummary) {
            const endDate = new Date();
            const startDate = new Date(
              new Date().setDate(endDate.getDate() - 365)
            );
            this._dashboardSummaryFacade.getDashboardSummary(
              startDate.toLocaleDateString('en-US').replace('/g/', '-'),
              endDate.toLocaleDateString('en-US').replace('/g/', '-')
            );
          }

          if (!groupManagers.length) {
            this._groupManagersFacade.fetchGroupManagers();
          }

          if (!accountOverview) {
            this._accountOverviewFacade.getAccountOverview(MemberSearchFilter);
          }

          if (!callInSettings) {
            this._lookupsFacade.fetchGlobalSettingById(
              CALL_IN_NUMBER_SETTING_ID
            );
          }

          if (!claimableRewards) {
            this._rewardsFacade.fetchClaimableRewards();
          }

          if (!userRewards) {
            this._rewardsFacade.fetchUserRewardsBalance();
          }
        }
      )
    );
  }
}

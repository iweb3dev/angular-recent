import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Event,
  Router,
  ResolveStart,
  NavigationEnd,
  NavigationStart,
  NavigationError,
} from '@angular/router';

import { combineLatest, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { filter, skip, switchMap, take, tap } from 'rxjs/operators';

import { ToolbarActionItem } from '../enums/dashboard-toolbar.enum';

import { ToolbarItems } from '../constants/dashboard-toolbar-items.const';
import { CALL_IN_NUMBER_SETTING_ID } from '../constants/account-items.const';

import { RegisterSocialUser } from 'src/app/auth/social-login/store/social-login.models';

import { SocialAuthService } from 'angularx-social-login';
import { UserFacade } from '@core/store/features/user/user.facade';
import { RewardsFacade } from 'src/app/rewards/store/rewards.facade';
import { LookupsFacade } from '@core/store/features/lookups/lookups.facade';
import { SocialLoginFacade } from 'src/app/auth/social-login/store/social-login.facade';
import { CommunicationsFacade } from '@core/store/features/communications/communications.facade';
import { AccountOverviewFacade } from '../store/features/account-overview/account-overview.facade';
import { DashboardSummaryFacade } from '../store/features/dashboard-summary/dashboard-summary.facade';

import { SocialUserRegisteredComponent } from 'src/app/auth/social-login/social-user-registered/social-user-registered.component';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
})
export class DashboardMainComponent implements OnInit, OnDestroy {
  public navigation = false;
  public toolbarItems = ToolbarItems;
  private subscription$: Subscription;

  public user$ = this._userFacade.currentUserInfo$;
  public claimableRewards$ = this._rewardsFacade.rewardsClaimable$;
  public userRewardsBalance$ = this._rewardsFacade.rewardsBalance$;
  public accountOverview$ = this._accountOverviewFacade.accountOverview$;
  public dashboardSummary$ = this._dashboardSummaryFacade.dashboardSummary$;
  public latestCommunications$ =
    this._communicationsFacade.latestCommunications$;
  public lastCommunication$ = this._communicationsFacade.lastCommunication$;
  public callInSetting$ = this._lookupsFacade.getGlobalLookupSettingById(
    CALL_IN_NUMBER_SETTING_ID
  );

  private isNewSocialSignUp$ = this._socialLoginFacade.isNewSocialSignUp$;
  private socialUserRegistered$ = this._socialLoginFacade.socialUserRegistered$;
  private combinedSocialLogin$ = combineLatest([
    this._socialAuthService.authState,
    this._userFacade.currentUserFullInfo$,
  ]).pipe(take(1));

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _userFacade: UserFacade,
    private _rewardsFacade: RewardsFacade,
    private _lookupsFacade: LookupsFacade,
    private _socialAuthService: SocialAuthService,
    private _socialLoginFacade: SocialLoginFacade,
    private _communicationsFacade: CommunicationsFacade,
    private _accountOverviewFacade: AccountOverviewFacade,
    private _dashboardSummaryFacade: DashboardSummaryFacade
  ) {
    this.subscription$ = new Subscription();
  }

  ngOnInit(): void {
    this.verifySocialUserAndRegister();
    this.initializeOnNavLoader();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private initializeOnNavLoader(): void {
    this.subscription$.add(
      this._router.events.subscribe((event: Event) => {
        if (event instanceof ResolveStart || event instanceof NavigationStart) {
          this.navigation = true;
        }
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError
        ) {
          this.navigation = false;
        }
      })
    );
  }

  private verifySocialUserAndRegister(): void {
    this.isNewSocialSignUp$
      .pipe(
        take(1),
        filter((newSignup) => !!newSignup),
        switchMap(() => this.combinedSocialLogin$),
        tap(([socialUserState, localUserState]) => {
          const registerSocialUser: RegisterSocialUser = {
            ...socialUserState,
            user: localUserState,
          };
          this.verifySocialUserRegisteration();
          this._socialLoginFacade.registerUser(registerSocialUser);
        })
      )
      .subscribe();
  }

  private verifySocialUserRegisteration(): void {
    this.socialUserRegistered$
      .pipe(
        skip(1),
        take(1),
        filter((registered) => !!registered),
        tap(() => this.socialUserOnRegistration())
      )
      .subscribe();
  }

  private socialUserOnRegistration(): void {
    this._dialog
      .open(SocialUserRegisteredComponent)
      .afterClosed()
      .pipe(take(1))
      .subscribe();
  }

  public toolbarOnEmit(item: string): void {
    if (item === ToolbarActionItem.SendMessage) {
      this._router.navigate(['/new-communication/details']);
    }
    if (item === ToolbarActionItem.GroupsMembers) {
      this._router.navigate(['/groups']);
    }
    if (item === ToolbarActionItem.CommunicationResults) {
      this._router.navigate(['/message-results']);
    }
    if (item === ToolbarActionItem.MessageLibrary) {
      this._router.navigate(['/messages']);
    }
  }
}

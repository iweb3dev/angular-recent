import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/user-session/auth.guard';
import { UnsavedChangesGuard } from '@core/store/unsaved-changes.guard';

import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { RouteNames } from './shared/models/enums/route-names';
import { AuthComponent } from './auth/auth.component';
import { KeywordMemberInformationComponent } from './keyword-member-information/keyword-member-information.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'updatemember', component: KeywordMemberInformationComponent },
  {
    path: 'pollresponse',
    loadChildren: () =>
      import('./sms-polling/sms-polling.module').then(
        (m) => m.SmsPollingModule,
      ),
  },
  {
    path: 'email',
    loadChildren: () =>
      import('./email-subscribe/email-subscribe.module').then(
        (m) => m.EmailSubscribeModule,
      ),
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'entry-plan',
    loadChildren: () =>
      import('./entry-plan/entry-plan.module').then((m) => m.EntryPlanModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: {
          routeName: RouteNames.Dashboard,
        },
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./messages/messages.module').then((m) => m.MessagesModule),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./groups/groups.module').then((m) => m.GroupsModule),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'members',
        loadChildren: () =>
          import('./members/members.module').then((m) => m.MembersModule),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user-profile/user-profile.module').then(
            (m) => m.UserProfileModule,
          ),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'system-settings',
        loadChildren: () =>
          import('./system-settings/system-settings.module').then(
            (m) => m.SystemSettingsModule,
          ),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'call-in-settings',
        loadChildren: () =>
          import('./call-in-settings/call-in-settings.module').then(
            (m) => m.CallInSettingsModule,
          ),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'reminders',
        loadChildren: () =>
          import('./reminders/reminders.module').then((m) => m.RemindersModule),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'custom-phone-numbers',
        loadChildren: () =>
          import('./custom-phone-numbers/custom-phone-numbers.module').then(
            (m) => m.CustomPhoneNumbersModule,
          ),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'message-results',
        loadChildren: () =>
          import('./message-results/message-results.module').then(
            (m) => m.MessageResultsModule,
          ),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'keywords',
        loadChildren: () =>
          import('./keywords/keywords.module').then((m) => m.KeywordsModule),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'group-managers',
        loadChildren: () =>
          import('./group-managers/group-managers.module').then(
            (m) => m.GroupManagersModule,
          ),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('./billing/billing.module').then((m) => m.BillingModule),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'password-login',
        loadChildren: () =>
          import('./password-login/password-login.module').then(
            (m) => m.PasswordLoginModule,
          ),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'rewards',
        loadChildren: () =>
          import('./rewards/rewards.module').then((m) => m.RewardsModule),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            (m) => m.NotificationsModule,
          ),
        canActivate: [AuthGuard, UnsavedChangesGuard],
      },
      {
        path: 'new-communication',
        loadChildren: () =>
          import('./new-communication/new-communication.module').then(
            (m) => m.NewCommunicationModule,
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

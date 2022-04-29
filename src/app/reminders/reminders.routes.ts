import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteNames } from '../shared/models/enums/route-names';
import { RemindersDetailComponent } from './reminders-detail/reminders-detail.component';
import { RemindersDetailResolver } from './reminders-detail/resolver/reminders-detail.resolver';
import { RemindersComponent } from './reminders.component';
import { ScheduleReminderResolver } from './schedule-reminder/resolver/schedule-reminder.resolver';
import { ScheduleReminderComponent } from './schedule-reminder/schedule-reminder.component';

const routes: Routes = [
  {
    path: '',
    component: RemindersComponent,
    children: [
      {
        path: '',
        component: RemindersDetailComponent,
        loadChildren: () => import('./reminders-detail/reminders-detail.module')
        .then(m => m.RemindersDetailModule),
        resolve: { reminder_detail: RemindersDetailResolver },
        data: {
          routeName: `My ${RouteNames.Reminders}`,
        },
      },
      {
        path: 'schedule/:reminderId',
        component: ScheduleReminderComponent,
        loadChildren: () => import('./schedule-reminder/schedule-reminder.module')
        .then(m => m.ScheduleReminderModule),
        resolve: { schedule_reminder: ScheduleReminderResolver },
        data: {
          routeName: `My ${RouteNames.Reminders}`,
        },
      },
      {
        path: 'schedule',
        redirectTo: 'schedule/-1',
        pathMatch: 'full'
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
export class RemindersRoutingModule {}

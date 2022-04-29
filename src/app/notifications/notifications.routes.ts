import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/user-session/auth.guard';
import { NotificationsComponent } from './notifications.component';
import { RouteNames } from '../shared/models/enums/route-names';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: NotificationDetailsComponent,
        data: {
          routeName: `${RouteNames.Notifications}`
        },
        loadChildren: () => import('./notification-details/notification-details.module').then(m => m.NotificationDetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}

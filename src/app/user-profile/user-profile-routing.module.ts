import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/user-session/auth.guard';
import { RouteNames } from '../shared/models/enums/route-names';
import { UserProfileDetailsResolver } from './user-profile-details/resolver/user-profile-details.resolver';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserProfileDetailsComponent,
        data: {
          routeName: `My ${RouteNames.User}`,
        },
        resolve: {
          user_details: UserProfileDetailsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}

import { RouteNames } from 'src/app/shared/models/enums/route-names';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/user-session/auth.guard';
import { PasswordLoginComponent } from './password-login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: PasswordLoginComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ChangePasswordComponent,
        data: {
          routeName: `${RouteNames.PasswordLogin}`
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordLoginRoutingModule {}

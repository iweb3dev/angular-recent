import { Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginContainerComponent } from './login/login.container';
import { LogoutComponent } from './logout/logout.component';
import { RecoverUserIdComponent } from './recover-user-id/recover-user-id.component';
import { RecoverUserPasswordComponent } from './recover-user-password/recover-user-password.component';
import { RegisterContainerComponent } from './register/register-container.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginContainerComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
      {
        path: 'register',
        component: RegisterContainerComponent,
      },
      {
        path: 'recover-user-id',
        component: RecoverUserIdComponent,
      },
      {
        path: 'recover-user-password',
        component: RecoverUserPasswordComponent,
      },
    ],
  },
];

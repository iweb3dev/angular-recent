import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AuthComponent } from './auth.component';
import { AUTH_ROUTES } from './auth.routes';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

import {
  authFeatureKey,
  AUTH_REDUCER_TOKEN,
  getAuthReducers,
} from './store/auth.reducer';
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout.component';
import { RecoverUserIdModule } from './recover-user-id/recover-user-id.module';
import { RecoverUserPasswordModule } from './recover-user-password/recover-user-password.module';
import { SelectPlanComponent } from '../entry-plan/select-plan/select-plan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthFooterModule } from './shared/auth-footer/auth-footer.module';

@NgModule({
  declarations: [AuthComponent, LogoutComponent, SelectPlanComponent],
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule,
    RecoverUserIdModule,
    RecoverUserPasswordModule,
    AuthFooterModule,
    FlexLayoutModule,
    RouterModule.forChild(AUTH_ROUTES),
    StoreModule.forFeature(authFeatureKey, AUTH_REDUCER_TOKEN),
  ],
  providers: [
    AuthService,
    { provide: AUTH_REDUCER_TOKEN, useFactory: getAuthReducers },
  ],
})
export class AuthModule {}

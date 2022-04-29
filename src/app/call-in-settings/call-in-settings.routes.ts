import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/user-session/auth.guard';
import { RouteNames } from '../shared/models/enums/route-names';
import { CallInSettingsDetailComponent } from './detail/call-in-settings-detail.component';
import { CallInSettingsComponent } from './call-in-settings.component';
import { CallInSettingsResolver } from './detail/resolver/call-in-settings.resolver';

const routes: Routes = [
  {
    path: '',
    component: CallInSettingsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '',
        component: CallInSettingsDetailComponent,
        data: {
          routeName: `${RouteNames.CallInSettings}`,
        },
        resolve: {
          call_in_settings: CallInSettingsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallInSettingsRoutingModule {}

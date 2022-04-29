import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/user-session/auth.guard';
import { RouteNames } from '../shared/models/enums/route-names';
import { SystemSettingsResolver } from './system-settings-detail/resolver/system-settings.resolver';
import { SystemSettingsComponent } from './system-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SystemSettingsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        data: {
          routeName: `${RouteNames.System}`,
        },
        resolve: {
          system_settings: SystemSettingsResolver,
        },
        loadChildren: () =>
          import('./system-settings-detail/system-settings-detail.module').then(
            (m) => m.SystemSettingsDetailModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingsRoutingModule {}

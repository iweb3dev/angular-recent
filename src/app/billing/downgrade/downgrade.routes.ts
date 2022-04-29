import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

import { DowngradeComponent } from './downgrade.component';
import { DowngradeResolver } from './downgrade.resolver';

const routes: Routes = [
  {
    path: '',
    component: DowngradeComponent,
    data: {
      routeName: RouteNames.ChangePlan,
    },
    canActivate: [AuthGuard],
    resolve: { package: DowngradeResolver },
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
export class DowngradeRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

import { UpgradeComponent } from './upgrade.component';
import { UpgradeResolver } from './upgrade.resolver';

const routes: Routes = [
  {
    path: '',
    component: UpgradeComponent,
    data: {
      routeName: RouteNames.ChangePlan,
    },
    canActivate: [AuthGuard],
    resolve: { upgradeData: UpgradeResolver },
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
export class UpgradeRoutingModule {}

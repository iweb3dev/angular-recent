import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

import { BillingDetailsContainerComponent } from './billing-details.container';
import { BillingDetailsResolver } from './billing-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: BillingDetailsContainerComponent,
    data: {
      routeName: RouteNames.BillingPlan,
    },
    canActivate: [AuthGuard],
    resolve: { billing: BillingDetailsResolver },
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
export class BillingDetailsRoutingModule {}

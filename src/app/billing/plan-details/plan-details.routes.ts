import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

import { PlanDetailsComponent } from './plan-details.component';
import { PlanDetailsResolver } from './plan-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: PlanDetailsComponent,
    data: {
      routeName: RouteNames.PlanDetails,
    },
    canActivate: [AuthGuard],
    resolve: { plans: PlanDetailsResolver },
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
export class PlanDetailsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';
import { CreditsComponent } from './credits.component';

const routes: Routes = [
  {
    path: '',
    component: CreditsComponent,
    data: {
      routeName: RouteNames.AddCredits,
    },
    canActivate: [AuthGuard],
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
export class CreditsRoutingModule {}

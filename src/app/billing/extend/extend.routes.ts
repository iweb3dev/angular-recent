import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

import { ExtendComponent } from './extend.component';
import { ExtendResolver } from './extend.resolver';

const routes: Routes = [
  {
    path: '',
    component: ExtendComponent,
    data: {
      routeName: RouteNames.ChangePlan,
    },
    canActivate: [AuthGuard],
    resolve: { extendData: ExtendResolver },
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
export class ExtendRoutingModule {}

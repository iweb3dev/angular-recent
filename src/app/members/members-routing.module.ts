import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/user-session/auth.guard';

import { MembersRoutePaths } from './members.route-paths';
import { RouteNames } from '../shared/models/enums/route-names';

import { MemberEditResolver } from './member-edit/member-edit.resolver';

import { MembersComponent } from './members.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberListContainerComponent } from './member-list/member-list-container.component';

const routes: Routes = [
  {
    path: MembersRoutePaths.Default,
    canActivate: [AuthGuard],
    component: MembersComponent,
    children: [
      {
        path: MembersRoutePaths.Default,
        pathMatch: 'full',
        redirectTo: MembersRoutePaths.Edit,
      },
      {
        path: MembersRoutePaths.List,
        component: MemberListContainerComponent,
      },
      {
        path: MembersRoutePaths.Edit,
        component: MemberEditComponent,
        resolve: { data: MemberEditResolver },
        data: {
          routeName: RouteNames.MemberProfile,
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: MembersRoutePaths.Default,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersRoutingModule {}

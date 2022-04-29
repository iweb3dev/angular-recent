import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteNames } from '../shared/models/enums/route-names';
import { GroupManagersComponent } from './group-managers.component';
import { GroupManagersDetailComponent } from './group-managers-detail/group-managers-detail.component';
import { GroupManagersDetailResolver } from './group-managers-detail/resolver/group-managers.resolver';
import {
  CreateGroupManagerComponent
} from './group-managers-detail/has-group-managers/create-group-manager/create-group-manager.component';
import { CreateGroupManagerResolver } from './group-managers-detail/has-group-managers/create-group-manager/create-group-manager.resolver';
import { EditGroupManagerComponent } from './group-managers-detail/has-group-managers/edit-group-manager/edit-group-manager.component';

const routes: Routes = [
  {
    path: '',
    component: GroupManagersComponent,
    children: [
      {
        path: '',
        component: GroupManagersDetailComponent,
        loadChildren: () => import('./group-managers-detail/group-managers-detail.module')
        .then(m => m.GroupManagersDetailModule),
        resolve: { group_managers_detail: GroupManagersDetailResolver },
        data: {
          routeName: `${RouteNames.GroupManagers}`,
        },
      },
      {
        path: 'create',
        component: CreateGroupManagerComponent,
        resolve: { group_managers_detail: CreateGroupManagerResolver },
        data: {
          routeName: `${RouteNames.GroupManagers}`,
        }
      },
      {
        path: ':id/edit',
        component: EditGroupManagerComponent,
        resolve: { group_managers_detail: CreateGroupManagerResolver },
        data: {
          routeName: `${RouteNames.GroupManagers}`,
        }
      }
    ]
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
export class GroupManagersRoutingModule {}

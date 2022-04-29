import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/user-session/auth.guard';

import { GroupMemberEditResolver } from './members/group-member-edit/group-member-edit.resolver';
import { GroupMemberListContainerResolver } from './members/group-member-list/group-member-list-container.resolver';

import { GroupsRoutePaths } from './groups.route-paths';
import { RouteNames } from '../shared/models/enums/route-names';

import { GroupsComponent } from './groups.component';
import { GroupTabsComponent } from './group-tabs/group-tabs.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupMemberEditComponent } from './members/group-member-edit/group-member-edit.component';
import { GroupMemberListContainerComponent } from './members/group-member-list/group-member-list-container.component';
import { GroupMemberAddManuallyComponent } from './members/group-member-add-manually/group-member-add-manually.component';
// tslint:disable-next-line: max-line-length
import { GroupMemberAddExistingContainerComponent } from './members/group-member-add-existing/group-member-add-existing-container.component';
// tslint:disable-next-line: max-line-length
import { GroupMemberUploadContainerComponent } from './members/upload/group-member-upload-container/group-member-upload-container.component';

const routes: Routes = [
  {
    path: GroupsRoutePaths.Default,
    component: GroupsComponent,
    data: {
      routeName: RouteNames.Groups,
    },
    canActivate: [AuthGuard],

    children: [
      {
        path: GroupsRoutePaths.Default,
        component: GroupTabsComponent,
      },
      {
        path: GroupsRoutePaths.List,
        component: GroupMemberListContainerComponent,
        resolve: { data: GroupMemberListContainerResolver },
        data: {
          routeName: RouteNames.Groups,
        },
      },
      {
        path: GroupsRoutePaths.CreateGroup,
        component: GroupCreateComponent,
      },
      {
        path: GroupsRoutePaths.MembersAddManually,
        component: GroupMemberAddManuallyComponent,
      },
      {
        path: GroupsRoutePaths.MembersUpload,
        component: GroupMemberUploadContainerComponent,
      },
      {
        path: GroupsRoutePaths.MembersAddExisting,
        component: GroupMemberAddExistingContainerComponent,
      },
      {
        path: GroupsRoutePaths.MemberEdit,
        component: GroupMemberEditComponent,
        resolve: { data: GroupMemberEditResolver },
        data: {
          routeName: RouteNames.MemberProfile,
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: GroupsRoutePaths.Default,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}

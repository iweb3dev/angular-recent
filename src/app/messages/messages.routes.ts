import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/user-session/auth.guard';
import { RouteNames } from '../shared/models/enums/route-names';
import { MessagesComponent } from './messages.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    data: {
      routeName: RouteNames.MessageLibrary,
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'library',
        pathMatch: 'full',
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./library/library.module').then((m) => m.LibraryModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create/create.module').then((m) => m.CreateModule),
      },
      {
        path: 'edit/:id',
        loadChildren: () =>
          import('./edit/edit.module').then((m) => m.EditModule),
      },
    ],
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
export class MessagesRoutingModule {}

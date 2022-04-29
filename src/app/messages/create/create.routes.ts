import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

import { CreateComponent } from './create.component';
import { MessageCreatedComponent } from './details/message-created/message-created.component';
import { MessageLibraryDetailsContainerComponent } from './details/message-library-details.container';
import { MessageLibraryNameContainerComponent } from './name/message-library-name.container';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
    canActivate: [AuthGuard],
    data: {
      routeName: RouteNames.MessageLibrary,
    },
    children: [
      {
        path: '',
        redirectTo: 'details',
      },
      {
        path: 'name',
        data: {
          routeName: RouteNames.MessageLibrary,
        },
        component: MessageLibraryNameContainerComponent,
      },
      {
        path: 'details',
        data: {
          routeName: RouteNames.MessageLibrary,
        },
        component: MessageLibraryDetailsContainerComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}

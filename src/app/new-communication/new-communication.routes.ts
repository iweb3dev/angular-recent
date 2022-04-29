import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewCommunicationComponent } from './new-communication.component';
import { SuccessComponent } from './success/success.component';
import { SuccessResolver } from './success/success.resolver';

const routes: Routes = [
  {
    path: '',
    component: NewCommunicationComponent,
    children: [
      {
        path: '',
        redirectTo: 'details',
      },
      {
        path: 'details',
        data: {
          routeName: 'Send/Schedule A New Message',
        },
        loadChildren: () =>
          import('./communication-details/communication-details.module').then(
            (m) => m.CommunicationDetailsModule,
          ),
      },
      {
        path: 'success',
        data: {
          routeName: 'Send/Schedule A New Message',
        },
        component: SuccessComponent,
        resolve: { messageId: SuccessResolver },
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
export class NewCommunicationRoutingModule {}

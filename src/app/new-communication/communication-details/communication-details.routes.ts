import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommunicationDetailsContainerComponent } from './communications-details.container';

const routes: Routes = [
  {
    path: '',
    component: CommunicationDetailsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMessageRoutingModule {}

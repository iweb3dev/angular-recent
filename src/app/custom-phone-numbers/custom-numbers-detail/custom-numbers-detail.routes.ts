import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';

import { CustomNumbersDetailContainerComponent } from './custom-numbers-detail.container';

const routes: Routes = [
  {
    path: '',
    component: CustomNumbersDetailContainerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomNumbersDetailsRoutingModule {}

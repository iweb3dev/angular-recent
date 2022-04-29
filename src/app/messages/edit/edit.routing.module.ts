import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';
import { CanDeactivateEdit } from './edit-deactivate.guard';

import { EditComponent } from './edit.component';
import { EditResolver } from './edit.resolver';

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateEdit],
    data: {
      routeName: RouteNames.EditMessage,
    },
    resolve: { message: EditResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

import { LibraryContainerComponent } from './library.container';
import { LibraryResolver } from './library.resolver';

const routes: Routes = [
  {
    path: '',
    component: LibraryContainerComponent,
    canActivate: [AuthGuard],
    data: {
      routeName: RouteNames.MessageLibrary,
    },
    resolve: { messages: LibraryResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}

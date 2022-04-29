import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/user-session/auth.guard';
import { RouteNames } from '../shared/models/enums/route-names';
import { MessageResultResolver } from './message-result.resolver';
import { MessageResultsDetailComponent } from './message-results-detail/message-results-detail.component';
import { MessageResultsComponent } from './message-results.component';

const routes: Routes = [
  {
    path: '',
    component: MessageResultsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MessageResultsDetailComponent,
        data: {
          routeName: `${RouteNames.MessageResults}`,
        },
        resolve: { messages: MessageResultResolver },
        loadChildren: () =>
          import('./message-results-detail/message-results-detail.module').then(
            (m) => m.MessageResultsDetailModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageResultsRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

import { CreditsHistoryComponent } from './credits-history/credits-history.component';
import { HistoryComponent } from './history.component';
import { PurchasesHistoryComponent } from './purchases-history/purchases-history.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'purchases',
        pathMatch: 'full',
      },
      {
        path: 'purchases',
        canActivate: [AuthGuard],
        data: {
          routeName: RouteNames.BillingHistory,
        },
        component: PurchasesHistoryComponent,
        loadChildren: () =>
          import('./purchases-history/purchases-history.module').then(
            (m) => m.PurchaseHistoryModule,
          ),
      },
      {
        path: 'credits',
        component: CreditsHistoryComponent,
        data: {
          routeName: RouteNames.BillingHistory,
        },
        loadChildren: () =>
          import('./credits-history/credits-history.module').then(
            (m) => m.CreditsHistoryModule,
          ),
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
export class HistoryRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/user-session/auth.guard';
import { RouteNames } from '../shared/models/enums/route-names';

import { BillingComponent } from './billing.component';

const routes: Routes = [
  {
    path: '',
    component: BillingComponent,
    data: {
      routeName: RouteNames.MessageLibrary,
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },
      {
        path: 'details',
        loadChildren: () =>
          import('./details/billing-details.module').then(
            (m) => m.BillingDetailsModule,
          ),
      },
      {
        path: 'pause-account',
        loadChildren: () =>
          import('./pause-account/pause-account.module').then(
            (m) => m.PauseAccountModule,
          ),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('./history/history.module').then((m) => m.HistoryModule),
      },
      {
        path: 'purchase-invoice/:id',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./purchase-invoice/purchase-invoice.module').then(
            (m) => m.PurchasesInvoiceModule,
          ),
      },
      {
        path: 'plan-details',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./plan-details/plan-details.module').then(
            (m) => m.PlanDetailsModule,
          ),
      },
      {
        path: 'plan-upgrade/:id',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./upgrade/upgrade.module').then((m) => m.UpgradeModule),
      },
      {
        path: 'plan-downgrade/:id',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./downgrade/downgrade.module').then((m) => m.DowngradeModule),
      },
      {
        path: 'plan-extend/:id',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./extend/extend.module').then((m) => m.ExtendModule),
      },
      {
        path: 'credits',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./credits/credits.module').then((m) => m.CreditsModule),
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
export class BillingRoutingModule {}

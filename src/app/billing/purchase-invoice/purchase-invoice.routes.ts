import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/user-session/auth.guard';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

import { PurchaseInvoiceComponent } from './purchase-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseInvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      routeName: RouteNames.BillingInvoice,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseInvoiceRoutingModule {}

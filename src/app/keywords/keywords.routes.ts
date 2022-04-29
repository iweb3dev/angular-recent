import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeywordsComponent } from './keywords.component';
import { KeywordsDetailComponent } from './keywords-detail/keywords-detail.component';
import { RouteNames } from '../shared/models/enums/route-names';
import { KeywordsDetailResolver } from './keywords-detail/resolver/keywords-detail.resolver';
import { PurchaseKeywordComponent } from './purchase-keyword/purchase-keyword.component';
import { BillingDetailsResolver } from '../billing/details/billing-details.resolver';
import { AssignKeywordComponent } from './assign-keyword/assign-keyword.component';
import { ViewKeywordComponent } from './view-keyword/view-keyword.component';
import { KeywordRenewalComponent } from './keyword-renewal/keyword-renewal.component';

const routes: Routes = [
  {
    path: '',
    component: KeywordsComponent,
    children: [
      {
        path: '',
        component: KeywordsDetailComponent,
        loadChildren: () =>
          import('./keywords-detail/keywords-detail.module').then(
            (m) => m.KeywordsDetailModule
          ),
        resolve: { keyword_detail: KeywordsDetailResolver },
        data: {
          routeName: `Manage ${RouteNames.Keywords}`,
        },
      },
      {
        path: 'create',
        component: PurchaseKeywordComponent,
        loadChildren: () =>
          import('./purchase-keyword/purchase-keyword.module').then(
            (m) => m.PurchaseKeywordModule
          ),
        data: {
          routeName: `Manage ${RouteNames.Keywords}`,
        },
        resolve: {
          billing: BillingDetailsResolver,
          keyword_detail: KeywordsDetailResolver,
        },
      },
      {
        path: 'renew/:keyword',
        component: KeywordRenewalComponent,
        loadChildren: () =>
          import('./keyword-renewal/keyword-renewal.module').then(
            (m) => m.KeywordRenewalModule
          ),
        data: {
          routeName: `Renew ${RouteNames.Keywords}`,
        },
        resolve: {
          billing: BillingDetailsResolver,
          keyword_detail: KeywordsDetailResolver,
        },
      },
      {
        path: 'assign/:keyword',
        component: AssignKeywordComponent,
        data: {
          routeName: RouteNames.assignKeyword,
        },
        resolve: { keyword_detail: KeywordsDetailResolver },
      },
      {
        path: 'view/:keyword',
        component: ViewKeywordComponent,
        data: {
          routeName: `Manage ${RouteNames.Keywords}`,
        },
        resolve: { keyword_detail: KeywordsDetailResolver },
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
export class KeywordsRoutingModule {}

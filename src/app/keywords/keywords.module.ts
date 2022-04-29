import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeywordsComponent } from './keywords.component';
import { KeywordsRoutingModule } from './keywords.routes';
import { PurchaseKeywordModule } from './purchase-keyword/purchase-keyword.module';
import { BillingDetailsResolver } from '../billing/details/billing-details.resolver';
import { BillingDetailsService } from '../billing/details/billing-details.service';
import { StoreModule } from '@ngrx/store';
import * as billingState from '../billing/state/billing.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BillingEffects } from '../billing/state/billing.effects';
import { AssignKeywordModule } from './assign-keyword/assign-keyword.module';
import { BillingFacade } from '../billing/state/billing.facade';
import { ViewKeywordModule } from './view-keyword/view-keyword.module';

@NgModule({
  declarations: [KeywordsComponent],
  imports: [
    CommonModule,
    ViewKeywordModule,
    PurchaseKeywordModule,
    AssignKeywordModule,
    KeywordsRoutingModule,
    StoreModule.forFeature(
      billingState.billingFeatureKey,
      billingState.reducer,
    ),
    EffectsModule.forFeature([BillingEffects]),
  ],
  providers: [BillingDetailsResolver, BillingDetailsService, BillingFacade],
})
export class KeywordsModule {}

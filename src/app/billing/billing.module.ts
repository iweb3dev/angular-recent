import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as billingState from './state/billing.reducer';
import { BillingComponent } from './billing.component';

import { BillingEffects } from './state/billing.effects';
import { BillingFacade } from './state/billing.facade';
import { BillingRoutingModule } from './billing.routes';

@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    StoreModule.forFeature(
      billingState.billingFeatureKey,
      billingState.reducer,
    ),
    EffectsModule.forFeature([BillingEffects]),
  ],
  providers: [BillingFacade],
})
export class BillingModule {}

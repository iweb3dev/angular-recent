import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';

import { BillingFacade } from '../state/billing.facade';

import { BillingDetailsService } from './billing-details.service';
import { BillingDetailsComponent } from './billing-details.component';
import { BillingDetailsResolver } from './billing-details.resolver';
import { BillingDetailsRoutingModule } from './billing-details.routes';
import { BillingInfoModule } from './billing-info/billing-info.module';
import { MyPlanModule } from './my-plan/my-plan.module';
import { BillingDetailsContainerComponent } from './billing-details.container';

@NgModule({
  declarations: [BillingDetailsComponent, BillingDetailsContainerComponent],
  imports: [
    CommonModule,
    MyPlanModule,
    LoaderModule,
    BillingInfoModule,
    BillingDetailsRoutingModule,
  ],
  providers: [BillingDetailsResolver, BillingFacade, BillingDetailsService],
})
export class BillingDetailsModule {}

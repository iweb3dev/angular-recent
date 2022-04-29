import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseKeywordComponent } from './purchase-keyword.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ReactiveFormsModule } from '@angular/forms';

import { KeywordsService } from 'src/app/api/keywords/keywords.service';
import { BillingFacade } from 'src/app/billing/state/billing.facade';
import { AddNewPaymentModule } from 'src/app/domain/billing/add-new-payment/add-new-payment.module';

import { LoaderModule } from '../../shared/components/loader/loader.module';

import { NoSpaceAllowedModule } from '@shared/directives/no-space-allowed/no-space-allowed.module';

@NgModule({
  declarations: [PurchaseKeywordComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    LoaderModule,
    MatBottomSheetModule,
    AddNewPaymentModule,

    NoSpaceAllowedModule
  ],
  providers: [KeywordsService, BillingFacade],
})
export class PurchaseKeywordModule {}

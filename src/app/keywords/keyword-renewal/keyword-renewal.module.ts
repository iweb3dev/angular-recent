import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { LoaderModule } from '@shared/components/loader/loader.module';
import { AddNewPaymentModule } from 'src/app/domain/billing/add-new-payment/add-new-payment.module';

import { KeywordsService } from '@api/keywords/keywords.service';
import { BillingFacade } from 'src/app/billing/state/billing.facade';

import { KeywordRenewalComponent } from './keyword-renewal.component';

@NgModule({
  declarations: [KeywordRenewalComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatBottomSheetModule,

    FlexLayoutModule,

    LoaderModule,
    AddNewPaymentModule,
  ],
  providers: [KeywordsService, BillingFacade],
})
export class KeywordRenewalModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { AddNewPaymentModule } from 'src/app/domain/billing/add-new-payment/add-new-payment.module';

import { DowngradeComponent } from './downgrade.component';
import { DowngradeRoutingModule } from './downgrade.routes';
import { DowngradeResolver } from './downgrade.resolver';
import { DowngradeService } from './downgrade.service';

@NgModule({
  declarations: [DowngradeComponent],
  imports: [
    LoaderModule,
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    AddNewPaymentModule,
    ReactiveFormsModule,
    DowngradeRoutingModule,
  ],
  providers: [DowngradeResolver, DowngradeService],
})
export class DowngradeModule {}

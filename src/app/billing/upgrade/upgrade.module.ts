import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { AddNewPaymentModule } from 'src/app/domain/billing/add-new-payment/add-new-payment.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { UpgradeComponent } from './upgrade.component';
import { UpgradeRoutingModule } from './upgrade.routes';
import { UpgradeResolver } from './upgrade.resolver';
import { UpgradeService } from './upgrade.service';

@NgModule({
  declarations: [UpgradeComponent],
  imports: [
    PipesModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AddNewPaymentModule,
    UpgradeRoutingModule,
  ],
  providers: [UpgradeResolver, UpgradeService],
})
export class UpgradeModule {}

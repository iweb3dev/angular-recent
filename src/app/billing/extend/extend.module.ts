import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { AddNewPaymentModule } from 'src/app/domain/billing/add-new-payment/add-new-payment.module';

import { ExtendComponent } from './extend.component';
import { ExtendRoutingModule } from './extend.routes';
import { ExtendResolver } from './extend.resolver';
import { ExtendService } from './extend.service';

@NgModule({
  declarations: [ExtendComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatFormFieldModule,
    AddNewPaymentModule,
    ReactiveFormsModule,
    ExtendRoutingModule,
  ],
  providers: [ExtendResolver, ExtendService],
})
export class ExtendModule {}

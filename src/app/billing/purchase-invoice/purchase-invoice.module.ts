import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxPrintModule } from 'ngx-print';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';

import { PurchaseInvoiceComponent } from './purchase-invoice.component';
import { PurchaseInvoiceRoutingModule } from './purchase-invoice.routes';
import { PurchaseInvoiceService } from './purchase-invoice.service';

@NgModule({
  declarations: [PurchaseInvoiceComponent],
  imports: [
    CommonModule,
    LoaderModule,
    MatCardModule,
    MatIconModule,
    NgxPrintModule,
    MatButtonModule,
    FlexLayoutModule,
    PurchaseInvoiceRoutingModule,
  ],
  providers: [PurchaseInvoiceService],
})
export class PurchasesInvoiceModule {}

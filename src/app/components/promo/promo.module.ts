import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PromoComponent } from './promo.component';
import { PromoDialogComponent } from './promo-dialog/promo-dialog.component';
import { PromoService } from './promo.service';

@NgModule({
  declarations: [PromoComponent, PromoDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [PromoComponent],
  providers: [PromoService],
})
export class PromoModule {}

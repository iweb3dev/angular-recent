import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatIconModule } from '@angular/material/icon';

import { PurchasePhoneComponent } from './purchase-phone.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [PurchasePhoneComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [PurchasePhoneComponent],
})
export class PurchasePhoneModule {}

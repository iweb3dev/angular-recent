import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { PlanDetailsComponent } from './plan-details.component';
import { PlanDetailsRoutingModule } from './plan-details.routes';
import { PlanDetailsResolver } from './plan-details.resolver';
import { PlanDetailsTableModule } from './plan-details-table/plan-details-table.module';

@NgModule({
  declarations: [PlanDetailsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PlanDetailsTableModule,
    PlanDetailsRoutingModule,
  ],
  providers: [PlanDetailsResolver],
})
export class PlanDetailsModule {}

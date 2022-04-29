import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NumbersOnlyModule } from 'src/app/shared/directives/number-only/numbers-only.module';
import { AuthFooterModule } from '../../auth/shared/auth-footer/auth-footer.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SubmitPlanComponent } from './submit-plan.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { PromoModule } from '@components/promo/promo.module';

import { SubmitPlanService } from './submit-plan.service';

@NgModule({
  declarations: [SubmitPlanComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    AuthFooterModule,
    NumbersOnlyModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    PromoModule,
  ],
  providers: [SubmitPlanService],
})
export class SubmitPlanModule {}

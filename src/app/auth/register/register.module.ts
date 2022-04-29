import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { EffectsModule } from '@ngrx/effects';
import { MatIconModule } from '@angular/material/icon';

import { RegisterContainerComponent } from './register-container.component';
import { RegisterEffects } from './store/register.effects';
import { RouterModule } from '@angular/router';
import { NumbersOnlyModule } from 'src/app/shared/directives/number-only/numbers-only.module';
import { AuthFooterModule } from '../shared/auth-footer/auth-footer.module';

@NgModule({
  declarations: [RegisterComponent, RegisterContainerComponent],
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
    EffectsModule.forFeature([RegisterEffects]),
    NumbersOnlyModule,
    MatIconModule,
  ],
  providers: [],
})
export class RegisterModule {}

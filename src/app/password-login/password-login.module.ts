import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MultiSelectModule } from '../shared/components/multi-select/multi-select.module';
import { ChipsAutocompleteModule } from '../shared/forms/chips-autocomplete/chips-autocomplete.module';
import { MobileChipsSelectorModule } from '../shared/forms/mobile-chips-selector/mobile-chips-selector.module';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordLoginRoutingModule } from './password-login-routing.module';
import { PasswordLoginComponent } from './password-login.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MultiSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    ChipsAutocompleteModule,
    MobileChipsSelectorModule,
    PasswordLoginRoutingModule,
  ],
  exports: [],
  declarations: [ChangePasswordComponent, PasswordLoginComponent],
  providers: [],
})
export class PasswordLoginModule {}

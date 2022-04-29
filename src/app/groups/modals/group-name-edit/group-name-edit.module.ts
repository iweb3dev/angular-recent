import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { GroupNameEditComponent } from './group-name-edit.component';

import { AlphaNumericOnlyModule } from 'src/app/shared/directives/alpha-numeric-only/alpha-numeric-only.module';

import { MobileHeaderModule } from 'src/app/shared/components/mobile-header/mobile-header.module';

@NgModule({
  declarations: [GroupNameEditComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    AlphaNumericOnlyModule,
    MobileHeaderModule,
  ],
})
export class GroupNameEditModule {}

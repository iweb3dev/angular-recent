import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AlphaNumericOnlyModule } from 'src/app/shared/directives/alpha-numeric-only/alpha-numeric-only.module';

import { MobileHeaderModule } from 'src/app/shared/components/mobile-header/mobile-header.module';

import { GroupCreateComponent } from './group-create.component';

@NgModule({
  declarations: [GroupCreateComponent],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,

    FlexLayoutModule,

    AlphaNumericOnlyModule,

    MobileHeaderModule,
  ],
})
export class GroupCreateModule {}

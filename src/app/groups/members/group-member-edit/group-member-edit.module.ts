import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { GroupMemberEditComponent } from './group-member-edit.component';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { NumbersOnlyModule } from 'src/app/shared/directives/number-only/numbers-only.module';

import { MobileHeaderModule } from 'src/app/shared/components/mobile-header/mobile-header.module';

@NgModule({
  declarations: [GroupMemberEditComponent],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,

    PipesModule,
    NumbersOnlyModule,
    MobileHeaderModule,
  ],
  exports: [GroupMemberEditComponent],
})
export class GroupMemberEditModule {}

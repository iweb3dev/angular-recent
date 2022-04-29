import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { FlexLayoutModule } from '@angular/flex-layout';

import { GroupMemberAddManuallyComponent } from './group-member-add-manually.component';

import { NumbersOnlyModule } from 'src/app/shared/directives/number-only/numbers-only.module';

import { MobileHeaderModule } from 'src/app/shared/components/mobile-header/mobile-header.module';

@NgModule({
  declarations: [GroupMemberAddManuallyComponent],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,

    FlexLayoutModule,

    NumbersOnlyModule,

    MobileHeaderModule,
  ],
})
export class GroupMemberAddManuallyModule {}

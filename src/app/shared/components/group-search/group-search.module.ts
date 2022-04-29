import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { GroupSearchComponent } from './group-search.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GroupSearchComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [GroupSearchComponent],
})
export class GroupSearchModule {}

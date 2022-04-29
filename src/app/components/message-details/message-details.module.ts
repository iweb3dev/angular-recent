import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { MessageDetailsComponent } from './message-details.component';

@NgModule({
  declarations: [MessageDetailsComponent],
  imports: [
    PipesModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  exports: [MessageDetailsComponent],
})
export class MessageDetailsModule {}

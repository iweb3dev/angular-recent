import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material/input';
import { A11yModule } from '@angular/cdk/a11y';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    A11yModule,
    CommonModule,
    OverlayModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [SearchComponent],
})
export class SearchModule {}

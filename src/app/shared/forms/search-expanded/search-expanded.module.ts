import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { SearchExpandedComponent } from './search-expanded.component';

@NgModule({
  declarations: [SearchExpandedComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [SearchExpandedComponent],
})
export class SearchExpandedModule {}

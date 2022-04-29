import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { AssignKeywordComponent } from './assign-keyword.component';

@NgModule({
  declarations: [AssignKeywordComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    LoaderModule,
  ]
})
export class AssignKeywordModule {}

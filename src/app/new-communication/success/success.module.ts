import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SuccessComponent } from './success.component';
import { SuccessResolver } from './success.resolver';

@NgModule({
  declarations: [SuccessComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatIconModule],
  providers: [SuccessResolver],
})
export class SuccessModule {}

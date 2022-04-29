import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlphaNumericOnlyDirective } from './alpha-numeric-only.directive';

@NgModule({
  declarations: [AlphaNumericOnlyDirective],
  imports: [CommonModule],
  exports: [AlphaNumericOnlyDirective],
})
export class AlphaNumericOnlyModule {}

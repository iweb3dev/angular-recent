import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoSpaceAllowedDirective } from './no-space-allowed.directive';

@NgModule({
  declarations: [NoSpaceAllowedDirective],
  imports: [CommonModule],
  exports: [NoSpaceAllowedDirective],
})
export class NoSpaceAllowedModule {}

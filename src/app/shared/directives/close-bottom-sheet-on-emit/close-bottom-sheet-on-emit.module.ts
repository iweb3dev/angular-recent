import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseBottomSheetOnEmitDirective } from './close-bottom-sheet-on-emit.directive';

@NgModule({
  declarations: [CloseBottomSheetOnEmitDirective],
  imports: [CommonModule],
  exports: [CloseBottomSheetOnEmitDirective],
})
export class CloseBottomSheetOnEmitModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseDialogOnEmitDirective } from './close-dialog-on-emit.directive';

@NgModule({
  declarations: [CloseDialogOnEmitDirective],
  imports: [CommonModule],
  exports: [CloseDialogOnEmitDirective],
})
export class CloseDialogOnEmitModule {}

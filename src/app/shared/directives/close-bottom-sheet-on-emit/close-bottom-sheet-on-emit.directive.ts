import { Directive, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Directive({
  selector: '[appCloseBottomSheetOnEmit]',
})
export class CloseBottomSheetOnEmitDirective {
  @Input()
  set appCloseBottomSheetOnEmit(shouldClose: boolean) {
    if (shouldClose) {
      this.closeBottomSheet();
    }
  }

  constructor(private _bottomSheet: MatBottomSheet) {}

  private closeBottomSheet(): void {
    requestAnimationFrame(() => this._bottomSheet.dismiss());
  }
}

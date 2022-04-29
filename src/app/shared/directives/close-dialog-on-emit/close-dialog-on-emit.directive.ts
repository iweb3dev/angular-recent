import { Directive, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[appCloseDialogOnEmit]',
})
export class CloseDialogOnEmitDirective {
  @Input()
  set appCloseDialogOnEmit(shouldClose: boolean) {
    if (shouldClose) {
      this.closeDialog();
    }
  }

  constructor(private _dialog: MatDialog) {}

  private closeDialog(): void {
    const dialogs = this._dialog.openDialogs;
    if (dialogs.length) {
      requestAnimationFrame(() => dialogs[dialogs.length - 1].close());
    }
  }
}

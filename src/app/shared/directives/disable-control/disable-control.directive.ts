import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]',
})
export class DisableControlDirective {
  @Input()
  set appDisableControl(condition: boolean) {
    requestAnimationFrame(() => {
      if (condition) {
        this._ngControl.control.disable();
      } else {
        this._ngControl.control.enable();
      }
    });
  }

  constructor(private _ngControl: NgControl) {}
}

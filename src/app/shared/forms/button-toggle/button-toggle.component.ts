import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  constructor() {}

  formControl = new FormControl();

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  writeValue(): void {
    // console.info('writeValue');
  }

  registerOnChange(): void {
    // console.info('registerOnChange');
  }

  registerOnTouched(): void {
    // console.info('registerOnTouched');
  }
}

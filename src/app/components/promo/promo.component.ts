import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { PromoCode } from 'src/app/api/financials/financials.models';

import { PromoService } from './promo.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PromoComponent,
      multi: true,
    },
  ],
})
export class PromoComponent implements OnInit, ControlValueAccessor {
  promoCodeControl = new FormControl();

  @Output()
  valueChange = new EventEmitter<PromoCode>();

  @Output()
  deleteButtonDetection = new EventEmitter();

  @Input()
  set value(value: PromoCode) {
    this.promoCodeControl.setValue(value);
  }

  get value(): PromoCode {
    return this.promoCodeControl.value;
  }

  @Input()
  title = 'Add Promo Code';

  private _onTouchedCb: () => void;
  private _onChangeCb: (value: PromoCode) => void;

  constructor(private _promoService: PromoService) {}

  ngOnInit(): void {}

  writeValue(value: PromoCode): void {
    this.value = value;
  }

  registerOnChange(fn: (value: PromoCode) => void): void {
    this._onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onPromoCodeAdd(): void {
    if (this._onTouchedCb) {
      this._onTouchedCb();
    }

    this._promoService.openPromoDialog().subscribe((code) => {
      this.value = code;
      this.emitNewValue();
    });
  }

  onPromoCodeDelete(): void {
    this.promoCodeControl.reset();
    this.deleteButtonDetection.emit();
  }

  private emitNewValue(): void {
    this.valueChange.emit(this.value);

    if (this._onChangeCb) {
      this._onChangeCb(this.value);
    }
  }
}

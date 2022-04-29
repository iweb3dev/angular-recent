import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaymentTypes } from 'src/app/api/shared/shared.enums';
import { PayPalCaptureModel } from '../paypal/paypal.models';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  readonly PaymentTypes = PaymentTypes;
  @Input()
  creditCardForm: FormGroup;

  @Input()
  bankAccountForm: FormGroup;

  @Input()
  paymentType: PaymentTypes;

  @Input()
  set enablePaypal(value: string | boolean) {
    this._paypalEnabled = coerceBooleanProperty(value);
  }

  get paypalEnabled(): boolean {
    return this._paypalEnabled;
  }

  @Input()
  cost: number;

  @Output()
  activeTab = new EventEmitter<number>();

  @Output()
  transactionComplete = new EventEmitter<PayPalCaptureModel>();

  private _paypalEnabled = false;
  constructor() {}

  ngOnInit(): void {}

  // tslint:disable-next-line: member-ordering
  static ngAcceptInputType_paypalEnabled: BooleanInput;
}

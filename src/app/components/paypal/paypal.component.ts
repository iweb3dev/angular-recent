import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Subscription } from 'rxjs';

import { PayPalService } from 'src/app/api/paypal/paypal.service';
import { environment } from 'src/environments/environment';

import { PayPalCaptureModel } from './paypal.models';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent implements OnInit, OnDestroy {
  payPalConfig: IPayPalConfig;

  @Input()
  cost: number;

  @Output()
  transactionComplete = new EventEmitter<PayPalCaptureModel>();

  @Output()
  cancelTransaction = new EventEmitter<void>();

  @Output()
  openPayPalWindow = new EventEmitter<void>();

  @Output()
  receivePayPalError = new EventEmitter<void>();

  private _paypalAuthSubscrtiption: Subscription;

  constructor(private _paypalService: PayPalService) {}

  ngOnInit(): void {
    this._paypalAuthSubscrtiption = this._paypalService
      .authorizePayPalLogin()
      .subscribe((credentials) => this.handlePayPal());
  }

  ngOnDestroy(): void {
    this._paypalAuthSubscrtiption?.unsubscribe();
  }

  private handlePayPal(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.payPal.clientId,
      advanced: {
        commit: 'true',
        extraQueryParams: [{ name: 'disable-funding', value: 'card' }],
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'blue',
        size: 'small',
      },
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: (this.cost > 0 ? this.cost : 1).toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: (this.cost > 0 ? this.cost : 1).toString(),
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: (this.cost > 0 ? this.cost : 1).toString(),
                  },
                },
              ],
            },
          ],
        },

      onApprove: async (data, actions) => {
        await actions.order.get();
        const orderCapture = await actions.order.capture();
        this.transactionComplete.emit(orderCapture);
      },
      onCancel: (data, actions) => {
        this.cancelTransaction.emit();
      },
      onError: (err) => {
        this.receivePayPalError.emit();
      },
      onClick: (data, actions) => {
        this.openPayPalWindow.emit();
      },
    };
  }
}

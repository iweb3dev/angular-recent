import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { PrepayOptionsDtoModel } from 'src/app/api/twilio/twilio.models';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { PrepayOptionsModel } from './purchase-phone.models';
import {
  BasePaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from 'src/app/api/financials/financials.models';
import { MatSelectChange } from '@angular/material/select';

const MONTH_PRICE = 19.99;

export const DATE_FORMATS = {
  parse: {
    dateInput: 'MM/YY',
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-purchase-phone',
  templateUrl: './purchase-phone.component.html',
  styleUrls: ['./purchase-phone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ],
})
export class PurchasePhoneComponent implements OnInit {
  discountOptions: PrepayOptionsModel[] = [];
  paymentControl = new FormControl(null);

  @Input()
  phone: string;

  @Input()
  existedPhoneNumber: string;

  @Input()
  set paymentProfiles(
    paymentProfiles: (PaymentProfileBankAccount & PaymentProfileCreditCard)[],
  ) {
    this._paymentProfiles = paymentProfiles;
    const primary = this._paymentProfiles.find((profile) => profile.isPrimary);

    this.paymentControl.setValue(primary);

    this.paymentProfileSelect.emit(primary);
  }

  get paymentProfiles(): (PaymentProfileBankAccount &
    PaymentProfileCreditCard)[] {
    return this._paymentProfiles;
  }

  @Input()
  set prepayOptions(prepayOptions: PrepayOptionsDtoModel[]) {
    if (prepayOptions) {
      this.discountOptions = this.createPrepayOptions(prepayOptions);
      this.discountControl.setValue(this.discountOptions[0].id);
    }
  }

  @Output()
  prepayId = new EventEmitter<number>();

  @Output()
  paymentProfileSelect = new EventEmitter<BasePaymentProfile>();

  @Output()
  selectedTerm = new EventEmitter<number>();

  discountControl = new FormControl(null);
  dueNow = MONTH_PRICE;

  private _paymentProfiles: (PaymentProfileBankAccount &
    PaymentProfileCreditCard)[];
  constructor() {}

  ngOnInit(): void {}

  onProfileSelect({ value }: MatSelectChange): void {
    this.paymentProfileSelect.emit(value);
  }

  findDueNowValue(): void {
    const selectedOption = this.discountOptions.find(
      (option) => option.id === this.discountControl.value,
    );
    const discount = Math.ceil(
      MONTH_PRICE * selectedOption.months * (selectedOption.discount / 100),
    );
    this.dueNow = MONTH_PRICE * selectedOption.months - discount;
    this.selectedTerm.emit(selectedOption.months);
    this.prepayId.emit(selectedOption.id);
  }

  private createPrepayOptions(
    prepayOptions: PrepayOptionsDtoModel[],
  ): PrepayOptionsModel[] {
    return prepayOptions.map((options) => ({
      ...options,
      displayOption:
        options.id === 1
          ? options.prepayOption
          : `${options.prepayOption}-${options.discount}% discount`,
    }));
  }
}

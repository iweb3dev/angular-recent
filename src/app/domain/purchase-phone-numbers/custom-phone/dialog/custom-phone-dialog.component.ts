import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PrepayOptionsDtoModel } from 'src/app/api/twilio/twilio.models';
import {
  BasePaymentProfile,
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from 'src/app/api/financials/financials.models';
import { PaymentPrograms } from 'src/app/api/shared/shared.enums';
import { AreaCodes } from 'src/app/shared/models/phone-number/phone-number.enumts';
import { createPaymentProfileForm } from 'src/app/domain/billing/utils/billing-payment-profile.form';

import { CustomPhoneService } from '../custom-phone.service';

import { CustomPhoneListDataModel } from '../../purchase-phone-numbers.models';

import moment from 'moment';

@Component({
  selector: 'app-custom-phone-dialog',
  templateUrl: './custom-phone-dialog.component.html',
  styleUrls: ['./custom-phone-dialog.component.scss'],
})
export class CustomPhoneDialogComponent implements OnInit, OnDestroy {
  readonly areaCodes = [
    AreaCodes.TollFree855,
    AreaCodes.TollFree844,
    AreaCodes.TollFree833,
  ];

  customSearch = false;
  isFetchingPhones = true;
  customSearchForm: FormGroup;
  selectedPhone: CustomPhoneListDataModel;
  prepayOptions$: Observable<PrepayOptionsDtoModel[]>;
  paymentForm: FormGroup;
  phoneList: CustomPhoneListDataModel[];
  selectedPaymentProgram: PaymentPrograms = PaymentPrograms.creditCard;
  selectedPaymentProfile: BasePaymentProfile;

  selectedTermDate = moment(this.data?.endDate).add(1, 'M').toDate();

  private _fetchMorePhonesSubject = new BehaviorSubject<{
    areaCode: AreaCodes;
    tollFreeSearchText: string;
  }>({ areaCode: AreaCodes.TollFree855, tollFreeSearchText: '' });
  private _subscription: Subscription;
  private _prepayId: number;

  get creditCardForm(): FormGroup {
    return this.paymentForm.get('creditCard') as FormGroup;
  }

  get bankAccountForm(): FormGroup {
    return this.paymentForm.get('bankAccount') as FormGroup;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      paymentProfiles: (PaymentProfileBankAccount & PaymentProfileCreditCard)[];
      existingPhoneNumber?: string;
      endDate?: string;
    },
    private _dialogRef: MatDialogRef<CustomPhoneDialogComponent>,
    private _customPhoneService: CustomPhoneService,
    private _formBuilder: FormBuilder,
  ) {
    this._subscription = this._fetchMorePhonesSubject
      .pipe(
        switchMap(({ areaCode, tollFreeSearchText }) =>
          this._customPhoneService.findPhoneNumbers(
            areaCode,
            tollFreeSearchText,
          ),
        ),
      )
      .subscribe((phones) => {
        this.phoneList = phones;
        this.isFetchingPhones = false;
      });

    this.prepayOptions$ = this._customPhoneService.findPrepayOptions();

    this.paymentForm = createPaymentProfileForm();
  }

  get shouldDisabledSubmit(): boolean {
    const hasValidForm =
      this.paymentForm.get('bankAccount').valid ||
      this.paymentForm.get('creditCard').valid;

    return !this.data.paymentProfiles.length && !hasValidForm;
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.customSearchForm = this._formBuilder.group({
      areaCode: [null, [Validators.required]],
      tollFreeSearchText: [null, [Validators.required]],
    });

    this.setExistingPhone(this.data?.existingPhoneNumber);
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  onNumbersSearch(): void {
    this._fetchMorePhonesSubject.next(this.customSearchForm.value);
    this.isFetchingPhones = true;
  }

  onPhoneSelect(phone: CustomPhoneListDataModel): void {
    this.selectedPhone = phone;
  }

  setExistingPhone(phone: string) {
    if (phone) {
      this.selectedPhone = {
        friendlyName: phone,
        phoneNumber: phone,
      };
    }
  }

  fetchMorePhones(): void {
    this._fetchMorePhonesSubject.next({
      areaCode: AreaCodes.TollFree855,
      tollFreeSearchText: '',
    });
    this.isFetchingPhones = true;
  }

  onUpdatePrepayId(id: number): void {
    this._prepayId = id;
  }

  onPurchaseComplete(): void {
    const creditCardForm = this.paymentForm.get('creditCard');
    const bankAccountForm = this.paymentForm.get('bankAccount');

    let value = {
      phoneNumber: this.selectedPhone.phoneNumber,
      prepayOptionId: this._prepayId,
      paymentData: null,
      selectedPaymentProfile: this.selectedPaymentProfile,
    };
    if (
      this.selectedPaymentProgram === PaymentPrograms.creditCard &&
      creditCardForm.valid
    ) {
      value = {
        ...value,
        paymentData: {
          selectedPaymentProgram: this.selectedPaymentProgram,
          creditCard: {
            ...creditCardForm.value,
            expirationNotice: creditCardForm.value.expirationNotice.toDate(),
          },
        },
      };
    }

    if (
      this.selectedPaymentProgram === PaymentPrograms.bankCreditCard &&
      bankAccountForm.valid
    ) {
      value = {
        ...value,
        paymentData: {
          selectedPaymentProgram: this.selectedPaymentProgram,
          bankAccount: bankAccountForm.value,
        },
      };
    }
    this._dialogRef.close(value);
  }

  onTermSelection(selectedTermMonth: number): void {
    this.selectedTermDate = moment(this.data?.endDate).add(selectedTermMonth, 'M').toDate();
  }
}

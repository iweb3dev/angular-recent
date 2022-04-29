import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PackageFeatures } from 'src/app/api/packages/packages.models';
import { PaymentPrograms } from 'src/app/api/shared/shared.enums';
import { createPaymentProfileForm } from 'src/app/domain/billing/utils/billing-payment-profile.form';

import {
  hasValue,
  nonValue,
} from 'src/app/shared/utils/verifications/value-check';
import { GoUnlimitedDialogModel } from '../go-unlimited.models';

@Component({
  selector: 'app-go-unlimited-dialog',
  templateUrl: './go-unlimited-dialog.component.html',
  styleUrls: ['./go-unlimited-dialog.component.scss'],
})
export class GoUnlimitedDialogComponent implements OnInit {
  paymentForm: FormGroup;
  contractListControl = new FormControl({ packageName: '', id: null });
  promoCodeControl = new FormControl(null);
  paymentControl = new FormControl(null);
  selectedPaymentProgram: PaymentPrograms = PaymentPrograms.creditCard;

  contractListOptions$: Observable<PackageFeatures[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: GoUnlimitedDialogModel,
    private _dialogRef: MatDialogRef<GoUnlimitedDialogComponent>,
    private _router: Router,
  ) {}

  get shouldDisabledSubmit(): boolean {
    const hasValidForm =
      this.paymentForm.get('bankAccount').valid ||
      this.paymentForm.get('creditCard').valid;

    return !this.data.paymentProfiles.length && !hasValidForm;
  }

  get creditCardForm(): FormGroup {
    return this.paymentForm.get('creditCard') as FormGroup;
  }

  get bankAccountForm(): FormGroup {
    return this.paymentForm.get('bankAccount') as FormGroup;
  }

  ngOnInit(): void {
    this.paymentControl.setValue(
      this.data.paymentProfiles.find((profile) => profile.isPrimary),
    );

    this.contractListOptions$ = this.contractListControl.valueChanges.pipe(
      map((value) => (value?.packageName ? value : { packageName: value })),
      map(({ packageName }) =>
        hasValue(packageName)
          ? this.filterContracts(packageName)
          : this.data.upgradePackages,
      ),
    );

    this.paymentForm = createPaymentProfileForm();
  }

  showPlanDetails(): void {
    this._dialogRef.close();
    this._router.navigate(['./billing/plan-details']);
  }

  onCloseDialog(): void {
    this._dialogRef.close();
  }

  onUpgrade(): void {
    const creditCardForm = this.paymentForm.get('creditCard');
    const bankAccountForm = this.paymentForm.get('bankAccount');

    let value = {
      promocode: this.promoCodeControl.value,
      paymentData: null,
      contract: this.contractListControl.value,
      selectedPaymentProfile: this.paymentControl.value,
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

  getDisplayValue(option: PackageFeatures): string {
    return option?.packageName ?? '';
  }

  private filterContracts(value: string): PackageFeatures[] {
    const filterValue = value.toLowerCase();

    return this.data.upgradePackages.filter((option) =>
      option.packageName.toLowerCase().includes(filterValue),
    );
  }
}

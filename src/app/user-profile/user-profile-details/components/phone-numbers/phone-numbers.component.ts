import { Component, Input, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { PhoneNumberControl } from '../../models/phone-numbers-control.model';
import { Observable, Subject } from 'rxjs';
import { UserPhone } from 'src/app/core/store/features/user-phones/user-phones.model';
import { OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { UserPhoneFacade } from 'src/app/core/store/features/user-phones/user-phones.facade';
import { validate as uuidValidate } from 'uuid';
import { VerifyPhoneDialogService } from 'src/app/shared/components/verify-phone/services/verify-phone-dialog.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';

@Component({
  selector: 'app-phone-numbers',
  templateUrl: './phone-numbers.component.html',
  styleUrls: ['./phone-numbers.component.scss']
})
export class PhoneNumbersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  @Output()
  isValid = new Subject<boolean>();
  @Input()
  onSave = new Observable<any>();
  phoneNumbers: { key: string, value: UserPhone }[] = [];
  phoneNumbersForm = new FormGroup({});
  hasPrimarySelected = true;
  hasNoPhoneNumberError = false;
  formValues = new Subject<UserPhone[]>();
  formChanged = (res) => null;

  constructor(private _fb: FormBuilder,
     private _userPhoneFacade: UserPhoneFacade,
     private _toastService: ToastService,
     private _confirmDialogService: ConfirmDialogService,
     private _verifyPhoneDialogService: VerifyPhoneDialogService) {}

  ngOnInit(): void {
    this._userPhoneFacade.allUserPhones$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.phoneNumbers = [];
      this.buildForm(res);
    });

    this.onSave.pipe(takeUntil(this.destroy$)).subscribe(() => this.save());
  }

  private buildForm(phoneNumbers: UserPhone[]) {
    const phoneNumberKeyValue = phoneNumbers.map((s) => ({ key: s.id.toString(), value: s }));
    const formObject = phoneNumberKeyValue.reduce((a, b) => {
      a[b.key] = [];
      return a;
    }, {});
    this.phoneNumbersForm = this._fb.group(formObject);
    this.phoneNumbers = phoneNumberKeyValue;

    const patchObject = phoneNumberKeyValue.reduce((a, b) => {
      const controlValue = b.value;
      a[b.key] = controlValue;
      return a;
    }, {});
    this.phoneNumbersForm.patchValue(patchObject);

    // Since the form is dynamically build on input variables (ngFor) we have to bind to the value changes after the form is build
    this.phoneNumbersForm.valueChanges.subscribe((res) => {
      this.formChanged(new PhoneNumberControl({ phoneNumbers: Object.values(res) }));

      const controlValues = Object.values(this.phoneNumbersForm.controls);
      this.setHasPrimary(controlValues);
      this.hasNoPhoneNumberError = !controlValues.length;
      this.isValid.next(!this.hasNoPhoneNumberError);
    });
  }

  onDeleteNumber({ key, value }: { key: string, value: UserPhone}) {
    this._confirmDialogService.showDialog({
      confirmBtn: 'Yes, delete',
      detail: 'Are you sure you want to delete this phone number?',
      header: 'Delete phone number'
    })
    .subscribe(res => {
      if (!res) { return; }

      if (this.phoneNumbers.length === 1) {
        this._toastService.addToast(ToastType.Error, `Cannot remove last phone number. You need at least 1 primary phone number.`);
        return;
      }

      if (uuidValidate(key)) {
        this.phoneNumbers = this.phoneNumbers.filter(s => s.key !== key);
      } else {
        if (value.isPrimary) {
          this._toastService.addToast(ToastType.Error,
            `Cannot remove primary phone number. Please select a new primary phone number first.`);
          return;
        } else {
          this._userPhoneFacade.deleteUserPhone(value.id);
        }
      }
      this.phoneNumbersForm.removeControl(key);
    });
  }

  onAddPhoneNumber() {
    this._verifyPhoneDialogService.showVerifyPhoneDialog();
  }

  getChildValidity(isValid: boolean) {
    this.isValid.next(isValid && this.hasPrimarySelected);
  }

  private setHasPrimary(controlValues: AbstractControl[]) {
    this.hasPrimarySelected = controlValues.some(r => r.value?.isPrimary) || !controlValues.length;
  }

  private save() {
    this.formValues.next(Object.values(this.phoneNumbersForm.value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

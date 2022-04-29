import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserEmailFacade } from 'src/app/core/store/features/user-email/user-email.facade';
import { UserEmail } from 'src/app/core/store/features/user-email/user-email.model';
import { v4 as uuidv4 } from 'uuid';
import { EmailAddressControl } from '../../models/email-address-control';
import { validate as uuidValidate } from 'uuid';
import { EmailFrameComponent } from './email-frame/email-frame.component';

import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';

@Component({
  selector: 'app-email-addresses',
  templateUrl: './email-addresses.component.html',
  styleUrls: ['./email-addresses.component.scss'],
})
export class EmailAddressesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  @Input()
  onSave = new Observable<any>();
  @Output()
  isValid = new Subject<boolean>();
  formValues = new Subject<UserEmail[]>();
  emailAddresses: { key: string; value: UserEmail }[] = [];
  emailAddressesForm = new FormGroup({});
  hasPrimarySelected = true;
  hasNoEmailError = false;
  formChanged = (res) => null;

  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _confirmDialogService: ConfirmDialogService,
    private _userEmailFacade: UserEmailFacade,
  ) {}

  ngOnInit(): void {
    this._userEmailFacade.allUserEmails$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.buildForm(res);
      });

    this.onSave.pipe(takeUntil(this.destroy$)).subscribe(() => this.save());
  }

  takeFormControlFromGroup(control: string): FormControl {
    if (this.emailAddressesForm.get(`${control}`)) {
      return this.emailAddressesForm.get(`${control}`) as FormControl;
    } else {
      return new FormControl();
    }
  }

  private buildForm(emailAddresses: UserEmail[]) {
    const emailAddressKeyValue = emailAddresses.map((s) => ({
      key: s.id.toString(),
      value: s,
    }));
    const formObject = emailAddressKeyValue.reduce((a, b) => {
      a[b.key] = [];
      return a;
    }, {});
    this.emailAddressesForm = this._fb.group(formObject);
    this.emailAddresses = emailAddressKeyValue;

    const patchObject = emailAddressKeyValue.reduce((a, b) => {
      const controlValue = b.value;
      a[b.key] = controlValue;
      return a;
    }, {});
    this.emailAddressesForm.patchValue(patchObject);

    // Since the form is dynamically build on input variables (ngFor) we have to bind to the value changes after the form is build
    this.emailAddressesForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.formChanged(
          new EmailAddressControl({ emailAddresses: Object.values(res) }),
        );

        const controlValues = Object.values(this.emailAddressesForm.controls);
        this.setHasPrimary(controlValues);
        this.hasNoEmailError = !controlValues.length;
        this.isValid.next(
          !this.hasNoEmailError &&
            Object.values(res).every((s: any) => !(s.valid === false)),
        );
      });
  }

  onDeleteEmailAddress({ key, value }: { key: string; value: UserEmail }) {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Yes, delete',
        detail: `Are you sure you want to delete this email address?`,
        header: `Delete email address`,
      })
      .subscribe((res) => {
        if (!res) {
          return;
        }

        if (this.emailAddresses.length === 1) {
          this._toastService.addToast(
            ToastType.Error,
            `Cannot remove last email. You need at least 1 primary email.`,
          );
          return;
        }

        if (uuidValidate(key)) {
          this.emailAddresses = this.emailAddresses.filter(
            (s) => s.key !== key,
          );
        } else {
          if (value.isPrimary) {
            this._toastService.addToast(
              ToastType.Error,
              `Cannot remove primary email. Please select a new primary email first.`,
            );
            return;
          } else {
            this._userEmailFacade.deleteUserEmail(value.id);
          }
        }

        this.emailAddressesForm.removeControl(key);
      });
  }

  onAddEmailAddress() {
    const controlId = uuidv4();
    const formControl = new FormControl();
    const isPrimary = !this.emailAddresses.length;
    const formControlValue = {
      isActive: true,
      isPrimary: isPrimary,
      valid: false,
    };
    formControl.patchValue(formControlValue);
    this.emailAddressesForm.addControl(controlId, formControl);
    this.emailAddresses.push({ key: controlId, value: {} as UserEmail });
  }

  private setHasPrimary(controlValues: AbstractControl[]) {
    this.hasPrimarySelected =
      controlValues.some((r) => r.value?.isPrimary) || !controlValues.length;
  }

  private save() {
    // const update = [];
    // const create = [];
    // Object.keys(this.emailAddressesForm.controls).forEach((a) => {
    //   const value = this.emailAddressesForm.controls[a]?.value;
    //   if(uuidValidate(a))
    //   {
    //     create.push(value)
    //   }
    //   else
    //   {
    //     const exisistingValue =  this.emailAddresses.find(s => s.key == a).value
    //     if(!isEqual(value,  this.emailAddresses.find(s => s.key == a).value))
    //       update.push(new UserEmail({ ...exisistingValue, ...value }));
    //   }
    // });

    this.formValues.next(Object.values(this.emailAddressesForm.value));
  }

  getChildValidity(isValid: boolean) {
    this.isValid.next(isValid && this.hasPrimarySelected);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

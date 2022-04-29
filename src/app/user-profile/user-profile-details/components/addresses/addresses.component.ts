import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserAddressFacade } from 'src/app/core/store/features/user-address/user-address.facade';
import { UserAddress } from 'src/app/core/store/features/user-address/user-address.model';
import { v4 as uuidv4 } from 'uuid';
import { AddressControl } from '../../models/address-control.model';
import { validate as uuidValidate } from 'uuid';
import { isEqual } from 'lodash';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})

export class AddressesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();
  @Input()
  onSave = new Observable<any>();
  @Output()
  isValid = new Subject<boolean>();
  formValues = new Subject<{ created: UserAddress[], updated: UserAddress[] }>();
  allUserAddresses: { key: string, value: UserAddress }[]  = [];
  addressesForm = new FormGroup({});
  hasPrimarySelected = true;
  formsChangeTrackers: Observable<any>;
  formChanged = (res) => null;

  constructor(
    private _fb: FormBuilder,
    private _userAddressFacade: UserAddressFacade,
    private _confirmDialogService: ConfirmDialogService) {}

  ngOnInit(): void {
    this._userAddressFacade.allUserAddresses$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (this.allUserAddresses.length > 0) {
        return;
      }
      this.buildForm(res);
    });

    this.onSave.pipe(takeUntil(this.destroy$)).subscribe(() => this.save());
  }

  private buildForm(addresses: UserAddress[]) {
    const addressKeyValue = addresses.map((s) => ({ key: s.id.toString(), value: s }));
    const formObject = addressKeyValue.reduce((a, b) => {
      a[b.key] = [];
      return a;
    }, {});
    this.addressesForm = this._fb.group(formObject);

    const patchObject = addressKeyValue.reduce((a, b) => {
      const controlValue = b.value;
      a[b.key] = controlValue;
      return a;
    }, {});
    this.addressesForm.patchValue(patchObject);

    // Since the form is dynamically build on input variables (ngFor) we have to bind to the value changes after the form is build
    this.addressesForm.valueChanges.pipe(
      takeUntil(this.destroy$)
      ).subscribe((res: { [key: string]: UserAddress }) => {
      this.formChanged(new AddressControl({ addresses:  Object.values(res) }));

      const controlValues = Object.values(this.addressesForm.controls);
      // this.setHasPrimary(controlValues);
      controlValues.length ? this.isValid.next(false) : this.isValid.next(true);
    });
    this.allUserAddresses = addressKeyValue;
  }

  onDeleteAddress({ key, value }: { key: string, value: UserAddress}) {
    this._confirmDialogService.showDialog({
      confirmBtn: 'Yes, delete',
      detail: `Are you sure you want to delete this address?`,
      header: `Delete address`
    }).subscribe(res => {
      if (!res) { return; }

      if (uuidValidate(key)) {
        this.allUserAddresses = this.allUserAddresses.filter(s => s.key !== key);
      } else {
        this._userAddressFacade.deleteUserAddress(value.id);
      }
      this.addressesForm.removeControl(key);
    });
  }

  onAddAddress() {
    const controlId = uuidv4();
    const formControl = new FormControl();
    const isPrimary = !this.allUserAddresses.length;
    const formControlValue = { isActive: true, isPrimary: isPrimary } as UserAddress;
    formControl.patchValue(formControlValue);
    this.addressesForm.addControl(controlId, formControl);
    this.allUserAddresses.push({ key: controlId, value: formControlValue });
  }

  getChildValidity(isValid: boolean) {
    this.isValid.next(isValid && this.hasPrimarySelected);
  }

  private save() {
    const update = [];
    const create = [];
    Object.keys(this.addressesForm.controls).forEach((a) => {
      const value = this.addressesForm.controls[a]?.value;
      if (uuidValidate(a)) {
        create.push(value);
      } else {
        const exisistingValue =  this.allUserAddresses.find(s => s.key === a).value;
        if (!isEqual(value,  this.allUserAddresses.find(s => s.key === a).value)) {
          update.push({ ...exisistingValue, ...value });
        }
      }
    });

    this.formValues.next({created: create, updated: update});
  }

  // private setHasPrimary(controlValues: AbstractControl[]) {
  //   this.hasPrimarySelected = controlValues.some(r => r.value?.isPrimary) || !controlValues.length;
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

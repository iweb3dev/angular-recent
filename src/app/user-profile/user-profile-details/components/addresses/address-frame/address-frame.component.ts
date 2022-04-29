import { Component, forwardRef, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserAddress } from 'src/app/core/store/features/user-address/user-address.model';
import { ADDRESS_TYPE_OPTIONS } from '../../../constants/user-profile-details.constants';

const fieldMappers = {
  'addressLine1': 'Address',
  'zip': 'Zip code'
};

@Component({
  selector: 'app-address-frame',
  templateUrl: './address-frame.component.html',
  styleUrls: ['./address-frame.component.scss'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddressFrameComponent),
            multi: true
    }
  ]
})
export class AddressFrameComponent implements OnInit, ControlValueAccessor {
  @Output()
  delete = new Subject<any>();
  @Output()
  isValid = new Subject<boolean>();
  addressForm = new FormGroup({});
  hasPatternError = false;
  hasRequiredError = false;
  requiredErrorFields = '';
  patternErrorFields = '';
  ADDRESS_TYPE_OPTIONS = ADDRESS_TYPE_OPTIONS;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.addressForm = this._fb.group({
      'addressLine1': ['', [Validators.required]],
      'isActive': [],
      // 'isPrimary': [],
      'zip': ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      'addressLocation': []
    });
  }

  private validate() {
    this.setPatternErrors();
    this.setRequieredErrors();
  }

  private setPatternErrors() {
    const controls = this.addressForm.controls;
    this.patternErrorFields = Object.keys(controls).reduce((a, b) => {
      if (controls[b]?.errors?.pattern) {
        a = `${a}, ${fieldMappers[b]}`;
      }
      return a;
    }, '').slice(2);
    this.hasPatternError = !!this.patternErrorFields.length;
  }

  private setRequieredErrors() {
    const controls = this.addressForm.controls;
    this.requiredErrorFields = Object.keys(controls).reduce((a, b) => {
      if (controls[b]?.errors?.required) {
        a = `${a}, ${fieldMappers[b]}`;
      }
      return a;
    }, '').slice(2);
    this.hasRequiredError = !!this.requiredErrorFields.length;
  }

  onDelete() {
    this.delete.next();
  }

  writeValue(obj: UserAddress): void {
    this.addressForm.patchValue({
      ...obj
    });
    this.validate();
  }
  registerOnChange(fn: any): void {
    this.addressForm.valueChanges.subscribe((val) => {
      fn(val);
      this.validate();
      this.isValid.next(!(this.hasRequiredError || this.hasPatternError));
    });
  }

  registerOnTouched(fn: any): void {
    // Implement when needed
  }
  setDisabledState?(isDisabled: boolean): void {
    // Implement when needed
  }
}

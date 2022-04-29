import { Component, forwardRef, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserPhoneFacade } from 'src/app/core/store/features/user-phones/user-phones.facade';
import { UserPhone } from 'src/app/core/store/features/user-phones/user-phones.model';
import { PHONE_TYPE_OPTIONS } from '../../../constants/user-profile-details.constants';

const fieldMappers = {
  'phoneNumber': 'Phone Number'
};

@Component({
  selector: 'app-phone-frame',
  templateUrl: './phone-frame.component.html',
  styleUrls: ['./phone-frame.component.scss'],
  providers:  [
    {       provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PhoneFrameComponent),
            multi: true
    }
  ]
})
export class PhoneFrameComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private destroy$ = new Subject();
  @Output()
  delete = new Subject<any>();
  @Output()
  isValid = new Subject<boolean>();
  phoneFrameForm = new FormGroup({});
  hasPatternError = false;
  hasRequiredError = false;
  requiredErrorFields = '';
  patternErrorFields = '';
  PHONE_TYPE_OPTIONS = PHONE_TYPE_OPTIONS;

  constructor(private _fb: FormBuilder, private _userPhoneFacade: UserPhoneFacade) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.phoneFrameForm = this._fb.group({
      'id': [],
      'phoneNumber': [{ disabled: true }, ''],
      'phoneNumberLocation': [],
      'isActive': [],
      'isPrimary': []
    });

    this.isPrimaryControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() =>
      this._userPhoneFacade.updateUserPhone({
      ...this.phoneFrameForm.value,
      isPrimary: this.isPrimaryControl.value
      }
    ));
  }

  private validate() {
    this.setRequieredErrors();
    this.setPatternErrors();
  }

  private setRequieredErrors() {
    const controls = this.phoneFrameForm.controls;
    this.requiredErrorFields = Object.keys(controls).reduce((a, b) => {
      if (controls[b]?.errors?.required) {
        a = `${a}, ${fieldMappers[b]}`;
      }
      return a;
    }, '').slice(2);
    this.hasRequiredError = !!this.requiredErrorFields.length;
  }

  private setPatternErrors() {
    const controls = this.phoneFrameForm.controls;
    this.patternErrorFields = Object.keys(controls).reduce((a, b) => {
      if (controls[b]?.errors?.pattern) {
        a = `${a}, ${fieldMappers[b]}`;
      }
      return a;
    }, '').slice(2);
    this.hasPatternError = !!this.patternErrorFields.length;
  }

  onDelete() {
    this.delete.next();
  }

  get isPrimaryControl() {
    return this.phoneFrameForm.get('isPrimary');
  }

  writeValue(obj: UserPhone): void {
    this.phoneFrameForm.patchValue({
      ...obj
    }, { emitEvent: false });
    this.validate();
  }
  registerOnChange(fn: any): void {
    this.phoneFrameForm.valueChanges
    .subscribe((val) => {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

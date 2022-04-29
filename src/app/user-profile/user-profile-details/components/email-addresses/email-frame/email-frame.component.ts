import { Component, forwardRef, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { UserEmailFacade } from 'src/app/core/store/features/user-email/user-email.facade';
import { UserEmail } from 'src/app/core/store/features/user-email/user-email.model';
import { EMAIL_TYPE_OPTIONS } from '../../../constants/user-profile-details.constants';

const fieldMappers = {
  'email': 'Email Address'
};

@Component({
  selector: 'app-email-frame',
  templateUrl: './email-frame.component.html',
  styleUrls: ['./email-frame.component.scss'],
  providers:  [
    {       provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EmailFrameComponent),
            multi: true
    }
  ]
})
export class EmailFrameComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private destroy$ = new Subject();
  @Output()
  delete = new Subject<any>();
  @Output()
  isValid = new Subject<boolean>();
  emailFrameForm = new FormGroup({});
  hasPatternError = false;
  hasRequiredError = false;
  requiredErrorFields = '';
  patternErrorFields = '';
  EMAIL_TYPE_OPTIONS = EMAIL_TYPE_OPTIONS;

  constructor(private _fb: FormBuilder, private _userEmailFacade: UserEmailFacade) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.emailFrameForm = this._fb.group({
      'id': [],
      'email': ['', [Validators.required, Validators.email]],
      'emailLocation': [],
      'isActive': [],
      'isPrimary': [],
      'valid': []
    });

    this.isPrimaryControl.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() =>
      this._userEmailFacade.updateUserEmail({
      ...this.emailFrameForm.value,
      isPrimary: this.isPrimaryControl.value
      }
    ));
  }

  private validate() {
    this.setRequieredErrors();
    this.setPatternErrors();
  }

  private setRequieredErrors() {
    const controls = this.emailFrameForm.controls;
    this.requiredErrorFields = Object.keys(controls).reduce((a, b) => {
      if (controls[b]?.errors?.required) {
        a = `${a}, ${fieldMappers[b]}`;
      }
      return a;
    }, '').slice(2);
    this.hasRequiredError = !!this.requiredErrorFields.length;
  }

  private setPatternErrors() {
    const controls = this.emailFrameForm.controls;
    this.patternErrorFields = Object.keys(controls).reduce((a, b) => {
      if (controls[b]?.errors?.email) {
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
    return this.emailFrameForm.get('isPrimary');
  }

  writeValue(obj: UserEmail): void {
    this.emailFrameForm.patchValue({
      ...obj
    }, { emitEvent: false });
    this.validate();
    this.emailFrameForm.patchValue({
      valid: !(this.hasRequiredError || this.hasPatternError)
    });
  }

  registerOnChange(fn: any): void {
    this.emailFrameForm.valueChanges.subscribe((val) => {
      fn(val);
      this.validate();
      val.valid = !(this.hasRequiredError || this.hasPatternError);
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

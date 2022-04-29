import { Component, forwardRef, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { LookupsFacade } from 'src/app/core/store/features/lookups/lookups.facade';
import { TimeZone } from 'src/app/core/store/features/lookups/lookups.models';
import { ProfileDetailControl } from '../../models/profile-detail-control.model';

const fieldMappers = {
  firstName: 'First Name',
  lastName: 'Last Name',
};

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileDetailsComponent),
      multi: true,
    },
  ],
})
export class ProfileDetailsComponent implements OnInit, ControlValueAccessor {
  @Output()
  isValid = new Subject<boolean>();
  profileDetailForm: FormGroup = new FormGroup({});
  organizationTypes$ = this._lookupsFacade.organizationTypes$;
  timeZones$ = this._lookupsFacade.timeZones$;
  hasRequiredError = false;
  requiredErrorFields = '';

  constructor(
    private _fb: FormBuilder,
    private _lookupsFacade: LookupsFacade,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.profileDetailForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: [],
      organization: [],
      organizationTypesValue: [],
      timeZone: [],
    });
  }

  private validate() {
    this.setRequieredErrors();
  }

  private setRequieredErrors() {
    const controls = this.profileDetailForm.controls;
    this.requiredErrorFields = Object.keys(controls)
      .reduce((a, b) => {
        if (controls[b]?.errors?.required) {
          a = `${a}, ${fieldMappers[b]}`;
        }
        return a;
      }, '')
      .slice(2);
    this.hasRequiredError = !!this.requiredErrorFields.length;
  }

  writeValue(obj: ProfileDetailControl): void {
    this.profileDetailForm.patchValue({ ...obj });
    this.validate();
  }
  registerOnChange(fn: any): void {
    this.profileDetailForm.valueChanges.subscribe((res) => {
      fn(res);
      this.validate();
      this.isValid.next(
        Object.values(this.profileDetailForm.controls).every((c) => !c.errors),
      );
    });
  }
  registerOnTouched(fn: any): void {
    // Implement when needed
  }
  setDisabledState?(isDisabled: boolean): void {
    // Implement when needed
  }

  getSelectedTimezoneDisplayName(timeZone1: TimeZone, timeZone2: TimeZone) {
    return timeZone1.id === timeZone2.id;
  }

  get firstNameControl() {
    return this.profileDetailForm.get('firstName');
  }
  get lastNameControl() {
    return this.profileDetailForm.get('lastName');
  }
}

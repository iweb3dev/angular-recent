import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { RegisterFormModel } from './register.models';

import { LookupsService } from '@api/lookups/lookups.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  organizationTypes$ = this._lookupsService.getAllOrganizationTypes();

  registerForm: FormGroup;

  @Output()
  register = new EventEmitter<RegisterFormModel>();

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _lookupsService: LookupsService
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      if (params['requestID']) {
        sessionStorage.setItem('requestID', params['requestID']);
      }
    });

    this.registerForm = this._formBuilder.group({
      password: [
        '',
        [Validators.required, Validators.pattern('^!*([0-9]!*){6,}$')],
      ],
      emailAddress: ['', [Validators.email, Validators.required]],
      firstName: ['', Validators.required],
      organizationTypesValue: [0],
      userPhoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^!*([0-9]!*){10,}$'),
          Validators.minLength(10),
        ],
      ],
      agreeCheck: [false],
    });
  }

  get shouldDisableSubmit(): boolean {
    return (
      this.registerForm.invalid || !this.registerForm.get('agreeCheck').value
    );
  }

  get hasError(): boolean {
    return this.registerForm.hasError('apiError');
  }

  get apiError(): boolean {
    return this.registerForm.getError('apiError');
  }

  get hasInvalidCredentialsError(): boolean {
    return this.registerForm.hasError('invalidCredentials');
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.register.emit(this.registerForm.value);
  }
}

import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserPhoneFacade } from 'src/app/core/store/features/user-phones/user-phones.facade';
import { UserPhoneVerification } from 'src/app/core/store/features/user-phones/user-phones.model';
import { VerificationType } from '../../models/verify-phone.models';

@Component({
  selector: 'app-choose-number',
  templateUrl: './choose-number.component.html',
  styleUrls: ['./choose-number.component.scss']
})
export class ChooseNumberComponent implements OnInit, OnDestroy {
  @Output()
  numberChosen = new Subject();
  @Output()
  close = new Subject();

  verificationType = VerificationType;
  phoneNumberForm = new FormGroup({});

  constructor(private _fb: FormBuilder,
    private _userPhoneFacade: UserPhoneFacade
    ) {}

  ngOnInit() {
    //
    this.phoneNumberForm = this._fb.group({
      'phoneNumber': ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]]
    });
  }

  onSetNumberAndVerificationType(type: VerificationType) {
    this.phoneNumberForm.markAsDirty();
    if (!this.phoneNumberForm.valid) {
      return;
    }

    this._userPhoneFacade.verifyPhone({
      phoneNumber: this.phoneNumberControl.value,
      verificationType: type
    } as UserPhoneVerification);

    this.numberChosen.next();
  }

  onCancel() {
    this.close.next();
  }

  get phoneNumberControl() {
    return this.phoneNumberForm.get('phoneNumber');
  }

  ngOnDestroy() {
    this.close.unsubscribe();
  }
}

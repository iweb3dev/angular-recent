import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserPhoneFacade } from 'src/app/core/store/features/user-phones/user-phones.facade';
import { UserPhoneVerificationWithPin } from 'src/app/core/store/features/user-phones/user-phones.model';

@Component({
  selector: 'app-verify-number',
  templateUrl: './verify-number.component.html',
  styleUrls: ['./verify-number.component.scss'],
})
export class VerifyNumberComponent implements OnInit, OnDestroy {
  @Output()
  close = new Subject();

  verification$ = this._userPhoneFacade.phoneVerification$;
  verificationCodeForm = new FormGroup({});
  isVerifing = false;
  constructor(
    private _fb: FormBuilder,
    private _userPhoneFacade: UserPhoneFacade,
  ) {}

  ngOnInit(): void {
    this.verificationCodeForm = this._fb.group({
      verificationCode: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}$')],
      ],
    });
  }

  onSendVerificationWithPin() {
    this.verificationCodeForm.markAsDirty();
    if (!this.verificationCodeForm.valid) {
      return;
    }

    this.isVerifing = true;

    this._userPhoneFacade.phoneVerification$
      .pipe(take(1))
      .subscribe(({ phoneNumber }) => {
        this.isVerifing = false;
        this._userPhoneFacade.verifyPhoneWithPin(
          {
            phoneNumber: phoneNumber,
            pin: this.verificationCodeControl.value,
            countryCode: 1,
          },
        );
      });
  }

  onCancel() {
    this.close.next();
  }

  ngOnDestroy() {
    this.close.unsubscribe();
  }

  get verificationCodeControl() {
    return this.verificationCodeForm.get('verificationCode');
  }
}

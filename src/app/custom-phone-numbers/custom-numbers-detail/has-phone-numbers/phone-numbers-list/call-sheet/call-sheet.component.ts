import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { PhoneNumbersService } from 'src/app/api/phone-numbers/phone-numbers.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-call-sheet',
  templateUrl: './call-sheet.component.html',
  styleUrls: ['./call-sheet.component.scss']
})
export class CallSheetComponent implements OnInit, OnDestroy {
  phoneNumbers$ = this._userFacade.phoneNumbers$;
  form: FormGroup;
  private subscription = new Subscription();
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
      phoneNumber: string,
      isEditMode: boolean,
      boughtPhoneNumberId?: number,
      phoneNumberToForwardTo?: string
    },
    private _bottomSheetRef: MatBottomSheetRef<CallSheetComponent>,
    private _userFacade: UserFacade,
    private _phoneNumbersService: PhoneNumbersService,
    private _loaderService: LoaderService
    ) {
      this.buildForm();
    }
  ngOnInit(): void {
    if (this.data.isEditMode) {
      this.form.patchValue({boughtPhoneNumberId: this.data.boughtPhoneNumberId});
      this.form.patchValue({forwardPhoneNumberTo: this.data.phoneNumberToForwardTo});
    } else {
      this.subscription.add(this._userFacade.boughtPhoneNumbers$.pipe(tap(allUserPhones => {
        const boughtPhoneNumberId = allUserPhones.find(p => (p.phoneNumber === this.data.phoneNumber))?.id;
        this.form.patchValue({boughtPhoneNumberId: boughtPhoneNumberId});
      })).subscribe());
    }
  }
  buildForm() {
    this.form = new FormGroup({
      forwardPhoneNumberTo: new FormControl('', [Validators.required]),
      boughtPhoneNumberId: new FormControl('', [Validators.required])
    });
  }
  close(): void {
    this._bottomSheetRef.dismiss();
  }
  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form?.value;
    let forwardPhoneNumberTo = value?.forwardPhoneNumberTo;
    const boughtPhoneNumberId = value?.boughtPhoneNumberId;
    if (forwardPhoneNumberTo === 'no') {
      forwardPhoneNumberTo = '';
    }
    this._loaderService.showLoader();
    this.subscription.add(this._phoneNumbersService
    .updateCallForwarding(boughtPhoneNumberId, forwardPhoneNumberTo)
    .subscribe(
    resp => {
      this._bottomSheetRef.dismiss({isSaved: true});
    },
    err => {
      this._bottomSheetRef.dismiss({isSaved: false});
      this._loaderService.removeLoader();
    },
    () => this._loaderService.removeLoader()
    ));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

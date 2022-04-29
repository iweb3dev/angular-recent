import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { AddressesComponent } from './components/addresses/addresses.component';
import { EmailAddressesComponent } from './components/email-addresses/email-addresses.component';
import { PhoneNumbersComponent } from './components/phone-numbers/phone-numbers.component';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(AddressesComponent, { static: false })
  addressComponent: AddressesComponent;
  @ViewChild(EmailAddressesComponent, { static: false })
  emailAddressComponent: EmailAddressesComponent;
  @ViewChild(PhoneNumbersComponent, { static: false })
  phoneNumberComponent: PhoneNumbersComponent;
  private formFields = ['profileDetail'];
  private destroy$ = new Subject<any>();
  user: MainUserInfoModel;
  save = new Subject<any>();
  userProfileForm = new FormGroup({});
  addressIsValid = true;
  emailIsValid = true;
  phoneIsValid = true;
  detailsIsValid = true;

  constructor(private _fb: FormBuilder, private _userFacade: UserFacade) {}

  ngOnInit(): void {
    this.buildForm();

    this._userFacade.currentUserInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user === null || !user || this.user) {
          this.user = user;
          return;
        }
        const patchObject = this.formFields.reduce((a, b) => {
          a[b] = {
            ...user,
            ...this.user,
          };
          return a;
        }, {});
        this.user = user;

        this.userProfileForm.patchValue(patchObject);
      });
  }

  private buildForm() {
    this.userProfileForm = this._fb.group(
      this.formFields.reduce((a, b) => {
        a[b] = [];
        return a;
      }, {})
    );
  }

  get formIsValid() {
    return (
      this.addressIsValid &&
      this.phoneIsValid &&
      this.emailIsValid &&
      this.detailsIsValid
    );
  }

  onSave() {
    combineLatest([
      this.addressComponent.formValues,
      this.emailAddressComponent.formValues,
      this.phoneNumberComponent.formValues,
    ])
      .pipe(take(1))
      .subscribe((values) => {
        const [addressValues, emailAddressValues, phoneNumbers] = values;

        const dto = Object.keys(this.userProfileForm.value).reduce((a, b) => {
          a = { ...a, ...this.userProfileForm.value[b] };
          return a;
        }, {});

        const combinedDto = {
          ...this.user,
          ...dto,
          addresses: [...addressValues.created, ...addressValues.updated],
          emailAddresses: emailAddressValues,
          phoneNumbers: phoneNumbers,
        };

        // if(isEqual(combinedDto, this.user)) return;

        this._userFacade.saveProfileSettings({
          ...combinedDto,
        } as MainUserInfoModel);
      });

    this.save.next();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

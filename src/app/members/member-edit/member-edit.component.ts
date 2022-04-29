import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { MemberProfileService } from '../services/member-profile.service';
import { FileReaderService } from '@core/services/file-reader/file-reader.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import {
  AddressLocations,
  PhoneNumberLocations,
  EmailAddressLocations,
} from 'src/app/api/shared/shared.enums';

import { Member, MemberStaticGroup } from 'src/app/api/members/members.models';
import { MemberEditResolvereModel } from '../models/member-edit-resolver.model';

import { USER_AVATAR_PLACEHOLDER } from '@shared/constants/global-user-avatar.const';
import {
  MemberContactsAvailabilityStyle
} from '@shared/components/member/enums/member-contacts-availability-style.enum';
import {
  MemberContactsAvailabilityStatus
} from '@shared/components/member/enums/member-contacts-availability-status.enum';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  private pictureFile: File;
  public pictureType: string;

  public member: Member;
  public memberForm: FormGroup;
  public memberPicture: string;

  public groupId: number;
  private memberId: number;

  public phoneTypes: Array<{ key: string; value: number }> = [];
  public emailTypes: Array<{ key: string; value: number }> = [];
  public addressTypes: Array<{ key: string; value: number }> = [];

  private redirectPath = '/groups';
  private readonly fileTypes = ['jpg', 'gif', 'png', 'jpeg'];

  public readonly defaultPicture = USER_AVATAR_PLACEHOLDER;
  public readonly memberContactsAvailabilityStatus = MemberContactsAvailabilityStatus;
  public readonly emailSubscribeLink = `${window.location.origin}${MemberContactsAvailabilityStatus.SubscribeEmail}`;

  constructor(
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _activatedRoute: ActivatedRoute,
    private _fileReaderService: FileReaderService,
    private _memberProfileService: MemberProfileService,
  ) {
    this.memberForm = this.createForm();
  }

  ngOnInit(): void {
    this._activatedRoute.data
      .pipe(
        take(1),
        catchError((response) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to fetch member details',
          );
          return throwError(response);
        }),
      )
      .subscribe((response: { data: MemberEditResolvereModel }) => {
        this.member = response.data.member;
        this.memberId = +response.data.memberId;
        this.groupId = +response.data.member.memberStaticGroups[0].groupID;
        this.patchMemberForm(this.member);
      });

    this.initImage();

    this.setMemberTypes();
  }

  initImage(): void {
    this._memberProfileService
      .fetchGroupMemberData(this.groupId, this.memberId)
      .subscribe((member) => this.setMemberImage(member));
  }

  onImageChange(event: Event) {
    this.pictureFile = (<HTMLInputElement>event?.target)?.files[0];
    this.pictureType = this.pictureFile?.type;

    const fileTypeIndex = this.fileTypes.findIndex((type) =>
      this.pictureType.toLowerCase()?.includes(type),
    );
    if (fileTypeIndex < 0) {
      this._toastService.addToast(
        ToastType.Error,
        'Please select a supported format (png, jpg, gif)',
      );
      return;
    }

    this._fileReaderService
      .readFile(this.pictureFile)
      .pipe(take(1))
      .subscribe((picture: string) => {
        this.memberPicture = picture;
        this._memberProfileService.saveMemberPicture(
          this.member,
          this.pictureFile,
        );
      });
  }

  private setMemberImage(member: Member): void {
    if (!member?.memberPicture?.imageContents) {
      return;
    }
    const type = member.memberPicture.fileName.split('.')[1];
    this.memberPicture = `data:image\\${type};base64,${member.memberPicture.imageContents}`;
  }

  private createForm(): FormGroup {
    return this._formBuilder.group({
      lastName: [''],
      firstName: [''],
      isActive: [false],
      addresses: this._formBuilder.array([]),
      phoneNumbers: this._formBuilder.array([]),
      emailAddresses: this._formBuilder.array([]),
    });
  }
  private patchMemberForm(member: Member): void {
    this.memberForm.patchValue(member);
    this.member?.phoneNumbers?.forEach((phone) =>
      this.addPhoneGroup(
        member.id,
        phone.id,
        phone.phoneNumberLocation,
        phone.phoneNumber,
        phone.isActive,
      ),
    );

    this.member?.addresses?.forEach((address) =>
      this.addAddressGroup(
        member.id,
        address.id,
        address.isActive,
        address.addressLine1,
        address.addressLocation,
        address.zip,
      ),
    );

    this.member?.emailAddresses?.forEach((email) =>
      this.addEmailGroup(
        member.id,
        email.id,
        email.isActive,
        email.emailLocation,
        email.email,
      ),
    );
  }

  private setMemberTypes(): void {
    Object.values(PhoneNumberLocations).forEach((key) =>
      typeof key === 'string'
        ? this.phoneTypes.push({ key, value: this.phoneTypes?.length })
        : '',
    );

    Object.values(EmailAddressLocations).forEach((key) =>
      typeof key === 'string'
        ? this.emailTypes.push({ key, value: this.emailTypes?.length })
        : '',
    );

    Object.values(AddressLocations).forEach((key) =>
      typeof key === 'string'
        ? this.addressTypes.push({ key, value: this.addressTypes?.length })
        : '',
    );
  }

  private removeFormArrayEntry(name: string, index: number) {
    (<FormArray>this.memberForm?.get(name))?.removeAt(index);
  }

  private isFormControlValid(
    formArray: string,
    index: number,
    formControl: string,
  ): boolean {
    return (
      this.memberForm.valid &&
      this.memberForm.get([formArray, index, formControl])?.value
    );
  }

  private isFormValid(): boolean {
    if (!this.memberForm.valid) {
      this._toastService.addToast(
        ToastType.Error,
        'Please fill all the required details',
      );
      return false;
    }
    return true;
  }

  private get getUpdatedMember(): Member {
    const memberForm = this.memberForm.value;
    return {
      ...this.member,
      ...memberForm,
    };
  }

  private setMemberStatus(isActive: boolean): void {
    this.member?.phoneNumbers?.forEach((phone, index) =>
      this.memberForm
        .get(['phoneNumbers', index, 'isActive'])
        ?.setValue(isActive),
    );

    this.member?.emailAddresses?.forEach((email, index) =>
      this.memberForm
        .get(['emailAddresses', index, 'isActive'])
        ?.setValue(isActive),
    );

    this.member?.addresses?.forEach((address, index) =>
      this.memberForm.get(['addresses', index, 'isActive'])?.setValue(isActive),
    );

    this._memberProfileService.updateMemberAllGroupsStatus(
      this.getUpdatedMember,
      () => true,
    );
  }

  public addPhoneGroup(
    memberId: number,
    id = 0,
    location = 0,
    number = '',
    active = true,
  ): void {
    (this.memberForm.get('phoneNumbers') as FormArray).push(
      this._formBuilder.group({
        id: [id],
        isActive: [active],
        memberId: [memberId],
        phoneNumberLocation: [location],
        phoneNumber: [
          number,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.minLength(10),
          ],
        ],
      }),
    );
  }

  public addEmailGroup(
    memberId: number,
    id = 0,
    active = true,
    location = 0,
    email = '',
  ): void {
    (this.memberForm.get('emailAddresses') as FormArray).push(
      this._formBuilder.group({
        id: [id],
        isActive: [active],
        memberId: [memberId],
        emailLocation: [location],
        email: [email, [Validators.required, Validators.email]],
      }),
    );
  }

  public addAddressGroup(
    memberId: number,
    id = 0,
    active = true,
    address = '',
    location = 0,
    zip = '',
  ): void {
    (this.memberForm.get('addresses') as FormArray).push(
      this._formBuilder.group({
        id: [id],
        isActive: [active],
        memberId: [memberId],
        addressLocation: [location],
        addressLine1: [address, Validators.required],
        zip: [
          zip,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5),
          ],
        ],
      }),
    );
  }

  public removeGroupFromView(groupId: number): void {
    const index = this.member.memberStaticGroups.findIndex(
      (group) => group.groupID === groupId,
    );

    if (index > -1) {
      this.member.memberStaticGroups.splice(index, 1);
    }
  }

  public phoneOnChange(index: number): void {
    if (!this.isFormControlValid('phoneNumbers', index, 'id')) {
      return;
    }
    this._memberProfileService.updateMemberPhoneNumber(
      this.memberId,
      this.memberForm.get(['phoneNumbers', index])?.value,
      true,
    );
  }

  public emailOnChange(index: number): void {
    if (!this.isFormControlValid('emailAddresses', index, 'id')) {
      return;
    }
    this._memberProfileService.updateMemberEmailAddress(
      this.memberId,
      this.memberForm.get(['emailAddresses', index])?.value,
      true,
    );
  }

  public addressOnChange(index: number): void {
    if (!this.isFormControlValid('addresses', index, 'id')) {
      return;
    }
    this._memberProfileService.updateMemberAddress(
      this.memberId,
      this.memberForm.get(['addresses', index])?.value,
      true,
    );
  }

  public memberActiveOnChange(): void {
    if (!this.isFormValid()) {
      return;
    }
    this.setMemberStatus(this.memberForm?.controls['isActive']?.value);
  }

  public memberGroupOnStatusChange(
    memberGroup: MemberStaticGroup,
    event: MatSlideToggleChange,
  ): void {
    this.member.memberStaticGroups.forEach(
      (group) =>
        (group.isActive =
          group.groupsStaticMemberID === memberGroup.groupsStaticMemberID
            ? event.checked
            : group.isActive),
    );
    this._memberProfileService.changeMemberGroupStatus(
      memberGroup,
      event.checked,
    );
  }

  public deletePhoneOnClick(index: number): void {
    this._memberProfileService.deletePhone(index, this.member, () =>
      this.removeFormArrayEntry('phoneNumbers', index),
    );
  }

  public deleteEmailOnClick(index: number): void {
    this._memberProfileService.deleteEmail(index, this.member, () =>
      this.removeFormArrayEntry('emailAddresses', index),
    );
  }

  public deleteAddressOnClick(index: number): void {
    this._memberProfileService.deleteAddress(index, this.member, () =>
      this.removeFormArrayEntry('addresses', index),
    );
  }

  public cancelOnClick = () => this._location.back();
  public saveOnClick(): void {
    if (!this.isFormValid()) {
      return;
    }
    this._memberProfileService.updateMemberWithFields(
      this.getUpdatedMember,
      this.redirectPath,
    );
  }

  public deleteOnClick(): void {
    this._memberProfileService.deleteMember(this.memberId, this.redirectPath);
  }

  public deleteMemberGroupOnClick(memberGroup: MemberStaticGroup): void {
    this._memberProfileService.deleteMemberGroup(
      memberGroup.groupID,
      [memberGroup.groupsStaticMemberID],
      () => this.removeGroupFromView(memberGroup.groupID),
    );
  }

  public blockedPhoneNumber = (phoneGroup: FormGroup) => {
    const memberPhone = this.member.phoneNumbers
      .find(phone => phone.phoneNumber === phoneGroup.value.phoneNumber);

    return memberPhone?.blackListedPhoneNumber
      ? MemberContactsAvailabilityStyle.BlackListedContact
      : MemberContactsAvailabilityStyle.Default;
  }

  public blockedEmailAddress = (emailGroup: FormGroup) => {
    const memberEmail = this.member.emailAddresses
      .find(emailAddress => emailAddress.email === emailGroup.value.email);

    return memberEmail?.emailAddressIsBlackListed
      ? MemberContactsAvailabilityStyle.BlackListedContact
      : MemberContactsAvailabilityStyle.Default;
  }
}

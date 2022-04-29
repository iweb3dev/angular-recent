import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { filter, take } from 'rxjs/operators';

import { GroupWithStats } from 'src/app/api/groups/groups.models';
import {
  SaveMemberPhoneNumber,
  SaveMemberEmailAddress,
} from 'src/app/api/members/members.models';

import { groupCreationFlow } from '../../enums/group-creation-flow.enum';

import { GroupService } from 'src/app/api/groups/groups.service';
import { GroupMemberService } from 'src/app/groups/services/group-member.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

@Component({
  selector: 'app-group-member-add-manually',
  templateUrl: './group-member-add-manually.component.html',
  styleUrls: ['./group-member-add-manually.component.scss'],
})
export class GroupMemberAddManuallyComponent implements OnInit {
  private groupId: number;
  public groupWithStats: GroupWithStats;

  public readonly defaultMembersLimit = 5;
  public readonly membersAddOption = [5, 10, 20, 30, 40, 50];

  public addMemberForm: FormGroup;

  constructor(
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _groupService: GroupService,
    private _activatedRoute: ActivatedRoute,
    private _groupMemberService: GroupMemberService
  ) {
    this.addMemberForm = this.createForm();
  }

  ngOnInit() {
    this.addMembersIntoArray(this.defaultMembersLimit);
    this._activatedRoute.params
      .pipe(
        filter((value) => !!value),
        take(1)
      )
      .subscribe((params) => {
        this.groupId = +params['id'];
        this.getGroup(this.groupId);
      });
  }

  public getGroup(id: number): void {
    this._groupService
      .getGroupWithStats(id)
      .pipe(take(1))
      .subscribe((response) => (this.groupWithStats = response));
  }

  public getMemberValues(index: number): Array<unknown> {
    return Object.values(
      (this.addMemberForm.get(['members']) as FormArray)?.value[index]
    );
  }

  private getMemberEmailObject(
    email: string
  ): Array<Partial<SaveMemberEmailAddress>> {
    if (!email) {
      return [];
    }
    return [
      {
        id: -1,
        emailAddress: email,
        emailAddressStatus: 1,
        userMemberID: 0,
      },
    ];
  }

  private getMemberPhoneObject(
    phoneNumber: string
  ): Array<Partial<SaveMemberPhoneNumber>> {
    if (!phoneNumber) {
      return [];
    }
    return [
      {
        id: -1,
        phoneNumber: phoneNumber,
        phoneNumberType: 4,
        userMemberID: 0,
      },
    ];
  }

  private getGroupMemberObject(index: number) {
    const formGroup = (<FormArray>this.addMemberForm.get(['members'])).controls[
      index
    ].value;

    return {
      id: formGroup.id,
      firstName: formGroup.firstName,
      lastName: formGroup.lastName,
      emailAddresses: this.getMemberEmailObject(formGroup.email),
      phoneNumbers: this.getMemberPhoneObject(formGroup.phoneNumber),
    };
  }

  private getMemberToBeAdded(length: number) {
    const members = [];
    for (let index = 0; index < length; index++) {
      if (this.getMemberValues(index).filter((value) => !!value).length) {
        members.push(this.getGroupMemberObject(index));
      }
    }
    return members;
  }

  private get addMembersLength(): number {
    return (<FormArray>this.addMemberForm.get(['members'])).length;
  }

  private createForm(): FormGroup {
    return this._formBuilder.group({
      members: this._formBuilder.array([]),
    });
  }

  public formHasValues(length: number): boolean {
    let isValid = false;
    for (let index = 0; index < length; index++) {
      const memberValues = this.getMemberValues(index);

      if (memberValues?.filter((value) => !!value).length) {
        return (isValid = true);
      }
    }
    return isValid;
  }

  private addMembersIntoArray(noOfMembers: number): void {
    for (let index = 0; index < noOfMembers; index++) {
      (this.addMemberForm.get('members') as FormArray).push(
        this._formBuilder.group({
          id: [0],
          lastName: [''],
          firstName: [''],
          email: ['', Validators.email],
          phoneNumber: ['', Validators.minLength(10)],
        })
      );
    }
  }

  private removeMembersFromArray(noOfMembers: number): void {
    const length = this.addMembersLength - 1;
    for (let index = length; index > length - noOfMembers; index--) {
      (<FormArray>this.addMemberForm.get(['members']))?.removeAt(index);
    }
  }

  public memberToBeAddedOnChange(selection: number): void {
    const noOfMembers = this.addMembersLength;
    const membersCount = selection - noOfMembers;
    if (membersCount > 0) {
      this.addMembersIntoArray(membersCount);
    } else if (membersCount < 0) {
      this.removeMembersFromArray(Math.abs(membersCount));
    }
  }

  public addAnotherMemberOnClick(): void {
    this.addMembersIntoArray(1);
  }

  private saveMembers(length: number): void {
    const members = this.getMemberToBeAdded(length);

    const flowStartedFrom =
      this._activatedRoute.snapshot.queryParamMap.get('from');
    const redirectTo = flowStartedFrom || groupCreationFlow.Groups;

    this._groupMemberService.saveMultipleMembers(
      this.groupId,
      members,
      redirectTo
    );
  }

  public saveMembersOnClick(): void {
    const length = this.addMembersLength;

    if (this.formHasValues(length) && this.addMemberForm.valid) {
      this.saveMembers(length);
    } else {
      this._toastService.addToast(
        ToastType.Error,
        'Please enter correct member data before saving'
      );
    }
  }

  public cancelOnClick(): void {
    this._location.back();
  }
}

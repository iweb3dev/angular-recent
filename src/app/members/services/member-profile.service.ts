import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { EMPTY, Observable, throwError } from 'rxjs';
import { take, filter, finalize, concatMap, catchError } from 'rxjs/operators';

import { FilesService } from '@api/files/files.service';
import { GroupService } from 'src/app/api/groups/groups.service';
import { MemberService } from 'src/app/api/members/members.service';
import { GroupSitesServices } from '@api/groupsites/groupsites.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import { Member, MemberStaticGroup } from 'src/app/api/members/members.models';
import {
  AddressDetail,
  PhoneNumberDetail,
  EmailAddressDetail,
} from 'src/app/api/shared/shared.models';

@Injectable({ providedIn: 'root' })
export class MemberProfileService {
  constructor(
    private _router: Router,
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _filesService: FilesService,
    private _loaderService: LoaderService,
    private _memberService: MemberService,
    private _groupSitesService: GroupSitesServices,
    private _confirmDialogService: ConfirmDialogService
  ) {}

  public displayLoader(showLoader = true): void {
    if (showLoader) {
      this._loaderService.showLoader();
    }
  }

  private removeLoader(hideLoader = true): void {
    if (hideLoader) {
      this.removeAttachedLoader();
    }
  }

  private removeAttachedLoader(): void {
    if (this._loaderService.hasLoaderAttached) {
      this._loaderService.removeLoader();
    }
  }

  private removeLoaderWithMessage(hideLoader = true): void {
    if (hideLoader) {
      this.removeAttachedLoader();
      this._toastService.addToast(ToastType.Success, 'Updated successfully');
    }
  }

  private updatePhone(memberId: number, phone: PhoneNumberDetail): void {
    phone.id
      ? this.updateMemberPhoneNumber(memberId, phone)
      : this.addMemberPhoneNumber(memberId, phone);
  }

  public saveMemberPicture(
    member: Member,
    memberPicture: File,
    redirectPath?: string
  ) {
    let [attachmentFileName, attachmentFilePath] = ['', ''];
    const memberId = member.id;
    this.displayLoader();
    this._filesService
      .uploadAttachments(memberPicture, memberId)
      .pipe(
        take(1),
        concatMap((attachmentResponse: any) => {
          attachmentFileName = attachmentResponse?.fileName;
          attachmentFilePath = attachmentResponse?.attachmentFilePath;
          return this._groupSitesService.getTemporaryGroupSiteImagePreview(
            memberId,
            attachmentResponse
          );
        }),
        catchError((response) => {
          this.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update image'
          );
          return throwError(response);
        })
      )
      .subscribe((response) => {
        this.removeLoader();

        member.memberPicture = response;
        member.memberPicture.fileName = attachmentFileName;
        member.memberPicture.attachmentFilePath = attachmentFilePath;
        return this.updateMember(member, redirectPath);
      });
  }

  private updateMember(
    member: Member,
    redirectPath?: string,
    updateCallback?: () => void
  ): void {
    this._loaderService.showDetachedLoader();
    this._memberService
      .updateMember(member.id, member)
      .pipe(
        take(1),
        catchError((response) => {
          this.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update member details'
          );
          return throwError(response);
        })
      )
      .subscribe((response) => {
        this.removeLoader();
        if (response.success) {
          this._toastService.addToast(
            ToastType.Success,
            'Member updated successfully'
          );
          if (updateCallback) {
            updateCallback();
          }
          if (redirectPath) {
            this._router.navigate([redirectPath]);
          }
        } else {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update member details'
          );
        }
      });
  }

  fetchGroupMemberData(groupId: number, memberId: number): Observable<Member> {
    return this._groupService.getGroupMember(groupId, memberId, true);
  }

  public updateMemberPhoneNumber(
    memberId: number,
    phone: PhoneNumberDetail,
    loader = false
  ): void {
    this.displayLoader(loader);
    this._memberService
      .updateMemberPhoneNumber(memberId, phone.id, phone)
      .pipe(
        take(1),
        catchError((response) => {
          this.removeLoader(loader);
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to add member phone number'
          );
          return throwError(response);
        })
      )
      .subscribe(() => this.removeLoaderWithMessage(loader));
  }

  private addMemberPhoneNumber(
    memberId: number,
    phone: PhoneNumberDetail,
    loader = false
  ): void {
    this.displayLoader(loader);
    this._memberService
      .saveMemberPhoneNumber(memberId, phone)
      .pipe(
        take(1),
        catchError((response) => {
          this.removeLoader(loader);
          this._toastService.addToast(
            ToastType.Error,
            response?.error?.length
              ? `Phone number, ${response.error}`
              : `An error occurred, unable to add member phone number`
          );
          return throwError(response);
        })
      )
      .subscribe(() => this.removeLoader());
  }

  private updateEmail(memberId: number, email: EmailAddressDetail): void {
    email.id
      ? this.updateMemberEmailAddress(memberId, email)
      : this.addMemberEmailAddress(memberId, email);
  }

  public updateMemberEmailAddress(
    memberId: number,
    email: EmailAddressDetail,
    loader = false
  ): void {
    this.displayLoader(loader);
    this._memberService
      .updateMemberEmailAddress(memberId, email.id, email)
      .pipe(
        take(1),
        catchError((response) => {
          this.removeLoader(loader);
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update member email address'
          );
          return throwError(response);
        })
      )
      .subscribe(() => this.removeLoaderWithMessage(loader));
  }

  private addMemberEmailAddress(
    memberId: number,
    email: EmailAddressDetail,
    loader = false
  ): void {
    this.displayLoader(loader);
    this._memberService
      .saveMemberEmailAddress(memberId, email)
      .pipe(
        take(1),
        catchError((response) => {
          this.removeLoader(loader);
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update member email address'
          );
          return throwError(response);
        })
      )
      .subscribe(() => this.removeLoader(loader));
  }

  private updateAddress(memberId: number, address: AddressDetail): void {
    address.id
      ? this.updateMemberAddress(memberId, address)
      : this.addMemberAddress(memberId, address);
  }

  public updateMemberAddress(
    memberId: number,
    address: AddressDetail,
    loader = false
  ): void {
    this.displayLoader(loader);
    this._memberService
      .saveMemberAddress(memberId, address.id, address)
      .pipe(
        take(1),
        catchError((response) => {
          this.removeLoader(loader);

          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update member address'
          );
          return throwError(response);
        })
      )
      .subscribe(() => this.removeLoaderWithMessage(loader));
  }

  private addMemberAddress(
    memberId: number,
    address: AddressDetail,
    loader = false
  ): void {
    this.displayLoader(loader);
    this._memberService
      .saveAddress(memberId, address)
      .pipe(
        take(1),
        catchError((response) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update member address'
          );
          return throwError(response);
        })
      )
      .subscribe(() => this.removeLoader(loader));
  }

  public deletePhone(
    index: number,
    member: Member,
    deleteCallback: () => any
  ): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'DELETE',
        header: 'Confirm Delete',
        detail: 'Are you sure you want to delete this phone number?',
      })
      .pipe(
        take(1),
        filter((value) => !!value),
        concatMap(() => {
          const phoneNumber = member.phoneNumbers[index];
          if (!phoneNumber) {
            deleteCallback();
            return EMPTY;
          }
          this._loaderService.showLoader();
          return this._memberService.deletePhoneNumber(
            member.id,
            phoneNumber.id
          );
        }),
        catchError((response) => {
          this.removeAttachedLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete phone number'
          );
          return throwError(response);
        })
      )
      .subscribe((response: any) => {
        deleteCallback();
        this.removeAttachedLoader();
        response?.success
          ? this._toastService.addToast(
              ToastType.Success,
              'Phone number deleted successfully'
            )
          : this._toastService.addToast(
              ToastType.Error,
              'An error occurred, unable to delete phone number'
            );
      });
  }

  public deleteEmail(
    index: number,
    member: Member,
    deleteCallback: () => any
  ): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'DELETE',
        header: 'Confirm Delete',
        detail: 'Are you sure you want to delete this email address?',
      })
      .pipe(
        take(1),
        filter((value) => !!value),
        concatMap(() => {
          const email = member.emailAddresses[index];
          if (!email) {
            deleteCallback();
            return EMPTY;
          }
          this._loaderService.showLoader();
          return this._memberService.deleteEmailAddress(member.id, email.id);
        }),
        catchError((response) => {
          this.removeAttachedLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete email address'
          );
          return throwError(response);
        })
      )
      .subscribe((response: any) => {
        deleteCallback();
        this.removeAttachedLoader();
        response?.success
          ? this._toastService.addToast(
              ToastType.Success,
              'Email address deleted successfully'
            )
          : this._toastService.addToast(
              ToastType.Error,
              'An error occurred, unable to delete email address'
            );
      });
  }

  public deleteAddress(
    index: number,
    member: Member,
    deleteCallback: () => any
  ): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'DELETE',
        header: 'Confirm Delete',
        detail: 'Are you sure you want to delete this address?',
      })
      .pipe(
        take(1),
        filter((value) => !!value),
        concatMap(() => {
          const email = member.addresses[index];
          if (!email) {
            deleteCallback();
            return EMPTY;
          }
          this._loaderService.showLoader();
          return this._memberService.deleteAddress(member.id, email.id);
        }),
        catchError((response) => {
          this.removeAttachedLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete address'
          );
          return throwError(response);
        })
      )
      .subscribe((response: any) => {
        deleteCallback();
        this.removeAttachedLoader();
        response?.success
          ? this._toastService.addToast(
              ToastType.Success,
              'Member address deleted successfully'
            )
          : this._toastService.addToast(
              ToastType.Error,
              'An error occurred, unable to delete member address'
            );
      });
  }

  private updateMemberContacts(member: Member): void {
    member?.phoneNumbers?.forEach((phone) =>
      this.updatePhone(member.id, phone)
    );
    member?.emailAddresses?.forEach((email) =>
      this.updateEmail(member.id, email)
    );
    member?.addresses.forEach((address) =>
      this.updateAddress(member.id, address)
    );
  }

  public updateMemberWithFields(member: Member, redirectPath?: string): void {
    this.updateMemberContacts(member);
    this.updateMember(member, redirectPath);
  }

  public updateMemberAllGroupsStatus(
    member: Member,
    statusUpdateCallback: () => void
  ): void {
    this.updateMemberContacts(member);
    member?.memberStaticGroups?.forEach((group) => {
      group.isActive = member.isActive;
      member.groupStaticMemberID = group.groupsStaticMemberID;
      this.updateMember(member, '', () => statusUpdateCallback());
    });
  }

  public deleteMember(
    memberId: number,
    redirectPath?: string,
    deleteCallback?: () => void
  ): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'DELETE',
        header: 'Confirm Delete',
        detail: 'Are you sure you want to delete this member from all groups?',
      })
      .pipe(
        take(1),
        filter((value) => !!value),
        concatMap(() => {
          this._loaderService.showLoader();
          return this._memberService.deleteMember(memberId);
        }),
        catchError((response) => {
          this.removeAttachedLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete member'
          );
          return throwError(response);
        })
      )
      .subscribe((response) => {
        this.removeAttachedLoader();
        if (response[0]?.success) {
          this._toastService.addToast(
            ToastType.Success,
            'Member deleted successfully'
          );
          if (deleteCallback) {
            deleteCallback();
          }
          if (redirectPath) {
            this._router.navigate([redirectPath]);
          }
        } else {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete member'
          );
        }
      });
  }

  public changeMemberGroupStatus(
    memberGroup: MemberStaticGroup,
    isActive: boolean
  ): void {
    this._loaderService.showLoader();
    this._groupService
      .activateOrDeactivateSpecificGroupMemberByGsmId(
        memberGroup.groupID,
        memberGroup.groupsStaticMemberID,
        isActive
      )
      .pipe(
        take(1),
        finalize(() => this.removeAttachedLoader()),
        catchError((response) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update member group status'
          );
          return throwError(response);
        })
      )
      .subscribe(() => {
        this._toastService.addToast(
          ToastType.Success,
          'Member group status updated successfully'
        );
      });
  }

  public deleteMemberGroup(
    groupId: number,
    membersToDelete: Array<number>,
    callback: () => void
  ): void {
    this._loaderService.showLoader();
    this._groupService
      .deleteSelectedGroupMembers(groupId, membersToDelete)
      .pipe(
        take(1),
        finalize(() => this.removeAttachedLoader()),
        catchError((response) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete member from group'
          );
          return throwError(response);
        })
      )
      .subscribe(() => {
        callback();
        this._toastService.addToast(
          ToastType.Success,
          'Member from group deleted successfully'
        );
      });
  }
}

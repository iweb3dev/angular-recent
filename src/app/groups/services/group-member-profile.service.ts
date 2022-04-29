import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { EMPTY, throwError } from 'rxjs';
import { take, concatMap, catchError, filter } from 'rxjs/operators';

import { GroupService } from '@api/groups/groups.service';
import { FilesService } from 'src/app/api/files/files.service';
import { MemberService } from 'src/app/api/members/members.service';
import { GroupSitesServices } from 'src/app/api/groupsites/groupsites.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import { Member } from 'src/app/api/members/members.models';
import {
  AddressDetail,
  PhoneNumberDetail,
  EmailAddressDetail,
} from 'src/app/api/shared/shared.models';

@Injectable({ providedIn: 'root' })
export class GroupMemberProfileService {
  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _filesService: FilesService,
    private _groupService: GroupService,
    private _loaderService: LoaderService,
    private _memberService: MemberService,
    private _groupSitesService: GroupSitesServices,
    private _confirmDialogService: ConfirmDialogService
  ) {}

  private displayLoader(showLoader = true): void {
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
    deleteCallback: () => void
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
    deleteCallback: () => void
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
    deleteCallback: () => void
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

  public uploadMemberImage(
    member: Member,
    memberPicture: File,
    userId: number,
    redirectPath?: string
  ): void {
    let [attachmentFileName, attachmentFilePath] = ['', ''];

    this._loaderService.showLoader();
    this._filesService
      .uploadAttachments(memberPicture, userId)
      .pipe(
        take(1),
        concatMap((attachmentResponse: any) => {
          attachmentFileName = attachmentResponse?.fileName;
          attachmentFilePath = attachmentResponse?.attachmentFilePath;
          return this._groupSitesService.getTemporaryGroupSiteImagePreview(
            member.id,
            attachmentResponse
          );
        }),
        catchError((response) => {
          this.removeAttachedLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update image'
          );
          return throwError(response);
        })
      )
      .subscribe((response) => {
        member.memberPicture = response;
        member.memberPicture.fileName = attachmentFileName;
        member.memberPicture.attachmentFilePath = attachmentFilePath;
        return this.updateMember(member, redirectPath, false);
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

  public updateMemberWithFields(
    member: Member,
    redirectPath?: string,
    loader = true
  ): void {
    this.updateMemberContacts(member);
    this.updateMember(member, redirectPath, loader);
  }

  public updateMember(
    member: Member,
    redirectPath?: string,
    showLoader = true,
    hideLoader = true,
    updateCallback?: () => void
  ): void {
    this.displayLoader(showLoader);
    this._memberService
      .updateMember(member.id, member)
      .pipe(
        take(1),
        catchError((response) => {
          this.removeLoader(hideLoader);
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update member details'
          );
          return throwError(response);
        })
      )
      .subscribe((response) => {
        this.removeLoader(hideLoader);
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

  public updateGroupMemberStatus(
    member: Member,
    groupId: number,
    statusUpdateCallback: () => void
  ): void {
    this.updateMemberContacts(member);
    member?.memberStaticGroups?.forEach((group) => {
      if (group.groupID === groupId) {
        group.isActive = member.isActive;
        member.groupStaticMemberID = group.groupsStaticMemberID;
        this.updateMember(member, '', true, true, () => statusUpdateCallback());
        return;
      }
    });
  }

  public updateAllGroupMembersStatus(member: Member): void {
    this.updateMemberContacts(member);
    member?.memberStaticGroups?.forEach((group) => {
      group.isActive = member.isActive;
      member.groupStaticMemberID = group.groupsStaticMemberID;
      this.updateMember(member);
    });
  }

  public deleteMemberFromGroup(
    groupId: number,
    membersToDelete: Array<number>,
    callback: () => void
  ): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'DELETE',
        header: 'Confirm Delete',
        detail: 'Are you sure you want to delete this member from this group?',
      })
      .pipe(
        take(1),
        filter((value) => !!value),
        concatMap(() => {
          this._loaderService.showLoader();
          return this._groupService.deleteSelectedGroupMembers(
            groupId,
            membersToDelete
          );
        }),
        catchError((error) => {
          this.removeAttachedLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete member from group'
          );
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.removeAttachedLoader();
        callback();

        this._toastService.addToast(
          ToastType.Success,
          'Member deleted from group successfully'
        );
      });
  }
}

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { concat, throwError } from 'rxjs';
import {
  take,
  filter,
  reduce,
  finalize,
  concatMap,
  catchError,
} from 'rxjs/operators';

import { GroupMemberImportFile } from '../models/group-member-import-file.model';
import { SendCommunication } from 'src/app/api/communications/communications.models';
import {
  ImportModel,
  ExtendedGroupDetails,
} from 'src/app/api/groups/groups.models';
import {
  GroupMembersDisplay,
  MemberInsertComplete,
} from 'src/app/api/members/members.models';

import { GroupRedirectPaths } from '../enums/group-redirect.enum';
import { groupCreationFlow } from '../enums/group-creation-flow.enum';
import { GroupMemberExportLimits } from '../enums/group-member-export.enum';

import { MemberSearchFilter } from 'src/app/shared/constants/member.constants';

import { PartialExtendedGroup } from '../types/partial-extended-group.type';

import { convertToCSV } from 'src/app/shared/utils/conversion/data-to-csv.helper';

import { FilesService } from 'src/app/api/files/files.service';
import { GroupService } from 'src/app/api/groups/groups.service';
import { MemberService } from 'src/app/api/members/members.service';
import { MessagesService } from 'src/app/api/messages/messages.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { CommunicationsService } from 'src/app/api/communications/communications.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

@Injectable({ providedIn: 'root' })
export class GroupMemberService {
  constructor(
    private _router: Router,
    private _groupService: GroupService,
    private _filesService: FilesService,
    private _toastService: ToastService,
    private _memberService: MemberService,
    private _loaderService: LoaderService,
    private _messagesService: MessagesService,
    private _confirmDialogService: ConfirmDialogService,
    private _communicationsService: CommunicationsService
  ) {}

  public addGroup(
    group: PartialExtendedGroup<ExtendedGroupDetails>,
    addedCallback: (id: number) => any
  ) {
    this._loaderService.showLoader();
    this._groupService
      .insertGroup(group)
      .pipe(
        take(1),
        catchError((error) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to add groups'
          );
          return throwError(error);
        })
      )
      .subscribe((groupId: number) => {
        this._loaderService.removeLoader();
        if (typeof groupId === 'number') {
          this._toastService.addToast(
            ToastType.Success,
            'Group created successfully'
          );
          addedCallback(groupId);
        } else {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to create group'
          );
        }
      });
  }

  public updateAllMembersStatus(
    groupId: number,
    status: boolean,
    redirectPath?: string
  ): void {
    const prompt = status ? 'Activate' : 'Deactive';
    this._confirmDialogService
      .showDialog({
        confirmBtn: `${prompt.toUpperCase()}`,
        header: `Confirm ${prompt}`,
        detail: `Are you sure you want to ${prompt.toLowerCase()} all group members?`,
      })
      .pipe(
        take(1),
        filter((value) => !!value),
        concatMap((_) => {
          this._loaderService.showLoader();
          return status
            ? this._groupService.activateAllGroupMembers(groupId)
            : this._groupService.deactivateAllGroupMembers(groupId);
        }),
        catchError((response) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update group members status'
          );
          return throwError(response);
        })
      )
      .subscribe((_) => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          `Group members ${prompt.toLowerCase()}ed successfully`
        );
        if (redirectPath) {
          this._router.navigate([redirectPath]);
        }
      });
  }

  public deleteAllGroupMembers(
    groupId: number,
    groupName: string,
    redirectPath?: string
  ): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'DELETE',
        header: 'Confirm Delete',
        detail: 'Are you sure you want to delete all group members?',
        secondaryDetail: `<b>Group:</b> ${groupName}`,
      })
      .pipe(
        take(1),
        filter((value) => !!value),
        concatMap(() => {
          this._loaderService.showLoader();
          return this._groupService.deleteAllGroupMembers(groupId);
        }),
        catchError((response) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete group all members'
          );
          return throwError(response);
        })
      )
      .subscribe(() => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          'Group members deleted successfully'
        );
        if (redirectPath) {
          this._router.navigate([redirectPath]);
        }
      });
  }

  public deleteGroup(
    groupId: number,
    groupName: string,
    redirectPath?: string
  ): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'DELETE',
        header: 'Confirm Delete',
        detail: 'Are you sure you want to delete selected group?',
        secondaryDetail: `<b>Group:</b> ${groupName}`,
      })
      .pipe(
        take(1),
        filter((value) => !!value),
        concatMap(() => {
          this._loaderService.showLoader();
          return this._groupService.deleteGroup(groupId);
        }),
        catchError((response) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete selected group'
          );
          return throwError(response);
        })
      )
      .subscribe((_) => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          'Group deleted successfully'
        );
        if (redirectPath) {
          this._router.navigate([redirectPath]);
        }
      });
  }

  public activateGroupMembersById(groupId: number, memberIds: Array<number>) {
    this._loaderService.showLoader();
    this._groupService
      .activateGroupMembersByMemberId(groupId, memberIds)
      .pipe(
        take(1),
        catchError((error) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to activate member(s)'
          );
          return throwError(error);
        })
      )
      .subscribe((_) => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          'Groups member(s) activated successfully'
        );
      });
  }

  public deactivateGroupMembersById(groupId: number, memberIds: Array<number>) {
    this._loaderService.showLoader();

    this._groupService
      .deactivateGroupMembersByMemberId(groupId, memberIds)
      .pipe(
        take(1),
        catchError((error) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to deactivate member(s)'
          );
          return throwError(error);
        })
      )
      .subscribe((_) => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          'Group member(s) deactivated successfully'
        );
      });
  }

  public saveMultipleMembers(
    groupId: number,
    members: Array<MemberInsertComplete>,
    redirectTo?: string
  ): void {
    const membersObservables$ = [];
    for (let index = 0; index < members.length; index++) {
      membersObservables$.push(
        this._memberService.insertMember(groupId, members[index])
      );
    }

    this._loaderService.showLoader();
    concat(...membersObservables$)
      .pipe(
        take(members.length),
        reduce((all, res) => all.concat(res), []),
        catchError((error) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to save member(s)'
          );
          return throwError(error);
        })
      )
      .subscribe((_) => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          'Group member(s) submitted successfully'
        );

        this.redirectOnSuccess(redirectTo, groupId);
      });
  }

  public addExistingMembersToGroup(
    groupId: number,
    members: Array<number>,
    redirectPath?: string
  ): void {
    this._loaderService.showLoader();
    this._memberService
      .addExistingMembersToGroup(groupId, members)
      .pipe(
        take(1),
        catchError((error) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to add existing member(s)'
          );
          return throwError(error);
        })
      )
      .subscribe((_) => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          'Members added successfully'
        );
        if (redirectPath) {
          this._router.navigate([redirectPath]);
        }
      });
  }

  public importGroupMembers(
    groupId: number,
    importRequest: Partial<ImportModel>,
    membersPreviewFile: File,
    redirectPath?: string
  ): void {
    this._loaderService.showLoader();
    this._filesService
      .uploadGroupMembersFile(membersPreviewFile)
      .pipe(
        take(1),
        concatMap((response: GroupMemberImportFile) => {
          importRequest.fileName = response.encryptedFileName;
          return this._groupService.importGroupMembersFromFile(
            groupId,
            importRequest
          );
        }),
        catchError((error) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to create new import'
          );
          return throwError(error);
        })
      )
      .subscribe((_) => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          'New import created successfully'
        );
        if (redirectPath) {
          this._router.navigate([redirectPath]);
        }
      });
  }

  public exportGroupMembers(
    groupId: number,
    groupName: string,
    pageSize = GroupMemberExportLimits.PageSize,
    pageIndex = GroupMemberExportLimits.PageIndex
  ): void {
    this._loaderService.showLoader();

    this._groupService
      .getGroupMembersForExport(groupId, pageSize, pageIndex)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to export member(s)'
          );
          return throwError(error);
        }),
        finalize(() => this._loaderService.removeLoader())
      )
      .subscribe((response) => {
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += response.join('\n');
        convertToCSV(csvContent, groupName);
      });
  }

  public getGroupMembersAvailability(
    hasMemberCallback: (members: boolean) => any,
    showLoader = true,
    searchFilter = MemberSearchFilter
  ) {
    if (showLoader) {
      this._loaderService.showLoader();
    }
    this._memberService
      .searchMyContacts(searchFilter)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to fetch members'
          );
          return throwError(error);
        }),
        finalize(() => {
          if (showLoader) {
            this._loaderService.removeLoader();
          }
        })
      )
      .subscribe((response: GroupMembersDisplay) =>
        hasMemberCallback(response.totalRecords > 0)
      );
  }

  public exportSMSNotOptedIn(
    groupId: number,
    groupName: string,
    pageSize = GroupMemberExportLimits.PageSize,
    pageIndex = GroupMemberExportLimits.PageIndex
  ): void {
    this._loaderService.showLoader();
    const fileName = `${groupName}_Members_Not_Opted_In_For_SMS_Text`;

    this._groupService
      .getNotOptedInMemberDetails(groupId, pageSize, pageIndex)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to export members not opted for SMS'
          );
          return throwError(error);
        }),
        finalize(() => this._loaderService.removeLoader())
      )
      .subscribe((response) => {
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += response.join('\n');
        convertToCSV(csvContent, fileName);
      });
  }

  private createCommunicationPayload(
    groupIds: Array<number>,
    notificationId: number
  ): SendCommunication {
    return {
      cid: '',
      lat: '',
      latMax: 0,
      sentVia: 1,
      svm: false,
      ehm: false,
      sendNow: true,
      groupIDs: groupIds,
      reducedTrailer: false,
      acceptResponses: false,
      alternateFormatSend: false,
      notificationFormatValue: 4,
      isSendEmailSmsOptIn: false,
      includeGroupSiteLink: false,
      sendInMembersTimeZone: true,
      notificationID: notificationId,
      sendInMembersPreferredTime: true,

      // FIXME: Dates as empty string in CTEST api payload
      endDateTime: null,
      startDateTime: null,

      // FIXME: Fields missing in CTEST
      textNumber: '',
      noTrailer: false,
      controlTime: null,
      isEmergency: false,
      notificationName: '',
      isInitialOptIn: false,
      phoneMessageLength: '',
      setMessageEndTime: false,
      isPriorityCallout: false,
      communicationEndDateTime: null,
      textAlternateFormatSend: false,
      emailAlternateFormatSend: false,
      twentyFourSevenMessaging: false,
      communicationStartDateTime: null,
    };
  }

  public sendSMSOptInEmail(groupId: number): void {
    this._loaderService.showLoader();

    this._messagesService
      .sendSmsOptInRequestToGroupViaEmail(groupId)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to send email to members for SMS opt-in'
          );
          return throwError(error);
        }),
        concatMap((notificationId) =>
          this._communicationsService.createCommunicationQueue(
            this.createCommunicationPayload([groupId], notificationId)
          )
        ),
        finalize(() => this._loaderService.removeLoader())
      )
      .subscribe((_) =>
        this._toastService.addToast(
          ToastType.Success,
          'SMS opt-in email has been processed'
        )
      );
  }

  public sendSMSOptInText(groupId: number): void {
    this._loaderService.showLoader();

    this._messagesService
      .sendSmsOptInRequestToGroupViaText(groupId)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to send text to members for SMS opt-in'
          );
          return throwError(error);
        }),
        concatMap((notificationId) =>
          this._communicationsService.createCommunicationQueue(
            this.createCommunicationPayload([groupId], notificationId)
          )
        ),
        finalize(() => this._loaderService.removeLoader())
      )
      .subscribe((_) =>
        this._toastService.addToast(
          ToastType.Success,
          'SMS opt-in text has been processed'
        )
      );
  }

  public exportBadNumbers(groupId: number, groupName: string): void {
    this._loaderService.showLoader();
    const fileName = `${groupName}_Bad_Numbers`;

    this._groupService
      .getBadPhoneNumberDetailsForExport(groupId)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to export bad numbers'
          );
          return throwError(error);
        }),
        finalize(() => this._loaderService.removeLoader())
      )
      .subscribe((response) => {
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += response.join('\n');
        convertToCSV(csvContent, fileName);
      });
  }

  public removeBadNumbersFromGroup(groupId: number): void {
    this._loaderService.showLoader();

    this._groupService
      .removeBadNumbersFromSpecificGroup(groupId)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to remove bad numbers'
          );
          return throwError(error);
        }),
        finalize(() => this._loaderService.removeLoader())
      )
      .subscribe((_) =>
        this._toastService.addToast(
          ToastType.Success,
          'Bad numbers removed successfully'
        )
      );
  }

    private redirectOnSuccess(redirectTo: string, groupId = 0): void {
      switch (redirectTo) {
        case groupCreationFlow.Groups:
          this._router.navigate([GroupRedirectPaths.Groups]);
          break;
        case groupCreationFlow.NewCommunication:
          this._router.navigate([GroupRedirectPaths.NewCommunication], {
            queryParams: {
              groupId: groupId,
            },
          });
          break;
        default:
          break;
      }
    }
}

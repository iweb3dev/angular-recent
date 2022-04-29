import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GroupStats } from 'src/app/api/groups/groups.models';

import { GroupService } from 'src/app/api/groups/groups.service';
import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';
import { MessagesService } from 'src/app/api/messages/messages.service';
import { UpgradePackageDtoModel } from 'src/app/api/packages/packages.models';
import { PackageService } from 'src/app/api/packages/packages.service';
import { SubscriptionChangeTypes } from 'src/app/api/shared/shared.enums';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { hasValidEndpoints } from 'src/app/shared/utils/message/group-validator.helper';
import { UsePreviousDialogComponent } from '../use-previous-message/dialog/use-previous-dialog.component';
import { UsePreviousSheetComponent } from '../use-previous-message/sheet/use-previous-sheet.component';
import { MessageNameModel, ValidEndpoints } from './message-name.models';

@Injectable()
export class MessageNameService {
  constructor(
    private _toastService: ToastService,
    private _bottomSheet: MatBottomSheet,
    private _groupsService: GroupService,
    private _loaderService: LoaderService,
    private _messagesService: MessagesService,
    private _packageService: PackageService,
    private _matDialog: MatDialog,
    private _groupService: GroupService,
  ) {}

  fetchMessageRecipients(): Observable<{ value: string; id: number }[]> {
    return this._groupsService.fetchGroups().pipe(
      map((response) =>
        response.pagedObjects.map((object) => ({
          value: `${object.groupName} (${object.memberCount})`,
          id: object.id,
        })),
      ),
    );
  }

  verifyMessageName(message: string): Observable<boolean> {
    return this._messagesService.doesMessageExist(message);
  }

  verifyMessageAndGroups(
    messageData: MessageNameModel,
  ): Observable<boolean | ValidEndpoints> {
    this._loaderService.showLoader();

    return this.fetchGroupStats(
      messageData.messageRecipients.map((recipient) => recipient.id),
    ).pipe(
      tap(() => this._loaderService.removeLoader()),
      map((groupStats) =>
        hasValidEndpoints(messageData.notificationFormatValue, groupStats),
      ),
      switchMap((canSend) => {

        return of(ValidEndpoints.ValidEndpoints);
      }),
      catchError((error) => {
        console.error(error);
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Error,
          'Something went wrong verifying groups.',
        );
        return EMPTY;
      }),
    );
  }

  openPrevious({ isMobileView }: { isMobileView: boolean }): Observable<any> {
    this._loaderService.showLoader();
    return this.fetchMessages().pipe(
      tap(() => this._loaderService.removeLoader()),
      switchMap((messages) => {
        if (isMobileView) {
          return this._bottomSheet
            .open(UsePreviousSheetComponent, {
              backdropClass: 'bottom-sheet-backdrop',
              panelClass: 'bottom-sheet-container',
              data: messages,
            })
            .afterDismissed();
        }

        return this._matDialog
          .open(UsePreviousDialogComponent, {
            data: messages,
            width: '600px',
            height: '720px',
          })
          .afterClosed();
      }),
    );
  }

  unsuspendRequest(
    currentPackageId: number,
  ): Observable<UpgradePackageDtoModel> {
    return this._packageService.updatePackage({
      currentPackageId,
      subscriptionChangeType: SubscriptionChangeTypes.unsuspend,
    });
  }

  private fetchGroupStats(groupIds: number[]): Observable<GroupStats[]> {
    const groupsRequests = groupIds.map((id) =>
      this._groupService.getGroupWithStats(id),
    );

    return forkJoin(groupsRequests).pipe(
      map((groups) => groups.map((group) => group.groupStats)),
    );
  }

  private fetchMessages(): Observable<MessagePagedObjectsDto[]> {
    return this._messagesService
      .fetchMessages()
      .pipe(map((message) => message.pagedObjects));
  }
}

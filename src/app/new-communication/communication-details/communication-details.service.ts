import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LoaderService } from '@shared/components/loader/loader.service';
import { UsePreviousSheetComponent } from '@components/use-previous-message/sheet/use-previous-sheet.component';
import { UsePreviousDialogComponent } from '@components/use-previous-message/dialog/use-previous-dialog.component';
import { MessagePagedObjectsDto } from '@api/messages/messages.models';
import { MessagesService } from '@api/messages/messages.service';
import { UpgradePackageDtoModel } from '@api/packages/packages.models';
import { PackageService } from '@api/packages/packages.service';
import { SubscriptionChangeTypes } from '@api/shared/shared.enums';

@Injectable()
export class CommunicationDetailsService {
  constructor(
    private _messagesService: MessagesService,
    private _bottomSheet: MatBottomSheet,
    private _loaderService: LoaderService,
    private _matDialog: MatDialog,
    private _packageService: PackageService,
  ) {}

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

  private fetchMessages(): Observable<MessagePagedObjectsDto[]> {
    return this._messagesService
      .fetchMessages()
      .pipe(map((message) => message.pagedObjects));
  }
}

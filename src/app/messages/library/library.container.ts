import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '@api/packages/packages.service';
import { NewMessageFacade } from '@core/store/features/new-message/new-message.facade';
import { MainUserInfoModel } from '@core/store/features/user/user.model';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/services/confirm-dialog.service';
import { LoaderService } from '@shared/components/loader/loader.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { CommunicationDetailsService } from 'src/app/new-communication/communication-details/communication-details.service';
import { MemberLimitReachedComponent } from 'src/app/new-communication/communication-details/message-confirm/member-limit-reached/member-limit-reached.component';
import { MonthlyLimitWarningComponent } from 'src/app/new-communication/communication-details/message-confirm/monthly-limit-warning/monthly-limit-warning.component';
import { NoCreditDialogComponent } from 'src/app/new-communication/communication-details/message-confirm/no-credit-dialog/no-credit-dialog.component';

import { MessageLibraryFacade } from '../state/message-library/message-library.facade';
import {
  DateFilterEnum,
  MessageTypeFilterModel,
} from './message-filters/message-filters.models';

@Component({
  selector: 'app-library-container',
  templateUrl: './library.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryContainerComponent implements OnInit, OnDestroy {
  messages$ = this._messageLibraryFacade.messages$;
  userInfo$ = this._userFacade.currentUserInfo$;
  filters$ = this._messageLibraryFacade.filters$;
  showDeleteSelection$ = this._messageLibraryFacade.showDeleteSelection$;
  numberOfMessages$ = this._messageLibraryFacade.numberOfMessages$;
  messagesLoaded$ = this._messageLibraryFacade.messagesLoaded$;
  userTimeZone$ = this._userFacade.currentUserInfo$.pipe(
    map((info) => info.timeZone),
  );
  // MONTH CALL LIMIT WARNING AT 75% OF LIMIT
  seventyFivePercentCallLimitWarning$ = this.userInfo$.pipe(map((userInfo) => (
    userInfo.package.packageTypeId >= 3
    && (userInfo.userCredits <= (userInfo.package.monthlyCredits * 0.25))
    && userInfo.userCredits !== 0)
    && userInfo.userMemberPhoneCount <= userInfo.userCredits
  ));

  private subscription = new Subscription();
  private _userInfo: MainUserInfoModel;

  constructor(
    private _messageLibraryFacade: MessageLibraryFacade,
    private _loaderFacade: LoaderFacade,
    private _userFacade: UserFacade,
    private _packageService: PackageService,
    private _loaderService: LoaderService,
    private _matDialog: MatDialog,
    private _confirmDialogService: ConfirmDialogService,
    private _newMessageFacade: NewMessageFacade,
    private _router: Router,
    private _communicationDetailsService: CommunicationDetailsService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this._userFacade.currentUserInfo$.subscribe((userInfo: MainUserInfoModel) => {
        this._userInfo = userInfo;
        if (userInfo?.userSubscription.isSuspended && !userInfo?.userSubscription.isSuspendedOnNextChargeDate) {
          this.showReactivationPlanUpgradeDialog();
          return;
        } else if (!userInfo.userSubscription.isSuspended && userInfo.userSubscription.isSuspendedOnNextChargeDate) {
          this.showReactivationDilog();
          return;
        }

        if (this.isSeventyFivePercentReached) {
          this.checkMessageLimit();
          return;
        }
      }),
    );
  }

  onDateFilterChange(filter: DateFilterEnum): void {
    this._messageLibraryFacade.filterByDate(filter);
  }

  onMessageTypeChange(formats: MessageTypeFilterModel): void {
    this._messageLibraryFacade.setNotificationFormatsFilter(formats);
  }

  onDeleteAllMessages(): void {
    this._loaderFacade.showLoader();
    this._messageLibraryFacade.deleteAllMessages();
  }

  onShowDeleteSelection(): void {
    this._messageLibraryFacade.showDeleteSelection();
  }

  onMessageDeleteSelectionHide(): void {
    this._messageLibraryFacade.hideDeleteSelection();
  }

  onMessageDelete(deleteData: {
    messageId: number;
    shouldDelete: boolean;
  }): void {
    this._messageLibraryFacade.setMessageForDelete(deleteData);
  }

  onSelectAllMessagesForDelete(shouldSelect: { shouldSelect: boolean }): void {
    this._messageLibraryFacade.selectAllMessagesForDelete(shouldSelect);
  }

  onSelectedMessagesDelete(): void {
    this._loaderFacade.showLoader();
    this._messageLibraryFacade.deleteSelectedMessages();
  }

  onMessagesSearch(searchValue: string): void {
    this._messageLibraryFacade.searchMessages(searchValue);
  }

  onSingleMessageDelete(id: number): void {
    this._loaderFacade.showLoader();
    this._messageLibraryFacade.singleMessageDelete(id);
  }

  onMessageSend(messageId: number): void {
    if (this._userInfo.userMemberPhoneCount >= this._userInfo.package.memberCount) {
      this.memberLimitReached();
      return;
    }

    if (this._userInfo.userCredits <= 0) {
      this.userHasNoCredit();
      return;
    }

    this._loaderService.showLoader();
    this._newMessageFacade.setPreviousMessage(messageId);
    this._router.navigate(['new-communication', 'details']);
  }

  ngOnDestroy(): void {
    this._matDialog.closeAll();
    this.subscription.unsubscribe();
  }

  private memberLimitReached() {
    this.subscription.add(
      this._packageService.getAllPackageFeatures()
        .subscribe((packages) => {
          const userMemberCount = this._userInfo.package.memberCount;

          const newPackageId = packages
            .filter(
              (pack) =>
                pack.packageTypeId === this._userInfo.package.packageTypeId,
            )
            .sort((a, b) => a.memberCount - b.memberCount)
            .find((pack) => pack.memberCount > userMemberCount)?.id;
          this._matDialog
            .open(MemberLimitReachedComponent, {
              width: '535px',
              autoFocus: false,
              disableClose: true,
              data: newPackageId,
            })
            .afterClosed()
            .subscribe();
        }),
    );
  }

  private checkMessageLimit() {
    this.subscription.add(
      this.seventyFivePercentCallLimitWarning$.subscribe(res => {
        if (res) {
          this._matDialog
            .open(MonthlyLimitWarningComponent, {
              width: '535px',
              autoFocus: false,
            })
            .afterClosed()
            .subscribe();
        }
      }),
    );
  }

  private userHasNoCredit() {
    this.subscription.add(
      this._packageService.getAllPackageFeatures()
        .subscribe((packages) => {
          const userMemberCount = this._userInfo.package.memberCount;

          const newPackageId = packages
            .filter(
              (pack) =>
                pack.packageTypeId === this._userInfo.package.packageTypeId,
            )
            .sort((a, b) => a.memberCount - b.memberCount)
            .find((pack) => pack.memberCount > userMemberCount)?.id;
          this._matDialog
            .open(NoCreditDialogComponent, {
              width: '535px',
              autoFocus: false,
              disableClose: true,
              data: newPackageId,
            })
            .afterClosed()
            .subscribe();
        }),
    );
  }

  private showReactivationPlanUpgradeDialog() {
    this.subscription.add(
      this._confirmDialogService
        .showDialog({
          confirmBtn: 'ACTIVATE',
          header: 'Welcome Back!',
          detail: 'Please confirm to re-activate your account.',
        }).subscribe(res => {
          this._loaderService.showLoader();
          if (res) {
            const packageTypeId = this._userInfo.package.id;
            this._router.navigate(['/billing', 'plan-upgrade', packageTypeId]);
          } else {
            this._router.navigate(['/billing', 'plan-details']);
          }
          this._loaderService.removeLoader();
        }),
    );
  }

  private showReactivationDilog() {
    this.subscription.add(
      this._confirmDialogService
        .showDialog({
          confirmBtn: 'ACTIVATE',
          header: 'Welcome Back!',
          detail: 'Please confirm to re-activate your account.',
        }).subscribe(res => {
          this._loaderService.showLoader();
          if (res) {
            const packageId = this._userInfo.package.id;
            this.unsuspendRequest(packageId);
          } else {
            this._router.navigate(['/billing', 'plan-details']);
          }
          this._loaderService.removeLoader();
        })
    );
  }

  private unsuspendRequest(packageId) {
    this.subscription.add(
      this._communicationDetailsService.unsuspendRequest(packageId)
        .subscribe(() => {
          this.getAllPackageFeatures();
          this._userFacade.fetchUser();
        }),
    );
  }

  private getAllPackageFeatures() {
    this.subscription.add(
      this._packageService.getAllPackageFeatures()
        .subscribe(() => {
          this._loaderService.removeLoader();
        }),
    );
  }

  private get isSeventyFivePercentReached() {
    return ((this._userInfo.package.packageTypeId >= 3
      && (this._userInfo.userCredits <= (this._userInfo.package.monthlyCredits * 0.25))
      && this._userInfo.userCredits !== 0)
      && this._userInfo.userMemberPhoneCount <= this._userInfo.userCredits);
  }
}

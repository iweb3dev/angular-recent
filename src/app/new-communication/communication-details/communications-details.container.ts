import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '@api/packages/packages.service';
import { MessageNameModel } from '@components/message-name/message-name.models';
import { MessageNameService } from '@components/message-name/message-name.service';
import { LoaderFacade } from '@core/store/features/loader/loader.facade';
import { ConfirmFacade } from '@core/store/features/new-message/confirm/confirm.facade';
import { CreateMessageFacade } from '@core/store/features/new-message/create-message/create-message.facade';
import { NewMessageFacade } from '@core/store/features/new-message/new-message.facade';
import { SystemSettingsFacade } from '@core/store/features/system-settings/system-settings.facade';
import { UserFacade } from '@core/store/features/user/user.facade';
import { MainUserInfoModel } from '@core/store/features/user/user.model';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/services/confirm-dialog.service';
import { LoaderService } from '@shared/components/loader/loader.service';
import { FileUploadDto } from '@shared/models/file/file-upload.models';
import {
  EmailMessageModel,
  TextMessageModel,
  VoiceMessageModel,
} from '@shared/models/message/message.models';
import { hasValue } from '@shared/utils/verifications/value-check';
import _ from 'lodash';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  filter,
  map,
  share,
  switchMap,
  take,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { CommunicationDetailsService } from './communication-details.service';
import { MemberLimitReachedComponent } from './message-confirm/member-limit-reached/member-limit-reached.component';
import { MonthlyLimitWarningComponent } from './message-confirm/monthly-limit-warning/monthly-limit-warning.component';
import { NoCreditDialogComponent } from './message-confirm/no-credit-dialog/no-credit-dialog.component';
import { NoGroupsDialogComponent } from './message-confirm/no-groups-dialog/no-groups-dialog.component';

@Component({
  selector: 'app-communication-details-container',
  templateUrl: './communication-details.container.html',
  styleUrls: ['./communication-details.container.scss'],
})
export class CommunicationDetailsContainerComponent implements OnInit, OnDestroy {
  messageNameData$ = this._createMessageFacade.messageNameData$;
  userInfo$ = this._userFacade.currentUserInfo$;
  messageId$ = this._createMessageFacade.messageId$;

  callerIds$ = this._userFacade.callerIds$;
  userId$ = this._userFacade.userId$;
  customerProfileId$ = this._userFacade.customerProfileId$;
  currentUserInfo$ = this._userFacade.currentUserInfo$;
  userPackage$ = this._userFacade.userPackage$;
  primaryEmail$ = this._userFacade.primaryEmail$;

  emailValid$ = this._createMessageFacade.emailValid$;
  voiceValid$ = this._createMessageFacade.voiceValid$;
  textValid$ = this._createMessageFacade.textValid$;

  prefilledVoiceValid = false;
  prefilledTextValid = false;

  voicePanelOpen$ = this._createMessageFacade.voicePanelOpen$;
  textPanelOpen$ = this._createMessageFacade.textPanelOpen$;
  emailPanelOpen$ = this._createMessageFacade.emailPanelOpen$;

  recipientGroups$: Observable<{ value: string; id: number }[]>;
  groupLength: number;

  voiceMessageData$ = this._createMessageFacade.voiceMessageData$;
  textMessageData$ = this._createMessageFacade.textMessageData$.pipe(
    withLatestFrom(this._userFacade.currentUserInfo$),
    map(([textMessageData, userInfo]) => ({
      ...textMessageData,
      sMSFromText: hasValue(textMessageData.sMSFromText)
        ? textMessageData.sMSFromText
        : userInfo.firstName,
    }))
  );
  emailMessageData$ = this._createMessageFacade.emailMessageData$.pipe(
    withLatestFrom(this._userFacade.currentUserInfo$),
    map(([emailMessageData, userInfo]) =>
      this.createEmailMessageData(emailMessageData, userInfo)
    )
  );

  lastMessageNameData = undefined;
  lastVoiceData = undefined;
  lastTextData = undefined;
  lastEmailData = undefined;

  isDirty = false;
  showMessageDetail = false;

  audioRecordingUrl$ = this._createMessageFacade.audioRecordingUrl$.pipe(
    filter((url) => !!url)
  );

  communicationsQueue$ = this._confirmFacade.communicationQueue$.pipe(share());
  scheduleOptions$ = this._confirmFacade.scheduleOptions$;

  systemSettings$ = this._systemSettingsFacade.settings$;

  // MONTHLY CALL LIMIT REACHED
  canSendNow$ = this.userInfo$.pipe(
    map(
      (userInfo) =>
        (userInfo.package.costType === 'SUBSCRIBER' &&
          userInfo.userMemberPhoneCount < userInfo.userCredits) ||
        (userInfo.package.costType !== 'SUBSCRIBER' && userInfo.userCredits > 0)
    )
  );

  // ACCOUNT SUSPENDED
  accountSuspended$ = this.userInfo$.pipe(
    map((userInfo) => userInfo.userSubscription.isSuspended)
  );

  // MEMBER LIMIT REACHED
  memberLimitReached$ = this.userInfo$.pipe(
    map(
      (userInfo) =>
        userInfo.package.packageTypeId >= 3 &&
        (userInfo.userCredits === 0 ||
          userInfo.userCredits < userInfo.userMemberPhoneCount)
    )
  );

  // MONTH CALL LIMIT WARNING AT 75% OF LIMIT
  seventyFivePercentCallLimitWarning$ = this.userInfo$.pipe(
    map(
      (userInfo) =>
        userInfo.package.packageTypeId >= 3 &&
        userInfo.userCredits <= userInfo.package.monthlyCredits * 0.25 &&
        userInfo.userCredits !== 0 &&
        userInfo.userMemberPhoneCount <= userInfo.userCredits
    )
  );

  primaryEmail: string;

  private _userInfo: MainUserInfoModel;
  private subscription = new Subscription();
  isPreviousMessage = false;
  oldMessageId: any;
  public isGroupSelect$ = new Subject<MessageNameModel>();
  destroy$ = new Subject<void>();

  isPreviousMessage$ = this._createMessageFacade.isPreviousMessage$.pipe(
    filter((is) => !!is)
  );

  constructor(
    private _router: Router,
    private _userFacade: UserFacade,
    private _route: ActivatedRoute,
    private _loaderFacade: LoaderFacade,
    private _createMessageFacade: CreateMessageFacade,
    private _newMessageFacade: NewMessageFacade,
    private _communicationDetailsService: CommunicationDetailsService,
    private _systemSettingsFacade: SystemSettingsFacade,
    private _confirmFacade: ConfirmFacade,
    private _confirmDialogService: ConfirmDialogService,
    private _messageNameService: MessageNameService,
    private _packageService: PackageService,
    private _loaderService: LoaderService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.recipientGroups$ = this._messageNameService.fetchMessageRecipients();

    this.recipientGroups$.pipe(take(1)).subscribe((groups) => {
      this.groupLength = groups.length;

      if (groups.length === 0) {
        this.noGrousDialog();
      }
    });

    this.subscription.add(
      this.isPreviousMessage$.subscribe(
        (isPreviousMessage) => (this.isPreviousMessage = isPreviousMessage)
      )
    );
    this.subscription.add(
      this.messageId$.subscribe((messageId) => {
        if (messageId) {
          this.oldMessageId = messageId;
        }
      })
    );

    this._newMessageFacade.resetMessageState();

    this.subscription.add(
      this._userFacade.currentUserInfo$.subscribe(
        (userInfo: MainUserInfoModel) => {
          this._userInfo = userInfo;
          const emailAddresses = userInfo?.emailAddresses.find(
            (emails) => emails.isPrimary
          );
          this.primaryEmail = emailAddresses ? emailAddresses?.email : '';
          if (
            userInfo.userSubscription.isSuspended &&
            !userInfo.userSubscription.isSuspendedOnNextChargeDate
          ) {
            this.showReactivationPlanUpgradeDialog();
            return;
          } else if (
            !userInfo.userSubscription.isSuspended &&
            userInfo.userSubscription.isSuspendedOnNextChargeDate
          ) {
            this.showReactivationDialog();
            return;
          }

          if (userInfo.userMemberPhoneCount >= userInfo.package.memberCount) {
            this.memberLimitReached();
            return;
          }

          if (this.isSeventyFivePercentReached) {
            this.checkMessageLimit();
            return;
          }

          if (userInfo.userCredits <= 0) {
            this.userHasNoCredit();
            return;
          }

          this.messageNameData$
            .pipe()
            .subscribe(({ messageName, messageRecipients }) => {
              this.showMessageDetail = Boolean(
                messageRecipients.length && hasValue(messageName)
              );

              if (this.isPreviousMessage && !this.lastMessageNameData) {
                this.lastMessageNameData = messageName;
              }

              if (
                this.isPreviousMessage &&
                this.lastMessageNameData &&
                !_.isEqual(messageName, this.lastMessageNameData)
              ) {
                this.isPreviousMessage = false;
                this.isDirty = true;
              }
            });
        }
      )
    );

    this.subscription.add(
      this.isGroupSelect$.subscribe((groupSelectData: MessageNameModel) => {
        this.voiceMessageData$.subscribe((voiceMessage) => {
          this.prefilledVoiceValid =
            (voiceMessage.phoneTTSMessage ||
              voiceMessage.phoneMicrophoneMessage.fileName) &&
            groupSelectData.messageName &&
            !!groupSelectData.messageRecipients.length;
        });

        this.textMessageData$.subscribe((textMessage) => {
          this.prefilledTextValid =
            textMessage.sMSMessage &&
            groupSelectData.messageName &&
            !!groupSelectData.messageRecipients.length;
        });
      })
    );
  }

  onSendMessageFormChange(data: MessageNameModel): void {
    this.isGroupSelect$.next(data);
    this._newMessageFacade.saveMessageNameFormData(data);
  }

  onNavigateNext(): void {
    this._router.navigate(['../details'], { relativeTo: this._route });
  }

  onEmailFormatChange(): void {
    this._newMessageFacade.emailFormatChange();
  }

  onVoiceFormatChange(): void {
    this._newMessageFacade.voiceFormatChange();
  }

  onTextFormatChange(): void {
    this._newMessageFacade.textFormatChange();
  }

  onPreviousMessageOpen(): void {
    this._communicationDetailsService
      .openPrevious({ isMobileView: window.innerWidth <= 599 })
      .pipe(filter(({ id }) => !!id))
      .subscribe(({ id, isIncludeTextMessage }) => {
        this._loaderFacade.showLoader();
        this._newMessageFacade.openPreviousMessage(id, isIncludeTextMessage);
        this.isPreviousMessage = true;
        this.oldMessageId = id;
        this.isDirty = false;
        this.lastVoiceData = undefined;
        this.lastTextData = undefined;
        this.lastEmailData = undefined;
      });
  }

  onVoiceFormChange(value: VoiceMessageModel): void {
    if (this.isPreviousMessage && !this.lastVoiceData) {
      this.lastVoiceData = value;
    }

    if (
      this.isPreviousMessage &&
      this.lastVoiceData &&
      !_.isEqual(value, this.lastVoiceData)
    ) {
      this.isPreviousMessage = false;
      this.isDirty = true;
      this._newMessageFacade.saveMessageNameFormData({
        messageName: '',
      });
    }

    this._newMessageFacade.patchMessage(value);
  }

  onVoiceMessagePanelOpen(open: boolean): void {
    this._createMessageFacade.voicePanelOpen(open);
  }

  onTextMessagePanelOpen(open: boolean): void {
    this._createMessageFacade.textPanelOpen(open);
  }

  onEmailMessagePanelOpen(open: boolean): void {
    this._createMessageFacade.emailPanelOpen(open);
  }

  onTextFormChange(data: TextMessageModel): void {
    if (this.isPreviousMessage && !this.lastTextData) {
      this.lastTextData = data;
    }

    if (
      this.isPreviousMessage &&
      this.lastTextData &&
      !_.isEqual(data, this.lastTextData)
    ) {
      this.isPreviousMessage = false;
      this.isDirty = true;
      this._newMessageFacade.saveMessageNameFormData({
        messageName: '',
      });
    }

    this._newMessageFacade.patchMessage(data);
  }

  onEmailFormChange(data: EmailMessageModel): void {
    if (this.isPreviousMessage && !this.lastEmailData) {
      this.lastEmailData = data;
    }

    const newData = { ...data };
    newData.emailJson = JSON.stringify(
      this.removeId(JSON.parse(newData.emailJson))
    );

    const newLastEmailData = { ...this.lastEmailData };
    if (newLastEmailData.emailJson) {
      newLastEmailData.emailJson = JSON.stringify(
        this.removeId(JSON.parse(newLastEmailData.emailJson))
      );
    }

    if (
      this.isPreviousMessage &&
      this.lastEmailData &&
      !_.isEqual(newData, newLastEmailData)
    ) {
      this.isPreviousMessage = false;
      this.isDirty = true;
      this._newMessageFacade.saveMessageNameFormData({
        messageName: '',
      });
    }

    this._newMessageFacade.patchMessage(data);
  }

  onEmailAttachmentUpload(attachment: FileUploadDto): void {
    this._createMessageFacade.setEmailAttachment(attachment);
  }

  onEmailAttachmentRemove(index: number): void {
    this._createMessageFacade.emailAttachmentsRemove(index);
  }

  onVoiceFormValid(valid: boolean): void {
    this._createMessageFacade.setVoiceFormValid(valid);
  }

  onTextFormValid(valid: boolean): void {
    this._createMessageFacade.setTextFormValid(valid);
  }

  onEmailFormValid(valid: boolean): void {
    this._createMessageFacade.setEmailFormValid(valid);
  }

  onSaveAndContinueVoiceMessage(): void {
    if (this.isPreviousMessage) {
      this._createMessageFacade.saveAndContinueWithPreviousMessage({
        messageId: this.oldMessageId,
      });
    } else {
      this._createMessageFacade.saveAndContinue({
        createCommunication: true,
      });
    }
  }

  onSaveAndContinueEmailMessage(): void {
    this._createMessageFacade.saveAndContinue({
      createCommunication: true,
    });
  }

  onSaveAndContinueTextMessage(): void {
    this._createMessageFacade.saveAndContinue({
      createCommunication: true,
    });
  }

  onVoiceMessagePreviewOpen(): void {
    this._createMessageFacade.openVoiceMessagePreview();
  }

  onEmailMessagePreviewOpen(): void {
    this._createMessageFacade.openEmailMessagePreview();
  }

  onTextMessagePreviewOpen(): void {
    this._createMessageFacade.openTextMessagePreview();
  }

  onReceiveTollFreeTextNumber(textNumber: string): void {
    this._userFacade.fetchUser();
  }

  onSubmitNewMessage(): void {
    this._createMessageFacade.submitNewMessage({
      createCommunication: !this.isPreviousMessage,
      messageId: this.isPreviousMessage ? this.oldMessageId : undefined,
    });
    this._loaderFacade.showLoader();
  }

  onMessageNameValidate(valid: boolean): void {
    if (!this.isPreviousMessage) {
      this._createMessageFacade.setNameValid(valid);
    } else {
      this._createMessageFacade.setNameValid(true);
    }
  }

  onMessageSchedule(isMobileView: { isMobileView: boolean }): void {
    this._confirmFacade.scheduleMessage(isMobileView);
  }

  onCommunicationQueueUpdate(): void {
    this._newMessageFacade.updateCommunicationQueue();
  }

  onCreditsAdd(): void {
    // fetch user
  }

  onPlanUpgrade(): void {
    // fetch user
  }

  onSetAudioRecording(audioPath: string): void {
    this._newMessageFacade.setPlayBackFilePath(audioPath);
  }

  openPlanDetails(): void {
    this._router.navigate(['../../billing/plan-details']);
  }

  private createEmailMessageData(
    emailMessageData: EmailMessageModel,
    userInfo
  ): EmailMessageModel {
    const model = {
      ...emailMessageData,
      emailFromName: hasValue(emailMessageData.emailFromName)
        ? emailMessageData.emailFromName
        : userInfo.firstName,
    };

    if (hasValue(emailMessageData.replyTo)) {
      model.replyTo = emailMessageData.replyTo;

      return model;
    }

    if (userInfo.emailAddresses.length) {
      model.replyTo = userInfo.emailAddresses[0].email;

      return model;
    }

    model.replyTo = '';

    return model;
  }

  ngOnDestroy(): void {
    this._matDialog.closeAll();
    this.subscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private noGrousDialog() {
    this._matDialog
      .open(NoGroupsDialogComponent, {
        width: '535px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe();
  }

  private memberLimitReached() {
    this.subscription.add(
      this._packageService.getAllPackageFeatures().subscribe((packages) => {
        const userMemberCount = this._userInfo.package.memberCount;

        const newPackageId = packages
          .filter(
            (pack) =>
              pack.packageTypeId === this._userInfo.package.packageTypeId
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
      })
    );
  }

  private removeId(obj) {
    for (const prop in obj) {
      if (prop === 'id') {
        delete obj[prop];
      } else if (typeof obj[prop] === 'object') {
        this.removeId(obj[prop]);
      }
    }

    return obj;
  }

  private checkMessageLimit() {
    this.subscription.add(
      this.seventyFivePercentCallLimitWarning$.subscribe((res) => {
        if (res) {
          this._matDialog
            .open(MonthlyLimitWarningComponent, {
              width: '535px',
              autoFocus: false,
            })
            .afterClosed()
            .subscribe();
        }
      })
    );
  }

  private userHasNoCredit() {
    this.subscription.add(
      this._packageService.getAllPackageFeatures().subscribe((packages) => {
        const userMemberCount = this._userInfo.package.memberCount;

        const newPackageId = packages
          .filter(
            (pack) =>
              pack.packageTypeId === this._userInfo.package.packageTypeId
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
      })
    );
  }

  private showReactivationPlanUpgradeDialog() {
    this.subscription.add(
      this._confirmDialogService
        .showDialog({
          confirmBtn: 'ACTIVATE',
          header: 'Welcome Back!',
          detail: 'Please confirm to re-activate your account.',
        })
        .subscribe((res) => {
          this._loaderService.showLoader();
          if (res) {
            this._router.navigate(['/billing', 'plan-details']);
          } else {
            this._router.navigate(['/']);
          }
          this._loaderService.removeLoader();
        })
    );
  }

  private showReactivationDialog() {
    this.subscription.add(
      this._confirmDialogService
        .showDialog({
          confirmBtn: 'ACTIVATE',
          header: 'Welcome Back!',
          detail: 'Please confirm to re-activate your account.',
        })
        .subscribe((res) => {
          if (res) {
            this._loaderService.showLoader();
            const packageId = this._userInfo.package.id;
            this.unsuspendRequest(packageId);
            this._router.navigate(['/billing', 'plan-details']);
          } else {
            this._router.navigate(['/']);
          }
          this._loaderService.removeLoader();
        })
    );
  }

  private unsuspendRequest(packageId) {
    this.subscription.add(
      this._communicationDetailsService
        .unsuspendRequest(packageId)
        .subscribe(() => {
          this.getAllPackageFeatures();
          this._userFacade.fetchUser();
        })
    );
  }

  private getAllPackageFeatures() {
    this.subscription.add(
      this._packageService.getAllPackageFeatures().subscribe(() => {
        this._loaderService.removeLoader();
      })
    );
  }

  private get isSeventyFivePercentReached() {
    return (
      this._userInfo.package.packageTypeId >= 3 &&
      this._userInfo.userCredits <=
        this._userInfo.package.monthlyCredits * 0.25 &&
      this._userInfo.userCredits !== 0 &&
      this._userInfo.userMemberPhoneCount <= this._userInfo.userCredits
    );
  }
}

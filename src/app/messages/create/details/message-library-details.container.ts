import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageNameModel } from '@components/message-name/message-name.models';
import { LoaderFacade } from '@core/store/features/loader/loader.facade';
import { ConfirmFacade } from '@core/store/features/new-message/confirm/confirm.facade';
import { SystemSettingsFacade } from '@core/store/features/system-settings/system-settings.facade';
import {
  ToastService,
  ToastType,
} from '@shared/components/toast/service/toast.service';
import { BehaviorSubject, forkJoin, of, Subject } from 'rxjs';
import {
  filter,
  first,
  map,
  share,
  take,
  takeLast,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CreateMessageFacade } from 'src/app/core/store/features/new-message/create-message/create-message.facade';
import { NewMessageFacade } from 'src/app/core/store/features/new-message/new-message.facade';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { FileUploadDto } from 'src/app/shared/models/file/file-upload.models';
import {
  EmailMessageModel,
  TextMessageModel,
  VoiceMessageModel,
} from 'src/app/shared/models/message/message.models';
import { hasValue } from 'src/app/shared/utils/verifications/value-check';
import { MessageLibraryDetailsResolverModel } from './message-library-details.models';
import { MessageLibraryDetailsService } from './message-library-details.service';

@Component({
  templateUrl: './message-library-details.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./message-library-details.container.scss'],
})
export class MessageLibraryDetailsContainerComponent implements OnInit, OnDestroy {
  messageNameData$ = this._createMessageFacade.messageNameData$;
  callerIds$ = this._userFacade.callerIds$;
  userId$ = this._userFacade.userId$;
  customerProfileId$ = this._userFacade.customerProfileId$;
  currentUserInfo$ = this._userFacade.currentUserInfo$;
  userPackage$ = this._userFacade.userPackage$;
  userInfo$ = this._userFacade.currentUserInfo$;

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
  audioRecordingUrl$ = this._createMessageFacade.audioRecordingUrl$.pipe(
    filter((url) => !!url)
  );
  messageId$ = this._createMessageFacade.messageId$.pipe(
    share(),
    tap((id) => (this._messageId = id))
  );

  emailValid$ = this._createMessageFacade.emailValid$.pipe(
    tap((valid) => (this._hasValidEmailTemplate = valid))
  );
  emailValidSubject: BehaviorSubject<boolean>;

  voiceValid$ = this._createMessageFacade.voiceValid$;
  voiceValidSubject: BehaviorSubject<boolean>;

  textValid$ = this._createMessageFacade.textValid$;
  textValidSubject: BehaviorSubject<boolean>;

  voicePanelOpen$ = this._createMessageFacade.voicePanelOpen$;
  textPanelOpen$ = this._createMessageFacade.textPanelOpen$;
  emailPanelOpen$ = this._createMessageFacade.emailPanelOpen$;

  communicationsQueue$ = this._confirmFacade.communicationQueue$.pipe(share());
  scheduleOptions$ = this._confirmFacade.scheduleOptions$;

  messageCreated$ = this._createMessageFacade.messageCreated$;

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

  messageData: MessageLibraryDetailsResolverModel;

  public isShowMessageSendFrame$ = new BehaviorSubject(false);

  private _messageId: number;
  private _saveEmailMessage: boolean;

  private _hasValidEmailTemplate = false;
  public exportAndPatchEditorValue = false;

  private isDestroy$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userFacade: UserFacade,
    private _createMessageFacade: CreateMessageFacade,
    private _newMessageFacade: NewMessageFacade,
    private _systemSettingsFacade: SystemSettingsFacade,
    private _confirmFacade: ConfirmFacade,
    private _loaderFacade: LoaderFacade,
    private _toastService: ToastService,
    private _messageDialog: MessageLibraryDetailsService
  ) {
    this.messageData = this._route.snapshot.data.messageData;
  }

  ngOnInit() {
    this.textValidSubject = new BehaviorSubject(false);
    this.voiceValidSubject = new BehaviorSubject(false);
    this.emailValidSubject = new BehaviorSubject(false);

    this.textValid$.pipe(takeUntil(this.isDestroy$)).subscribe((textValid) => {
      this.textValidSubject.next(textValid);
    });
    this.voiceValid$
      .pipe(takeUntil(this.isDestroy$))
      .subscribe((voiceValid) => {
        this.voiceValidSubject.next(voiceValid);
      });
    this.emailValid$
      .pipe(takeUntil(this.isDestroy$))
      .subscribe((emailValid) => {
        this.emailValidSubject.next(emailValid);
      });
  }

  ngOnDestroy(): void {
    this.isDestroy$.next();
    this.isDestroy$.complete();
  }

  onMessageNameValidate(valid: boolean): void {
    this._createMessageFacade.setNameValid(valid);
  }

  onVoiceFormChange(value: VoiceMessageModel): void {
    this._newMessageFacade.patchMessage(value);
  }

  onEmailFormatChange(): void {
    this._newMessageFacade.emailFormatChange();
  }

  onVoiceFormatChange(): void {
    this._newMessageFacade.voiceFormatChange();
  }

  onVoiceMessagePanelOpen(open: boolean): void {
    this._createMessageFacade.voicePanelOpen(open);
  }

  onVoiceCloseAndContinue(): void {
    if (!this.textValidSubject.value) {
      this._createMessageFacade.textPanelOpen(true);
    } else if (!this.emailValidSubject.value) {
      this._createMessageFacade.emailPanelOpen(true);
    } else {
      this._createMessageFacade.voicePanelOpen(false);
    }
  }

  onTextMessagePanelOpen(open: boolean): void {
    this._createMessageFacade.textPanelOpen(open);
  }

  onTextCloseAndContinue(): void {
    if (!this.voiceValidSubject.value) {
      this._createMessageFacade.voicePanelOpen(true);
    } else if (!this.emailValidSubject.value) {
      this._createMessageFacade.emailPanelOpen(true);
    } else {
      this._createMessageFacade.textPanelOpen(false);
    }
  }

  onEmailMessagePanelOpen(open: boolean): void {
    this._createMessageFacade.emailPanelOpen(open);
  }

  onEmailCloseAndContinue(): void {
    if (!this.textValidSubject.value) {
      this._createMessageFacade.textPanelOpen(true);
    } else if (!this.voiceValidSubject.value) {
      this._createMessageFacade.voicePanelOpen(true);
    } else {
      this._createMessageFacade.emailPanelOpen(false);
    }
  }

  onTextFormatChange(): void {
    this._newMessageFacade.textFormatChange();
  }

  onTextFormChange(data: TextMessageModel): void {
    this._newMessageFacade.patchMessage(data);
  }

  onEmailFormChange(data: EmailMessageModel): void {
    this._newMessageFacade.patchMessage(data);

    if (this._saveEmailMessage) {
      this.saveEmailMessage();
      this._saveEmailMessage = false;
    }
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

  onSaveAndContinueMessage(): void {
    if (this._hasValidEmailTemplate) {
      this.exportAndPatchEditorValue = true;
    } else {
      this.onSaveAllMessages();
    }
  }

  onSaveAllMessages(): void {
    this._loaderFacade.showLoader();
    this._createMessageFacade.createMessageFromLibrary();
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

  onSendMessageFormChange(data: MessageNameModel): void {
    this._newMessageFacade.saveMessageNameFormData(data);
  }

  onReceiveTollFreeTextNumber(textNumber: string): void {
    this._userFacade.fetchUser();
  }

  onSetAudioRecording(audioPath: string): void {
    this._newMessageFacade.setPlayBackFilePath(audioPath);
  }

  onMessageSchedule(isMobileView: { isMobileView: boolean }): void {
    this._confirmFacade.scheduleMessage(isMobileView);
  }

  onCommunicationQueueUpdate(): void {
    this._newMessageFacade.updateCommunicationQueue();
  }

  onCommunicationConfirm(): void {
    of(this._confirmFacade.communicationConfirm())
      .pipe(
        takeUntil(this.isDestroy$),
        tap(
          () => (
            this._loaderFacade.showLoader(),
            this._toastService.addToast(
              ToastType.Success,
              'Congratulations! Your message has been created and saved to your message library!'
            )
          )
        )
      )
      .subscribe(() => {
        this.navigateToMessageLibrary();
        this._loaderFacade.removeLoader();
      });
  }

  openPlanDetails(): void {
    this._router.navigate(['../../billing/plan-details']);
  }

  navigateToMessageLibrary(): void {
    this._router.navigate(['../', 'library'], { relativeTo: this._route });
  }

  private saveEmailMessage(): void {
    this._createMessageFacade.saveMessageInLibrary();
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

    if (model.emailFrom === null && hasValue(emailMessageData.emailFrom)) {
      model.emailFrom = emailMessageData.emailFrom;
    }

    if (model.emailFrom === null && userInfo.emailAddresses.length) {
      model.emailFrom = userInfo.emailAddresses[0].email;
    }

    if (model.emailFrom === null) {
      model.emailFrom = '';
    }

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
}

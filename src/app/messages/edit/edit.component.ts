import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageNameModel } from '@components/message-name/message-name.models';
import { forkJoin, Observable } from 'rxjs';
import { filter, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { EnabledMessageFormatsModel } from 'src/app/components/message-details/message-details.models';
import { NewMessageFacade } from 'src/app/core/store/features/new-message/new-message.facade';
import { MessageStateModel } from 'src/app/core/store/features/new-message/new-message.models';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { MessageDataService } from 'src/app/domain/message-data/message-data.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import {
  EmailMessageModel,
  NotificationFormatValues,
  TextMessageModel,
  VoiceMessageModel,
} from 'src/app/shared/models/message/message.models';
import {
  hasEmailFormat,
  hasPhoneFormat,
  hasTextFormat,
} from 'src/app/shared/utils/message/notification-format.helper';
import { EditService } from './edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements AfterViewInit {
  readonly NotificationFormatValues = NotificationFormatValues;
  messageName: string;

  notificationFormatValue: NotificationFormatValues;
  audioRecordingUrl: string;
  voiceMessageData: VoiceMessageModel;
  textMessageData: TextMessageModel;
  emailMessageData: EmailMessageModel;
  selectedFormats: EnabledMessageFormatsModel;

  textMessageValid = true;
  voiceMessageValid = true;
  emailMessageValid = true;
  textMessageNameValid = false;

  routeToLibrary = false;
  textEditExpanded = false;
  emailEditExpanded = false;
  voiceEditExpanded = false;
  sendMessageButtonEnabled = true;
  exportAndPatchEditorValue = false;

  isSaved = false;

  messageData: MessageStateModel;
  messageNameEditData: MessageNameModel;
  editedMessageName: MessageNameModel = null;

  audioRecordingUrl$ = this._newMessageFacade.audioRecordingUrl$.pipe(
    filter((url) => !!url)
  );

  currentUserInfo$ = this._userFacade.currentUserInfo$;
  userPackage$ = this._userFacade.userPackage$;

  @ViewChildren(MatExpansionPanel)
  private _expansionPanels: QueryList<MatExpansionPanel>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userFacade: UserFacade,
    private _editService: EditService,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    private _messageDataService: MessageDataService,
    private _newMessageFacade: NewMessageFacade
  ) {
    this.notificationFormatValue =
      this._route.snapshot.data.message.notificationFormatValue;

    this.messageData = this._route.snapshot.data.message;

    this.messageNameEditData = this.messageNameDetails;

    this.voiceMessageData = this._editService.createVoiceMessageData(
      this.messageData
    );
    this.audioRecordingUrl = this._editService.getAudioRecordingUrl(
      this.messageData
    );
    this.onSetAudioRecording(this.audioRecordingUrl);
    this.textMessageData = this._editService.createTextMessageData(
      this.messageData
    );
    this.emailMessageData = this._editService.createEmailMessageData(
      this.messageData
    );

    this.selectedFormats = {
      isTextMessage: this.hasTextFormat,
      isPhoneMessage: this.hasVoiceFormat,
      isEmailMessage: this.hasEmailFormat,
    };
  }

  ngAfterViewInit(): void {
    this.enableSendButton();
    if (this._expansionPanels.first) {
      requestAnimationFrame(() => {
        this._expansionPanels.first.open();
      });
    }
  }

  get hasVoiceFormat(): boolean {
    return hasPhoneFormat(this.notificationFormatValue);
  }

  get hasTextFormat(): boolean {
    return hasTextFormat(this.notificationFormatValue);
  }

  get hasEmailFormat(): boolean {
    return hasEmailFormat(this.notificationFormatValue);
  }

  get originalHasVoiceFormat(): boolean {
    return hasPhoneFormat(
      this._route.snapshot.data.message.notificationFormatValue
    );
  }

  get messageNameDetails(): MessageNameModel {
    return {
      messageName: this.messageData?.message?.messageName,
      messageRecipients: this.messageData?.messageRecipients,
      notificationFormatValue: this.messageData?.notificationFormatValue,
    };
  }

  get hasValidEmailFormat(): boolean {
    return this.hasEmailFormat && this.emailMessageValid;
  }

  onSetAudioRecording(audioPath: string): void {
    this._newMessageFacade.setPlayBackFilePath(audioPath);
  }

  onVoiceMessageToggle(event: MatButtonToggleChange): void {
    const checked = event.source.checked;

    this.voiceMessageData.voiceHidden = !checked;
    if (checked) {
      this.notificationFormatValue =
        this.notificationFormatValue + NotificationFormatValues.VoiceMessage;
      this._messageDataService
        .reFetchMessageSnapshot(
          this.messageData.messageId,
          this.notificationFormatValue
        )
        .subscribe((messageSnapshot) => {
          this.messageData = messageSnapshot;
          this.voiceMessageData =
            this._editService.createVoiceMessageData(messageSnapshot);
          this.audioRecordingUrl =
            this._editService.getAudioRecordingUrl(messageSnapshot);
          this.onSetAudioRecording(this.audioRecordingUrl);
        });
    } else {
      this.notificationFormatValue =
        this.notificationFormatValue - NotificationFormatValues.VoiceMessage;
      this.saveChanges();
    }
  }

  onEmailMessageToggle(event: MatButtonToggleChange) {
    const checked = event.source.checked;

    this.emailMessageData.emailHidden = !checked;
    if (checked) {
      this.notificationFormatValue =
        this.notificationFormatValue + NotificationFormatValues.EmailMessage;
      this._messageDataService
        .reFetchMessageSnapshot(
          this.messageData.messageId,
          this.notificationFormatValue
        )
        .subscribe((messageSnapshot) => {
          this.messageData = messageSnapshot;
          this.emailMessageData =
            this._editService.createEmailMessageData(messageSnapshot);
        });
    } else {
      this.notificationFormatValue =
        this.notificationFormatValue - NotificationFormatValues.EmailMessage;
      this.saveChanges();
    }
  }

  onTextMessageToggle(event: MatButtonToggleChange): void {
    const checked = event.source.checked;

    this.textMessageData.smsHidden = !checked;
    if (checked) {
      this.notificationFormatValue =
        this.notificationFormatValue + NotificationFormatValues.TextMessage;
      this._messageDataService
        .reFetchMessageSnapshot(
          this.messageData.messageId,
          this.notificationFormatValue
        )
        .subscribe((messageSnapshot) => {
          this.messageData = messageSnapshot;
          this.textMessageData =
            this._editService.createTextMessageData(messageSnapshot);
        });
    } else {
      this.notificationFormatValue =
        this.notificationFormatValue - NotificationFormatValues.TextMessage;
      this.saveChanges();
    }
  }

  saveChanges(): void {
    this._loaderService.showLoader();

    this.createMessageUpdateRequest().subscribe(
      () => {
        this._loaderService.removeLoader();
        this.isSaved = true;
        this._toastService.addToast(
          ToastType.Success,
          'Message has been successfully updated.'
        );
      },
      (error) => {
        console.error(error);
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Error,
          'Something went wrong updating message.'
        );
      },
      () => {
        if (this.routeToLibrary) {
          this.backToMessageLibrary();
        }
      }
    );
  }

  onSaveAndContinueMessage(routeAfterSave = false): void {
    this.routeToLibrary = routeAfterSave;
    if (this.hasValidEmailFormat) {
      this.exportAndPatchEditorValue = true;
    } else {
      this.saveChanges();
    }
  }

  backToMessageLibrary(): void {
    this._router.navigate(['../', '../', 'library'], {
      relativeTo: this._route,
    });
  }

  onMessageSend(): void {
    this._loaderService.showLoader();
    this._newMessageFacade.setPreviousMessage(this.messageData.messageId);
    this._router.navigate(['new-communication', 'details']);
  }

  emailMessageValidChange(valid: boolean) {
    this.emailMessageValid = valid;
    this.sendMessageButtonEnabled = this.enableSendButton();
  }

  textMessageValidChange(valid: boolean) {
    this.textMessageValid = valid;
    this.sendMessageButtonEnabled = this.enableSendButton();
  }

  voiceMessageValidChange(valid: boolean) {
    this.voiceMessageValid = valid;
    this.sendMessageButtonEnabled = this.enableSendButton();
  }

  setTollFreeTextNumber(event: Event): void {}

  onMessageNameValidate(isValid: boolean): void {
    this.textMessageNameValid = isValid;
  }

  onMessageValueChange(messageName: MessageNameModel): void {
    this.editedMessageName = messageName;
  }

  private createMessageUpdateRequest(): Observable<unknown[]> {
    return this._editService.sendUpsertRequest(this.messageData.messageId).pipe(
      take(1),
      withLatestFrom(this._userFacade.currentUserInfo$),
      switchMap(([messageId, mainUserInfo]) => {
        return this._editService
          .sendChangeNotificationTypeRequest(
            messageId,
            this.notificationFormatValue,
            this.messageData.message.messageName
          )
          .pipe(
            switchMap(() => this.queueMessageRequests(messageId, mainUserInfo))
          );
      })
    );
  }

  private queueMessageRequests(
    messageId: number,
    mainUserInfo: MainUserInfoModel
  ): Observable<unknown[]> {
    const requests = [];

    if (
      (this.hasVoiceFormat && this.voiceMessageValid) ||
      this.voiceMessageData.voiceHidden
    ) {
      requests.push(
        this._editService.sendPhoneOptionsUpdateRequest(
          messageId,
          this.voiceMessageData
        )
      );
    }

    if (
      (this.hasEmailFormat && this.emailMessageValid) ||
      this.emailMessageData.emailHidden
    ) {
      requests.push(
        this._editService.sendEmailOptionsUpdateRequest(
          messageId,
          this.emailMessageData,
          mainUserInfo
        )
      );
    }

    if (
      (this.hasTextFormat && this.textMessageValid) ||
      this.textMessageData.smsHidden
    ) {
      requests.push(
        this._editService.sendTextOptionsUpdateRequest(
          messageId,
          this.textMessageData,
          mainUserInfo
        )
      );
    }

    if (
      this.editedMessageName &&
      this.textMessageNameValid &&
      this.editedMessageName?.messageName !==
        this.messageData?.message?.messageName
    ) {
      requests.push(
        this._editService.sendMessageNameChangeRequest(messageId, {
          id: messageId,
          changeSelectedNotificationTypes: false,
          messageName: this.editedMessageName.messageName,
          userSelectedNotificationTypes: this.notificationFormatValue,
        })
      );
    }

    requests.push(
      this._editService.sendEditSmsOptionsUpdateRequest(messageId, {
        id: messageId,
        textNumber: this.messageData.message.textNumber,
      })
    );

    return forkJoin(requests);
  }

  private enableSendButton(): boolean {
    const validMessages = [];
    if (this.hasVoiceFormat) {
      validMessages.push(this.voiceMessageValid);
    }
    if (this.hasTextFormat) {
      validMessages.push(this.textMessageValid);
    }
    if (this.hasEmailFormat) {
      validMessages.push(this.emailMessageValid);
    }

    return validMessages.every((valid) => valid);
  }
}

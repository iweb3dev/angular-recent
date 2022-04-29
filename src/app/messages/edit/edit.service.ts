import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { MessagesService } from 'src/app/api/messages/messages.service';

import { ChangeNotificationTypeDtoModel } from '@api/messages/messages.models';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { MessageStateModel } from 'src/app/core/store/features/new-message/new-message.models';
import {
  TextMessageModel,
  EmailMessageModel,
  VoiceMessageModel,
  NotificationFormatValues,
} from 'src/app/shared/models/message/message.models';

@Injectable()
export class EditService {
  constructor(private _messageService: MessagesService) {}

  sendUpsertRequest(messageId: number): Observable<number> {
    return this._messageService.initializeOrCopyMessageNotificationRecord(
      messageId
    );
  }

  sendPhoneOptionsUpdateRequest(
    messageId: number,
    phoneOptions: VoiceMessageModel
  ): Observable<void> {
    return this._messageService.editPhoneOptions(
      messageId,
      this.createPhoneOptionsUpdatePayload(messageId, phoneOptions)
    );
  }

  sendTextOptionsUpdateRequest(
    messageId: number,
    data: TextMessageModel,
    mainUserInfo: MainUserInfoModel
  ): Observable<any> {
    return this._messageService.editSmsTextOptions(
      messageId,
      this.createTextOptionsUpdatePayload(messageId, data, mainUserInfo)
    );
  }

  sendEmailOptionsUpdateRequest(
    messageId: number,
    data: EmailMessageModel,
    mainUserInfo: MainUserInfoModel
  ): Observable<void> {
    return this._messageService.editEmailOptions(
      messageId,
      this.createEmailOptionsUpdatePayload(messageId, data, mainUserInfo)
    );
  }

  sendEditSmsOptionsUpdateRequest(
    messageId: number,
    payload: { id: number; textNumber: string }
  ): Observable<void> {
    return this._messageService.editSmsOptions(messageId, payload);
  }

  sendChangeNotificationTypeRequest(
    messageId: number,
    userSelectedNotificationTypes: NotificationFormatValues,
    messageName: string
  ): Observable<boolean> {
    return this._messageService.updateMessageNotificationTypesAndName(
      messageId,
      userSelectedNotificationTypes,
      {
        changeSelectedNotificationTypes: true,
        id: messageId,
        messageName,
        userSelectedNotificationTypes,
      }
    );
  }

  sendMessageNameChangeRequest(
    messageId: number,
    message: ChangeNotificationTypeDtoModel
  ): Observable<boolean> {
    return this._messageService.updateMessageNameOnly(messageId, message);
  }

  getAudioRecordingUrl({ message }: MessageStateModel): string {
    return (
      message.phoneUploadedMessage?.fileName ??
      message.phoneMicrophoneMessage?.fileName ??
      message.phoneTTSMessageSource
    );
  }

  createEmailMessageData({ message }: MessageStateModel): EmailMessageModel {
    return {
      emailSubject: message.emailSubject,
      emailFromName: message.emailFromName,
      emailFrom: message.emailFrom,
      replyTo: message.replyTo,
      emailJson: message.emailJson,
      emailBody: message.emailBody,
      emailHidden: message.emailHidden,
    };
  }

  createTextMessageData({ message }: MessageStateModel): TextMessageModel {
    return {
      sMSFromText: message.sMSFromText,
      sMSMessage: message.sMSMessage,
      textNumber: message.textNumber,
      allowedResponses: message.allowedResponses,
      smSTwoWayText: message.smSTwoWayText,
      smsAllowedResponseYes: message.smsAllowedResponseYes,
      smsAllowedResponseNo: message.smsAllowedResponseNo,
      smsAllowedResponseMaybe: message.smsAllowedResponseMaybe,
      smsHidden: message.smsHidden,
    };
  }

  createVoiceMessageData({ message }: MessageStateModel): VoiceMessageModel {
    return {
      callerId: message.callerId,
      emailAlternateFormatSend: message.emailAlternateFormatSend,
      lat: message.lat,
      phoneMessageSource: message.phoneMessageSource,
      svm: message.svm,
      textAlternateFormatSend: message.textAlternateFormatSend,
      phoneMicrophoneMessage: message.phoneMicrophoneMessage,
      phoneUploadedMessage: message.phoneUploadedMessage,
      phoneTTSMessage: message.phoneTTSMessage,
      phoneTTSMessageSource: message.phoneTTSMessageSource,
      callMeFileLocation: message.callMeFileLocation,
      voiceHidden: message.voiceHidden,
    };
  }

  private createPhoneOptionsUpdatePayload(
    messageId: number,
    data: VoiceMessageModel
  ) {
    return {
      callerId: data.callerId,
      emailAlternateFormatSend: data.emailAlternateFormatSend,
      id: messageId,
      lat: data.lat ?? '',
      svm: data.svm,
      textAlternateFormatSend: data.textAlternateFormatSend,
    };
  }

  private createEmailOptionsUpdatePayload(
    messageId: number,
    data: EmailMessageModel,
    mainUserInfo: MainUserInfoModel
  ) {
    return {
      hidden: data.emailHidden,
      emailJson: data.emailJson,
      id: messageId,
      memberFirstName: data.emailFromName,
      emailBody: data.emailBody,
      emailSubject: data.emailSubject,
      replyTo: data.replyTo,
      memberId: mainUserInfo.id,
      hasParameterSubstitutions: false, // TODO: figure out the value to pass in here
    };
  }

  private createTextOptionsUpdatePayload(
    messageId: number,
    data: TextMessageModel,
    mainUserInfo: MainUserInfoModel
  ) {
    return {
      id: messageId,
      memberFirstName: data.sMSFromText,
      memberID: mainUserInfo.id,
      SMSChargeLength: data.sMSMessage.length,
      SMSMessage: data.sMSMessage,
      ...data,
    };
  }
}

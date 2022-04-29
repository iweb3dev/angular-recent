import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MessageDetailsResponseDto, MessageFilesResponseDto, MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';

import { MessagesService } from 'src/app/api/messages/messages.service';
import { INITIAL_MESSAGE_MODEL, VOICE_MESSAGE_MODEL } from 'src/app/shared/constants/message.constants';
import {
  AllowedResponsesMessages,
  EmailMessageModel,
  NotificationFormatValues,
  PhoneMessageSourceTypes,
  TextMessageModel,
  VoiceMessageModel,
} from 'src/app/shared/models/message/message.models';

@Injectable({
  providedIn: 'root',
})
export class MessageDataService {
  constructor(private _messagesService: MessagesService) {}

  fetchMessageSnapshot(messageId: number): Observable<any> {
    return this.fetchMessage(messageId).pipe(
      switchMap((message) => {
        switch (message.notificationFormatValue) {
          case NotificationFormatValues.TextMessage:
            return this.fetchTextSnapshot(message.id).pipe(
              map((messageData) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: message.notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...messageData,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.VoiceMessage:
            return this.fetchVoiceSnapshot(message.id).pipe(
              map((messageData) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: message.notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...messageData,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.EmailMessage:
            return this.fetchEmailSnapshot(message.id).pipe(
              map((messageData) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: message.notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...messageData,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.AllMessages:
            return forkJoin([
              this.fetchTextSnapshot(message.id),
              this.fetchVoiceSnapshot(message.id),
              this.fetchEmailSnapshot(message.id),
            ]).pipe(
              map(([textMessage, voiceMessage, emailMessage]) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: message.notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...textMessage,
                  ...voiceMessage,
                  ...emailMessage,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.TextEmail:
            return forkJoin([this.fetchTextSnapshot(message.id), this.fetchEmailSnapshot(message.id)]).pipe(
              map(([textMessage, emailMessage]) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: message.notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...textMessage,
                  ...emailMessage,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.VoiceEmail:
            return forkJoin([this.fetchVoiceSnapshot(message.id), this.fetchEmailSnapshot(message.id)]).pipe(
              map(([voiceMessage, emailMessage]) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: message.notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...voiceMessage,
                  ...emailMessage,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.VoiceText:
            return forkJoin([this.fetchTextSnapshot(message.id), this.fetchVoiceSnapshot(message.id)]).pipe(
              map(([textMessage, voiceMessage]) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: message.notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...textMessage,
                  ...voiceMessage,
                  messageName: message.notificationName,
                },
              }))
            );
        }
      })
    );
  }

  reFetchMessageSnapshot(messageId: number, notificationFormatValue: NotificationFormatValues): Observable<any> {
    return this.fetchMessage(messageId).pipe(
      switchMap((message) => {
        switch (notificationFormatValue) {
          case NotificationFormatValues.TextMessage:
            return this.fetchTextSnapshot(message.id).pipe(
              map((messageData) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...messageData,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.VoiceMessage:
            return this.fetchVoiceSnapshot(message.id).pipe(
              map((messageData) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...messageData,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.EmailMessage:
            return this.fetchEmailSnapshot(message.id).pipe(
              map((messageData) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...messageData,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.AllMessages:
            return forkJoin([
              this.fetchTextSnapshot(message.id),
              this.fetchVoiceSnapshot(message.id),
              this.fetchEmailSnapshot(message.id),
            ]).pipe(
              map(([textMessage, voiceMessage, emailMessage]) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...textMessage,
                  ...voiceMessage,
                  ...emailMessage,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.TextEmail:
            return forkJoin([this.fetchTextSnapshot(message.id), this.fetchEmailSnapshot(message.id)]).pipe(
              map(([textMessage, emailMessage]) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...textMessage,
                  ...emailMessage,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.VoiceEmail:
            return forkJoin([this.fetchVoiceSnapshot(message.id), this.fetchEmailSnapshot(message.id)]).pipe(
              map(([voiceMessage, emailMessage]) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...voiceMessage,
                  ...emailMessage,
                  messageName: message.notificationName,
                },
              }))
            );
          case NotificationFormatValues.VoiceText:
            return forkJoin([this.fetchTextSnapshot(message.id), this.fetchVoiceSnapshot(message.id)]).pipe(
              map(([textMessage, voiceMessage]) => ({
                messageId: message.id,
                messageRecipients: [],
                notificationFormatValue: notificationFormatValue,
                message: {
                  ...INITIAL_MESSAGE_MODEL,
                  ...textMessage,
                  ...voiceMessage,
                  messageName: message.notificationName,
                },
              }))
            );
        }
      })
    );
  }

  fetchTextSnapshot(id: number): Observable<TextMessageModel> {
    return this._messagesService.fetchMessageDetails(id, NotificationFormatValues.TextMessage).pipe(
      map((response) => ({
        sMSFromText: response.smsFromText,
        sMSMessage: response.smsText,
        textNumber: response.textNumber,
        smSTwoWayText: response.acceptResponses,
        allowedResponses: response.acceptedResponseList,
        smsAllowedResponseMaybe: !!response.acceptedResponseList.find((res) => res.response === AllowedResponsesMessages.Maybe),
        smsAllowedResponseNo: !!response.acceptedResponseList.find((res) => res.response === AllowedResponsesMessages.No),
        smsAllowedResponseYes: !!response.acceptedResponseList.find((res) => res.response === AllowedResponsesMessages.Yes),
        smsHidden: response.hidden,
      }))
    );
  }

  fetchEmailSnapshot(id: number): Observable<EmailMessageModel> {
    return forkJoin([
      this._messagesService.fetchMessageDetails(id, NotificationFormatValues.EmailMessage),
      this._messagesService.fetchMessageFiles(id, NotificationFormatValues.EmailMessage),
    ]).pipe(
      map(([response, files]) => ({
        emailSubject: response.emailSubject,
        emailFromName: response.fromEmailName,
        emailFrom: response.fromAddress,
        replyTo: response.replyTo,
        emailJson: response.emailJson,
        emailBody: response.emailBody,
        emailHidden: response.hidden,
        attachments: files.pagedObjects.map((file) => ({
          fileName: file.fileName,
          flaggedForDeletion: file.flaggedForDeletion,
          fileId: file.fileType,
          fileSize: 0,
        })), // TODO: should correspond to FileUploadDto model
      }))
    );
  }

  fetchVoiceSnapshot(id: number): Observable<VoiceMessageModel> {
    return forkJoin([
      this._messagesService.fetchMessageDetails(id, NotificationFormatValues.VoiceMessage),
      this._messagesService.fetchMessageFiles(id, NotificationFormatValues.VoiceMessage),
    ]).pipe(map(([response, filesData]) => this.createVoiceMessageModel(response, filesData)));
  }

  private createVoiceMessageModel(messageDetails: MessageDetailsResponseDto, filesData: MessageFilesResponseDto) {
    const model = {
      ...VOICE_MESSAGE_MODEL,
      callerId: messageDetails.callerId,
      emailAlternateFormatSend: messageDetails.emailAlternateFormatSend,
      lat: messageDetails.lat,
      svm: messageDetails.svm,
      textAlternateFormatSend: messageDetails.textAlternateFormatSend,
      phoneMessageSource: filesData?.sourceType,
      voiceHidden: messageDetails.hidden,
    };

    // TODO: figure out why null is returned from API

    if (!filesData) {
      return model;
    }

    switch (filesData.sourceType) {
      case PhoneMessageSourceTypes.Microphone:
        model.phoneMicrophoneMessage = {
          id: 1,
          size: 0,
          fileName: filesData.fileName,
          fileExtension: 'wav',
        };
        break;
      case PhoneMessageSourceTypes.Upload:
        model.phoneUploadedMessage = {
          id: 1,
          size: 0,
          fileName: filesData.fileName,
          fileExtension: 'wav',
        };
        break;
      case PhoneMessageSourceTypes.CallIn:
        model.callMeFileLocation = filesData.fileName;
        break;
      case PhoneMessageSourceTypes.TTS:
        model.phoneTTSMessage = messageDetails.ttsMessage;
        model.phoneTTSMessageSource = filesData.fileName;
        break;
    }

    return model;
  }

  private fetchMessage(id: number): Observable<MessagePagedObjectsDto> {
    return this._messagesService.fetchMessages().pipe(map((data) => data.pagedObjects.find((message) => message.id === id)));
  }
}

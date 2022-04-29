import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '../../core/http/http.service';
import { CallMeRecordingStatuses } from 'src/app/shared/models/message/call-me-recording.models';

import {
  MessageModel,
  NotificationFormatValues,
  SelectedMessagesModel,
} from 'src/app/shared/models/message/message.models';

import {
  MESSAGE_API_BASE,
  DELETE_MESSAGES,
  DELETE_SPECIFIC_MESSAGE,
  CAN_EXISTING_TEXT_MESSAGE_BE_SENT,
  GET_PHONE_MESSAGE_LENGTH,
  UPDATE_MESSAGE_NAME,
  UPDATE_MESSAGE_NOTIFICATION_TYPES_AND_NAME,
  CANCEL_CALLME_MESSAGE_CREATION,
  GET_COUNT_OF_USER_MESSAGES_CREATED,
  SEND_SMS_OPTIN_REQUEST_VIA_EMAIL_TO_GROUP,
  SEND_SMS_OPTIN_REQUEST_VIA_TEXT_TO_GROUP,
  GET_ALTERNATE_FORMAT_VOICE_MESSAGE,
  INSERT_OR_UPDATE_MESSAGE_NOTIFICATION_MODEL,
  EDIT_SMS_OPTIONS,
  EDIT_PHONE_OPTIONS,
  EDIT_SMS_TEXT,
  EDIT_EMAIL_OPTIONS,
} from './messages.api';

import {
  CallMePayload,
  ChangeNotificationTypeDtoModel,
  MessageDetailsResponseDto,
  MessageFilesResponseDto,
  MessagePayloadModelDto,
  MessagesResponseDto,
} from './messages.models';
import { MessageNameModel } from '@components/message-name/message-name.models';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private _http: Http, private _httpClient: HttpClient) {}

  doesMessageExist(messageName: string): Observable<boolean> {
    return this._http.post(`${MESSAGE_API_BASE}/doesMessageExist`, {
      messageName,
    });
  }

  createMessageRecord(
    userId: number,
    message: MessageModel,
    messageFormats: SelectedMessagesModel,
  ): Observable<number> {
    return this._http.post<number, MessagePayloadModelDto>(
      MESSAGE_API_BASE,
      this.createMessageDtoRequest(userId, message, messageFormats),
    );
  }

  updateMessage(
    userId: number,
    message: MessageModel,
    messageId: number,
  ): Observable<any> {
    return this._http.put<any, MessagePayloadModelDto>(
      `${MESSAGE_API_BASE}/${messageId}`,
      this.createMessageDtoRequest(userId, message, null),
    );
  }

  // initializeOrUpdateMessageData - Using the messageId of an existing message
  // this code checks to see if the message has ever been sent
  // by looking for the notification data record in history and if found it
  // then creates a copy of the old message notificaiton record with a new messageId.
  // Else if the message is not in history it creates a new message notification data record
  // and returns the new messageId.
  initializeOrCopyMessageNotificationRecord(
    messageId: number,
  ): Observable<number> {
    return this._http.put<number>(
      INSERT_OR_UPDATE_MESSAGE_NOTIFICATION_MODEL(messageId),
      null,
    );
  }

  // updateMessageName updates an existing message name only
  // see SP[usp_Update_NotificationName] in CPCNotifications
  updateMessageName(
    messageId: number,
    message: MessageModel,
  ): Observable<boolean> {
    return this._http.put<boolean>(UPDATE_MESSAGE_NAME(messageId), message);
  }

  updateMessageNameOnly(
    messageId: number,
    payload: ChangeNotificationTypeDtoModel,
  ): Observable<boolean> {
    return this._http.put<boolean>(UPDATE_MESSAGE_NAME(messageId), payload);
  }

  // updateMessageSelectedNotificationTypesAndName updates the existing
  // Message combination of notification type(s) selected and the Name
  // see SP [usp_Update_NotificationName] in CPCNotifications
  updateMessageNotificationTypesAndName(
    messgaeId: number,
    userSelectedNotificationTypes: number,
    payload: ChangeNotificationTypeDtoModel,
  ): Observable<boolean> {
    return this._http.put<boolean>(
      UPDATE_MESSAGE_NOTIFICATION_TYPES_AND_NAME(
        messgaeId,
        userSelectedNotificationTypes,
      ),
      payload,
    );
  }

  // Checks to make sure the user has access to a valid SMS Sending PhoneNumber
  // and that the group contains memebers with active phonenumbers that can received SMS text messages
  canExistingTextMessageBeSent(messageId: number): Observable<boolean> {
    return this._http.get<boolean>(
      CAN_EXISTING_TEXT_MESSAGE_BE_SENT(messageId),
    );
  }

  // Returns the length of the phone message in seconds.
  // This is used for example to check if the user message is
  // longer than their package allow maximum message length
  getPhoneMessageLength(
    messageId: number,
    formatId: NotificationFormatValues,
  ): Observable<number> {
    return this._http.get<number>(
      GET_PHONE_MESSAGE_LENGTH(messageId, formatId),
    );
  }

  callIn(callMeDetails: CallMePayload): Observable<string> {
    return this._http.post<string, CallMePayload>(
      `${MESSAGE_API_BASE}/callme`,
      callMeDetails,
    );
  }

  // CallMe: definition - is an outbound phone call made from the CallingPost System
  // in an attempt to record the users message over the phone
  // This is distinctly different from our call-In system where
  // the user calls 877-304-7678 and literly logs in to their account over the phone
  // and can perform most of the account operations that can be done from the website
  // including recording a new message to be sent to a group
  // cancelCallMeMessageCreation - cancels an existing call-me request
  cancelCallMeMessageCreation(callMeId: string): Observable<number> {
    return this._http.get<number>(CANCEL_CALLME_MESSAGE_CREATION(callMeId));
  }

  // getCountOfUserMessagesCreated returns the number of existing messages
  // that a user had created.
  // EXAMPLE - This is used to determine if
  // the user has exceeded their message creation limit and if they have
  // require them to delete some messages or automatically delete
  // the oldest message in their list that is not being used.
  getCountOfUserMessagesCreated(): Observable<number> {
    return this._http.get<number>(GET_COUNT_OF_USER_MESSAGES_CREATED);
  }

  // sendSmsOptInRequestToGroupViaEmail - sends an request by email
  // to all members of a group that have not Opted-In to
  // receive SMS text Messages. It creates a customized email body request
  // taylored to each member being notified. Returns the identity of
  // the new email message template that was created.
  sendSmsOptInRequestToGroupViaEmail(groupId: number): Observable<number> {
    return this._http.post<number>(
      SEND_SMS_OPTIN_REQUEST_VIA_EMAIL_TO_GROUP(groupId),
      null,
    );
  }

  // sendSmsOptInRequestToGroupViaText - sends an request by text message
  // to all members of a group that have not Opted-In to
  // receive SMS text Messages. Returns the identity of
  // the new text message template that was created.
  sendSmsOptInRequestToGroupViaText(groupId: number): Observable<number> {
    return this._http.post<number>(
      SEND_SMS_OPTIN_REQUEST_VIA_TEXT_TO_GROUP(groupId),
      null,
    );
  }

  // getAlternateFormatVoiceMessage - returns the file name of the
  // phone playable format of a message by notificationId which is retrieved
  // from the args EncryptedQueryString.
  // see the code snippet below:
  // CPCCommon.EncryptedQueryString tempArgs = new CPCCommon.EncryptedQueryString(args);
  // notificationId = Convert.ToInt32(tempArgs["arg0"].ToString());
  getAlternateFormatVoiceMessageFileName(args: string): Observable<string> {
    return this._httpClient.get<string>(GET_ALTERNATE_FORMAT_VOICE_MESSAGE(args));
  }

  fetchCallMeStatus(callMeId: string): Observable<CallMeRecordingStatuses> {
    return this._http.get<CallMeRecordingStatuses>(
      `${MESSAGE_API_BASE}/callme/${callMeId}`,
    );
  }

  fetchMessages(
    pageSize = 50000,
    pageIndex = 0,
  ): Observable<MessagesResponseDto> {
    return this._http.get(
      `${MESSAGE_API_BASE}/?pageSize=${pageSize}&pageIndex=${pageIndex}`,
    );
  }

  fetchMessageDetails(
    messageId: number,
    formatId: NotificationFormatValues,
  ): Observable<MessageDetailsResponseDto> {
    return this._http.get<MessageDetailsResponseDto>(
      `${MESSAGE_API_BASE}/${messageId}/${formatId}`,
    );
  }

  fetchMessageFiles(
    messageId: number,
    formatId: NotificationFormatValues,
  ): Observable<MessageFilesResponseDto> {
    return this._http.get<MessageFilesResponseDto>(
      `${MESSAGE_API_BASE}/${messageId}/${formatId}/files`,
    );
  }

  private createMessageDtoRequest(
    userId: number,
    message: MessageModel,
    messageFormats: SelectedMessagesModel,
  ): MessagePayloadModelDto {
    return {
      ...messageFormats,
      message: {
        ...message,
        memberID: userId,
      },
    };
  }

  deleteAllMessages(): Observable<object> {
    return this._http.delete(DELETE_MESSAGES);
  }

  deleteSpecificMessage(messageId: number) {
    return this._http.delete(DELETE_SPECIFIC_MESSAGE(messageId));
  }

  editPhoneOptions(messageId: number, payload: any): Observable<any> {
    return this._http.put(EDIT_PHONE_OPTIONS(messageId), payload);
  }
  editSmsTextOptions(messageId: number, payload: any): Observable<any> {
    return this._http.put(EDIT_SMS_TEXT(messageId), payload);
  }

  editEmailOptions(messageId: number, payload: any): Observable<any> {
    return this._http.put(EDIT_EMAIL_OPTIONS(messageId), payload);
  }

  editSmsOptions(messageId: number, payload: any): Observable<any> {
    return this._http.put(EDIT_SMS_OPTIONS(messageId), payload);
  }
}

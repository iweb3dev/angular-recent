import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as moment from 'moment';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';
import { MessagesService } from 'src/app/api/messages/messages.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { NotificationFormatValues } from 'src/app/shared/models/message/message.models';
import {
  hasEmailFormat,
  hasPhoneFormat,
  hasTextFormat,
} from 'src/app/shared/utils/message/notification-format.helper';

import { EmailPreviewComponent } from '../email-preview/email-preview.component';
import { TextPreviewComponent } from '../text-preview/text-preview.component';
import { VoicePreviewComponent } from '../voice-preview/voice-preview.component';
import {
  MessagesDetailsModel,
  PreviousMessageRenderModel,
} from './message-preview.models';

@Injectable({
  providedIn: 'root',
})
export class MessagePreviewService {
  constructor(
    private _messagesService: MessagesService,
    private _loaderService: LoaderService,
    private _matDialog: MatDialog,
  ) {}

  openMessageDetailsDialog(
    messageId: number,
    formatId: NotificationFormatValues,
    creationDate: string,
    showActions: { showActions: boolean },
  ) {
    this._loaderService.showLoader();
    return this.fetchMessageDetails(messageId, formatId).pipe(
      tap(() => this._loaderService.removeLoader()),
      switchMap((messageData) =>
        this.openDialogRef(
          formatId,
          creationDate,
          messageData,
          showActions,
        ).pipe(filter((value) => !!value)),
      ),
    );
  }

  private openDialogRef(
    formatId: NotificationFormatValues,
    creationDate: string,
    messageData: MessagesDetailsModel,
    { showActions }: { showActions: boolean },
  ): Observable<MessagesDetailsModel> {
    switch (formatId) {
      case NotificationFormatValues.TextMessage:
        return this._matDialog
          .open(TextPreviewComponent, {
            height: 'min-content',
            minWidth: '500px',
            autoFocus: false,
            data: {
              creationDate,
              notificationName: messageData.notificationName,
              smsText: messageData.smsText,
              callerId: messageData.callerId,
              textNumber: messageData.textNumber,
              acceptResponses: messageData.acceptResponses,
              smsFromText: messageData.smsFromText,
              showActions,
            },
          })
          .afterClosed();
      case NotificationFormatValues.EmailMessage:
        return this._matDialog
          .open(EmailPreviewComponent, {
            height: 'min-content',
            minWidth: '400px',
            autoFocus: false,
            data: {
              creationDate,
              notificationName: messageData.notificationName,
              callerId: messageData.callerId,
              from: messageData.fromEmailName,
              subject: messageData.emailSubject,
              replyTo: messageData.replyTo,
              emailBody: messageData.emailBody,
              emailJson: messageData.emailJson,
              attachments: messageData.files.pagedObjects,
              showActions,
            },
          })
          .afterClosed();
      case NotificationFormatValues.VoiceMessage:
        return this.createVoiceDialogPreview(
          creationDate,
          messageData,
          showActions,
        ).afterClosed();
    }
  }

  private createVoiceDialogPreview(
    creationDate: string,
    messageData: MessagesDetailsModel,
    showActions,
  ): MatDialogRef<VoicePreviewComponent> {
    return this._matDialog.open(VoicePreviewComponent, {
      height: 'min-content',
      minWidth: '400px',
      autoFocus: false,
      data: {
        creationDate,
        notificationName: messageData.notificationName,
        svm: messageData.svm,
        textAlternateFormatSend: messageData.textAlternateFormatSend,
        emailAlternateFormatSend: messageData.emailAlternateFormatSend,
        lat: messageData.lat,
        callerId: messageData.callerId,
        filename: messageData.files?.fileName,
        showActions,
      },
    });
  }

  private fetchMessageDetails(
    messageId: number,
    formatId: NotificationFormatValues,
  ): Observable<MessagesDetailsModel> {
    if (formatId === NotificationFormatValues.VoiceMessage || formatId === NotificationFormatValues.EmailMessage) {
      return forkJoin([
        this._messagesService.fetchMessageDetails(messageId, formatId),
        this._messagesService.fetchMessageFiles(messageId, formatId),
      ]).pipe(map(([details, files]) => ({ ...details, files })));
    }

    return this._messagesService.fetchMessageDetails(messageId, formatId).pipe(
      map((message) => ({
        ...message,
        files: null,
      })),
    );
  }

  creatMessageListEntryModel(
    message: MessagePagedObjectsDto,
  ): PreviousMessageRenderModel {
    const { notificationFormatValue } = message;

    return {
      creationDate: moment(message.dateLastSent).format('MM/DD/YYYY'),
      messageName: message.notificationName,
      id: message.id,
      showPhoneMessage: hasPhoneFormat(notificationFormatValue),
      showTextMessage: hasTextFormat(notificationFormatValue),
      showEmailMessage: hasEmailFormat(notificationFormatValue),
      acceptResponses: message.acceptResponses,
    };
  }
}

import { ConvertTimeToTimeZone } from '@shared/pipes/convert-time-to-time-zone.pipe';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { BuildCommuniationsQueue, CommunicationDetails, SendCommunication } from 'src/app/api/communications/communications.models';
import { CommunicationsService } from 'src/app/api/communications/communications.service';
import { MessagesService } from 'src/app/api/messages/messages.service';
import { CommunicationConfirmActionTypes } from 'src/app/api/shared/shared.enums';
import { DateAndTimeSettings } from 'src/app/api/shared/shared.models';
import { Package, ResponseUserSystemSettings } from 'src/app/api/users/users.models';
import { UsersService } from 'src/app/api/users/users.service';
import { MessageStateModel } from 'src/app/core/store/features/new-message/new-message.models';
import { CommunicationDetailsComponent } from 'src/app/new-communication/communication-details/message-confirm/communication-details/communication-details.component';
import { ScheduleOptionsModel } from 'src/app/new-communication/communication-details/message-confirm/message-confirm.models';
import { ScheduleDialogComponent } from 'src/app/new-communication/communication-details/message-confirm/schedule/schedule-dialog/schedule-dialog.component';
import { ScheduleSheetComponent } from 'src/app/new-communication/communication-details/message-confirm/schedule/schedule-sheet/schedule-sheet.component';

import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { NotificationFormatValues } from 'src/app/shared/models/message/message.models';

@Injectable({ providedIn: 'root' })
export class MessageConfirmService {
  constructor(
    private convertTimeToTimeZone: ConvertTimeToTimeZone,
    private _communicationsService: CommunicationsService,
    private _messagesService: MessagesService,
    private _usersService: UsersService,
    private _bottomSheet: MatBottomSheet,
    private _toastService: ToastService,
    private _matDialog: MatDialog
  ) {}

  createCommunicationQueue(payload: SendCommunication): Observable<BuildCommuniationsQueue> {
    return this._communicationsService.createCommunicationQueue(payload);
  }

  confirmCommunicationQueue(communicationId: number, payload: SendCommunication): Observable<boolean> {
    return this._communicationsService.updateCommunicationInQueue(communicationId, payload);
  }

  updateCommunicationInQueue(communicationId: number, payload: SendCommunication): Observable<boolean> {
    return this._communicationsService.updateCommunicationInQueue(communicationId, payload);
  }

  openErrorSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Error, message);
  }

  openSuccessSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Success, message);
  }

  fetchPhoneMessageLength(messageId: number, formatId: NotificationFormatValues): Observable<number> {
    return this._messagesService.getPhoneMessageLength(messageId, formatId);
  }

  openDatePicker(isMobileView): Observable<ScheduleOptionsModel> {
    if (isMobileView) {
      return this._bottomSheet.open(ScheduleSheetComponent, {}).afterDismissed();
    }

    return this._matDialog
      .open(ScheduleDialogComponent, {
        maxWidth: '450px',
        minWidth: '450px',
        autoFocus: false,
      })
      .afterClosed();
  }

  fetchUserSettings(): Observable<ResponseUserSystemSettings[]> {
    return this._usersService.getUserSystemSettings();
  }

  createCommunicationQueuePayload(
    messageState: MessageStateModel,
    userPackage: Package,
    phoneMessageLength: number,
    scheduleOptions: ScheduleOptionsModel,
    settings: ResponseUserSystemSettings[]
  ): SendCommunication {
    let scheduleTime = scheduleOptions?.date;

    if (!scheduleTime) {
      scheduleTime = moment();
    }

    const message = messageState.message;
    const endTime = scheduleTime.clone().add(1, 'days');
    const sendInMemberZoneSetting = settings.find((setting) => setting.id === 42);

    return {
      groupIDs: messageState.messageRecipients.map((recipient) => recipient.id),
      notificationID: messageState.messageId,
      notificationName: message.messageName,
      acceptResponses: !!message.allowedResponses.length,
      alternateFormatSend: !!message.allowedResponses.length,
      cid: message.callerId,
      ehm: userPackage.afterHourMessaging,
      emailAlternateFormatSend: message.emailAlternateFormatSend,
      includeGroupSiteLink: false,
      lat: message.lat,
      latMax: 0,
      noTrailer: userPackage.noTrailer,
      notificationFormatValue: messageState.notificationFormatValue,
      phoneMessageLength,
      reducedTrailer: userPackage.reducedTrailer,
      sendInMembersPreferredTime: sendInMemberZoneSetting ? sendInMemberZoneSetting.settingValue === 'true' : false,
      sendInMembersTimeZone: sendInMemberZoneSetting ? sendInMemberZoneSetting.settingValue === 'true' : false,
      sendNow: !scheduleOptions,
      sentVia: 1,
      setMessageEndTime: false,
      startDateTime: scheduleTime.toDate(),
      svm: message.svm,
      textAlternateFormatSend: message.textAlternateFormatSend,
      textNumber: message.textNumber,
      twentyFourSevenMessaging: userPackage.twentyFourSevenMessaging,
      communicationStartDateTime: this.createStartEndDateTimeSettings(scheduleTime),
      communicationEndDateTime: this.createStartEndDateTimeSettings(endTime),
      isEmergency: false,
      endDateTime: endTime.toDate(),
      isInitialOptIn: false,
      isPriorityCallout: false,
      isSendEmailSmsOptIn: false,
      controlTime: scheduleTime.toDate(),
    };
  }

  openCommunicationDetailsPopup(communication: BuildCommuniationsQueue): Observable<void> {
    return this._matDialog
      .open(CommunicationDetailsComponent, {
        data: communication,
        width: '535px',
        autoFocus: false,
      })
      .afterClosed();
  }

  fetchCommunicationDetails(communicationId: number): Observable<CommunicationDetails> {
    return this._communicationsService.getCommunicationDetails(communicationId, '');
  }

  setCommunicationConfirmed(communicationId: number): Observable<boolean> {
    return this._communicationsService.confirmOrCancelCommunication(
      communicationId,
      CommunicationConfirmActionTypes.CommunicationConfirmed
    );
  }

  setCommunicationCancel(communicationId: number): Observable<boolean> {
    return this._communicationsService.confirmOrCancelCommunication(
      communicationId,
      CommunicationConfirmActionTypes.CommunicationCancelledIssueCredits
    );
  }

  private createStartEndDateTimeSettings(scheduleTime: moment.Moment): DateAndTimeSettings {
    return {
      year: scheduleTime.year(),
      month: scheduleTime.month() + 1,
      day: scheduleTime.date(),
      hour: scheduleTime.hour(),
      minute: scheduleTime.minutes(),
      second: scheduleTime.second(),
    };
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DeliveryStatistics } from 'src/app/api/communications/communications.models';
import {
  CommunicationEndpointTypes,
  NotificationStatusTypes,
} from 'src/app/api/shared/shared.enums';
import { CommunicationResult } from 'src/app/core/store/features/communications/communications.models';
import { MessageResultsDetailFacade } from '../../store/message-results-detail.facade';
import { MessageRecipient } from '../../store/message-results-detail.models';
import { MessageDetailsService } from '../services/message-details.service';

@Component({
  selector: 'app-message-details-overview',
  templateUrl: './message-details-overview.component.html',
  styleUrls: ['./message-details-overview.component.scss'],
})
export class MessageDetailsOverviewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  endPointTypes = CommunicationEndpointTypes;
  messageResult$ = this._messageResultsDetailFacade.messageResultOverview$.pipe(
    tap((s) => this.mapStatus(s)),
  );
  deliveryStatistics$ =
    this._messageResultsDetailFacade.deliveryStatistics$.pipe(
      tap((s) => this.mapDeliveryStatistics(s)),
    );
  isMobileView = false;
  communicationClass: string;
  communicationStatus: string;
  statusIcon: string;

  phoneRecipients: number;
  answeringMachines: number;
  liveAnswers: number;
  undeliveredPhones: number;

  emailRecipients: number;
  openedEmails: number;
  clickedEmails: number;
  undeliveredEmails: number;

  textRecipients: number;
  deliveredTexts: number;
  undeliveredTexts: number;
  pollingResultYes: number;
  pollingResultNo: number;
  pollingResultMaybe: number;
  pollingResultNoResponse: number;
  isPrinting = false;

  messages: any;

  constructor(
    private _messageResultsDetailFacade: MessageResultsDetailFacade,
    private _messageDetailsService: MessageDetailsService,
  ) {}

  ngOnInit() {
    if (window.innerWidth < 1000) {
      this.isMobileView = true;
    }

    this._messageResultsDetailFacade.messageRecipients$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => this.mapRecpientsToPollingResults(res));

    this.messageResult$
      .pipe(
        takeUntil(this.destroy$),
        map((message) => ({
          ...message,
          id: message['notificationID'],
          flaggedForDelete: false,
        })))
      .subscribe((res) => {
        this.messages = res;
      });
  }

  onNavigateBack() {
    this._messageDetailsService.close();
  }

  mapStatus(messageResult: CommunicationResult): void {
    switch (messageResult.notificationStatus) {
      case NotificationStatusTypes.completed:
        this.setStatusInfo('completed', 'Completed', 'done');
        break;
      case NotificationStatusTypes.cancelled:
        this.setStatusInfo('cancelled', 'Cancelled', 'close');
        break;
      case NotificationStatusTypes.scheduled:
        this.setStatusInfo('scheduled', 'Scheduled', 'update');
        break;
      case NotificationStatusTypes.started:
        this.setStatusInfo('in-progress', 'In Progress', 'update');
        break;
    }
  }

  mapDeliveryStatistics(deliveryStatistics: DeliveryStatistics) {
    if (!deliveryStatistics) {
      return;
    }

    const phoneDelivered = deliveryStatistics.delivered.find(
      (s) => s.endPoint === CommunicationEndpointTypes.phone,
    );
    const phoneToDeliver = deliveryStatistics.toDeliver.find(
      (s) => s.endPoint === CommunicationEndpointTypes.phone,
    );

    this.phoneRecipients = phoneToDeliver.toDeliver;
    this.liveAnswers = phoneDelivered.liveAnswers;
    this.undeliveredPhones =
      this.communicationClass !== 'scheduled'
        ? phoneToDeliver.toDeliver - phoneDelivered.delivered
        : 0;
    this.answeringMachines = phoneDelivered.answeringMachines;

    const emailDelivered = deliveryStatistics.delivered.find(
      (s) => s.endPoint === CommunicationEndpointTypes.email,
    );
    const emailToDeliver = deliveryStatistics.toDeliver.find(
      (s) => s.endPoint === CommunicationEndpointTypes.email,
    );

    this.emailRecipients = emailToDeliver.toDeliver;
    this.openedEmails = emailDelivered.openEmails;
    this.clickedEmails = emailDelivered.clickedEmails;
    this.undeliveredEmails = emailDelivered.undeliverableEmails;

    const textDelivered = deliveryStatistics.delivered.find(
      (s) => s.endPoint === CommunicationEndpointTypes.sms,
    );
    const textToDeliver = deliveryStatistics.toDeliver.find(
      (s) => s.endPoint === CommunicationEndpointTypes.sms,
    );

    this.textRecipients = textToDeliver.toDeliver;
    this.deliveredTexts = textDelivered.delivered;
    this.undeliveredTexts = textDelivered.undeliverableTexts;
  }

  mapRecpientsToPollingResults(recipients: MessageRecipient[]) {
    this.pollingResultYes = recipients.filter(
      (s) => s.response.toLowerCase() === 'yes',
    ).length;
    this.pollingResultNo = recipients.filter(
      (s) => s.response.toLowerCase() === 'no',
    ).length;
    this.pollingResultMaybe = recipients.filter(
      (s) => s.response.toLowerCase() === 'maybe',
    ).length;
    this.pollingResultNoResponse = recipients.filter(
      (s) => s.response.toLowerCase() === 'no response',
    ).length;
  }

  calculatePercentage(part: number, whole: number): number {
    if (whole === 0) {
      return 0;
    }

    return (part / whole) * 100;
  }

  onViewMessageRecipients(endpointType: CommunicationEndpointTypes) {
    this._messageResultsDetailFacade.setCommunicationEndpointType(endpointType);
  }

  private setStatusInfo(
    communicationClass: string,
    communicationStatus: string,
    statusIcon: string,
  ) {
    this.communicationClass = communicationClass;
    this.communicationStatus = communicationStatus;
    this.statusIcon = statusIcon;
  }

  printExport() {
    this.isPrinting = true;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

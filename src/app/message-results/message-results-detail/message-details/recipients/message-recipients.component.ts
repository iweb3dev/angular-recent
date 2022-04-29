import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import {
  CommunicationEndpointTypes,
  NotificationStatusTypes,
} from 'src/app/api/shared/shared.enums';
import { MessageResultsDetailFacade } from '../../store/message-results-detail.facade';
import {
  MessageRecipient,
  MessageRecipientViewModel,
} from '../../store/message-results-detail.models';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PrintRecipientsComponent } from '../print-recipients/print-recipients.component';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { CommunicationResult } from '@core/store/features/communications/communications.models';

@Component({
  selector: 'app-message-recipients',
  templateUrl: './message-recipients.component.html',
  styleUrls: ['./message-recipients.component.scss'],
  providers: [DatePipe],
})
export class MessageRecipientsComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  displayedColumns: string[] = [
    'endpointAddress',
    'recipient',
    'deliveryDate',
    'attempts',
    'results',
  ];
  messageResult$ = this._messageResultsDetailFacade.messageResultOverview$.pipe(
    tap((s) => this.mapStatus(s))
  );
  messageRecipientsType$ =
    this._messageResultsDetailFacade.messageRecipientEndpointType$;
  messageRecipients$ = this._messageResultsDetailFacade.messageRecipients$.pipe(
    withLatestFrom(this.messageRecipientsType$),
    map((res) => this.mapRecipients(res))
  );
  userTimeZone$ = this._userFacade.currentUserInfo$.pipe(
    map((s) => s.timeZone?.timeZoneAbbreviation)
  );

  messageEndpointTypeIcon: string;
  messageEndpointTypeName: string;
  memberEndpointAddressName: string;
  showDesktop = true;

  communicationClass: string;
  communicationStatus: string;
  statusIcon: string;

  messages: any;

  constructor(
    private _messageResultsDetailFacade: MessageResultsDetailFacade,
    private _userFacade: UserFacade,
    private _datePipe: DatePipe,
    private _matDlg: MatDialog
  ) {}

  ngOnInit(): void {
    this.showDesktop = window.innerWidth > 1000;
    this._messageResultsDetailFacade.messageRecipientEndpointType$
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        switch (res) {
          case CommunicationEndpointTypes.phone:
            this.setEndpointType('phone_in_talk', 'Voice', 'NUMBER');
            return;
          case CommunicationEndpointTypes.email:
            this.setEndpointType('mail_outline', 'Email', 'ADDRESS');
            return;
          case CommunicationEndpointTypes.sms:
            this.setEndpointType('sms', 'Text', 'NUMBER');
            return;
        }
      });

    this.messageResult$
      .pipe(
        takeUntil(this._destroy$),
        map((message) => ({
          ...message,
          id: message['notificationID'],
          flaggedForDelete: false,
        }))
      )
      .subscribe((res) => {
        this.messages = res;
      });
  }

  printExport() {
    this._matDlg.open(PrintRecipientsComponent, {
      width: '1000px',
    });
  }

  onExport() {
    combineLatest([
      this.messageRecipients$,
      this.messageResult$,
      this.userTimeZone$,
    ])
      .pipe(take(1))
      .subscribe(([recipients, msgResult, timeZone]) => {
        const rows = [
          [
            'MEMBER ' + this.messageEndpointTypeName,
            'NAME',
            'DELIVERY',
            'ATTEMPTS',
            'RESULTS',
          ],
        ];

        let csvContent = 'data:text/csv;charset=utf-8,';

        recipients.forEach((d) => {
          rows.push([
            d.endpointAddress,
            d.recipient,
            `${this._datePipe.transform(
              d.deliveryDate,
              'MM/dd/yy'
            )}, ${this._datePipe.transform(
              d.deliveryDate,
              'h:mm a'
            )} ${timeZone}`,
            d.attempts.toString(),
            d.results,
          ]);
        });

        rows.forEach((rowArray) => {
          const row = rowArray.join(',');
          csvContent += row + '\r\n';
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${msgResult.notificationName}.csv`);
        document.body.appendChild(link);
        link.click();
      });
  }

  onNavigateBack() {
    this._messageResultsDetailFacade.resetRecipients();
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

  private setStatusInfo(
    communicationClass: string,
    communicationStatus: string,
    statusIcon: string
  ) {
    this.communicationClass = communicationClass;
    this.communicationStatus = communicationStatus;
    this.statusIcon = statusIcon;
  }

  private setEndpointType(icon: string, name: string, address: string) {
    this.messageEndpointTypeIcon = icon;
    this.messageEndpointTypeName = name;
    this.memberEndpointAddressName = address;
  }

  private mapRecipients([recipients, type]: [
    MessageRecipient[],
    CommunicationEndpointTypes
  ]): MessageRecipientViewModel[] {
    switch (type) {
      case CommunicationEndpointTypes.phone:
        return recipients.map((s) => ({
          endpointAddress: this.formatPhoneMask(s.address),
          recipient: s.memberName,
          deliveryDate: s.resultDate,
          attempts: s.phoneAttempt,
          results: s.resultPhone,
          icon: this.setResultsIcon(s.resultPhone),
        }));
      case CommunicationEndpointTypes.email:
        return recipients.map((s) => ({
          endpointAddress: s.emailAddress,
          recipient: s.memberName,
          deliveryDate: s.resultDate,
          attempts: s.emailAttempt,
          results: s.resultEmail,
          icon: this.setResultsIcon(s.resultEmail),
        }));
      case CommunicationEndpointTypes.sms:
        return recipients.map((s) => ({
          endpointAddress: this.formatPhoneMask(s.address),
          recipient: s.memberName,
          deliveryDate: s.resultDate,
          attempts: s.smsAttempt,
          results: s.resultText,
          icon: this.setResultsIcon(s.resultPhone),
        }));
      default:
        throw new Error('Failed mapping message recipients');
    }
  }

  private formatPhoneMask(number: string) {
    const first = number.slice(0, 3);
    const second = number.slice(3, 6);
    const third = number.slice(6);

    return `${first}-${second}-${third}`;
  }

  private setResultsIcon(results: string) {
    const compare = (str: string) =>
      str.toLocaleLowerCase() === results.toLocaleLowerCase();
    switch (true) {
      case compare('answering machine'):
        return {
          name: 'date_range',
          extraClass: 'answering-machine',
        };
      case compare('opened'):
        return {
          name: 'done',
          extraClass: 'opened',
        };
      case compare('undelivered'):
        return {
          name: 'close',
          extraClass: 'undelivered',
        };
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}

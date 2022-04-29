import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { CommunicationEndpointTypes } from 'src/app/api/shared/shared.enums';
import { MessageResultsDetailFacade } from '../../store/message-results-detail.facade';
import { MessageRecipient, MessageRecipientViewModel } from '../../store/message-results-detail.models';

@Component({
  selector: 'app-print-recipients',
  templateUrl: './print-recipients.component.html',
  styleUrls: ['./print-recipients.component.scss']
})
export class PrintRecipientsComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  displayedColumns: string[] = [
    'endpointAddress',
    'recipient',
    'deliveryDate',
    'attempts',
    'results'
  ];
  messageResult$ = this._messageResultsDetailFacade.messageResultOverview$;
  messageRecipientsType$ = this._messageResultsDetailFacade.messageRecipientEndpointType$;
  messageRecipients$ = this._messageResultsDetailFacade.messageRecipients$.pipe(
    withLatestFrom(this.messageRecipientsType$),
    map((res) => this.mapRecipients(res)));

  messageEndpointTypeIcon: string;
  messageEndpointTypeName: string;
  memberEndpointAddressName: string;

  constructor(
    private _messageResultsDetailFacade: MessageResultsDetailFacade,
    private _dlg: MatDialogRef<PrintRecipientsComponent>) {}

  ngOnInit(): void {
    this._messageResultsDetailFacade.messageRecipientEndpointType$.pipe(
      takeUntil(this._destroy$)
    ).subscribe(res => {
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
  }

  private setEndpointType(icon: string, name: string, address: string) {
    this.messageEndpointTypeIcon = icon;
    this.messageEndpointTypeName = name;
    this.memberEndpointAddressName = address;
  }

  private mapRecipients([recipients, type]: [MessageRecipient[], CommunicationEndpointTypes]): MessageRecipientViewModel[] {
    switch (type) {
      case CommunicationEndpointTypes.phone:
        return recipients.map(s => ({
          endpointAddress: this.formatPhoneMask(s.address),
          recipient: s.memberName,
          deliveryDate: s.resultDate,
          attempts: s.phoneAttempt,
          results: s.resultPhone,
          icon: this.setResultsIcon(s.resultPhone)
        }));
      case CommunicationEndpointTypes.email:
        return recipients.map(s => ({
          endpointAddress: s.emailAddress,
          recipient: s.memberName,
          deliveryDate: s.resultDate,
          attempts: s.emailAttempt,
          results: s.resultEmail,
          icon: this.setResultsIcon(s.resultEmail)
        }));
      case CommunicationEndpointTypes.sms:
        return recipients.map(s => ({
          endpointAddress: this.formatPhoneMask(s.address),
          recipient: s.memberName,
          deliveryDate: s.resultDate,
          attempts: s.smsAttempt,
          results: s.resultText,
          icon: this.setResultsIcon(s.resultPhone)
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
    const compare = (str: string) => str.toLocaleLowerCase() === results.toLocaleLowerCase();
    switch (true) {
      case compare('answering machine'):
        return {
          name: 'date_range',
          extraClass: 'answering-machine'
        };
      case compare('opened'):
        return {
          name: 'done',
          extraClass: 'opened'
        };
      case compare('undelivered'):
        return {
          name: 'close',
          extraClass: 'undelivered'
        };
    }
  }

  onClose() {
    this._dlg.close();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}

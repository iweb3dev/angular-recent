import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagePagedObjectsDto } from '@api/messages/messages.models';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommunicationsService } from 'src/app/api/communications/communications.service';
import { NotificationStatusTypes } from 'src/app/api/shared/shared.enums';
import { CommunicationResult } from 'src/app/core/store/features/communications/communications.models';
import { ConfirmFacade } from 'src/app/core/store/features/new-message/confirm/confirm.facade';
import { MessageDetailsService } from '../../message-details/services/message-details.service';
import { MessageResultsDetailFacade } from '../../store/message-results-detail.facade';

@Component({
  selector: 'app-message-result-frame',
  templateUrl: './message-result-frame.component.html',
  styleUrls: ['./message-result-frame.component.scss'],
})
export class MessageResultFrameComponent implements OnInit {
  @Input() communication: CommunicationResult;
  @Input() desktopView: ViewContainerRef;
  @Input() frameNumber: number;

  messages: MessagePagedObjectsDto;
  communicationClass: string;
  communicationStatus: string;
  statusIcon: string;
  isMobileView = false;
  constructor(
    private _messageDetailsService: MessageDetailsService,
    private _messageResultsDetailFacade: MessageResultsDetailFacade,
    private _confirmFacade: ConfirmFacade,
    private _communicationService: CommunicationsService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 599;
    switch (this.communication.notificationStatus) {
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
    this._searchMessageName().subscribe((result) => (this.messages = result));
  }

  get getFrameNumber(): boolean {
    return this.frameNumber % 2 === 0;
  }

  private _searchMessageName() {
    return of(this._route.snapshot.data.messages).pipe(
      map((messageArr) =>
        messageArr.find(
          (obj) => obj.id === this.communication['notificationID'],
        ),
      ),
    );
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

  onViewResults() {
    this._messageResultsDetailFacade.fetchDeliveryStatistics(
      this.communication.id,
    );
    this._messageResultsDetailFacade.fetchMessageDetails(this.communication.id);
    this._messageResultsDetailFacade.setMessageResultOverview(
      this.communication,
    );
    this._messageDetailsService.open(this.desktopView).subscribe();
  }

  onCommunicationCancel(communicationId) {
    const searchText = this._communicationService.searchText;
    const historyTypeId = this._communicationService.historyType;
    this._confirmFacade.communicationCancel(
      communicationId,
      searchText,
      0,
      historyTypeId,
      25,
      0,
    );
  }
}

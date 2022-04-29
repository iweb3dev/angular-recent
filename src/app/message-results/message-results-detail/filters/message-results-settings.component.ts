import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CommunicationMessageTypes, CommunicationResultsSort } from '../store/message-results-detail.models';
import { MessageResultsDetailFacade } from '../store/message-results-detail.facade';
import { takeUntil } from 'rxjs/operators';
import { MessageHistoryTypes, NotificationStatusTypes } from 'src/app/api/shared/shared.enums';

@Component({
  selector: 'app-message-results-settings',
  templateUrl: './message-results-settings.component.html',
  styleUrls: ['./message-results-settings.component.scss']
})
export class MessageResultsSettingsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  @Input() data: { next: Subject<any> };
  sortOptions = Object.keys(CommunicationResultsSort)
  .filter(s => !isNaN(+s))
  .reduce((a, b) => {
    a[b] = CommunicationResultsSort[b].replace(/([A-Z])/g, ' $1').trim();
    return a;
  }, {});
  messageTypeOptions = Object.keys(CommunicationMessageTypes)
  .filter(s => !isNaN(+s))
  .reduce((a, b) => {
    a[b] = CommunicationMessageTypes[b].replace(/([A-Z])/g, ' $1').trim();
    return a;
  }, {});
  filters: {
    messageType: CommunicationMessageTypes[],
    status: NotificationStatusTypes[],
    sort: CommunicationResultsSort,
    history?: MessageHistoryTypes
  };

  historyType = [
    { name: 'All', value: 3 },
    { name: 'In Progress', value: 0 },
    { name: 'Completed', value: 1 },
    { name: 'Cancelled', value: 2 },
    { name: 'Scheduled', value: 4 },
  ];

  constructor(private _messageResultsDetailFacade: MessageResultsDetailFacade) {}

  ngOnInit() {
    this._messageResultsDetailFacade.currentFilters$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => this.filters = res);
  }
 // CommunicationMessageTypes
  onToggleMessageType(type: string , { checked }: { checked: boolean}) {
    if (checked) {
      this.filters.messageType = [...this.filters.messageType, +type];
    } else {
      this.filters.messageType = this.filters.messageType.filter(s => s !== +type);
    }
  }

  onToggleMessageStatus(status: CommunicationResultsSort) {
    this.filters.history = +status;
  }

  onConfirm() {
    this._messageResultsDetailFacade.setFilterSettings({
      ...this.filters
    });
    this.data.next.next();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}

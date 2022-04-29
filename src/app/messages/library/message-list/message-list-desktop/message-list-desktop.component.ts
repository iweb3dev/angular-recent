import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Sort, SortDirection } from '@angular/material/sort';
import { MessagePagedObjectsDto } from '@api/messages/messages.models';
import { TimeZone } from '@api/shared/shared.models';
import { BehaviorSubject } from 'rxjs';
import { VirtualTableItemWidth } from 'src/app/groups/enums/group-list.enum';
import { MessagesListModel } from 'src/app/messages/messages.models';
// import * as moment from 'moment-timezone';

@Component({
  selector: 'app-message-list-desktop',
  templateUrl: './message-list-desktop.component.html',
  styleUrls: ['./message-list-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class MessageListDesktopComponent implements OnInit {
  static readonly BUFFER_SIZE = 3;
  public readonly virtualTableLimits = VirtualTableItemWidth;

  @Input()
  showDeleteSelection: boolean;

  @Input()
  numberOfMessages: number;

  @Input()
  messagesLoaded = false;

  @Input()
  userTimeZone: TimeZone;

  @Input()
  set messages(messages: MessagesListModel[]) {
    this._messages = messages;
    this.sortedData$.next(this._messages);
  }

  get messages(): MessagesListModel[] {
    return this._messages;
  }

  @Output()
  messageSend = new EventEmitter<number>();

  @Output()
  deleteMessage = new EventEmitter<{
    messageId: number;
    shouldDelete: boolean;
  }>();

  @Output()
  deleteSingleMessage = new EventEmitter<number>();

  public sortedData$ = new BehaviorSubject<Array<MessagesListModel>>([]);
  public expandedElement: MessagesListModel | null;
  private sortBy = { asc: 'asc', desc: 'desc' };
  private messageSort = {
    name: 'notificationName',
    sentDate: 'lastSentDate',
    editedDate: 'lastEditedDate',
  };
  public sort: { active: string; direction: SortDirection } = {
    active: 'lastEditedDate',
    direction: 'asc',
  };
  public displayedColumns: Array<string> = [
    'messageSelection',
    'notificationName',
    'preview',
    'lastEditedDate',
    'lastSentDate',
  ];
  private _messages: MessagesListModel[];
  constructor() {}

  ngOnInit(): void {}

  onMessageDeleteClick(
    message: MessagePagedObjectsDto,
    event: MatCheckboxChange,
  ): void {
    this.deleteMessage.emit({
      messageId: message.id,
      shouldDelete: event.checked,
    });
  }

  public sortOnChange(sort: Sort): void {
    const copyData = this._messages.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData$.next(copyData);
      return;
    }
    const sortData = copyData.sort((a, b) => {
      const isAsc = sort.direction === this.sortBy.asc;
      switch (sort.active) {
        case this.messageSort.name:
          return this.compare(a.notificationName, b.notificationName, isAsc);
        case this.messageSort.sentDate:
          return this.compare(a.dateLastSent, b.dateLastSent, isAsc);
        case this.messageSort.editedDate:
          return this.compare(
            a.modifiedByDateTime,
            b.modifiedByDateTime,
            isAsc,
          );
        default:
          return 0;
      }
    });
    this.sortedData$.next(sortData);
  }

  compare(
    a: number | string | Date,
    b: number | string | Date,
    isAsc: boolean,
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

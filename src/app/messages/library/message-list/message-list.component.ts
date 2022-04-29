import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeZone } from 'src/app/api/shared/shared.models';

import { MessagesListModel } from '../../messages.models';
import { GroupListLimits } from 'src/app/groups/enums/group-list.enum';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListComponent implements OnInit {
  static readonly BUFFER_SIZE = 3;

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
    this._messages = messages.map((message) => ({
      ...message,
      dateLastSent: message.dateLastSent.includes('0001') ? null : message.dateLastSent,
    }));
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

  private _messages: MessagesListModel[];

  constructor() {}

  ngOnInit(): void {}

  public get mobileView() {
    return window.innerWidth <= GroupListLimits.MobileViewLimit;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MessagePagedObjectsDto } from '@api/messages/messages.models';
import { TimeZone } from '@api/shared/shared.models';
import { MessagesListModel } from 'src/app/messages/messages.models';

@Component({
  selector: 'app-message-list-mobile',
  templateUrl: './message-list-mobile.component.html',
  styleUrls: ['./message-list-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageListMobileComponent implements OnInit {
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
    this._messages = messages;
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
  onMessageDeleteClick(
    message: MessagePagedObjectsDto,
    event: MatCheckboxChange,
  ): void {
    this.deleteMessage.emit({
      messageId: message.id,
      shouldDelete: event.checked,
    });
  }
}

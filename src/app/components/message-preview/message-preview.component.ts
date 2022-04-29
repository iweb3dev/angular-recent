import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';
import { NotificationFormatValues } from 'src/app/shared/models/message/message.models';

import { PreviousMessageRenderModel } from './message-preview.models';
import { MessagePreviewService } from './message-preview.service';

@Component({
  selector: 'app-message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent implements OnInit {
  @Input()
  set message(message: MessagePagedObjectsDto) {
    this._renderMessage =
      this._messagePreviewService.creatMessageListEntryModel(message);
  }

  @Input()
  set hideMessageActions(value: boolean) {
    this._hideMessageActions = coerceBooleanProperty(value);
  }

  @Output()
  selectMessage = new EventEmitter<void>();

  private _renderMessage: PreviousMessageRenderModel;
  private _hideMessageActions = false;

  get renderMessage(): PreviousMessageRenderModel {
    return this._renderMessage;
  }

  constructor(private _messagePreviewService: MessagePreviewService) {}

  ngOnInit(): void {}

  onEmailMessageDetailsOpen(
    id: number,
    creationDate: string,
    event: MouseEvent
  ): void {
    event.stopPropagation();
    this._messagePreviewService
      .openMessageDetailsDialog(
        id,
        NotificationFormatValues.EmailMessage,
        creationDate,
        { showActions: !this._hideMessageActions }
      )
      .subscribe(() => this.selectMessage.emit());
  }

  onTextMessageDetailsOpen(
    id: number,
    creationDate: string,
    event: MouseEvent
  ): void {
    event.stopPropagation();
    this._messagePreviewService
      .openMessageDetailsDialog(
        id,
        NotificationFormatValues.TextMessage,
        creationDate,
        { showActions: !this._hideMessageActions }
      )
      .subscribe(() => this.selectMessage.emit());
  }

  onPhoneMessageDetailsOpen(
    id: number,
    creationDate: string,
    event: MouseEvent
  ): void {
    event.stopPropagation();
    this._messagePreviewService
      .openMessageDetailsDialog(
        id,
        NotificationFormatValues.VoiceMessage,
        creationDate,
        { showActions: !this._hideMessageActions }
      )
      .subscribe(() => this.selectMessage.emit());
  }

  // tslint:disable-next-line: member-ordering
  static ngAcceptInputType_hideMessageActions: BooleanInput;
}

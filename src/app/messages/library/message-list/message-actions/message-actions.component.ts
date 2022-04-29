import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessagesListModel } from 'src/app/messages/messages.models';

import { MessageActionsService } from './message-actions.service';

@Component({
  selector: 'app-message-actions',
  templateUrl: './message-actions.component.html',
  styleUrls: ['./message-actions.component.scss'],
})
export class MessageActionsComponent implements OnInit {
  @Input()
  message: MessagesListModel;

  @Output()
  messageSend = new EventEmitter<number>();

  @Output()
  deleteMessage = new EventEmitter<number>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _messageActionsService: MessageActionsService,
  ) {}

  ngOnInit(): void {}

  onMessageDelete(): void {
    this._messageActionsService
      .openDeleteConfirm()
      .subscribe(() => this.deleteMessage.emit(this.message.id));
  }

  onMessageEdit(): void {
    this._router.navigate(['../', 'edit', this.message.id], {
      relativeTo: this._route,
    });
  }
}

import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';

import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';

@Component({
  selector: 'app-more-actions',
  templateUrl: './more-actions.component.html',
  styleUrls: ['./more-actions.component.scss'],
})
export class MoreActionsComponent implements OnInit {
  readonly positions = [
    new ConnectionPositionPair(
      {
        originX: 'center',
        originY: 'bottom',
      },
      {
        overlayX: 'end',
        overlayY: 'top',
      },
      25,
      10,
    ),
  ];

  @Input()
  messages: MessagePagedObjectsDto[];

  @Input()
  numberOfMessages: number;

  @Output()
  deleteAllMessages = new EventEmitter<void>();

  @Output()
  selectDeleteMessages = new EventEmitter<void>();

  private _overlayOpen = false;
  constructor(private _confirmDialogService: ConfirmDialogService) {}

  set isOpen(open: boolean) {
    this._overlayOpen = open;
  }

  get isOpen(): boolean {
    return this._overlayOpen;
  }

  ngOnInit(): void {}

  onDeleteAllMessages(): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Delete All Messages',
        detail: 'Are you sre you want to delete all messages?',
      })
      .subscribe((deleteMessages) => {
        if (deleteMessages) {
          this.deleteAllMessages.emit();
        }

        this.isOpen = false;
      });
  }

  onSelectDeleteMessages(): void {
    this.isOpen = false;
    this.selectDeleteMessages.emit();
  }
}

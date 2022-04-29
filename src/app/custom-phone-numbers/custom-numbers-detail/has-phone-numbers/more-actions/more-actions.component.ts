import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';

@Component({
  selector: 'app-more-actions',
  templateUrl: './more-actions.component.html',
  styleUrls: ['./more-actions.component.scss']
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

  @Output()
  deleteAllPhoneNumbers = new EventEmitter<void>();

  @Output()
  selectDeletePhoneNumbers = new EventEmitter<void>();

  private _overlayOpen = false;
  constructor(private _confirmDialogService: ConfirmDialogService) {}

  set isOpen(open: boolean) {
    this._overlayOpen = open;
  }

  get isOpen(): boolean {
    return this._overlayOpen;
  }

  ngOnInit(): void {}

  onDeleteAllNumbers(): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Delete All Phone Numbers',
        detail: 'Are you sre you want to delete all phone numbers?',
      })
      .subscribe((deleteMessages) => {
        if (deleteMessages) {
          this.deleteAllPhoneNumbers.emit();
        }

        this.isOpen = false;
      });
  }

  onSelectDeletePhoneNumbers(): void {
    this.isOpen = false;
    this.selectDeletePhoneNumbers.emit();
  }

}

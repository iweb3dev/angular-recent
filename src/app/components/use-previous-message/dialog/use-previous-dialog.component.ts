import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';

@Component({
  selector: 'app-use-previous-dialog',
  templateUrl: './use-previous-dialog.component.html',
  styleUrls: ['./use-previous-dialog.component.scss'],
})
export class UsePreviousDialogComponent implements OnInit {
  filterText: string;
  messageDetails$: Observable<MessagePagedObjectsDto[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public messages: MessagePagedObjectsDto[],
    private _matDialogRef: MatDialogRef<UsePreviousDialogComponent>
  ) {}

  ngOnInit(): void {}

  onAdd(message: MessagePagedObjectsDto): void {
    this._matDialogRef.close({
      id: message.id,
      isIncludeTextMessage: Boolean(message.textNumber),
    });
  }

  onCloseDialog(): void {
    this._matDialogRef.close();
  }
}

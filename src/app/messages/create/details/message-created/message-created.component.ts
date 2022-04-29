import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-created',
  templateUrl: './message-created.component.html',
  styleUrls: ['./message-created.component.scss'],
})
export class MessageCreatedComponent implements OnInit {
  constructor(private _dialogRef: MatDialogRef<MessageCreatedComponent>) {}

  ngOnInit(): void {}

  onCloseDialog(): void {
    this._dialogRef.close(false);
  }

  createCommunication(): void {
    this._dialogRef.close(true);
  }
}

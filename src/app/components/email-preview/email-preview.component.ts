import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmailPreviewDataModel } from './email-preview.models';

@Component({
  selector: 'app-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss'],
})
export class EmailPreviewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public message: EmailPreviewDataModel,
    private _dialogRef: MatDialogRef<EmailPreviewComponent>,
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this._dialogRef.close();
  }

  onMessageSelect(): void {
    this._dialogRef.close({ selected: true });
  }
}

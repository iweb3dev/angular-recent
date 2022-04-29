import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TextPreviewDataModel } from './text-preview.models';

@Component({
  selector: 'app-text-preview',
  templateUrl: './text-preview.component.html',
  styleUrls: ['./text-preview.component.scss'],
})
export class TextPreviewComponent implements OnInit {
  public showText: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public message: TextPreviewDataModel,
    private _dialogRef: MatDialogRef<TextPreviewComponent>,
  ) {}

  ngOnInit(): void {
    this.showText = this.replaceTextBody(
      this.message?.smsText,
      this.message?.smsFromText,
    );
  }

  onClose(): void {
    this._dialogRef.close();
  }

  onMessageSelect(): void {
    this._dialogRef.close({ selected: true });
  }

  replaceTextBody(text: string, fromNameText: string) {
    return text.replace('From', 'Text').replace(fromNameText, '');
  }
}

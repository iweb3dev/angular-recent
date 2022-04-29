import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VoicePreviewDataModel } from './voice-preview.models';

@Component({
  selector: 'app-voice-preview',
  templateUrl: './voice-preview.component.html',
  styleUrls: ['./voice-preview.component.scss'],
})
export class VoicePreviewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public message: VoicePreviewDataModel,
    private _dialogRef: MatDialogRef<VoicePreviewComponent>,
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this._dialogRef.close();
  }

  onMessageSelect(): void {
    this._dialogRef.close({ selected: true });
  }
}

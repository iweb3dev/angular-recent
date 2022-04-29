import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommunicationsService } from 'src/app/api/communications/communications.service';
import { TranslationLanguageCodes } from 'src/app/shared/models/translations/translations.enum';

@Component({
  selector: 'app-tts-dialog',
  templateUrl: './tts-dialog.component.html',
  styleUrls: ['./tts-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtsDialogComponent implements OnInit {
  readonly languages = [
    { value: TranslationLanguageCodes.English, label: 'ENGLISH' },
    { value: TranslationLanguageCodes.Spanish, label: 'SPANISH' },
  ];

  keyboardForm: FormGroup;

  get messageLength(): number {
    const value = this.keyboardForm.value.message;

    return value ? value.length : 0;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: { ttsMessage: string } | undefined,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<TtsDialogComponent>,
    private _communicationsService: CommunicationsService
  ) {}

  ngOnInit(): void {
    this.keyboardForm = this._formBuilder.group({
      message: [this._data ? this._data.ttsMessage : null, Validators.required],
      language: [this.languages[0].value],
    });
  }

  onCloseDialog(): void {
    this._dialogRef.close();
  }

  onSaveMessage(): void {
    this._dialogRef.close(this.keyboardForm.value.message);
  }

  onChangeLanguage({ value }): void {
    const text = this.keyboardForm.value.message;
    if (!text) {
      return;
    }
    this._communicationsService
      .fetchTranslation(text, value)
      .subscribe((message) => this.keyboardForm.patchValue({ message }));
  }
}

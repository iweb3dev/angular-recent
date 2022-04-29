import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { CommunicationsService } from 'src/app/api/communications/communications.service';
import { TranslationLanguageCodes } from 'src/app/shared/models/translations/translations.enum';

@Component({
  selector: 'app-tts-sheet',
  templateUrl: './tts-sheet.component.html',
  styleUrls: ['./tts-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtsSheetComponent implements OnInit {
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
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private _data: { ttsMessage: string } | undefined,
    private _formBuilder: FormBuilder,
    private _bottomSheetRef: MatBottomSheetRef<TtsSheetComponent>,
    private _communicationsService: CommunicationsService
  ) {}

  ngOnInit(): void {
    this.keyboardForm = this._formBuilder.group({
      message: [this._data ? this._data.ttsMessage : null, Validators.required],
      language: [this.languages[0].value],
    });
  }

  closeDialog(): void {
    this._bottomSheetRef.dismiss();
  }

  onSaveMessage(): void {
    this._bottomSheetRef.dismiss(this.keyboardForm.value.message);
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

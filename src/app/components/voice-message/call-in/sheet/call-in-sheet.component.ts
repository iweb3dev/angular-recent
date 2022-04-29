import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserFacade } from '@core/store/features/user/user.facade';

import { CallMeRecordingStatuses } from 'src/app/shared/models/message/call-me-recording.models';

import { VoiceFacade } from '../../voice/voice.facade';

@Component({
  selector: 'app-call-in-sheet',
  templateUrl: './call-in-sheet.component.html',
  styleUrls: ['./call-in-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallInSheetComponent implements OnInit {
  readonly CallMeRecordingStatuses = CallMeRecordingStatuses;

  phoneRecordForm: FormGroup;
  callMeRecordingStatus$ = this._voiceFacade.callMeRecordingStatus$;

  constructor(
    private _formBuilder: FormBuilder,
    private _bottomSheetRef: MatBottomSheetRef<CallInSheetComponent>,
    private _voiceFacade: VoiceFacade,
    private _userFacade: UserFacade,
    ) {}

  get extensionEnabled(): boolean {
    return this.phoneRecordForm.value.hasExtension;
  }

  ngOnInit(): void {
    this._userFacade.phoneNumbers$.subscribe((phoneNumbers) => {
      this.phoneRecordForm = this._formBuilder.group({
        phoneNumber: [
          phoneNumbers.filter((item) => item.isPrimary)[0].phoneNumber,
          [
            Validators.required,
            Validators.pattern(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/),
          ],
        ],
        hasExtension: [null],
        extension: [null, [Validators.pattern(/^[0-9]\d*$/)]],
      });
    });
  }

  onClose(status: CallMeRecordingStatuses): void {
    if (status === CallMeRecordingStatuses.Initial) {
      this._bottomSheetRef.dismiss();
      return;
    }

    this._voiceFacade.cancelCallIn();
  }

  onCallMe(): void {
    const phoneNumber = this.phoneRecordForm.value.phoneNumber.replace(
      /[\(\)\.\-\s]/g,
      '',
    );

    this._voiceFacade.initiateCallIn({
      phoneNumber,
      extension: this.phoneRecordForm.value.extension,
    });
  }
}

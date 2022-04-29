import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SystemSetting } from 'src/app/core/store/features/system-settings/system-settings.models';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import {
  PhoneMessageSourceTypes,
  VoiceMessageModel,
} from 'src/app/shared/models/message/message.models';
import { EnabledMessageFormatsModel } from '../message-details/message-details.models';
import { VoiceFacade } from './voice/voice.facade';

@Component({
  selector: 'app-voice-message-container',
  templateUrl: './voice-message.container.html',
  styleUrls: ['./voice-message.container.scss'],
})
export class VoiceMessageContainerComponent implements OnInit, OnDestroy {
  callerIds$ = this._userFacade.callerIds$;
  userPackage$ = this._userFacade.currentUserInfo$.pipe(
    map((data) => data.package)
  );

  callMeRecordingStatus$ = this._voiceFacade.callMeRecordingStatus$;
  ttsMessage$ = this._voiceFacade.ttsMessage$;

  phoneMessageSourceEdited$ = this._voiceFacade.phoneMessageSourceEdited$;
  phoneMicrophoneMessage$ = this._voiceFacade.phoneMicrophoneMessage$;
  phoneUploadedMessage$ = this._voiceFacade.phoneUploadedMessage$;
  callInFileLocation$ = this._voiceFacade.callInFileLocation$;

  @Input()
  hideSaveButton: boolean;

  @Input()
  voiceMessageData: VoiceMessageModel;

  @Input()
  audioRecordingUrl: string;

  @Input()
  hideRecordingEdit = false;

  @Input()
  selectedFormats: EnabledMessageFormatsModel;

  @Input()
  systemSettings: SystemSetting[];

  @Input()
  messageValid: boolean;

  @Output()
  voiceFormChange = new EventEmitter<VoiceMessageModel>();

  @Output()
  voiceFormValid = new EventEmitter<boolean>();

  @Output()
  saveAndContinue = new EventEmitter<void>();

  @Output()
  saveAudioRecordingUrl = new EventEmitter<string>();

  private _complete$ = new Subject<void>();
  constructor(
    private _userFacade: UserFacade,
    private _voiceFacade: VoiceFacade
  ) {}

  ngOnDestroy(): void {
    this._complete$.next();
  }

  ngOnInit(): void {
    this._voiceFacade.audioRecording$
      .pipe(takeUntil(this._complete$))
      .subscribe((audio) => {
        this._voiceFacade.setIsTTSCompleted(true);
        this.saveAudioRecordingUrl.emit(audio);
        this.voiceFormValid.emit(Boolean(audio));
      });
  }

  onVerifyPhoneNumber(): void {
    this._voiceFacade.verifyPhoneNumber();
  }

  onOpenVoiceDialog(data: {
    messageSource: PhoneMessageSourceTypes;
    mobileView: boolean;
    injectorData?: any;
  }): void {
    this._voiceFacade.openVoiceDialog(data);
  }
}

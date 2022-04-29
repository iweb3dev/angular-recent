import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { objectDelta } from '@shared/utils/object/object-delta';
import { Subject } from 'rxjs';
import { filter, pairwise, take, takeUntil } from 'rxjs/operators';
import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { CallerId, Package, PhoneNumber } from 'src/app/api/users/users.models';
import { SystemSetting } from 'src/app/core/store/features/system-settings/system-settings.models';
import { FileUploadModel } from 'src/app/shared/models/file/file-upload.models';
import { CallMeRecordingStatuses } from 'src/app/shared/models/message/call-me-recording.models';
import {
  PhoneMessageSourceTypes,
  VoiceMessageModel,
} from 'src/app/shared/models/message/message.models';
import { hasValue } from 'src/app/shared/utils/verifications/value-check';
import { EnabledMessageFormatsModel } from '../message-details/message-details.models';
import {
  phoneMessageSourceLabels,
  phoneMessageSources,
  TOOLTIP_MESSAGES,
} from './voice-message.constants';
import { VoiceMessageService } from './voice-message.service';
import { VoiceFacade } from './voice/voice.facade';

const CALLING_POST_CALLER_ID = 'CallingPost CallerId';

@Component({
  selector: 'app-voice-message',
  templateUrl: './voice-message.component.html',
  styleUrls: ['./voice-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoiceMessageComponent implements OnInit, OnChanges, OnDestroy {
  readonly CallMeRecordingStatuses = CallMeRecordingStatuses;
  readonly TOOLTIP_MESSAGES = TOOLTIP_MESSAGES;
  readonly phoneMessageSources = phoneMessageSources;
  readonly phoneMessageSourceLabels = phoneMessageSourceLabels;

  voiceForm: FormGroup;
  latToggleControl = new FormControl(null);
  lastPhoneMessageSource: string;
  isTtsComplete: boolean;
  isTtsComplete$ = this._voiceFacade.isTTSCompleted$;

  isEditMode = false;

  private _destroy$ = new Subject<void>();

  private _callMeRecordingStatus: CallMeRecordingStatuses;

  @Output()
  voiceFormChange = new EventEmitter<VoiceMessageModel>();

  @Output()
  voiceFormValid = new EventEmitter<boolean>();

  @Output()
  saveAndContinue = new EventEmitter<void>();

  @Output()
  openVoiceDialog = new EventEmitter<{
    messageSource: PhoneMessageSourceTypes;
    mobileView: boolean;
    injectorData?: any;
  }>();

  @Output()
  verifyPhoneNumber = new EventEmitter<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _voiceMessageService: VoiceMessageService,
    private _voiceFacade: VoiceFacade
  ) {
    this.voiceForm = this._formBuilder.group({
      phoneMessageSource: ['', Validators.required],
      callerId: ['', Validators.required],
      svm: [false],
      emailAlternateFormatSend: [false],
      textAlternateFormatSend: [false],
      lat: [false],
      phoneMicrophoneMessage: this._formBuilder.group({
        id: [null],
        size: [null],
        fileName: [null],
        fileExtension: [null],
      }),
      phoneUploadedMessage: this._formBuilder.group({
        id: [null],
        size: [null],
        fileName: [null],
        fileExtension: [null],
      }),
      phoneTTSMessage: [null],
      callMeFileLocation: [null],
    });

    this.voiceForm.setValidators(this.voiceFormValidator());
  }

  @Input()
  hideSaveButton: boolean;

  @Input()
  callerIds: CallerId[];

  @Input()
  audioRecordingUrl: string;

  @Input()
  hideRecordingEdit = false;

  @Input()
  selectedFormats: EnabledMessageFormatsModel;

  @Input()
  userPackage: Package;

  @Input()
  messageValid: boolean;

  @Input()
  set systemSettings(settings: SystemSetting[]) {
    // this field should not be applied in edit message
    if (settings) {
      const defaultCallerId = settings.find(
        (setting) => setting.settingID === 32
      ); // 32nd setting === Default Caller Id

      requestAnimationFrame(() =>
        this.voiceForm.get('callerId').setValue(defaultCallerId?.settingValue)
      );
    }
  }

  @Input()
  set ttsMessage(phoneTTSMessage: string) {
    this.voiceForm.patchValue({ phoneTTSMessage });
  }

  get ttsMessage(): string {
    return this.voiceForm.value.phoneTTSMessage;
  }

  @Input()
  set callInFileLocation(callMeFileLocation: string) {
    this.voiceForm.patchValue({ callMeFileLocation });
  }

  get callInFileLocation(): string {
    return this.voiceForm.value.callMeFileLocation;
  }

  @Input()
  set phoneMessageSourceEdited(phoneMessageSource: PhoneMessageSourceTypes) {
    this.voiceForm.patchValue({ phoneMessageSource });
  }

  @Input()
  set phoneMicrophoneMessage(message: FileUploadModel) {
    this.voiceForm.patchValue({ phoneMicrophoneMessage: message });
  }

  @Input()
  set phoneUploadedMessage(message: FileUploadModel) {
    this.voiceForm.patchValue({ phoneUploadedMessage: message });
  }

  @Input()
  set voiceMessageData(data: VoiceMessageModel) {
    this.voiceForm.patchValue(data);

    if (data.lat) {
      this.latToggleControl.setValue(true);
    }
  }

  @Input()
  set callMeRecordingStatus(status: CallMeRecordingStatuses) {
    this._callMeRecordingStatus = status;
  }

  get callMeRecordingStatus(): CallMeRecordingStatuses {
    return this._callMeRecordingStatus;
  }

  get isMobileView(): boolean {
    return window.innerWidth <= 959;
  }

  get canShowSelection(): boolean {
    return !this.canShowPlayer && !this.callInFileLocation && !this.ttsMessage;
  }

  get canShowPlayer(): boolean {
    return (
      this.isTtsComplete &&
      (hasValue(this.voiceForm.value.phoneMicrophoneMessage.fileName) ||
        hasValue(this.voiceForm.value.phoneUploadedMessage.fileName) ||
        hasValue(this.voiceForm.value.phoneTTSMessage))
    );
  }

  get latCallerIds(): CallerId[] {
    return this.callerIds.filter(
      (callerId) => callerId.phoneDisplayName !== CALLING_POST_CALLER_ID
    );
  }

  get shouldEnableSVM(): boolean {
    return (
      this.userPackage.packageTypeId === PackageTypeIds.Premium ||
      this.userPackage.packageTypeId === PackageTypeIds.Standard
    );
  }

  get shouldEnableLAT(): boolean {
    return this.userPackage.packageTypeId === PackageTypeIds.Premium;
  }

  get shouldEnableTextEmailDelivery(): boolean {
    return this.userPackage.packageTypeId === PackageTypeIds.Premium;
  }

  ngOnInit(): void {
    this.voiceForm.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        pairwise(),
        filter(
          ([first, second]) =>
            !!objectDelta(second, first, [
              'phoneMicrophoneMessage',
              'phoneUploadedMessage',
            ]) ||
            !!objectDelta(
              second.phoneMicrophoneMessage,
              first.phoneMicrophoneMessage
            ) ||
            !!objectDelta(
              second.phoneUploadedMessage,
              first.phoneUploadedMessage
            )
        )
      )
      .subscribe(([_, value]) => {
        this.voiceFormChange.emit(value);
        this.voiceFormValid.emit(this.voiceForm.valid);
        this.isEditMode = false;
      });

    this.isTtsComplete$.pipe().subscribe((isTtsComplete) => {
      this.isTtsComplete = isTtsComplete;
    });
  }

  onSelectVoiceSource(event): void {
    this.openVoiceDialog.emit({
      messageSource: event,
      mobileView: this.isMobileView,
      injectorData: { ttsMessage: this.voiceForm.value.phoneTTSMessage },
    });
  }

  onRestoreEditVoice() {
    this._voiceFacade.setIsTTSCompleted(true);
    this.isEditMode = false;
  }

  onLatChange({ checked }: MatCheckboxChange): void {
    this.voiceForm.get('svm').setValue(false);
    if (!checked) {
      this.voiceForm.get('lat').setValue(null);
    }
  }

  onSvmChange(): void {
    this.voiceForm.get('lat').setValue(null);
    this.latToggleControl.setValue(false);
  }

  rerecord(): void {
    switch (this.voiceForm.value.phoneMessageSource) {
      case PhoneMessageSourceTypes.Microphone:
        this.openVoiceDialog.emit({
          messageSource: PhoneMessageSourceTypes.Microphone,
          mobileView: this.isMobileView,
        });
        break;
      case PhoneMessageSourceTypes.Upload:
        this.openVoiceDialog.emit({
          messageSource: PhoneMessageSourceTypes.Upload,
          mobileView: this.isMobileView,
        });
        break;
      case PhoneMessageSourceTypes.TTS:
        this.openVoiceDialog.emit({
          messageSource: PhoneMessageSourceTypes.TTS,
          mobileView: this.isMobileView,
          injectorData: { ttsMessage: this.voiceForm.value.phoneTTSMessage },
        });
    }
  }

  reloadFile(): void {
    this.isEditMode = true;

    const source = this.voiceForm.value.phoneMessageSource;

    switch (source.toString()) {
      case PhoneMessageSourceTypes.Microphone:
        this.openVoiceDialog.emit({
          messageSource: PhoneMessageSourceTypes.Microphone,
          mobileView: this.isMobileView,
        });
        break;
      case PhoneMessageSourceTypes.Upload:
        this.openVoiceDialog.emit({
          messageSource: PhoneMessageSourceTypes.Upload,
          mobileView: this.isMobileView,
        });
        break;
      case PhoneMessageSourceTypes.TTS:
        this.openVoiceDialog.emit({
          messageSource: PhoneMessageSourceTypes.TTS,
          mobileView: this.isMobileView,
          injectorData: { ttsMessage: this.voiceForm.value.phoneTTSMessage },
        });
    }
  }

  rerecordCallIn(): void {
    this.openVoiceDialog.emit({
      messageSource: PhoneMessageSourceTypes.CallIn,
      mobileView: this.isMobileView,
    });
  }

  editMessage(): void {
    this.openVoiceDialog.emit({
      messageSource: PhoneMessageSourceTypes.TTS,
      mobileView: this.isMobileView,
      injectorData: { ttsMessage: this.ttsMessage },
    });
  }

  onVerifyPhoneNumber(): void {
    this.verifyPhoneNumber.emit();
  }

  onSaveAndContinue(): void {
    if (!this.isTtsComplete) {
      return this._voiceMessageService.openValidatorToast();
    }

    this.saveAndContinue.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.callerIds && !changes.callerIds.firstChange) {
      const prevValue = changes?.callerIds?.previousValue?.map(
        ({ callerID }) => callerID
      );

      const newValue = changes?.callerIds?.currentValue?.filter(
        ({ callerID }) => !prevValue?.includes(callerID)
      );

      if (newValue.length) {
        requestAnimationFrame(() =>
          this.voiceForm.get('callerId').setValue(newValue[0].callerID)
        );
      }
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  showNoSourceNotification(): void {
    this._voiceMessageService.openValidatorToast();
  }

  private voiceFormValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      return this.handleVoiceMessageTypeValidators(group);
    };
  }

  private handleVoiceMessageTypeValidators(group: FormGroup): ValidationErrors {
    const source = group.value.phoneMessageSource;
    const callMeFileLocation = group.get('callMeFileLocation');
    const phoneTTSMessage = group.get('phoneTTSMessage');

    switch (source) {
      case PhoneMessageSourceTypes.TTS:
        callMeFileLocation.clearValidators();
        this.clearPhoneMicrophoneValidators(group);
        this.clearPhoneUploadedValidators(group);
        phoneTTSMessage.setValidators(Validators.required);
        break;
      case PhoneMessageSourceTypes.CallIn:
        callMeFileLocation.setValidators(Validators.required);
        phoneTTSMessage.clearValidators();
        this.clearPhoneMicrophoneValidators(group);
        this.clearPhoneUploadedValidators(group);

        break;
      case PhoneMessageSourceTypes.Upload:
        callMeFileLocation.clearValidators();
        phoneTTSMessage.clearValidators();
        this.clearPhoneMicrophoneValidators(group);
        this.addPhoneUploadedValidators(group);

        break;
      case PhoneMessageSourceTypes.Microphone:
        callMeFileLocation.clearValidators();
        phoneTTSMessage.clearValidators();
        this.clearPhoneUploadedValidators(group);
        this.addPhoneMicrophoneValidators(group);

        break;
    }

    return null;
  }

  private clearPhoneMicrophoneValidators(group: FormGroup): void {
    const microphoneGroup = group.get('phoneMicrophoneMessage') as FormGroup;
    Object.keys(microphoneGroup.controls).forEach((control) => {
      microphoneGroup.controls[control].clearValidators();
    });
  }

  private addPhoneMicrophoneValidators(group: FormGroup): void {
    const microphoneGroup = group.get('phoneMicrophoneMessage') as FormGroup;
    Object.keys(microphoneGroup.controls).forEach((control) => {
      microphoneGroup.controls[control].setValidators(Validators.required);
    });
  }

  private clearPhoneUploadedValidators(group: FormGroup): void {
    const uploadGroup = group.get('phoneUploadedMessage') as FormGroup;
    Object.keys(uploadGroup.controls).forEach((control) => {
      uploadGroup.controls[control].clearValidators();
    });
  }

  private addPhoneUploadedValidators(group: FormGroup): void {
    const uploadGroup = group.get('phoneUploadedMessage') as FormGroup;
    Object.keys(uploadGroup.controls).forEach((control) => {
      uploadGroup.controls[control].setValidators(Validators.required);
    });
  }
}

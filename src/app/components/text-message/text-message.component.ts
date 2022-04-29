import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { objectDelta } from '@shared/utils/object/object-delta';
import { Subject } from 'rxjs';
import { filter, pairwise, takeUntil } from 'rxjs/operators';

import { CommunicationsService } from 'src/app/api/communications/communications.service';
import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { SystemSetting } from 'src/app/core/store/features/system-settings/system-settings.models';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { DEFAULT_CALLING_POST_SHORTCODE } from 'src/app/shared/constants/message.constants';
import { AllowedResponsesIds, AllowedResponsesMessages, TextMessageModel } from 'src/app/shared/models/message/message.models';

import { TranslationLanguageCodes } from 'src/app/shared/models/translations/translations.enum';

const DEFAULT_TEXT_NUMBER = '24251';

@Component({
  selector: 'app-text-message',
  templateUrl: './text-message.component.html',
  styleUrls: ['./text-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageComponent implements OnInit, OnDestroy {
  readonly languages = [
    { value: TranslationLanguageCodes.English, label: 'ENGLISH' },
    { value: TranslationLanguageCodes.Spanish, label: 'SPANISH' },
  ];

  customPhoneNumbers: string[] = [];

  textForm: FormGroup;
  languageControl = new FormControl(this.languages[0].value);
  useCustomNumber = new FormControl(false);
  sampleText: string;

  @Output()
  textFormChange = new EventEmitter<TextMessageModel>();

  @Output()
  textFormValid = new EventEmitter<boolean>();

  @Output()
  saveAndContinue = new EventEmitter<void>();

  @Output()
  receiveTollFreeTextNumber = new EventEmitter<string>();

  @Input()
  messageValid: boolean;

  @Input()
  hideSaveButton: boolean;

  @Input()
  set systemSettings(settings: SystemSetting[]) {
    const customPhoneNumber = settings.find((setting) => setting.settingID === 50); // 50 id  == Default Custom Phone Number

    const hasCustomPhone = customPhoneNumber.settingValue && customPhoneNumber.settingValue !== DEFAULT_TEXT_NUMBER;

    if (hasCustomPhone) {
      this.useCustomNumber.setValue(true);

      this.textForm.get('textNumber').setValue(customPhoneNumber.settingValue);
    }
  }

  @Input()
  set textMessageData(data: TextMessageModel) {
    // this.updateTextMessageDataValues(data);
    this.textForm.patchValue(data);
    this.useCustomNumber.setValue(data.textNumber !== DEFAULT_CALLING_POST_SHORTCODE);
  }

  @Input()
  set userInfo(userInfo: MainUserInfoModel) {
    this._userInfo = userInfo;
    this.customPhoneNumbers = this._userInfo.boughtPhoneNumbers.map((number) => number.phoneNumber);
  }

  get userInfo(): MainUserInfoModel {
    return this._userInfo;
  }

  get messageLength(): number {
    const message = this.textForm.value.sMSMessage;

    return message ? message.length : 0;
  }

  get isOnPlan(): boolean {
    return (
      this.userInfo.package.packageTypeId === PackageTypeIds.Essentials ||
      this.userInfo.package.packageTypeId === PackageTypeIds.Standard ||
      this.userInfo.package.packageTypeId === PackageTypeIds.Premium
    );
  }

  private _destroy$ = new Subject<void>();
  private _userInfo: MainUserInfoModel;

  constructor(private _formBuilder: FormBuilder, private _communicationsService: CommunicationsService) {
    this.textForm = this._formBuilder.group({
      sMSFromText: [null, Validators.required],
      sMSMessage: [null, Validators.required],
      textNumber: [null],
      allowedResponses: [[]],
      smSTwoWayText: [false],
      smsAllowedResponseYes: [false],
      smsAllowedResponseNo: [false],
      smsAllowedResponseMaybe: [false],
    });
  }

  ngOnInit(): void {
    this.textForm.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        pairwise(),
        filter(
          ([first, second]) =>
            !!objectDelta(second, first, ['mallowedResponses']) || first.allowedResponses.length !== second.allowedResponses.length
        )
      )
      .subscribe((value) => {
        this.sampleText = `${value[1].sMSFromText}: ${value[1].sMSMessage}`;
        this.textFormChange.emit(value[1]);
        this.textFormValid.emit(this.textForm.valid);
      });
  }

  onReceivePurchasedNumber(number: string): void {
    this.receiveTollFreeTextNumber.emit(number);
    this.customPhoneNumbers = [...this.customPhoneNumbers, number];
    this.textForm.patchValue({ textNumber: number });
  }

  onMessageTranslate({ value }): void {
    const message = this.textForm.value.sMSMessage;
    if (!message) {
      return;
    }
    this._communicationsService.fetchTranslation(message, value).subscribe((sMSMessage) => this.textForm.patchValue({ sMSMessage }));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onEnablePollingChange({ checked }: MatSlideToggleChange): void {
    if (!checked) {
      this.textForm.patchValue({
        smsAllowedResponseYes: false,
        smsAllowedResponseNo: false,
        smsAllowedResponseMaybe: false,
        allowedResponses: [],
      });
    }
  }

  onNoChange({ checked }: MatCheckboxChange): void {
    if (checked) {
      const currentResponses = this.textForm.value.allowedResponses;
      this.textForm.patchValue({
        allowedResponses: [
          ...currentResponses,
          {
            id: AllowedResponsesIds.No,
            notificationID: 0,
            response: AllowedResponsesMessages.No,
          },
        ],
      });
    }
  }

  onYesChange({ checked }: MatCheckboxChange): void {
    if (checked) {
      const currentResponses = this.textForm.value.allowedResponses;
      this.textForm.patchValue({
        allowedResponses: [
          ...currentResponses,
          {
            id: AllowedResponsesIds.Yes,
            notificationID: 0,
            response: AllowedResponsesMessages.Yes,
          },
        ],
      });
    }
  }

  onMaybeChange({ checked }: MatCheckboxChange): void {
    if (checked) {
      const currentResponses = this.textForm.value.allowedResponses;
      this.textForm.patchValue({
        allowedResponses: [
          ...currentResponses,
          {
            id: AllowedResponsesIds.Maybe,
            notificationID: 0,
            response: AllowedResponsesMessages.Maybe,
          },
        ],
      });
    }
  }

  private updateTextMessageDataValues(data: TextMessageModel): void {
    // this.textForm
    //   .get('sMSFromText')
    //   .setValue(data.sMSFromText, { emitEvent: false });
    // this.textForm
    //   .get('sMSMessage')
    //   .setValue(this.replaceTextBody(data?.sMSMessage, data?.sMSFromText), { emitEvent: false });
    // this.textForm
    //   .get('textNumber')
    //   .setValue(data.textNumber, { emitEvent: false });
    // this.textForm
    //   .get('allowedResponses')
    //   .setValue(data.allowedResponses, { emitEvent: false });
    // this.textForm
    //   .get('smSTwoWayText')
    //   .setValue(data.smSTwoWayText, { emitEvent: false });
    // this.textForm
    //   .get('smsAllowedResponseYes')
    //   .setValue(data.smsAllowedResponseYes, { emitEvent: false });
    // this.textForm
    //   .get('smsAllowedResponseNo')
    //   .setValue(data.smsAllowedResponseNo, { emitEvent: false });
    // this.textForm
    //   .get('smsAllowedResponseMaybe')
    //   .setValue(data.smsAllowedResponseMaybe, { emitEvent: false });
  }

  replaceTextBody(text: string, fromNameText: string) {
    return text?.replace(' From:', '')?.replace(` ${fromNameText}`, '');
  }

  // tslint:disable-next-line: member-ordering
  static ngAcceptInputType_textPollingHidden: BooleanInput;
}

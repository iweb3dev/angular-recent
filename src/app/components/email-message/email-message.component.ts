import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserFacade } from '@core/store/features/user/user.facade';
import { EmailEditorComponent, UnlayerOptions } from 'angular-email-editor';
import { Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { Package } from 'src/app/api/users/users.models';
import { EmailTemplateNames } from 'src/app/shared/models/email/email-template.models';
import { FileUploadDto } from 'src/app/shared/models/file/file-upload.models';
import { EmailMessageModel } from 'src/app/shared/models/message/message.models';
import { isEmptyString } from 'src/app/shared/utils/verifications/value-check';

import {
  EMAIL_PREDEFINES,
  TEMPLATE_NAME_REFERENCE_MAP,
} from './email-message.consts';

import { EmailMessageService } from './email-message.service';

@Component({
  selector: 'app-email-message',
  templateUrl: './email-message.component.html',
  styleUrls: ['./email-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailMessageComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  readonly TemplateNameReferenceMap = TEMPLATE_NAME_REFERENCE_MAP;

  emailMessageForm: FormGroup;
  emailEditorDefined = false;
  emailTemplatePredefines = [];
  primaryEmail$ = this._userFacade.primaryEmail$;

  fileUpload = new FormControl();

  unLayerOptions: UnlayerOptions = {
    appearance: {
      theme: 'dark',
    },
  };

  @ViewChild(EmailEditorComponent, { static: true })
  private _emailEditor: EmailEditorComponent;

  private _exportSubject$ = new Subject<void>();
  private _formComplete$ = new Subject<void>();
  private _attachmentsHidden = false;
  private emailData: EmailMessageModel;

  constructor(
    private _formBuilder: FormBuilder,
    private _emailMessageService: EmailMessageService,
    private _userFacade: UserFacade
  ) {}

  private get _isMobileView(): boolean {
    return window.innerWidth <= 959;
  }

  @Input()
  set emailMessageData(emailMessage: EmailMessageModel) {
    this.emailData = emailMessage;
  }

  @Input()
  userId: number;

  @Input()
  messageValid: boolean;

  @Input()
  hideSaveButton: boolean;

  @Input() set exportAndPatchEditorValue(value: boolean) {
    if (!value) {
      return;
    }

    this._emailMessageService
      .exportUnLayerHtml(this._emailEditor)
      .pipe(
        filter(() => !this._isMobileView),
        take(1),
        tap((template) => {
          this.emailMessageForm.patchValue(template);
          this.saveAll.emit();
        })
      )
      .subscribe();
  }

  public primaryEmail: string;

  @Input()
  set userPackage(userPackage: Package) {
    if (userPackage.packageTypeId !== PackageTypeIds.PayAsYouGo) {
      this.emailTemplatePredefines = EMAIL_PREDEFINES;

      return;
    }

    this.emailTemplatePredefines = EMAIL_PREDEFINES.filter(
      (template) =>
        template.name === EmailTemplateNames.Blank ||
        template.name === EmailTemplateNames.Last
    );
  }

  @Input()
  set hideAttachments(hide: boolean | string) {
    this._attachmentsHidden = coerceBooleanProperty(hide);
  }

  get attachmentsHidden(): boolean {
    return this._attachmentsHidden;
  }

  @Output()
  emailFormChange = new EventEmitter<EmailMessageModel>();

  @Output()
  emailAttachmentUpload = new EventEmitter<FileUploadDto>();

  @Output()
  emailAttachmentRemove = new EventEmitter<number>();

  @Output()
  emailFormValid = new EventEmitter<boolean>();

  @Output()
  saveAndContinue = new EventEmitter<void>();

  @Output()
  saveAll = new EventEmitter<void>();

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    const emailJsonTemplate = this.emailData.emailJson
      ? this.emailData.emailJson
      : this.TemplateNameReferenceMap[EmailTemplateNames.Blank];

    this.emailMessageForm = this._formBuilder.group({
      emailSubject: [this.emailData.emailSubject, [Validators.required]],
      emailFromName: [this.emailData.emailFromName, [Validators.required]],
      emailFrom: [
        this.emailData.emailFrom,
        [Validators.email, Validators.required],
      ],
      replyTo: [
        this.emailData.replyTo,
        [Validators.email, Validators.required],
      ],
      emailJson: [emailJsonTemplate],
      emailBody: [this.emailData.emailBody, [Validators.required]],
    });

    this._exportSubject$
      .pipe(
        filter(() => !this._isMobileView),
        switchMap(() =>
          this._emailMessageService.exportUnLayerHtml(this._emailEditor)
        )
      )
      .subscribe((value) => this.emailMessageForm.patchValue(value));

    this.primaryEmail$
      .pipe(takeUntil(this._formComplete$))
      .subscribe((emails) => {
        this.primaryEmail = emails ? emails.email : null;
        this.emailMessageForm.patchValue({ emailFrom: this.primaryEmail });
      });

    this.emailFormValid.emit(this.emailMessageForm.valid);

    this.emailMessageForm.valueChanges
      .pipe(takeUntil(this._formComplete$))
      .subscribe((value) => {
        this.emailFormChange.emit(value);
        this.emailFormValid.emit(this.emailMessageForm.valid);
      });
  }

  patchForm(): void {
    const emailJsonTemplate = this.emailData.emailJson
      ? this.emailData.emailJson
      : this.TemplateNameReferenceMap[EmailTemplateNames.Blank];
    this.emailMessageForm.patchValue({
      emailSubject: this.emailData.emailSubject,
      emailFromName: this.emailData.emailFromName,
      emailFrom: this.emailData.emailFrom,
      replyTo: this.emailData.replyTo,
      emailJson: emailJsonTemplate,
      emailBody: this.emailData.emailBody,
    });

    this.editorLoaded();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        switch (propName) {
          case 'emailMessageData': {
            if (
              this.emailMessageForm &&
              this.emailData?.emailJson &&
              change.currentValue.emailJson !== change.previousValue?.emailJson
            ) {
              this.patchForm();
            }
          }
        }
      }
    }
  }

  ngAfterViewInit(): void {
    if (!this.emailData.emailJson) {
      setTimeout(() => {
        this.onUpdateEmailTemplate(EmailTemplateNames.Blank);
      }, 5000);
    }
  }

  onUpdateEmailTemplate(templateName: EmailTemplateNames): void {
    this._emailEditor.loadDesign(this.TemplateNameReferenceMap[templateName]);
    this._exportSubject$.next();
  }

  saveContinue(): void {
    this._exportSubject$.next();
    this.saveAndContinue.emit();
  }

  editorLoaded(): void {
    const design = this.emailMessageForm.value.emailJson;
    const loadedDesign =
      typeof design === 'string' && !isEmptyString(design)
        ? JSON.parse(design)
        : design;

    this._emailEditor.loadDesign(loadedDesign);
  }

  onFileUpload(files: File[]): void {
    this._emailMessageService
      .uploadEmailAttachments(files[files.length - 1], this.userId)
      .subscribe((attachment) => this.emailAttachmentUpload.emit(attachment));
  }

  onFileRemove(fileIndex: number): void {
    this.emailAttachmentRemove.emit(fileIndex);
  }

  handleTooLargeError(fileName: string): void {
    this._emailMessageService.openFileTooLargeError(fileName);
  }

  ngOnDestroy(): void {
    this._exportSubject$.complete();
    this._formComplete$.complete();

    // Workaround for https://github.com/unlayer/angular-email-editor/issues/17
    const scripts = document.querySelectorAll('script');

    for (const script of Array.from(scripts)) {
      if (script.src.includes('unlayer')) {
        script.remove();
        break;
      }
    }
  }

  // tslint:disable-next-line: member-ordering
  static ngAcceptInputType_attachmentsHidden: BooleanInput;
}

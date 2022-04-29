import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMessageFacade } from '@core/store/features/new-message/create-message/create-message.facade';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/services/confirm-dialog.service';
import {
  ToastService,
  ToastType,
} from '@shared/components/toast/service/toast.service';
import { filter } from 'rxjs/operators';
import { BuildCommuniationsQueue } from 'src/app/api/communications/communications.models';
import { MessageRecipientsModel } from 'src/app/components/message-name/message-name.models';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { EnabledMessageFormatsModel } from './message-details.models';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDetailsComponent {
  messageNameValid$ = this._createMessageFacade.messageNameValid$;

  @Input()
  voiceMessagePanelOpen: boolean;

  @Input()
  textMessagePanelOpen: boolean;

  @Input()
  emailMessagePanelOpen: boolean;

  @Input()
  showLoadPrevMsg: boolean;

  @Input()
  voiceMessageValid = false;

  @Input()
  emailMessageValid = false;

  @Input()
  textMessageValid = false;

  @Input()
  isShowMessageSendFrame = false;

  @Input()
  communicationsQueue: BuildCommuniationsQueue;

  @Input()
  userAcknowledgementBeforeSave = true;

  @Output()
  voiceMessageOpen = new EventEmitter<boolean>();

  @Output()
  textMessageOpen = new EventEmitter<boolean>();

  @Output()
  emailMessageOpen = new EventEmitter<boolean>();

  @Output()
  editRecipients = new EventEmitter<void>();

  @Output()
  emailMessagePreviewOpen = new EventEmitter<void>();

  @Output()
  textMessagePreviewOpen = new EventEmitter<void>();

  @Output()
  voiceMessagePreviewOpen = new EventEmitter<void>();

  @Output()
  submitNewMessage = new EventEmitter<void>();

  @Output()
  previousMessageOpen = new EventEmitter<void>();

  voiceForm: FormGroup;
  messageRecipients: string[];
  legalTerms = new FormControl(false);

  private _messageRecipientsHidden = false;
  private _voicePanelOpen = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _confirmDialogService: ConfirmDialogService,
    private _createMessageFacade: CreateMessageFacade,
    private _toastService: ToastService
  ) {}

  @Input()
  messageName: string;

  @Input()
  formats: EnabledMessageFormatsModel;

  @Input()
  userInfo: MainUserInfoModel;

  @Input()
  set recipients(recipients: MessageRecipientsModel[]) {
    this.messageRecipients = recipients.map((recipient) => recipient.value);
  }

  @Input()
  set hideMessageRecipients(value: boolean | string) {
    this._messageRecipientsHidden = coerceBooleanProperty(value);
  }

  get messageRecipientsHidden(): boolean {
    return this._messageRecipientsHidden;
  }

  // get canSendNow(): boolean {
  //   if (nonValue(this.communicationsQueue)) {
  //     return false;
  //   }
  //   if (this.userInfo.userCredits >= this.communicationsQueue.neededBalance) {
  //     if (this._router.url === '/messages/create/details') {
  //       return this.isShowMessageSendFrame;
  //     }
  //     return true;
  //   }
  // }

  get allowSendMessage(): boolean {
    return (
      this.textMessageValid || this.emailMessageValid || this.voiceMessageValid
    );
  }

  get isMobileView(): boolean {
    return window.innerWidth <= 959;
  }

  onGoBack(): void {
    this._router.navigate(['../name'], { relativeTo: this._route });
  }

  onGoBackToDashboard(): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Confirm',
        header: 'Are you sure?',
        detail:
          'The entire message will be canceled and any progress thus far will be removed.',
      })
      .pipe(filter((value) => !!value))
      .subscribe(() => {
        this._router.navigate(['/dashboard']);
      });
  }

  onVoiceDetailsClick(event: Event): void {
    event.stopPropagation();
    this.voiceMessagePreviewOpen.emit();
  }

  onTextDetailsClick(event: Event): void {
    event.stopPropagation();
    this.textMessagePreviewOpen.emit();
  }

  onEmailDetailsClick(event: Event): void {
    event.stopPropagation();
    this.emailMessagePreviewOpen.emit();
  }

  onSubmitNewMessage(): void {
    if (!this.legalTerms.value) {
      this._toastService.addToast(
        ToastType.Error,
        'You must confirm the acknowledgement on screen.'
      );
      return;
    }

    this.submitNewMessage.emit();
  }

  // tslint:disable-next-line: member-ordering
  static ngAcceptInputType_showMessageRecipients: BooleanInput;
}

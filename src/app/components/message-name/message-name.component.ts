import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger
} from '@angular/material/autocomplete';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '@api/packages/packages.service';
import { UserFacade } from '@core/store/features/user/user.facade';
import { objectDelta } from '@shared/utils/object/object-delta';
import { Observable, of, Subject } from 'rxjs';
import {
  filter,
  map,
  pairwise,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType
} from 'src/app/shared/components/toast/service/toast.service';
import { NotificationFormatValues } from 'src/app/shared/models/message/message.models';
import {
  hasEmailFormat,
  hasPhoneFormat,
  hasTextFormat
} from 'src/app/shared/utils/message/notification-format.helper';
import { hasValue } from 'src/app/shared/utils/verifications/value-check';
import { MessageNameModel, ValidEndpoints } from './message-name.models';
import { MessageNameService } from './message-name.service';

@Component({
  selector: 'app-message-name',
  templateUrl: './message-name.component.html',
  styleUrls: ['./message-name.component.scss'],
})
export class MessageNameComponent implements OnInit, OnChanges, OnDestroy {
  readonly NotificationFormatValues = NotificationFormatValues;

  recipientGroups$: Observable<{ value: string; id: number }[]>;
  messageFormats = new FormControl([]);
  sendMessageForm: FormGroup;
  originalMessageName = null;
  hideMessageTitle = false;
  canSendNow = true;
  hasGroups = false;
  isDirty = false;
  timer = null;

  @Input()
  voiceMessagePanelOpen: boolean;

  @Input()
  textMessagePanelOpen: boolean;

  @Input()
  emailMessagePanelOpen: boolean;

  private messageNameChanged = false;

  get voiceMessageSelected(): boolean {
    return hasPhoneFormat(this.sendMessageForm.value.notificationFormatValue);
  }

  get textMessageSelected(): boolean {
    return hasTextFormat(this.sendMessageForm.value.notificationFormatValue);
  }

  get emailMessageSelected(): boolean {
    return hasEmailFormat(this.sendMessageForm.value.notificationFormatValue);
  }

  @Output()
  sendMessageValueChange = new EventEmitter<MessageNameModel>();

  @Output()
  proceedToDetails = new EventEmitter<void>();

  @Output()
  emailFormatChange = new EventEmitter<void>();

  @Output()
  textFormatChange = new EventEmitter<void>();

  @Output()
  voiceFormatChange = new EventEmitter<void>();

  @Output()
  openPreviousMessage = new EventEmitter<number>();

  @Output()
  messageNameFormValid = new EventEmitter<boolean>();

  @ViewChild(MatAutocompleteTrigger)
  private _autocompleteTrigger: MatAutocompleteTrigger;

  private _messageRecipientsDisabled = false;
  private _destroy$ = new Subject<void>();
  private _userInfo: MainUserInfoModel;
  private _usePreviousHidden = false;
  private _isEditMode = false;

  @ViewChild('messageRecipients') messageRecipientsRef: ElementRef;

  constructor(
    private _messageNameService: MessageNameService,
    private _confirmDialogService: ConfirmDialogService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _formBuilder: FormBuilder,
    private _packageService: PackageService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userFacade: UserFacade
  ) {
    this.sendMessageForm = this._formBuilder.group({
      messageName: [null, [Validators.required]],
      messageRecipients: [null, [Validators.required]],
      notificationFormatValue: [null],
    });
  }

  @Input()
  set groupLength(value: number) {
    this.hasGroups = !!value;
    if (!this.hasGroups) {
      this.sendMessageForm.controls['messageName'].disable();
    } else {
      this.sendMessageForm.controls['messageName'].enable();
    }
  }

  @Input()
  messageId: number;

  @Input()
  verifyGroups = true;

  @Input()
  set userInfo(userInfo: MainUserInfoModel) {
    this._userInfo = userInfo;
  }

  @Input()
  set messageNameData(value: MessageNameModel) {
    this.originalMessageName = value.messageName;
    if (value.messageName) {
      this.sendMessageForm.patchValue(value);
    }
  }

  @Input()
  set markMessageNameAsTouched(value: boolean | string) {
    this.sendMessageForm.controls['messageName'].markAllAsTouched();
  }

  @Input()
  set hideUsePrevious(value: boolean | string) {
    this._usePreviousHidden = coerceBooleanProperty(value);
  }

  get usePreviousHidden(): boolean {
    return this._usePreviousHidden;
  }

  @Input()
  set disableMessageRecipients(value: boolean | string) {
    this._messageRecipientsDisabled = coerceBooleanProperty(value);
    this.sendMessageForm.get('messageRecipients').disable();
  }

  @Input()
  set hideMessageDetailsTitle(value: boolean | string) {
    this.hideMessageTitle = coerceBooleanProperty(value);
  }

  @Input()
  set editMode(value: boolean | string) {
    this._isEditMode = coerceBooleanProperty(value);
  }

  @Input() isPreviousMessage: boolean;

  @Input() set dirty(isDirty: boolean) {
    if (isDirty) {
      this.isDirty = isDirty;
      this.verifyMessageName();
    }
  }

  get messageRecipientsDisabled(): boolean {
    return this._messageRecipientsDisabled;
  }

  get isMobileView(): boolean {
    return window.innerWidth <= 599;
  }

  ngOnInit(): void {
    this.recipientGroups$ = this._messageNameService.fetchMessageRecipients();

    this.setPrepopulateGroup()
      .pipe(filter((data) => !!data.length))
      .subscribe((messageRecipients) =>
        this.sendMessageForm.patchValue({ messageRecipients })
      );

    this.sendMessageForm.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        pairwise(),
        filter(
          ([first, second]) =>
            !!objectDelta(second, first, ['messageRecipients']) ||
            first.messageRecipients?.length !== second.messageRecipients?.length
        )
      )
      .subscribe(([_, value]) => {
        this.messageNameChanged = true;
        this.sendMessageForm.get('messageName').markAsTouched();
        this.sendMessageValueChange.emit(value);
        this.messageNameFormValid.emit(
          this.sendMessageForm.get('messageName').valid
        );
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const messageNameValid = this.sendMessageForm.controls['messageName'].valid;
    const messageRecipientsValid =
      this.sendMessageForm.controls['messageRecipients'].valid;

    if (
      changes?.voiceMessagePanelOpen?.currentValue ||
      changes?.textMessagePanelOpen?.currentValue ||
      changes?.emailMessagePanelOpen?.currentValue
    ) {
      for (const idx in this.sendMessageForm.controls) {
        if (!this.sendMessageForm.controls[idx].touched) {
          this.sendMessageForm.controls[idx].markAsTouched();
          this.sendMessageForm.controls[idx].updateValueAndValidity();
        }
      }

      if (!messageNameValid && !messageRecipientsValid) {
        this._toastService.addToast(
          ToastType.Error,
          'The Message name and Message recipients is required. Please enter a message name and select message recipients.'
        );

        return;
      }

      if (!messageNameValid) {
        this._toastService.addToast(
          ToastType.Error,
          'The Message name is required. Please enter a message name.'
        );

        return;
      }

      if (!messageRecipientsValid) {
        this._toastService.addToast(
          ToastType.Error,
          'The Message recipients are required. Please select message recipients.'
        );
        return;
      }
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  setPrepopulateGroup(): Observable<any[]> {
    return this._route.queryParams.pipe(
      switchMap(({ groupId }) => {
        return this.recipientGroups$.pipe(
          map((allGroup) => allGroup.filter((item) => item.id === +groupId))
        );
      })
    );
  }

  onAddOtherGroup(): void {
    // ISSUE: https://github.com/angular/components/issues/3106
    this._autocompleteTrigger._onChange('');
    this._autocompleteTrigger.openPanel();
  }

  onSelectAddOtherGroup(event: MatAutocompleteSelectedEvent): void {
    if (this.valueExists(event.option.viewValue)) {
      return;
    }

    this.recipientGroups$
      .pipe(
        map((allGroup) =>
          allGroup.find((option) => option.value === event.option.viewValue)
        )
      )
      .subscribe((addedOption) => {
        this.sendMessageForm.patchValue({
          messageRecipients: [
            ...this.sendMessageForm.controls.messageRecipients.value,
            addedOption,
          ],
        });
        this.onGroupsBlur();
      });
  }

  onEmailMessageChange(): void {
    this.emailFormatChange.emit();
  }

  onTextMessageChange(): void {
    this.textFormatChange.emit();
  }

  onVoiceMessageChange(): void {
    this.voiceFormatChange.emit();
  }

  onPreviousMessageOpen(): void {
    this._messageNameService
      .openPrevious({ isMobileView: this.isMobileView })
      .pipe(filter((id) => !!id))
      .subscribe((id) => this.openPreviousMessage.emit(id));
  }

  onFormatsChange({ value }: MatButtonToggleChange): void {
    this.sendMessageForm.patchValue({
      notificationFormatValue: value.reduce((format, curr) => format + curr, 0),
    });
  }

  get isOriginalName(): boolean {
    return (
      this._isEditMode &&
      this.sendMessageForm.value.messageName?.toLowerCase() ===
        this.originalMessageName?.toLowerCase()
    );
  }

  onBlur(): void {
    if (this.isOriginalName) {
      this.messageNameChanged = false;
      return;
    }

    if (
      this.sendMessageForm.value.messageName?.length &&
      this.messageNameChanged &&
      !this.isPreviousMessage
    ) {
      this.verifyMessageName();
    } else if (this.isPreviousMessage) {
      this.sendMessageForm.updateValueAndValidity();
    }

    this.messageNameChanged = false;
  }

  onGroupsBlur(): void {
    const shouldVerify =
      this.verifyGroups && this.sendMessageForm.value.messageRecipients?.length;

    if (!shouldVerify) {
      return;
    }

    this.validateGroups();
  }

  onMobileGroupsValidate(
    groups: string | { id: number; value: string }[]
  ): void {
    const shouldVerify = this.verifyGroups && groups.length;

    if (!shouldVerify) {
      return;
    }

    this.validateGroups({
      ...this.sendMessageForm.value,
      messageRecipients: groups,
    });
  }

  onNavigateToGroups(): void {
    this._router.navigate(['/groups/create'], {
      queryParams: {
        from: 'new-communication',
      },
    });
  }

  private validateGroups(messageData = this.sendMessageForm.value): void {
    this._messageNameService
      .verifyMessageAndGroups(messageData)
      .subscribe((validEndpoints) => {
        if (validEndpoints === ValidEndpoints.ValidEndpoints) {
          this.sendMessageForm.get('messageRecipients').setErrors(null);
          this.sendMessageForm.updateValueAndValidity();

          return;
        }

        if (validEndpoints) {
          this._router.navigate(['groups']);
        } else {
          this.sendMessageForm
            .get('messageRecipients')
            .setErrors({ invalid: true });
          this.sendMessageForm.updateValueAndValidity();
        }
      });
  }

  private verifyMessageName(): void {
    this._messageNameService
      .verifyMessageName(this.sendMessageForm.value.messageName)
      .subscribe(
        (exists) => {
          if (exists) {
            this.messageNameFormValid.emit(false);
            this._toastService.addToast(
              ToastType.Error,
              'The Message name must be unique. Please specify another name before sending.'
            );
            this.sendMessageForm
              .get('messageName')
              .setErrors({ invalid: true });
            this.sendMessageForm.updateValueAndValidity();
          }
        },
        (_) => {
          this._toastService.addToast(
            ToastType.Error,
            'Something went wrong verifying message name.'
          );
        }
      );
  }

  private handleAccountReactivate(currentUserPackageId: number): void {
    this._confirmDialogService
      .showDialog(
        {
          confirmBtn: 'ACTIVATE',
          header: 'Welcome Back!',
          detail: 'Please confirm to re-activate your account.',
        },
        true
      )
      .pipe(
        take(1),
        switchMap((shouldActivate) => {
          if (shouldActivate) {
            this._loaderService.showLoader();
            return this.handleUnsuspend(currentUserPackageId).pipe(
              tap(() => {
                this._toastService.addToast(
                  ToastType.Success,
                  'Account has been successfully reactivated!'
                );
              })
            );
          }

          return of(this._router.navigate(['billing', 'plan-details']));
        })
      )
      .subscribe();
  }

  private handleUnsuspend(
    currentUserPackageId: number
  ): Observable<Promise<boolean>> {
    return this._messageNameService.unsuspendRequest(currentUserPackageId).pipe(
      tap(() => this._userFacade.fetchUser()),
      switchMap(() =>
        this._packageService.getAllPackageFeatures().pipe(
          switchMap((packages) => {
            const userMemberCount = this._userInfo.package.memberCount;

            const newPackageId = packages
              .filter(
                (pack) =>
                  pack.packageTypeId === this._userInfo.package.packageTypeId
              )
              .sort((a, b) => a.memberCount - b.memberCount)
              .find((pack) => pack.memberCount > userMemberCount)?.id;

            if (hasValue(newPackageId)) {
              return of(
                this._router.navigate(['../', 'plan-upgrade', newPackageId], {
                  relativeTo: this._route,
                })
              );
            }

            return of(
              this._router.navigate(['../', 'plan-details'], {
                relativeTo: this._route,
              })
            );
          })
        )
      )
    );
  }

  private valueExists(currentValue: string): boolean {
    currentValue = currentValue.toUpperCase();

    return this.sendMessageForm.controls.messageRecipients.value.some(
      (selected) => selected.value.toUpperCase() === currentValue
    );
  }

  // tslint:disable-next-line: member-ordering
  static ngAcceptInputType_usePreviousHidden: BooleanInput;
  // tslint:disable-next-line: member-ordering
  static ngAcceptInputType_messageRecipientsDisabled: BooleanInput;
}

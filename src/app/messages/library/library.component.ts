import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';

import { MessagesListModel } from '../messages.models';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent implements OnInit, OnDestroy {
  canEnableDelete = false;
  allSelected = false;
  searchMessagesControl = new FormControl('');

  @Input()
  showDeleteSelection: boolean;

  @Input()
  set numberOfMessages(value: number) {
    if (!value) {
      this.searchMessagesControl.disable();
    } else {
      this.searchMessagesControl.enable();
    }
  }

  @Input()
  set messages(messages: MessagesListModel[]) {
    this._messages = messages;

    this.canEnableDelete = this._messages.some((message) => message.flaggedForDelete);
    this.allSelected = this._messages.every((message) => message.flaggedForDelete);
  }

  get messages(): MessagesListModel[] {
    return this._messages;
  }

  @Output()
  messageDeleteSelectionHide = new EventEmitter<void>();

  @Output()
  selectAllMessages = new EventEmitter<{ shouldSelect: boolean }>();

  @Output()
  deleteMessages = new EventEmitter<void>();

  @Output()
  messagesSearch = new EventEmitter<string>();

  private _messages: MessagesListModel[];
  private _isMobileView: boolean;
  private _destroy$ = new Subject<void>();

  constructor(private _route: ActivatedRoute, private _router: Router, private _confirmDialogService: ConfirmDialogService) {
    this._isMobileView = window.innerWidth <= 600;
  }

  get messagesNumber(): number {
    return this.messages.length;
  }

  get isMobileView(): boolean {
    return this._isMobileView;
  }

  ngOnInit(): void {
    this.searchMessagesControl.valueChanges
      .pipe(debounceTime(200), takeUntil(this._destroy$))
      .subscribe((value) => this.messagesSearch.emit(value));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onNewMessageCreate(): void {
    this._router.navigate(['../create'], { relativeTo: this._route });
  }

  onMessagesDelete() {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Delete Messages',
        detail: 'Are you sre you want to delete selected messages?',
      })
      .pipe(filter((value) => !!value))
      .subscribe(() => {
        this.deleteMessages.emit();
      });
  }
}

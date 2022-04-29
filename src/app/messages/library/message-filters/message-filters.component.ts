import { ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';
import {
  MessageLibraryFiltersStateModel,
  MessagesListModel,
} from '../../messages.models';
import {
  DateFilterEnum,
  MessageTypeFilterModel,
} from './message-filters.models';
import { MessageFiltersService } from './message-filters.service';

@Component({
  selector: 'app-message-filters',
  templateUrl: './message-filters.component.html',
  styleUrls: ['./message-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageFiltersComponent implements OnInit {
  readonly positions = [
    new ConnectionPositionPair(
      {
        originX: 'center',
        originY: 'bottom',
      },
      {
        overlayX: 'end',
        overlayY: 'top',
      },
      25,
      10,
    ),
  ];

  @Output()
  dateFilterChange = new EventEmitter<DateFilterEnum>();

  @Output()
  messageTypeFilter = new EventEmitter<MessageTypeFilterModel>();

  @Input()
  filters: MessageLibraryFiltersStateModel;

  @Input()
  messages: MessagesListModel[];

  @Input()
  numberOfMessages: number;

  set isOpen(open: boolean) {
    this._overlayOpen = open;
  }

  get isOpen(): boolean {
    return this._overlayOpen;
  }

  private _overlayOpen = false;

  private get _isMobileView(): boolean {
    return window.innerWidth <= 959;
  }

  constructor(private _messageFiltersService: MessageFiltersService) {}

  ngOnInit(): void {}

  showFilters(): void {
    if (!this._isMobileView) {
      this.isOpen = !this.isOpen;
      return;
    }

    this._messageFiltersService
      .openMobileFilters(this.filters)
      .pipe(filter((value) => !!value))
      .subscribe((filters) => {
        this.messageTypeFilter.emit({
          hasVoiceMessage: filters.hasVoiceMessage,
          hasTextMessage: filters.hasTextMessage,
          hasEmailMessage: filters.hasEmailMessage,
        });
        this.dateFilterChange.emit(filters.dateFilter);
      });
  }
}

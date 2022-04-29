import { VIRTUAL_SCROLL_STRATEGY, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Input,
  NgZone,
  Output,
  Inject,
  OnInit,
  Component,
  ViewChild,
  OnDestroy,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
} from '@angular/core';

import { Sort, SortDirection } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { debounceTime, filter, map, pairwise, take, tap, throttleTime } from 'rxjs/operators';
import { fromEvent, Observable, Subscription, combineLatest, BehaviorSubject } from 'rxjs';

import { RequestBase, GroupMemberDisplay } from 'src/app/api/members/members.models';

import { SMSStatuses } from 'src/app/api/shared/shared.enums';
import { MemberListLimits } from '../../enums/member-list.enum';
import { MemberTableHeight } from '../../enums/member-virtual-table.enum';
import { VirtualTableItemWidth } from 'src/app/groups/enums/group-list.enum';
import { MemberContactAvailability } from '../../enums/member-contacts-availability.enum';

import { clientHeight } from 'src/app/shared/utils/dimension/client-dimension.helper';

import { MatTableVirtualScrollStrategy } from 'src/app/groups/strategies/virtual-mat-table-scroll-strategy';
@Component({
  selector: 'app-member-virtual-table-desktop',
  templateUrl: './member-virtual-table-desktop.component.html',
  styleUrls: ['./member-virtual-table-desktop.component.scss'],
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: MatTableVirtualScrollStrategy,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberVirtualTableDesktopComponent implements OnInit, OnDestroy {
  static readonly BUFFER_SIZE = 3;

  @Input() editMode: boolean;
  @Input() searchInput: string;
  @Input() totalRecords: number;
  @Input() hideUserActions: boolean;
  @Input() selectedMembers: Array<number> = [];
  @Input() scrollFilter: RequestBase = { pageSize: 50, pageNumber: 0 };

  @Input() set tableHeight(value: number) {
    this.gridHeight = clientHeight() - value;
  }
  @Input() set sortExpression(value: string) {
    [this.sort.active, this.sort.direction] = value.split(' ') as [string, SortDirection];
  }
  @Input() set members(value: Array<GroupMemberDisplay>) {
    this._dataSource$.next(value);
  }

  @Output() sortChanged: EventEmitter<string>;
  @Output() nextMembers: EventEmitter<number>;
  @Output() routeMember: EventEmitter<number>;
  @Output() deleteMember: EventEmitter<number>;
  @Output() updateMemberStatus: EventEmitter<GroupMemberDisplay>;
  @Output() memberSelection: EventEmitter<{ id: number; selected: boolean }>;

  @ViewChild('scroller', { static: false }) scroller: CdkVirtualScrollViewport;
  @ViewChild('table', { read: ElementRef }) public matTableRef: ElementRef;

  public scrollLoading = false;

  public sort: Sort = {
    active: 'LastName',
    direction: 'asc' as SortDirection,
  };

  public placeholderHeight = -200;

  private readonly rowHeight = 48;
  private readonly headerHeight = 56;
  public readonly virtualTableLimits = VirtualTableItemWidth;
  public gridHeight = clientHeight() - MemberTableHeight.Default;

  public readonly memberTextStatus = SMSStatuses;
  public readonly memberLimits = MemberListLimits;
  public readonly memberContact = MemberContactAvailability;

  private subscription$: Subscription;
  public dataSource$: Observable<unknown[]>;
  private _dataSource$ = new BehaviorSubject<unknown[]>([]);

  public displayedColumns: Array<string> = [
    'memberSelection',
    'profilePicture',
    'FirstName',
    'LastName',
    'PhoneNumber',
    'ShortCodeSMSStatus',
    'TollFreeSMSStatus',
    'firstEmailAddress',
    'emailable',
    'IsActive',
    'delete',
  ];

  constructor(
    private _ngZone: NgZone,
    @Inject(VIRTUAL_SCROLL_STRATEGY)
    private readonly scrollStrategy: MatTableVirtualScrollStrategy
  ) {
    this.subscription$ = new Subscription();
    this.sortChanged = new EventEmitter<string>();
    this.nextMembers = new EventEmitter<number>();
    this.routeMember = new EventEmitter<number>();
    this.deleteMember = new EventEmitter<number>();
    this.updateMemberStatus = new EventEmitter<GroupMemberDisplay>();
    this.memberSelection = new EventEmitter<{
      id: number;
      selected: boolean;
    }>();
  }

  ngOnInit(): void {
    this.setVirtualTableSource();
    this.setScrollerOnChange();
  }

  ngOnDestroy(): void {
    this._dataSource$.complete();
    this.subscription$.unsubscribe();
  }

  private setVirtualTableSource(): void {
    const range = Math.ceil(this.gridHeight / this.rowHeight) + MemberVirtualTableDesktopComponent.BUFFER_SIZE;
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.headerHeight);

    this.dataSource$ = combineLatest([this._dataSource$, this.scrollStrategy.scrolledIndexChange]).pipe(
      map(([data, scrollIndex]) => {
        const start = Math.max(0, scrollIndex - MemberVirtualTableDesktopComponent.BUFFER_SIZE);
        const end = Math.min(data.length, scrollIndex + range);
        return data;
      })
    );
  }

  private setScrollerOnChange(): void {
    fromEvent(window, 'wheel')
      .pipe(
        filter(() => !!this.scroller),
        take(1),
        tap(() => this.setBottomScroller())
      )
      .subscribe();
  }

  private setBottomScroller(): void {
    this.subscription$.add(
      this.scroller
        .elementScrolled()
        .pipe(
          map(() => this.scroller.measureScrollOffset('bottom')),
          pairwise(),
          filter(() => this.scrollFilter.pageNumber < Math.ceil(this.totalRecords / this.scrollFilter.pageSize) - 1),
          filter(([y1, y2]) => y2 < y1 && y2 < this.memberLimits.ScrollerLimit),
          throttleTime(this.memberLimits.ThrottleLimit)
        )
        .subscribe(() => {
          const pageNumber = ++this.scrollFilter.pageNumber;
          this._ngZone.run(() => this.nextMembers.emit(pageNumber));
        })
    );
  }

  onTableScroll(e: any): void {
    const tableViewHeight = e.target.offsetHeight; // viewport
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const scrollThreshold = 200;

    const scrollDownLimit = tableScrollHeight - tableViewHeight - scrollThreshold;
    if (scrollLocation > scrollDownLimit && this.scrollFilter.pageNumber < Math.ceil(this.totalRecords / this.scrollFilter.pageSize) - 1) {
      const pageNumber = ++this.scrollFilter.pageNumber;
      this._ngZone.run(() => this.nextMembers.emit(pageNumber));
    }
  }

  private selectMemberRow(id: number): void {
    const index = this.selectedMembers.findIndex((memberId) => memberId === id);
    const selectMember = index > -1 ? false : true;
    this._ngZone.run(() => this.memberSelection.emit({ id, selected: selectMember }));
  }

  public sortOnChange(sort: Sort): void {
    this.sortChanged.emit(`${sort.active} ${sort.direction.toUpperCase()}`);
  }

  // FIXME: Using member service to activate/deactivate as group-members end-points not working.
  public memberStatusOnChange(member: GroupMemberDisplay): void {
    this._ngZone.run(() => this.updateMemberStatus.emit(member));
  }

  public memberSelectionOnChange(id: number, selection: MatCheckboxChange): void {
    this._ngZone.run(() => this.memberSelection.emit({ id, selected: selection.checked }));
  }

  public deleteMemberOnClick(id: number): void {
    this._ngZone.run(() => this.deleteMember.emit(id));
  }

  public memberCellOnClick(id: number): void {
    if (!this.editMode) {
      this._ngZone.run(() => this.routeMember.emit(id));
    } else {
      this.selectMemberRow(id);
    }
  }
}

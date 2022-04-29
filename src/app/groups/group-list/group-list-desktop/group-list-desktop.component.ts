import {
  Input,
  OnInit,
  Output,
  NgZone,
  Inject,
  Component,
  OnDestroy,
  ViewChild,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Sort, SortDirection } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  VIRTUAL_SCROLL_STRATEGY,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  map,
  take,
  filter,
  pairwise,
  finalize,
  switchMap,
  catchError,
  throttleTime,
} from 'rxjs/operators';
import {
  fromEvent,
  throwError,
  Observable,
  Subscription,
  combineLatest,
  BehaviorSubject,
} from 'rxjs';

import { PagedList } from 'src/app/api/shared/shared.models';
import { GroupDisplay } from 'src/app/api/groups/groups.models';
import { GroupSearchFilter } from '../../models/group-search-filter.model';

import { clientHeight } from 'src/app/shared/utils/dimension/client-dimension.helper';

import { MatTableVirtualScrollStrategy } from '../../strategies/virtual-mat-table-scroll-strategy';

import {
  GroupsFilter,
  GroupSortOrder,
} from '../../enums/group-search-filter.enum';
import {
  GroupListLimits,
  VirtualTableItemWidth,
} from '../../enums/group-list.enum';

import { GroupService } from 'src/app/api/groups/groups.service';
import { LoaderService } from '@shared/components/loader/loader.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

@Component({
  selector: 'app-group-list-desktop',
  templateUrl: './group-list-desktop.component.html',
  styleUrls: ['./group-list-desktop.component.scss'],
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: MatTableVirtualScrollStrategy,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListDesktopComponent implements OnInit, OnDestroy, OnChanges {
  static readonly BUFFER_SIZE = 3;
  @Input() editMode: boolean;
  @Input() totalRecords: number;
  @Input() selectedGroups: Array<number> = [];
  @Input() set searchInput(value: string) {
    this._searchInput = value;
    this.searchFilter = { ...GroupsFilter };
  }
  @Input() set groups(value: Array<GroupDisplay>) {
    this._dataSource$.next(value);
  }
  @Input() set sortExpression(sortBy: string) {
    if (
      sortBy === GroupSortOrder.GroupNameAsc ||
      sortBy === GroupSortOrder.GroupNameDesc
    ) {
      this.sort.active = this.groupSort.name;
      this.sort.direction =
        sortBy === GroupSortOrder.GroupNameAsc
          ? (this.sortBy.asc as SortDirection)
          : (this.sortBy.desc as SortDirection);
    }

    if (
      sortBy === GroupSortOrder.MemberCountAsc ||
      sortBy === GroupSortOrder.MemberCountDesc
    ) {
      this.sort.active = this.groupSort.count;
      this.sort.direction =
        sortBy === GroupSortOrder.MemberCountAsc
          ? (this.sortBy.asc as SortDirection)
          : (this.sortBy.desc as SortDirection);
    }
    this._sortExpression = sortBy;
  }

  @Output() sortChanged: EventEmitter<string>;
  @Output() groupsUpdate: EventEmitter<Array<GroupDisplay>>;
  @Output() groupSelection: EventEmitter<{ id: number; selected: boolean }>;

  @ViewChild('scroller', { static: false }) scroller: CdkVirtualScrollViewport;

  private _searchInput: string;
  private _sortExpression: string;
  public showNoGroupMessage = true;

  public readonly rowHeight = 48;
  public readonly headerHeight = 56;
  public readonly gridHeight = clientHeight() - 290;
  public readonly virtualTableLimits = VirtualTableItemWidth;

  private subscription$: Subscription;
  public dataSource$: Observable<unknown[]>;
  private _dataSource$ = new BehaviorSubject<Array<GroupDisplay>>([]);

  private sortBy = { asc: 'asc', desc: 'desc' };
  private searchFilter: GroupSearchFilter = { ...GroupsFilter };
  private groupSort = { name: 'groupName', count: 'totalMembers' };
  public sort: { active: string; direction: SortDirection } = {
    active: 'groupId',
    direction: 'asc',
  };
  public displayedColumns: Array<string> = [
    'groupSelection',
    'groupName',
    'totalMembers',
    'keyword',
  ];

  constructor(
    private _ngZone: NgZone,
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    @Inject(VIRTUAL_SCROLL_STRATEGY)
    private readonly scrollStrategy: MatTableVirtualScrollStrategy,
  ) {
    this.subscription$ = new Subscription();
    this.sortChanged = new EventEmitter<string>();
    this.groupsUpdate = new EventEmitter<Array<GroupDisplay>>();
    this.groupSelection = new EventEmitter<{ id: number; selected: boolean }>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showMemberMessage(changes);
  }

  ngOnInit(): void {
    this.setVirtualTableSource();
    this.setScrollerOnChange();
  }

  ngOnDestroy(): void {
    this._dataSource$.complete();
    this.subscription$.unsubscribe();
  }
  private showMemberMessage(changes) {
    changes?.groups?.previousValue?.length === 0 &&
    changes?.groups?.currentValue?.length === 0
      ? (this.showNoGroupMessage = false)
      : (this.showNoGroupMessage = true);
  }

  private getNextGroupsBatch(searchFilter: GroupSearchFilter): void {
    this._loaderService.showDetachedLoader();
    this._groupService
      .getGroupNameSearch(
        this._searchInput,
        +searchFilter.sortOrder,
        searchFilter.pageSize,
        searchFilter.pageIndex,
      )
      .pipe(
        take(1),
        finalize(() => this._loaderService.removeAttachedLoader()),
        switchMap((response: PagedList<GroupDisplay>) => {
          this.totalRecords = response.totalRecords;
          return this._dataSource$.pipe(
            take(1),
            map((groups) => [...groups, ...response.pagedObjects]),
          );
        }),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to fetch groups',
          );
          return throwError(error);
        }),
      )
      .subscribe((groups) => {
        this._dataSource$.next(groups);
        this.groupsUpdate.emit(groups);
      });
  }

  public getFilters(pageIndex = 0): GroupSearchFilter {
    return {
      ...this.searchFilter,
      pageIndex: pageIndex,
      sortOrder: this._sortExpression,
    };
  }

  private setScrollerOnChange(): void {
    fromEvent(window, 'wheel')
      .pipe(
        filter(() => !!this.scroller),
        take(1),
      )
      .subscribe(() => this.setBottomScroller());
  }

  private setBottomScroller(): void {
    this.subscription$.add(
      this.scroller
        .elementScrolled()
        .pipe(
          map(() => this.scroller.measureScrollOffset('bottom')),
          pairwise(),
          filter(
            () =>
              this.searchFilter.pageIndex <
              Math.ceil(this.totalRecords / this.searchFilter.pageSize) - 1,
          ),
          filter(([y1, y2]) => y2 < y1 && y2 < GroupListLimits.ScrollerLimit),
          throttleTime(GroupListLimits.ThrottleLimit),
        )
        .subscribe(() => {
          const pageIndex = ++this.searchFilter.pageIndex;
          this._ngZone.run(() =>
            this.getNextGroupsBatch(this.getFilters(pageIndex)),
          );
        }),
    );
  }

  private setVirtualTableSource(): void {
    const range =
      Math.ceil(this.gridHeight / this.rowHeight) +
      GroupListDesktopComponent.BUFFER_SIZE;
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.headerHeight);

    this.dataSource$ = combineLatest([
      this._dataSource$,
      this.scrollStrategy.scrolledIndexChange,
    ]).pipe(
      map(([data, scrollIndex]) => {
        const start = Math.max(
          0,
          scrollIndex - GroupListDesktopComponent.BUFFER_SIZE,
        );
        const end = Math.min(data.length, scrollIndex + range);
        return data.slice(start, end);
      }),
    );
  }

  public sortOnChange(sort: Sort): void {
    let sortOrder: GroupSortOrder;

    if (sort.active === this.groupSort.name) {
      sortOrder =
        sort.direction === this.sortBy.asc
          ? GroupSortOrder.GroupNameAsc
          : GroupSortOrder.GroupNameDesc;
    } else {
      sortOrder =
        sort.direction === this.sortBy.asc
          ? GroupSortOrder.MemberCountAsc
          : GroupSortOrder.MemberCountDesc;
    }
    this.sortChanged.emit(sortOrder);
  }

  public groupSelectionOnChange(groupId: number, selection: MatCheckboxChange) {
    this._ngZone.run(() =>
      this.groupSelection.emit({ id: groupId, selected: selection.checked }),
    );
  }
}

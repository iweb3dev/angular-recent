import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Input,
  Output,
  NgZone,
  OnInit,
  ViewChild,
  OnDestroy,
  Component,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { fromEvent, Subscription, throwError } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  map,
  take,
  filter,
  finalize,
  pairwise,
  catchError,
  throttleTime,
} from 'rxjs/operators';

import { PagedList } from 'src/app/api/shared/shared.models';
import { GroupDisplay } from 'src/app/api/groups/groups.models';
import { GroupSearchFilter } from '../../models/group-search-filter.model';

import { GroupListLimits } from '../../enums/group-list.enum';
import { GroupsFilter } from '../../enums/group-search-filter.enum';

import { GroupService } from 'src/app/api/groups/groups.service';
import { LoaderService } from '@shared/components/loader/loader.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

@Component({
  selector: 'app-group-list-mobile',
  templateUrl: './group-list-mobile.component.html',
  styleUrls: ['./group-list-mobile.component.scss'],
})
export class GroupListMobileComponent implements OnInit, OnDestroy, OnChanges {
  @Input() editMode: boolean;
  @Input() totalRecords: number;
  @Input() sortExpression: string;
  @Input() groups: Array<GroupDisplay> = [];
  @Input() selectedGroups: Array<number> = [];
  @Input() set searchInput(value: string) {
    this._searchInput = value;
    this.searchFilter = { ...GroupsFilter };
  }

  @Output() groupsUpdate: EventEmitter<Array<GroupDisplay>>;
  @Output() groupSelection: EventEmitter<{ id: number; selected: boolean }>;

  @ViewChild('scroller', { static: false }) scroller: CdkVirtualScrollViewport;

  private _searchInput: string;
  public showNoGroupMessage = true;

  private subscription$: Subscription;
  private searchFilter: GroupSearchFilter = { ...GroupsFilter };

  constructor(
    private _ngZone: NgZone,
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
  ) {
    this.subscription$ = new Subscription();
    this.groupsUpdate = new EventEmitter<Array<GroupDisplay>>();
    this.groupSelection = new EventEmitter<{ id: number; selected: boolean }>();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.showMemberMessage(changes);
  }

  ngOnInit(): void {
    this.setScrollerOnChange();
  }

  ngOnDestroy() {
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
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to fetch groups',
          );
          return throwError(error);
        }),
      )
      .subscribe((response: PagedList<GroupDisplay>) => {
        this.groups = [...this.groups, ...response.pagedObjects];
        this.totalRecords = this.totalRecords;
        this.groupsUpdate.emit(this.groups);
      });
  }

  public getFilters(pageIndex = 0): GroupSearchFilter {
    return {
      ...this.searchFilter,
      pageIndex: pageIndex,
      sortOrder: this.sortExpression,
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

  public groupSelectionOnChange(groupId: number, selection: MatCheckboxChange) {
    this.groupSelection.emit({ id: groupId, selected: selection.checked });
  }
}

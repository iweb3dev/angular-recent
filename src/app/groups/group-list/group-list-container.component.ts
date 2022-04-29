import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { OnInit, Output, ViewChild, Component, EventEmitter } from '@angular/core';

import { throwError, Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { take, filter, finalize, catchError, map } from 'rxjs/operators';

import { PagedList } from 'src/app/api/shared/shared.models';
import { GroupDisplay } from 'src/app/api/groups/groups.models';
import { GroupSearchFilter } from '../models/group-search-filter.model';

import { GroupService } from 'src/app/api/groups/groups.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { UserSessionService } from '../../core/user-session/user-session.service';
import { GroupManagersFacade } from 'src/app/core/store/features/group-managers/group-managers.facade';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import { ToastType, ToastService } from 'src/app/shared/components/toast/service/toast.service';

import { GroupListLimits } from '../enums/group-list.enum';
import { GroupsFilter, GroupSortOrder } from '../enums/group-search-filter.enum';

import { GroupSortFilterTypes } from '../constants/group.constants';

@Component({
  selector: 'app-group-list-container',
  templateUrl: './group-list-container.component.html',
  styleUrls: ['./group-list-container.component.scss'],
})
export class GroupListContainerComponent implements OnInit {
  groupManagers$ = this._groupManagersFacade.allGroupManagers$.pipe(
    map((groupManagers) => {
      const accessGroupsArray = groupManagers.map((groupManager: any) => groupManager.groups);

      const newAccessGroupsArray = [].concat.apply([], accessGroupsArray);

      const uniqueAccessGroupArray = Array.from(new Set(newAccessGroupsArray.map((a) => a.groupID))).map((groupID) => {
        return newAccessGroupsArray.find((a) => a.groupID === groupID);
      });

      return uniqueAccessGroupArray.map((value) => {
        return {
          id: value.groupID,
          groupName: value.groupName,
          keyword: '',
          totalGroups: 0,
        };
      });
    })
  );

  groupManagerSubs: Subscription;

  @Output() groupsCount: EventEmitter<number>;

  @ViewChild('scroller', { static: false }) scroller: CdkVirtualScrollViewport;
  @ViewChild('filterMenuTrigger', { static: false })
  filterMenuTrigger: MatMenuTrigger;

  public isEditMode = false;
  public isSelected = false;
  public showSearchInput = false;

  public isManager: boolean;
  public listLoading = false;
  public totalRecords: number;
  public searchGroupValue = '';

  public filterForm: FormGroup;
  public groups: Array<GroupDisplay> = [];
  public selectedGroups: Array<number> = [];

  public readonly sortFilter = GroupSortFilterTypes;
  private searchFilter: GroupSearchFilter = { ...GroupsFilter };

  constructor(
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    private _userSessionService: UserSessionService,
    private _groupManagersFacade: GroupManagersFacade,
    private _confirmDialogService: ConfirmDialogService
  ) {
    this.filterForm = this.createFilterForm();

    this.groupsCount = new EventEmitter<number>();
    this.isManager = this._userSessionService.isManager;
  }

  ngOnInit(): void {
    if (!this.isManager) {
      this.getGroups(this.searchFilter);
    } else {
      this.groupManagerSubs = this.groupManagers$.subscribe((groups: any) => {
        this.groups = groups;
        this.totalRecords = groups.length;
        this.groupsCount.emit(groups.length);
      });
    }
  }

  private getGroups(searchFilter: GroupSearchFilter, searchInput = ''): void {
    this.listLoading = true;
    this._groupService
      .getGroupNameSearch(searchInput, +searchFilter.sortOrder, searchFilter.pageSize, searchFilter.pageIndex)
      .pipe(
        take(1),
        finalize(() => (this.listLoading = false)),
        catchError((error) => {
          this._toastService.addToast(ToastType.Error, 'An error occurred, unable to fetch groups');
          return throwError(error);
        })
      )
      .subscribe((response: PagedList<GroupDisplay>) => {
        this.groups = response.pagedObjects;
        this.totalRecords = response.totalRecords;
        this.groupsCount.emit(response.totalRecords);
      });
  }

  public getFilters(pageIndex = 0): GroupSearchFilter {
    return {
      ...this.searchFilter,
      pageIndex: pageIndex,
      sortOrder: this.filterForm.get('sort').value,
    };
  }

  private getDeleteConfirmationMessage(): string {
    const isOnlyGroup = this.selectedGroups.length === 1;
    const [selectedGroupId] = this.selectedGroups;
    const group = isOnlyGroup ? this.getDeleteGroupsById(selectedGroupId) : null;

    return isOnlyGroup ? `<b>Group: ${group.groupName}` : `<b>Groups to Delete:</b> ${+this.selectedGroups.length}`;
  }

  public get mobileView() {
    return window.innerWidth <= GroupListLimits.MobileViewLimit;
  }

  public get sortFilterValue(): string {
    return this.filterForm.get('sort').value;
  }

  // FIXME: Only sort is being used at the moment due to API limitations
  private createFilterForm(): FormGroup {
    return this._formBuilder.group({
      // FIXME: Active/In-active members filter not implemented currently due to API limitation
      // activeMembers: [false],
      // inactiveMembers: [false],
      sort: [GroupSortOrder.GroupId],
    });
  }

  private deleteGroupFromView(groupId: number): void {
    --this.totalRecords;
    this.selectedGroups = [...[]];
    this.groupsCount.emit(this.totalRecords);

    const groupIndex = this.groups.findIndex((group) => group.id === groupId);
    this.groups.splice(groupIndex, 1);
    this.groups = [...this.groups];
  }

  private deleteGroup(groupId: number): void {
    this._groupService
      .deleteGroup(groupId)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(ToastType.Error, 'An error occurred, unable to delete group');
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.deleteGroupFromView(groupId);
        this._toastService.addToast(ToastType.Success, 'Group deleted successfully');
      });
  }

  private getDeleteGroupsById(groupId: number): GroupDisplay {
    return this.groups?.find((group) => group.id === groupId);
  }

  public closeFilterModalOnEmit(): void {
    this.filterMenuTrigger.closeMenu();
  }

  public sortChangedOnEmit(sortExpression: string): void {
    this.closeFilterModalOnEmit();
    this.filterForm.get('sort').setValue(sortExpression);
    this.getGroups(this.getFilters(), this.searchGroupValue);
  }

  public groupsUpdateOnEmit(groups: Array<GroupDisplay>): void {
    this.groups = groups;
    this.groupsCount.emit(groups.length);
  }

  public groupSelectOnEmit(group: { id: number; selected: boolean }): void {
    if (group.selected) {
      this.selectedGroups.push(group.id);
      this.selectedGroups = [...this.selectedGroups];
    } else {
      const index = this.selectedGroups.indexOf(group.id);
      if (index > -1) {
        this.selectedGroups.splice(index, 1);
        this.selectedGroups = [...this.selectedGroups];
      }
    }
  }

  public searchInputOnEmit(value: string): void {
    this.searchGroupValue = value;
    this._loaderService.showDetachedLoader();

    this._groupService
      .getGroupNameSearch(value, +this.searchFilter.sortOrder, this.searchFilter.pageSize, this.searchFilter.pageIndex)
      .pipe(
        take(1),
        finalize(() => this._loaderService.removeAttachedLoader()),
        catchError((error) => {
          this._toastService.addToast(ToastType.Error, 'An error occurred, unable to fetch groups');
          return throwError(error);
        })
      )
      .subscribe((response: PagedList<GroupDisplay>) => {
        this.groups = [...response.pagedObjects];
        this.totalRecords = response.totalRecords;
        this.groupsCount.emit(response.totalRecords);
      });
  }

  public searchShownOnEmit(value: boolean): void {
    this.showSearchInput = value;
  }

  public selectAllOnClick(): void {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      const ids: Array<number> = [];
      this.groups.forEach((group: GroupDisplay) => ids.push(group.id));
      this.selectedGroups = [...ids];
    } else {
      this.selectedGroups = [...[]];
    }
  }

  public deleteAllOnClick(): void {
    this.isEditMode = !this.isEditMode;
    this.selectAllOnClick();
    this.deleteOnClick();
  }

  public cancelOnClick(): void {
    this.isEditMode = false;
    this.isSelected = false;
    this.selectedGroups = [...[]];
  }

  public deleteOnClick(): void {
    if (!this.selectedGroups.length) {
      this._toastService.addToast(ToastType.Error, 'No group is selected');
      return;
    }
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Confirm Delete',
        detail: 'Are you sure you want to delete selected group(s)?',
        secondaryDetail: this.getDeleteConfirmationMessage(),
      })
      .pipe(
        take(1),
        filter((value) => !!value)
      )
      .subscribe(() => {
        this._loaderService.showLoader();
        this.selectedGroups.forEach((groupId: number) => this.deleteGroup(groupId));
        this._loaderService.removeLoader();
      });
  }
}

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  OnInit,
  Component,
  ViewChild,
  OnDestroy,
  ElementRef,
} from '@angular/core';

import { Subscription, throwError } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  take,
  filter,
  finalize,
  catchError,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import {
  GroupMemberDisplay,
  GroupMembersDisplay,
  RequestPagingFiltering,
} from 'src/app/api/members/members.models';

import { GroupService } from 'src/app/api/groups/groups.service';
import { GroupMemberService } from 'src/app/groups/services/group-member.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import { GroupRedirectPaths } from 'src/app/groups/enums/group-redirect.enum';
import { MemberListLimits } from '../../../shared/components/member/enums/member-list.enum';
import { MemberSortDescriptors } from '../../../shared/components/member/enums/member-search-filter.enum';

import {
  MemberSearchFilter,
  MemberSortFilterTypes,
} from 'src/app/shared/constants/member.constants';

import { updatedSearchFilter } from 'src/app/shared/components/member/helpers/updated-search-filter.helper';

@Component({
  selector: 'app-group-member-add-existing-container',
  templateUrl: './group-member-add-existing-container.component.html',
  styleUrls: ['./group-member-add-existing-container.component.scss'],
})
export class GroupMemberAddExistingContainerComponent
  implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  @ViewChild('filterMenuTrigger', { static: false })
  filterMenuTrigger: MatMenuTrigger;

  public isSelected = false;
  public listLoading = false;
  public showSearchInput = false;

  private subscription$: Subscription;

  public groupId: number;
  public totalRecords: number;
  public filterForm: FormGroup;
  public searchMember: FormControl;
  public selectedMembers: Array<number> = [];
  public members: Array<GroupMemberDisplay> = [];

  public searchFilter = { ...MemberSearchFilter };
  public readonly sortFilter = MemberSortFilterTypes;

  constructor(
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _activatedRoute: ActivatedRoute,
    private _groupMemberService: GroupMemberService
  ) {
    this.filterForm = this.createFilterForm();

    this.searchMember = new FormControl('');
    this.subscription$ = new Subscription();
  }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        filter((value) => !!value),
        take(1)
      )
      .subscribe((params) => {
        this.groupId = +params['id'];
        this.getMembersNotInGroup(this.searchFilter);
      });
    this.setSearchInput();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private getMembersNotInGroup(searchFilter: RequestPagingFiltering): void {
    this.listLoading = true;

    this._groupService
      .searchMembersNotInGroup(this.groupId, searchFilter, true)
      .pipe(
        take(1),
        finalize(() => (this.listLoading = false)),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to fetch members'
          );
          return throwError(error);
        })
      )
      .subscribe((response: GroupMembersDisplay) => {
        this.members = response.members;
        this.totalRecords = response.totalRecords;
        this.searchFilter.pageNumber = response.pageNumber;
      });
  }

  public getFilters(searchValue = '', pageNumber = 0): RequestPagingFiltering {
    return {
      ...this.searchFilter,
      pageNumber: pageNumber,
      filters: updatedSearchFilter(searchValue),
      sortExpression: this.filterForm.get('sort').value,
    };
  }

  public get mobileView(): boolean {
    return window.innerWidth <= MemberListLimits.MobileViewLimit;
  }

  public get sortFilterValue(): string {
    return this.filterForm.get('sort').value;
  }

  private setSearchInput(): void {
    this.subscription$.add(
      this.searchMember.valueChanges
        .pipe(
          debounceTime(MemberListLimits.DebounceLimit),
          distinctUntilChanged()
        )
        .subscribe((currentValue: string) =>
          this.getMembersNotInGroup(this.getFilters(currentValue))
        )
    );
  }

  // FIXME: Only sort is being used at the moment due to API limitations
  private createFilterForm(): FormGroup {
    return this._formBuilder.group({
      // FIXME: Active/In-active members filter not implemented currently due to API limitation
      // activeMembers: [false],
      // inactiveMembers: [false],
      sort: [MemberSortDescriptors.LastNameAsc],
    });
  }

  public membersListUpdateOnEmit(members: Array<GroupMemberDisplay>): void {
    this.members = members;
  }

  public closeFilterModalOnEmit(): void {
    this.filterMenuTrigger.closeMenu();
  }

  public sortChangedOnEmit(sortExpression: string): void {
    this.filterMenuTrigger.closeMenu();
    this.filterForm.get('sort').setValue(sortExpression);
    this.getMembersNotInGroup(this.getFilters(this.searchMember.value));
  }

  public memberSelectOnEmit(member: { id: number; selected: boolean }): void {
    if (member.selected) {
      this.selectedMembers.push(member.id);
    } else {
      const index = this.selectedMembers.indexOf(member.id);
      if (index > -1) {
        this.selectedMembers.splice(index, 1);
      }
    }
    this.selectedMembers = [...this.selectedMembers];
  }

  public selectAllOnClick(): void {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      const ids: Array<number> = [];
      this.members.forEach((member: GroupMemberDisplay) => ids.push(member.id));
      this.selectedMembers = [...ids];
    } else {
      this.selectedMembers = [...[]];
    }
  }

  public searchOnClick(): void {
    this.showSearchInput = !this.showSearchInput;
    if (this.showSearchInput) {
      setTimeout(() => this.searchInput.nativeElement.focus());
    }
  }

  public closedOnClick(): void {
    this._location.back();
  }

  public addExistingMembersOnClick(): void {
    if (!this.selectedMembers.length) {
      this._toastService.addToast(ToastType.Error, 'No member selected');
    } else {
      const members: Array<number> = [];
      this.selectedMembers.forEach((id: number) => members.push(id));
      this._groupMemberService.addExistingMembersToGroup(
        this.groupId,
        members,
        `${GroupRedirectPaths.Group}/${this.groupId}`
      );
    }
  }
}

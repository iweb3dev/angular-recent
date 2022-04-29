import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  OnInit,
  Output,
  Component,
  ViewChild,
  OnDestroy,
  ElementRef,
  EventEmitter,
} from '@angular/core';

import { MatMenuTrigger } from '@angular/material/menu';
import { EMPTY, forkJoin, Subscription, throwError } from 'rxjs';
import {
  map,
  tap,
  take,
  filter,
  finalize,
  switchMap,
  catchError,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

import {
  GroupMemberDisplay,
  GroupMembersDisplay,
  RequestPagingFiltering,
} from 'src/app/api/members/members.models';

import { GroupService } from '@api/groups/groups.service';
import { MemberService } from 'src/app/api/members/members.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import { MemberListLimits } from '../../shared/components/member/enums/member-list.enum';
import { MemberSortDescriptors } from '../../shared/components/member/enums/member-search-filter.enum';

import { formatPhoneNumber } from 'src/app/shared/utils/format/format-phone-number.helper';
import { updatedSearchFilter } from 'src/app/shared/components/member/helpers/updated-search-filter.helper';

import {
  MemberSearchFilter,
  MemberSortFilterTypes,
} from 'src/app/shared/constants/member.constants';

@Component({
  selector: 'app-member-list-container',
  templateUrl: './member-list-container.component.html',
  styleUrls: ['./member-list-container.component.scss'],
})
export class MemberListContainerComponent implements OnInit, OnDestroy {
  @Output() membersCount: EventEmitter<number>;

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  @ViewChild('filterMenuTrigger', { static: false })
  filterMenuTrigger: MatMenuTrigger;

  public isEditMode = false;
  public isSelected = false;
  public showSearchInput = false;

  public listLoading = false;
  public totalRecords: number;

  public filterForm: FormGroup;
  public searchMember: FormControl;
  public selectedMembers: Array<number> = [];
  public membersWithStats: GroupMembersDisplay;
  public members: Array<GroupMemberDisplay> = [];

  private subscription$: Subscription;

  public searchFilter = { ...MemberSearchFilter };
  public readonly sortFilter = MemberSortFilterTypes;

  constructor(
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    private _memberService: MemberService,
    private _confirmDialogService: ConfirmDialogService,
  ) {
    this.filterForm = this.createFilterForm();

    this.searchMember = new FormControl('');
    this.subscription$ = new Subscription();
    this.membersCount = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.setSearchInput();
    this.getMembers(this.searchFilter);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public get mobileView(): boolean {
    return window.innerWidth <= MemberListLimits.MobileViewLimit;
  }

  getMembers(searchFilter: RequestPagingFiltering) {
    this._loaderService.showLoader();
    this._groupService
      .fetchGroups()
      .pipe(
        take(1),
        map((groupArr) => {
          return groupArr.pagedObjects.map((item) => ({
            groupId: item.id,
          }));
        }),
        switchMap((groupObj) => {
          if (groupObj.length !== 0) {
            return forkJoin(
              groupObj.map((group) =>
                this._groupService.searchGroupContacts(
                  group.groupId,
                  searchFilter,
                  true
                )
              )
            ).pipe(
              tap((totalRecord) => {
                totalRecord.reduce((acc, totalRecordNumber) => {
                  acc += totalRecordNumber.totalRecords;
                  this.setTotalRecords(acc);
                  return acc;
                }, 0);
              }),
              map((membersArr) =>
                membersArr
                  .map((members) => members.members)
                  .reduce((acc, v) => {
                    acc.push(...v);
                    return acc;
                  }, [])
                  .filter((member, index, arr) => {
                    return index === arr.findIndex((t) => t.id === member.id);
                  })
              ),
              catchError((error) => {
                this._toastService.addToast(
                  ToastType.Error,
                  'An error occurred, unable to fetch members'
                );
                return throwError(error);
              })
            );
          } else {
            this._loaderService.removeLoader();

            return EMPTY;
          }
        })
      )
      .subscribe(
        (members) => (
          (this.members = members), this._loaderService.removeLoader()
        )
      );
  }

  public getFilters(searchValue = '', pageNumber = 0): RequestPagingFiltering {
    return {
      ...this.searchFilter,
      pageNumber: pageNumber,
      filters: updatedSearchFilter(searchValue),
      sortExpression: this.filterForm.get('sort').value,
    };
  }

  private getDeleteConfirmationMessage(): string {
    const isOnlyMember = this.selectedMembers?.length === 1;
    const [selectedMemberId] = this.selectedMembers;
    const member = isOnlyMember
      ? this.members?.find((mem) => mem.id === selectedMemberId)
      : null;

    return isOnlyMember
      ? `<b>Member: ${formatPhoneNumber(member.phoneNumber)}</b> ${
          member.firstName
        } ${member.lastName}`
      : `<b>Members to Delete:</b> ${+this.selectedMembers.length}`;
  }

  private setSearchInput(): void {
    this.subscription$.add(
      this.searchMember.valueChanges
        .pipe(
          debounceTime(MemberListLimits.DebounceLimit),
          distinctUntilChanged()
        )
        .subscribe((currentValue: string) =>
          this.getMembers(this.getFilters(currentValue))
        )
    );
  }

  private setTotalRecords(totalRecords: number): void {
    this.totalRecords = totalRecords;
    this.membersCount.emit(totalRecords);
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
      sort: [MemberSortDescriptors.LastNameAsc],
    });
  }

  private deleteMember(memberId: number): void {
    this._memberService
      .deleteMember(memberId)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to delete member'
          );
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.deleteMemberFromView(memberId);
        this._toastService.addToast(
          ToastType.Success,
          'Member deleted successfully'
        );
      });
  }

  private deleteMemberFromView(memberId: number): void {
    --this.totalRecords;
    this.selectedMembers.length = 0;
    this.membersCount.emit(this.totalRecords);

    const memberIndex = this.members.findIndex(
      (member) => member.id === memberId
    );
    this.members.splice(memberIndex, 1);
    this.members = [...this.members];
  }

  public closeFilterModalOnEmit(): void {
    this.filterMenuTrigger.closeMenu();
  }

  public sortChangedOnEmit(sortExpression: string): void {
    this.closeFilterModalOnEmit();
    this.filterForm.get('sort').setValue(sortExpression);
    this.getMembers(this.getFilters(this.searchMember.value));
  }

  public memberUpdateOnEmit(): void {
    this._memberService
      .searchMyContacts(this.searchFilter)
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
        this.membersWithStats = response;
        this.setTotalRecords(response.totalRecords);
      });
  }

  public memberSelectOnEmit(member: { id: number; selected: boolean }): void {
    if (member.selected) {
      this.selectedMembers.push(member.id);
      this.selectedMembers = [...this.selectedMembers];
    } else {
      const index = this.selectedMembers.indexOf(member.id);
      if (index > -1) {
        this.selectedMembers.splice(index, 1);
      }
    }
    this.selectedMembers = [...this.selectedMembers];
  }

  public membersListUpdateOnEmit(members: Array<GroupMemberDisplay>): void {
    this.members = members;
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

  public deleteOnClick(): void {
    if (!this.selectedMembers.length) {
      this._toastService.addToast(ToastType.Error, 'No member is selected');
      return;
    }

    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Confirm Delete',
        detail:
          'Are you sure you want to delete selected member(s) from all groups?',
        secondaryDetail: this.getDeleteConfirmationMessage(),
      })
      .pipe(
        take(1),
        filter((value) => !!value)
      )
      .subscribe(() => {
        this._loaderService.showLoader();
        this.selectedMembers.forEach((memberId: number) => {
          this.deleteMember(memberId);
        });
        this._loaderService.removeLoader();
      });
  }

  public deleteAllOnClick(): void {
    this.isEditMode = !this.isEditMode;
    this.selectAllOnClick();
    this.deleteOnClick();
  }

  public cancelOnClick(): void {
    this.isEditMode = false;
    this.isSelected = false;
    this.selectedMembers = [...[]];
  }
}

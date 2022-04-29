import {
  Input,
  Output,
  OnChanges,
  Component,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

import { throwError } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';

import { GroupService } from 'src/app/api/groups/groups.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import { MemberTableHeight } from '@shared/components/member/enums/member-virtual-table.enum';

import {
  GroupMemberDisplay,
  GroupMembersDisplay,
  RequestPagingFiltering,
} from 'src/app/api/members/members.models';

import { updatedSearchFilter } from 'src/app/shared/components/member/helpers/updated-search-filter.helper';

@Component({
  selector: 'app-group-member-add-existing-desktop',
  templateUrl: './group-member-add-existing-desktop.component.html',
  styleUrls: ['./group-member-add-existing-desktop.component.scss'],
})
export class GroupMemberAddExistingDesktopComponent implements OnChanges {
  @Input() groupId: number;
  @Input() editMode: boolean;
  @Input() searchInput: string;
  @Input() totalRecords: number;
  @Input() sortExpression: string;
  @Input() hideUserActions: boolean;

  @Input() selectedMembers: Array<number> = [];
  @Input() searchFilter: RequestPagingFiltering;
  @Input() members: Array<GroupMemberDisplay> = [];

  @Output() memberUpdated: EventEmitter<void>;
  @Output() sortChanged: EventEmitter<string>;
  @Output() membersListUpdate: EventEmitter<Array<GroupMemberDisplay>>;
  @Output() memberSelection: EventEmitter<{ id: number; selected: boolean }>;

  public scrollLoading = false;
  public showNoMemberMessage: boolean;
  public readonly tableHeight = MemberTableHeight;

  constructor(
    private _toastService: ToastService,
    private _groupService: GroupService,
  ) {
    this.memberUpdated = new EventEmitter<void>();
    this.sortChanged = new EventEmitter<string>();
    this.membersListUpdate = new EventEmitter<Array<GroupMemberDisplay>>();
    this.memberSelection = new EventEmitter<{
      id: number;
      selected: boolean;
    }>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showMemberMessage(changes);
  }

  showMemberMessage(changes) {
    changes?.members?.previousValue?.length === 0 &&
    changes?.members?.currentValue?.length === 0
      ? (this.showNoMemberMessage = false)
      : (this.showNoMemberMessage = true);
  }

  public getFilters(searchValue = '', pageNumber = 0): RequestPagingFiltering {
    return {
      ...this.searchFilter,
      pageNumber: pageNumber,
      sortExpression: this.sortExpression,
      filters: updatedSearchFilter(searchValue),
    };
  }

  private getNextMembersBatch(searchFilter: RequestPagingFiltering): void {
    this.scrollLoading = true;
    this._groupService
      .searchMembersNotInGroup(this.groupId, searchFilter, true)
      .pipe(
        take(1),
        finalize(() => (this.scrollLoading = false)),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to fetch members',
          );
          return throwError(error);
        }),
      )
      .subscribe((response: GroupMembersDisplay) => {
        this.members = [...this.members, ...response.members];
        this.totalRecords = response.totalRecords;
        this.membersListUpdate.emit(this.members);
      });
  }

  public nextMembersOnEmit(pageNumber: number): void {
    this.getNextMembersBatch(this.getFilters(this.searchInput, pageNumber));
  }

  public memberSelectOnEmit(member: { id: number; selected: boolean }): void {
    this.memberSelection.emit(member);
  }

  public sortChangeOnEmit(sortExpression: string): void {
    this.sortChanged.emit(sortExpression);
  }
}

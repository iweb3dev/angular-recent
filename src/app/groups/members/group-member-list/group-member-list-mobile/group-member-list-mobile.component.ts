import { ActivatedRoute, Router } from '@angular/router';
import { Input, Output, Component, EventEmitter, OnInit } from '@angular/core';

import { throwError } from 'rxjs';
import { take, finalize, catchError } from 'rxjs/operators';

import {
  Member,
  GroupMemberDisplay,
  GroupMembersDisplay,
  RequestPagingFiltering,
} from 'src/app/api/members/members.models';

import { updatedSearchFilter } from 'src/app/shared/components/member/helpers/updated-search-filter.helper';

import { GroupService } from 'src/app/api/groups/groups.service';
import { MemberService } from 'src/app/api/members/members.service';
import { GroupMemberProfileService } from 'src/app/groups/services/group-member-profile.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

@Component({
  selector: 'app-group-member-list-mobile',
  templateUrl: './group-member-list-mobile.component.html',
  styleUrls: ['./group-member-list-mobile.component.scss'],
})
export class GroupMemberListMobileComponent implements OnInit {
  @Input() groupId: number;
  @Input() searchInput: string;
  @Input() totalRecords: number;
  @Input() sortExpression: string;
  @Input() searchFilter: RequestPagingFiltering;
  @Input() members: Array<GroupMemberDisplay> = [];

  @Output() memberUpdated: EventEmitter<void>;
  @Output() membersListUpdate: EventEmitter<Array<GroupMemberDisplay>>;

  public scrollLoading = false;
  public readonly includePhotos = true;
  private readonly memberRoute = 'member';
  public showNoMemberMessage = true;

  constructor(
    private _router: Router,
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _memberService: MemberService,
    private _activatedRoute: ActivatedRoute,
    private _groupMemberProfileService: GroupMemberProfileService,
  ) {
    this.memberUpdated = new EventEmitter<void>();
    this.membersListUpdate = new EventEmitter<Array<GroupMemberDisplay>>();
  }

  ngOnInit(): void {
    this.showMemberMessage();
  }

  showMemberMessage() {
    !this.members.length && !this.totalRecords
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

  private getNextGroupMembersBatch(searchFilter: RequestPagingFiltering): void {
    this.scrollLoading = true;
    this._groupService
      .searchGroupContacts(this.groupId, searchFilter, this.includePhotos)
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

  private deleteMemberFromView(memberId: number): void {
    --this.totalRecords;

    const memberIndex = this.members.findIndex(
      (member) => member.id === memberId,
    );
    this.members.splice(memberIndex, 1);
    this.members = [...this.members];

    this.memberUpdated.emit();
  }

  public nextMembersOnEmit(pageNumber: number): void {
    this.getNextGroupMembersBatch(
      this.getFilters(this.searchInput, pageNumber),
    );
  }

  public routeMemberOnEmit(memberId: number): void {
    this._router.navigate([this.memberRoute, memberId], {
      relativeTo: this._activatedRoute,
    });
  }

  public deleteMemberOnEmit(memberId: number): void {
    const member = this.members.find((m) => m.id === memberId);
    this._groupMemberProfileService.deleteMemberFromGroup(
      this.groupId,
      [member.groupStaticMemberID],
      () => this.deleteMemberFromView(memberId)
    );
  }

  // FIXME: Using member service to activate/deactive as group-members end-points not working.
  public updateMemberStatusOnEmit(member: GroupMemberDisplay): void {
    this._memberService
      .getMember(member.id)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to change member status',
          );
          return throwError(error);
        }),
      )
      .subscribe((response: Member) => {
        const updatedMember = { ...response };
        updatedMember.isActive = !!member.isActive;
        updatedMember?.phoneNumbers?.forEach(
          (phone) => (phone.isActive = !!member.isActive),
        );
        updatedMember?.emailAddresses?.forEach(
          (email) => (email.isActive = !!member.isActive),
        );
        updatedMember?.addresses?.forEach(
          (address) => (address.isActive = !!member.isActive),
        );
        this._groupMemberProfileService.updateGroupMemberStatus(
          updatedMember,
          this.groupId,
          () => this.memberUpdated.emit(),
        );
      });
  }
}

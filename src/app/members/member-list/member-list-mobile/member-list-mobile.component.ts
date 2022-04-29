import { Router } from '@angular/router';
import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { throwError } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import {
  Member,
  GroupMemberDisplay,
  GroupMembersDisplay,
  RequestPagingFiltering,
} from 'src/app/api/members/members.models';

import { updatedSearchFilter } from 'src/app/shared/components/member/helpers/updated-search-filter.helper';

import { MemberService } from 'src/app/api/members/members.service';
import { MemberProfileService } from '../../services/member-profile.service';

@Component({
  selector: 'app-member-list-mobile',
  templateUrl: './member-list-mobile.component.html',
  styleUrls: ['./member-list-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberListMobileComponent implements OnChanges {
  @Input() editMode: boolean;
  @Input() searchInput: string;
  @Input() totalRecords: number;
  @Input() sortExpression: string;
  @Input() selectedMembers: Array<number> = [];
  @Input() searchFilter: RequestPagingFiltering;
  @Input() members: Array<GroupMemberDisplay> = [];

  @Output() memberUpdated: EventEmitter<void>;
  @Output() membersListUpdate: EventEmitter<Array<GroupMemberDisplay>>;
  @Output() memberSelection: EventEmitter<{ id: number; selected: boolean }>;

  public scrollLoading = false;
  private readonly memberRoute = '../members/member';
  public showNoMemberMessage: boolean;

  constructor(
    private _router: Router,
    private _toastService: ToastService,
    private _memberService: MemberService,
    private _memberProfileService: MemberProfileService,
  ) {
    this.memberUpdated = new EventEmitter<void>();
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
    const previousValue = changes?.members?.previousValue;
    const currentValue = changes?.members?.currentValue;

    (previousValue?.length === 0 && currentValue?.length === 0) ||
    (previousValue === undefined && currentValue?.length === 0)
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
    this._memberService
      .searchMyContacts(searchFilter)
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
    this.getNextMembersBatch(this.getFilters(this.searchInput, pageNumber));
  }

  public routeMemberOnEmit(memberId: number): void {
    this._router.navigate([this.memberRoute, memberId]);
  }

  public deleteMemberOnEmit(memberId: number): void {
    this._memberProfileService.deleteMember(memberId, '', () =>
      this.deleteMemberFromView(memberId),
    );
  }

  public memberSelectOnEmit(member: { id: number; selected: boolean }): void {
    this.memberSelection.emit(member);
  }

  public updateMemberStatusOnEmit(member: GroupMemberDisplay): void {
    this._memberService
      .getMember(member.id)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update member status',
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

        this._memberProfileService.updateMemberAllGroupsStatus(
          updatedMember,
          () => this.memberUpdated.emit(),
        );
      });
  }
}

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Input,
  NgZone,
  OnInit,
  Output,
  Component,
  OnDestroy,
  ViewChild,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { tap, map, take, filter, pairwise, throttleTime } from 'rxjs/operators';

import { SMSStatuses } from 'src/app/api/shared/shared.enums';
import { MemberListLimits } from 'src/app/shared/components/member/enums/member-list.enum';
import { MemberContactAvailability } from 'src/app/shared/components/member/enums/member-contacts-availability.enum';

import {
  RequestBase,
  GroupMemberDisplay,
} from 'src/app/api/members/members.models';

@Component({
  selector: 'app-member-virtual-list-mobile',
  templateUrl: './member-virtual-list-mobile.component.html',
  styleUrls: ['./member-virtual-list-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberVirtualListMobileComponent implements OnInit, OnDestroy {
  @Input() editMode: boolean;
  @Input() totalRecords: number;
  @Input() hideUserActions: boolean;
  @Input() selectedMembers: Array<number> = [];
  @Input() members: Array<GroupMemberDisplay> = [];
  @Input() scrollFilter: RequestBase = { pageSize: 50, pageNumber: 0 };

  @Output() nextMembers: EventEmitter<number>;
  @Output() routeMember: EventEmitter<number>;
  @Output() deleteMember: EventEmitter<number>;
  @Output() updateMemberStatus: EventEmitter<GroupMemberDisplay>;
  @Output() memberSelection: EventEmitter<{ id: number; selected: boolean }>;

  @ViewChild('scroller', { static: false }) scroller: CdkVirtualScrollViewport;

  public scrollLoading = false;
  private subscription$: Subscription;

  public readonly memberTextStatus = SMSStatuses;
  public readonly memberLimits = MemberListLimits;
  public readonly memberContact = MemberContactAvailability;

  constructor(private _ngZone: NgZone) {
    this.subscription$ = new Subscription();
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
    this.setScrollerOnChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
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
          filter(
            () =>
              this.scrollFilter.pageNumber <
              Math.ceil(this.totalRecords / this.scrollFilter.pageSize) - 1
          ),
          filter(([y1, y2]) => y2 < y1 && y2 < this.memberLimits.ScrollerLimit),
          throttleTime(this.memberLimits.ThrottleLimit)
        )
        .subscribe(() => {
          const pageNumber = ++this.scrollFilter.pageNumber;
          this._ngZone.run(() => this.nextMembers.emit(pageNumber));
        })
    );
  }

  // FIXME: Using member service to activate/deactive as group-members end-points not working.
  public memberStatusOnChange(member: GroupMemberDisplay): void {
    this.updateMemberStatus.emit(member);
  }

  public memberSelectionOnChange(id: number, selection: MatCheckboxChange) {
    this.memberSelection.emit({ id, selected: selection.checked });
  }

  public memberNameOnClick(id: number): void {
    this.routeMember.emit(id);
  }

  public deleteMemberOnClick(id: number): void {
    this.deleteMember.emit(id);
  }

  public memberSectionOnClick(id: number, event: MouseEvent): void {
    if (!this.editMode) {
      return;
    }
    event.preventDefault();

    const index = this.selectedMembers.findIndex((memberId) => memberId === id);
    const selected = index > -1 ? false : true;

    if (index > -1) {
      this.selectedMembers.splice(index, 1);
    } else {
      this.selectedMembers.push(id);
    }
    this.memberSelection.emit({ id, selected });
  }
}

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OnInit, Component, ViewChild, OnDestroy, ElementRef } from '@angular/core';

import { forkJoin, Subject, Subscription, throwError } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map, take, filter, finalize, takeUntil, switchMap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { GroupWithStats } from 'src/app/api/groups/groups.models';
import { SystemSetting } from '@core/store/features/system-settings/system-settings.models';
import { GroupMemberListResolvereModel } from '../../models/group-member-list-resolver.model';
import { GroupMemberDisplay, GroupMembersDisplay, RequestPagingFiltering } from 'src/app/api/members/members.models';

import { SmsService } from 'src/app/api/sms/sms.service';
import { GroupService } from 'src/app/api/groups/groups.service';
import { GroupMemberService } from '../../services/group-member.service';
import { KeywordsFacade } from 'src/app/core/store/features/keywords/keywords.facade';
import { SystemSettingsFacade } from '@core/store/features/system-settings/system-settings.facade';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import { ToastType, ToastService } from 'src/app/shared/components/toast/service/toast.service';

import { GroupMembersAdd } from '../../enums/group-member-add.enum';
import { GroupRedirectPaths } from '../../enums/group-redirect.enum';
import { GroupMemberOptInMessage } from '../../enums/group-member-opt-in.enum';
import { MemberListLimits } from '../../../shared/components/member/enums/member-list.enum';
import { MemberSortDescriptors } from '../../../shared/components/member/enums/member-search-filter.enum';

import { MemberSearchFilter, MemberSortFilterTypes } from 'src/app/shared/constants/member.constants';

import { updatedSearchFilter } from '../../../shared/components/member/helpers/updated-search-filter.helper';

import { GroupNameEditComponent } from '../../modals/group-name-edit/group-name-edit.component';
import { GroupMemberAddComponent } from '../../modals/group-member-add/group-member-add.component';
import { GroupMemberPrintComponent } from '../../modals/group-member-print/group-member-print.component';
import { GroupBadNumbersRemoveComponent } from '../../modals/group-bad-numbers-remove/group-bad-numbers-remove.component';
import { UserSessionService } from '@core/user-session/user-session.service';

const initialSettings = {
  groupPicture: {
    settingName: 'Display a picture for a member in a group',
    setting: {} as SystemSetting,
  },
};

@Component({
  selector: 'app-group-member-list-container',
  templateUrl: './group-member-list-container.component.html',
  styleUrls: ['./group-member-list-container.component.scss'],
})
export class GroupMemberListContainerComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  public showSearchInput = false;
  private includePhotos: boolean;
  private destroy$ = new Subject();

  public hasMember = false;
  public listLoading = false;
  public totalRecords: number;

  public filterForm: FormGroup;
  public searchMember: FormControl;
  private subscription$: Subscription;

  public groupId: number;
  public groupName: string;
  public groupWithStats: GroupWithStats;
  public members: Array<GroupMemberDisplay> = [];
  public groupMembersDisplay: GroupMembersDisplay;

  public searchFilter = { ...MemberSearchFilter };
  public readonly sortFilter = MemberSortFilterTypes;

  public keywords$ = this._smsService.getUserKeywordList();
  private hasKeywords$ = this._keywordsFacade.allKeywords$.pipe(map((s) => !!s.length));

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _location: Location,
    private _smsService: SmsService,
    private _formBuilder: FormBuilder,
    public _groupService: GroupService,
    private _toastService: ToastService,
    private _keywordsFacade: KeywordsFacade,
    private _activatedRoute: ActivatedRoute,
    private _userSessionService: UserSessionService,
    private _groupMemberService: GroupMemberService,
    private _confirmDialogService: ConfirmDialogService,
    private _systemSettingsFacade: SystemSettingsFacade
  ) {
    this.filterForm = this.createFilterForm();

    this.searchMember = new FormControl('');
    this.subscription$ = new Subscription();
  }

  ngOnInit(): void {
    this.getInitialGroupMembers();
    this.setPhotoInclude();
    this.setSearchInput();
    this.getMembersAvailability();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private setPhotoInclude() {
    this._systemSettingsFacade.settings$
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() =>
          forkJoin(
            Object.keys(initialSettings).map((s) =>
              this._systemSettingsFacade.findSystemSettingByDisplayName(initialSettings[s].settingName)
            )
          ).pipe(
            take(1),
            map((res) => {
              return Object.keys(initialSettings).reduce((a, b) => {
                a[b] = {
                  ...initialSettings[b],
                  setting: res.find((s) => s?.description === initialSettings[b].settingName),
                };
                return a;
              }, initialSettings).groupPicture.setting.settingValue;
            })
          )
        )
      )
      .subscribe((photo) => this.settingPhoto(photo));
  }
  settingPhoto(responds: any) {
    if (typeof responds === 'string') {
      if (responds.toLocaleLowerCase() === 'true') {
        this.includePhotos = true;
      } else {
        this.includePhotos = false;
      }
    } else {
      this.includePhotos = responds;
    }
  }

  public get sortFilterValue(): string {
    return this.filterForm.get('sort').value;
  }

  private getMembersAvailability(): void {
    this._groupMemberService.getGroupMembersAvailability((value) => (this.hasMember = value));
  }

  private getInitialGroupMembers(): void {
    this._activatedRoute.data
      .pipe(
        take(1),
        catchError((response) => {
          this._toastService.addToast(ToastType.Error, 'An error occurred, unable to fetch member details');
          return throwError(response);
        })
      )
      .subscribe((response: { data: GroupMemberListResolvereModel }) => {
        this.groupWithStats = response.data.groupWithStats;
        this.groupMembersDisplay = response.data.groupMembersDisplay;

        this.members = this.groupMembersDisplay.members;
        this.groupId = this.groupWithStats.groupDetails.group.id;
        this.groupName = this.groupWithStats.groupDetails.group.groupName;
        this.totalRecords = this.groupMembersDisplay.totalRecords;
      });
  }

  private getGroupMembers(searchFilter: RequestPagingFiltering): void {
    this.listLoading = true;
    this._groupService
      .searchGroupContacts(this.groupId, searchFilter, this.includePhotos)
      .pipe(
        take(1),
        finalize(() => (this.listLoading = false)),
        catchError((error) => {
          this._toastService.addToast(ToastType.Error, 'An error occurred, unable to fetch members');
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
      sortExpression: this.sortFilterValue,
    };
  }

  private getGroupDialogConfig(): MatDialogConfig {
    return this.mobileView
      ? {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        data: { groupId: this.groupId, groupName: this.groupName },
      }
      : { data: { groupId: this.groupId, groupName: this.groupName } };
  }

  public get mobileView() {
    return window.innerWidth <= MemberListLimits.MobileViewLimit;
  }

  private setSearchInput(): void {
    this.subscription$.add(
      this.searchMember.valueChanges
        .pipe(debounceTime(MemberListLimits.DebounceLimit), distinctUntilChanged())
        .subscribe((currentValue: string) => {
          this.getGroupMembers(this.getFilters(currentValue));
        })
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

  public updateAllMembersStatus(status: boolean): void {
    this._groupMemberService.updateAllMembersStatus(this.groupId, status, GroupRedirectPaths.Groups);
  }

  private redirectToAddMember(id: number, secondaryPath: string): void {
    this._router.navigate([`${GroupRedirectPaths.Group}/${id}/members/${secondaryPath}`]);
  }

  private redirectToAddViaKeywords(): void {
    this.subscription$.add(
      this.hasKeywords$.subscribe((hasKeyword) => {
        const redirectRoute = hasKeyword ? `${GroupRedirectPaths.Keywords}/create` : `${GroupRedirectPaths.Keywords}`;

        this._router.navigate([redirectRoute], {
          state: { commingFrom: 'addMembers' },
        });
      })
    );
  }

  private evaluateUserSelection(selection: string): void {
    switch (selection) {
      case GroupMembersAdd.Manually:
        this.redirectToAddMember(this.groupId, GroupMembersAdd.Manually);
        break;
      case GroupMembersAdd.Import:
        this.redirectToAddMember(this.groupId, GroupMembersAdd.Import);
        break;
      case GroupMembersAdd.Keyword:
        this.redirectToAddViaKeywords();
        break;
      case GroupMembersAdd.Existing:
        this.redirectToAddMember(this.groupId, GroupMembersAdd.Existing);
        break;
      default:
        break;
    }
  }

  public membersListUpdateOnEmit(members: Array<GroupMemberDisplay>): void {
    this.members = members;
  }

  public memberUpdatedOnEmit(): void {
    this._groupService
      .getGroupWithStats(this.groupId)
      .pipe(
        take(1),
        catchError((response) => {
          this._toastService.addToast(ToastType.Error, 'An error occurred, unable to fetch group stats');
          return throwError(response);
        })
      )
      .subscribe((response) => (this.groupWithStats = response));
  }

  public sortChangedOnEmit(sortExpression: string): void {
    this.filterForm.get('sort').setValue(sortExpression);
    this.getGroupMembers(this.getFilters(this.searchMember.value));
  }

  public searchOnClick(): void {
    this.showSearchInput = !this.showSearchInput;
    if (this.showSearchInput) {
      setTimeout(() => this.searchInput.nativeElement.focus());
    }
  }

  public deleteAllMembersOnClick(): void {
    this._groupMemberService.deleteAllGroupMembers(this.groupId, this.groupName, GroupRedirectPaths.Groups);
  }

  public deleteGroupOnClick(): void {
    this._groupMemberService.deleteGroup(this.groupId, this.groupName, GroupRedirectPaths.Groups);
  }

  public editGroupNameOnClick(): void {
    this._dialog
      .open(GroupNameEditComponent, this.getGroupDialogConfig())
      .afterClosed()
      .pipe(take(1))
      .subscribe((newName) => (this.groupName = newName));
  }

  public addNewMemberOnClick(): void {
    this._dialog
      .open(GroupMemberAddComponent, {
        width: '600px',
        data: { addExistingMembers: this.hasMember && !this._userSessionService.isManager },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((selection: string) => this.evaluateUserSelection(selection));
  }

  public closeOnClick(): void {
    this._location.back();
  }

  public printOnClick(): void {
    this._dialog
      .open(GroupMemberPrintComponent, {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        data: {
          members: this.members,
          groupName: this.groupName,
          memberCount: this.groupMembersDisplay.totalRecords,
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe();
  }

  public exportOnClick(): void {
    this._groupMemberService.exportGroupMembers(this.groupId, this.groupName);
  }

  public exportSMSNotOptedOnClick(): void {
    this._groupMemberService.exportSMSNotOptedIn(this.groupId, this.groupName);
  }

  public sendSMSOptInEmailOnClick(): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Next',
        header: 'Email Members',
        secondaryDetail: GroupMemberOptInMessage.Email,
      })
      .pipe(
        take(1),
        filter((value) => !!value)
      )
      .subscribe(() => this._groupMemberService.sendSMSOptInEmail(this.groupId));
  }

  public sendSMSOptInTextOnClick(): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Next',
        header: 'Text Members',
        secondaryDetail: GroupMemberOptInMessage.Text,
      })
      .pipe(
        take(1),
        filter((value) => !!value)
      )
      .subscribe(() => this._groupMemberService.sendSMSOptInText(this.groupId));
  }

  public exportBadNumbersOnClick(): void {
    this._groupMemberService.exportBadNumbers(this.groupId, this.groupName);
  }

  public removeBadNumbersOnClick(): void {
    this._dialog.open(GroupBadNumbersRemoveComponent, this.getGroupDialogConfig()).afterClosed().pipe(take(1)).subscribe();
  }
}

import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { ExtendedGroupDetails } from 'src/app/api/groups/groups.models';

import { GroupMembersAdd } from '../enums/group-member-add.enum';
import { GroupRedirectPaths } from '../enums/group-redirect.enum';
import { groupCreationFlow } from '../enums/group-creation-flow.enum';
import { GroupCreationPathForward } from '../enums/group-path-forward.enum';

import { PartialExtendedGroup } from '../types/partial-extended-group.type';

import { GroupMemberAddComponent } from '../modals/group-member-add/group-member-add.component';

import { GroupService } from '@api/groups/groups.service';
import { GroupMemberService } from '../services/group-member.service';
import { KeywordsFacade } from 'src/app/core/store/features/keywords/keywords.facade';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';
import { UserSessionService } from '@core/user-session/user-session.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
})
export class GroupCreateComponent implements OnInit, OnDestroy {
  public groupName: FormControl;
  public extendedGroupDetails: PartialExtendedGroup<ExtendedGroupDetails>;

  public hasMember = false;
  public isFromNewCommunication = false;

  private readonly addMemberDialogWidth = '600px';

  private subscription$: Subscription;
  public groups$ = this._groupService.fetchGroups();
  private hasKeywords$ = this._keywordsFacade.allKeywords$.pipe(
    map((s) => !!s.length)
  );

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _location: Location,
    private _toastService: ToastService,
    private _groupService: GroupService,
    private _keywordsFacade: KeywordsFacade,
    private _activatedRoute: ActivatedRoute,
    private _groupMemberService: GroupMemberService,
    private _userSessionService: UserSessionService
  ) {
    this.groupName = new FormControl('');
    this.subscription$ = new Subscription();
  }

  ngOnInit() {
    this.isFromNewCommunication =
      this._activatedRoute.snapshot.queryParamMap.get('from') ===
      groupCreationFlow.NewCommunication;

    this.getMembersAvailability();
  }

  private getMembersAvailability(): void {
    this._groupMemberService.getGroupMembersAvailability(
      (value) => (this.hasMember = value)
    );
  }

  private getExtendedGroup(
    pathForward: string,
    groupName: string
  ): PartialExtendedGroup<ExtendedGroupDetails> {
    return {
      pathForward: pathForward,
      group: {
        groupName: groupName,
      },
    };
  }

  private get isValidGroup(): boolean {
    const hasValue = this.groupName.value.length ? true : false;
    if (!hasValue) {
      this._toastService.addToast(
        ToastType.Error,
        'Please enter a valid group name'
      );
    }
    return hasValue;
  }

  public createGroup(
    groupName: string,
    pathForward: string,
    secondaryPath: string,
    withoutAddingMembers = false
  ): void {
    this.extendedGroupDetails = {
      pathForward: pathForward,
      group: {
        groupName: groupName,
      },
    };

    this._groupMemberService.addGroup(
      this.getExtendedGroup(pathForward, groupName),
      (id: number) => {
        if (this.isFromNewCommunication && withoutAddingMembers) {
          this._router.navigate([`new-communication/details`], {
            queryParams: {
              groupId: id,
            },
          });
        } else {
          this._router.navigate(
            [`${GroupRedirectPaths.Group}/${id}/members/${secondaryPath}`],
            { queryParamsHandling: 'merge' }
          );
        }
      }
    );
  }

  private addMembersManually(): void {
    this.createGroup(
      this.groupName.value,
      GroupCreationPathForward.Multiple,
      GroupMembersAdd.Manually
    );
  }

  private addMembersViaUpload(): void {
    this.createGroup(
      this.groupName.value,
      GroupCreationPathForward.Import,
      GroupMembersAdd.Import
    );
  }

  private addMembersViaKeywords(): void {
    this._groupMemberService.addGroup(
      this.getExtendedGroup(
        GroupCreationPathForward.Keyword,
        this.groupName.value
      ),
      (id: number) => {
        this.subscription$.add(
          this.hasKeywords$.subscribe((hasKeyword) => {
            const redirectRoute = hasKeyword
              ? `${GroupRedirectPaths.Keywords}/create`
              : `${GroupRedirectPaths.Keywords}`;

            this._router.navigate([redirectRoute], {
              state: { commingFrom: 'addMembers' },
            });
          })
        );
      }
    );
  }

  private addExistingMembers(): void {
    this.createGroup(
      this.groupName.value,
      GroupCreationPathForward.Existing,
      GroupMembersAdd.Existing
    );
  }

  private evaluateUserSelection(selection: string): void {
    switch (selection) {
      case GroupMembersAdd.Manually:
        this.addMembersManually();
        break;
      case GroupMembersAdd.Import:
        this.addMembersViaUpload();
        break;
      case GroupMembersAdd.Keyword:
        this.addMembersViaKeywords();
        break;
      case GroupMembersAdd.Existing:
        this.addExistingMembers();
        break;
      default:
        break;
    }
  }

  public addMembersOnClick(): void {
    if (!this.isValidGroup) {
      return;
    }

    this.subscription$.add(
      this._dialog
        .open(GroupMemberAddComponent, {
          width: this.addMemberDialogWidth,
          data: {
            addExistingMembers:
              this.hasMember && !this._userSessionService.isManager,
          },
        })
        .afterClosed()
        .subscribe((selection: string) => this.evaluateUserSelection(selection))
    );
  }

  public createGroupOnClick(): void {
    if (this.isValidGroup) {
      this.createGroup(
        this.groupName.value,
        GroupCreationPathForward.Unknown,
        GroupRedirectPaths.Group,
        true
      );
    }
  }

  public cancelOnClick(): void {
    this._location.back();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}

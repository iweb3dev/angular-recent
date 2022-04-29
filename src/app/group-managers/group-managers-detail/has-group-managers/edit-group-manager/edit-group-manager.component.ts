import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupFacade } from 'src/app/core/store/features/groups/group.facade';
import { tap, map, finalize, withLatestFrom } from 'rxjs/operators';
import { Subscription, noop } from 'rxjs';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { GroupManagersService } from '../../../../api/group-managers/group-managers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupManagersFacade } from 'src/app/core/store/features/group-managers/group-managers.facade';
import { GroupManagers } from '../../../../api/group-managers/group-managers.models';

@Component({
  selector: 'app-edit-group-manager',
  templateUrl: './edit-group-manager.component.html',
  styleUrls: ['./edit-group-manager.component.scss']
})
export class EditGroupManagerComponent implements OnInit, OnDestroy {

  groupsSubs: Subscription;

  updateGroupManageSubs: Subscription;

  groups: any[];

  editGroupManager: GroupManagers;

  selectAll = false;

  groupManagerId: number;

  form: FormGroup;

  constructor(
    private _groupFacade: GroupFacade,
    private _loaderFacade: LoaderFacade,
    private _groupManagersFacade: GroupManagersFacade,
    private _groupManagersService: GroupManagersService,
    private router: Router,
    private route: ActivatedRoute) {
      this.form = new FormGroup({
        requestEmailAddress: new FormControl(''),
        creditLimit: new FormControl(null),
        allowAccessToAllGroups: new FormControl(false),
        userGroupRoles: new FormArray([])
      });
     }

  ngOnInit(): void {
    this._loaderFacade.showLoader();

    this.route.paramMap.subscribe( paramMap => {
      this.groupManagerId = +paramMap.get('id');
    });

    this.groupsSubs = this._groupFacade.allGroups$
      .pipe(
        map(groups => {
         return groups.map(group => {

            return {
              ...group,
              checked: false
            };

          });
        }),
        withLatestFrom(this._groupManagersFacade.allGroupManagers$),
        tap(([groups, groupManagers]) => {

          this.editGroupManager = groupManagers.filter(groupManager => groupManager.id === this.groupManagerId)[0];
          this.form.patchValue({ allowAccessToAllGroups: this.editGroupManager.allowAccessToAllGroups});
          this.form.patchValue({ creditLimit: this.editGroupManager.creditLimit});

          this.groups = groups.map(group => {
            const isGroupExist = this.editGroupManager.groups.filter(editGroup => {
              if (group.id === editGroup.groupID) {
                return group;
              }
            })[0];

            if (isGroupExist) {
              group.checked = true;
            } else {
              group.checked = false;
            }

            return group;
          });

          this._loaderFacade.removeLoader();
        })
      )
      .subscribe(
        noop,
        err => this._loaderFacade.removeLoader()
      );
  }

  onCheckboxChange(e, groupId) {

    const userGroupRoles: FormArray = this.form.get('userGroupRoles') as FormArray;

    this.groups.map(group => {
      if (group.id === groupId) {
        if (e.checked) {
          group.checked = e.checked;
          // userGroupRoles.push(new FormControl({ groupid: group.id, flaggedForDeletion: false }));
        } else {
          const index = userGroupRoles.controls.findIndex((x: any) => x.value.groupid === groupId);

          userGroupRoles.removeAt(index);
        }

        return group;
      }
      return group;
    });
  }

  onCancel() {
    this.router.navigateByUrl('/group-managers');
  }

  selectAllCheck(e) {
    const userGroupRoles: FormArray = this.form.get('userGroupRoles') as FormArray;

    this.form.patchValue({ allowAccessToAllGroups: e.checked });

    if (e.checked) {
      this.groups.map((group) => {
        group.checked = true;
        // userGroupRoles.push(new FormControl({ groupid: group.id, flaggedForDeletion: false }));
      });
    } else {
      this.groups.map((group) => {
        group.checked = false;
      });


      while (userGroupRoles.length !== 0) {
        userGroupRoles.removeAt(0);
      }
    }

  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formValues = this.form.value;

    const updateGroupManagers = {
      ...formValues,
      id: this.editGroupManager.subAccountUserID,
      mFA_UsersID: 0,
      requestID: '',
      requestStatusCode: 0
    };

    this._loaderFacade.showLoader();

    this.updateGroupManageSubs = this._groupManagersService.updateGroupManagers(updateGroupManagers)
    .subscribe(
      data => {
        this._loaderFacade.removeLoader();
        this._groupManagersFacade.fetchGroupManagers();
        this.router.navigateByUrl('/group-managers');
      },
      err => this._loaderFacade.removeLoader()
    );
  }

  ngOnDestroy() {
    if (this.groupsSubs) {
      this.groupsSubs.unsubscribe();
    }

    if (this.updateGroupManageSubs) {
      this.updateGroupManageSubs.unsubscribe();
    }
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupFacade } from 'src/app/core/store/features/groups/group.facade';
import { tap, map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { GroupManagersService } from '../../../../api/group-managers/group-managers.service';
import { Router } from '@angular/router';
import { GroupManagersFacade } from 'src/app/core/store/features/group-managers/group-managers.facade';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationNameModalComponent } from '../organization-name-modal/organization-name-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { selectMainUserInfo } from 'src/app/core/store/features/user/user.selectors';
import { UserFacade } from '../../../../core/store/features/user/user.facade';

@Component({
  selector: 'app-create-group-manager',
  templateUrl: './create-group-manager.component.html',
  styleUrls: ['./create-group-manager.component.scss']
})
export class CreateGroupManagerComponent implements OnInit, OnDestroy {

  mainUserInfo$ = this._store.select(selectMainUserInfo);
  groupManagers$ = this._groupManagersFacade.allGroupManagers$;

  groupsSubs: Subscription;

  createGroupManageSubs: Subscription;
  groupManagersSubs: Subscription;

  groups: any[];

  selectAll = false;

  form: FormGroup;

  user: any;

  constructor(
    private _store: Store<AppState>,
    private _groupFacade: GroupFacade,
    private _loaderFacade: LoaderFacade,
    private _groupManagersFacade: GroupManagersFacade,
    private _groupManagersService: GroupManagersService,
    private router: Router,
    public dialog: MatDialog,
    private _usersFacade: UserFacade,
    ) {}

  ngOnInit(): void {
    this._loaderFacade.showLoader();
    this.groupsSubs = this._groupFacade.allGroups$
      .pipe(
        map(groups => {
         return groups.map(group => {
            return {
              ...group,
              checked : false
            };
          });
        }),

      )
      .subscribe(groups => {
        this.groups = groups;
        this._loaderFacade.removeLoader();
      },
      err => this._loaderFacade.removeLoader()
      );

      this.mainUserInfo$
      .subscribe((user: any) => {
        if (user) {
          this.user = user;
        }
      });



      this._groupManagersFacade.fetchGroupManagers();

      this.groupManagersSubs =  this._groupManagersFacade.allGroupManagers$
      .pipe(
        take(1),
        tap(groupManagers => {
          if (!this.user.organization) {
            let dialogRef;
            if (!groupManagers.length) {
              dialogRef = this.dialog.open(OrganizationNameModalComponent, {
                width: '500px',
                panelClass: 'organization-name-modal',
                disableClose: true
              });

              dialogRef.afterClosed().subscribe(result => {
                if (result) {
                  const organizationName = result;
                  this.user = {
                    ...this.user,
                    organization: organizationName
                  };
                  this._usersFacade.saveProfileSettings(this.user);
                } else {
                  this.router.navigateByUrl('/group-managers');
                }
              });
            }
          }
        })
      )
      .subscribe();

      this.form = new FormGroup({
        requestEmailAddress: new FormControl('', [Validators.required]),
        creditLimit: new FormControl(''),
        allowAccessToAllGroups: new FormControl(false),
        userGroupRoles: new FormArray([], [Validators.required])
      });
  }

  onCheckboxChange(e, groupId) {

    const userGroupRoles: FormArray = this.form.get('userGroupRoles') as FormArray;

    this.groups.map(group => {
      if (group.id === groupId) {
        if (e.checked) {
          group.checked = e.checked;
          userGroupRoles.push(new FormControl({ groupid: group.id }));
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
        userGroupRoles.push(new FormControl({ groupid: group.id }));
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

    const createGroupManagers = {
      ...formValues,
      id: -1,
      mFA_UsersID: 0,
      requestID: '',
      requestStatusCode: 0
    };

    this._loaderFacade.showLoader();

    this.createGroupManageSubs = this._groupManagersService.createGroupManagers(createGroupManagers)
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

    if (this.createGroupManageSubs) {
      this.createGroupManageSubs.unsubscribe();
    }
  }

}

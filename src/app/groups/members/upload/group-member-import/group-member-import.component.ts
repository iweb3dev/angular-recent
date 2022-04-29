import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  Output,
  ViewChild,
  Component,
  ElementRef,
  EventEmitter,
} from '@angular/core';

import { throwError } from 'rxjs';
import { catchError, filter, take } from 'rxjs/operators';

import { GroupWithStats } from 'src/app/api/groups/groups.models';

import { membersImportFileTypes } from 'src/app/groups/constants/group.constants';

import { GroupService } from 'src/app/api/groups/groups.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';
import { GroupListLimits } from 'src/app/groups/enums/group-list.enum';

@Component({
  selector: 'app-group-member-import',
  templateUrl: './group-member-import.component.html',
  styleUrls: ['./group-member-import.component.scss'],
})
export class GroupMemberImportComponent {
  @Output() uploadMembersFile: EventEmitter<File>;
  @ViewChild('memberFile', { static: true }) memberFile: ElementRef;

  private groupId: number;
  public group: GroupWithStats;

  public isImported: boolean;

  public file: File;
  public fileName: string;

  private learnMoreLink =
    'http://help.callingpost.com/en/articles/4008678-how-do-monthly-unique-contact-allotments-work';
  constructor(
    private _location: Location,
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.uploadMembersFile = new EventEmitter<File>();

    this._activatedRoute.params
      .pipe(
        filter((value) => !!value),
        take(1)
      )
      .subscribe((params) => {
        this.groupId = +params['id'];
        this.getGroup();
      });
  }

  private getGroup(): void {
    this._loaderService.showLoader();
    this._groupService
      .getGroupWithStats(this.groupId)
      .pipe(
        take(1),
        catchError((response) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to fetch group'
          );
          return throwError(response);
        })
      )
      .subscribe((response: GroupWithStats) => {
        this.group = response;
        this._loaderService.removeLoader();
      });
  }

  public get mobileView() {
    return window.innerWidth <= 960;
  }

  public uploadFileOnChange(event: Event): void {
    this.file = (<HTMLInputElement>event.target).files[0];
    this.fileName = this.file.name;

    const [, fileType] = this.file.name.split('.');

    if (!membersImportFileTypes.includes(fileType)) {
      this._toastService.addToast(
        ToastType.Error,
        'Wrong file format - Upload an xlxs, xls, or a cab file'
      );
    } else {
      this.isImported = true;
    }
  }

  public learnMoreOnClick(): void {
    window.open(this.learnMoreLink, '_blank');
  }

  public nextOnClick(): void {
    if (!this.isImported) {
      this._toastService.addToast(ToastType.Error, 'No member imported');
    } else {
      this.uploadMembersFile.emit(this.file);
    }
  }

  public cancelOnClick(): void {
    this._location.back();
  }

  public removeFileOnClick(): void {
    this.fileName = '';
    this.isImported = false;
    this.memberFile.nativeElement.value = '';
  }
}

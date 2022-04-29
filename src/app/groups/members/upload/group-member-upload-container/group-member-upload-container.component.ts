import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { ImportMappingFields } from 'src/app/api/lookups/lookups.models';

import { membersImportFileTypes } from 'src/app/groups/constants/group.constants';

import { GroupListLimits } from 'src/app/groups/enums/group-list.enum';
import { GroupMemberImport } from 'src/app/groups/enums/group-member-import.enum';

import { LookupsService } from 'src/app/api/lookups/lookups.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { FileReaderService } from 'src/app/core/services/file-reader/file-reader.service';
import { GroupMemberImportService } from 'src/app/groups/services/group-member-import.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

@Component({
  selector: 'app-group-member-upload-container',
  templateUrl: './group-member-upload-container.component.html',
  styleUrls: ['./group-member-upload-container.component.scss'],
})
export class GroupMemberUploadContainerComponent implements OnInit {
  public groupId: number;
  public membersFile: File;
  public importMembersFile = true;

  public worksheetHeaders: Array<string> = [];
  public membersPreviewDetails: Array<string | number>[] = [];
  public importMappingFields: Array<ImportMappingFields> = [];

  constructor(
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    private _lookupsService: LookupsService,
    private _activatedRoute: ActivatedRoute,
    private _fileReaderService: FileReaderService,
    private _confirmDialogService: ConfirmDialogService,
    private _groupMemberImportService: GroupMemberImportService,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.groupId = parseInt(params['id'], 10);
      this.getImportMappingFields(this.groupId);
    });
  }

  private getImportMappingFields(groupId: number): void {
    this._lookupsService
      .getImportMappingFields(groupId)
      .pipe(
        take(1),
        catchError((response) => {
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to fetch column header fields',
          );
          return throwError(response);
        }),
      )
      .subscribe(
        (response: Array<ImportMappingFields>) =>
          (this.importMappingFields = response),
      );
  }

  public get mobileView() {
    return window.innerWidth <= GroupListLimits.MobileViewLimit;
  }

  private parseMembersFile(file: File): void {
    const [, fileType] = file.name.split('.');
    if (!membersImportFileTypes.includes(fileType)) {
      this._toastService.addToast(
        ToastType.Error,
        'Unsupported media - Use a supported format (Xlsx)',
      );
      return;
    }

    if (fileType.includes('xlsx')) {
      this.parseXlsxFile(file);
    } else {
      this._toastService.addToast(ToastType.Error, 'Unable to import file');
    }
  }
  public hasMaxRecords(
    membersPreviewDetails: Array<string | number>[],
  ): boolean {
    if (membersPreviewDetails?.length > GroupMemberImport.MaxFileSize) {
      this._confirmDialogService
        .showDialog({
          confirmBtn: 'OK',
          header: 'File Import',
          detail:
            'Max file size reached. File must have less than 15000 records',
        })
        .pipe(take(1))
        .subscribe((data) => (this.importMembersFile = true));
      return true;
    }
    return false;
  }

  private parseXlsxFile(file: File): void {
    this._loaderService.showLoader();
    this._fileReaderService
      .readFileAsBinaryString(file)
      .pipe(take(1))
      .subscribe((binaryString: string | ArrayBuffer) => {
        const workBook: XLSX.WorkBook = XLSX.read(binaryString, {
          type: 'binary',
        });

        const [workSheetName] = workBook.SheetNames; // 1st sheet selected
        const worksheet: XLSX.WorkSheet = workBook.Sheets[workSheetName];

        this._loaderService.removeLoader();
        this.membersPreviewDetails = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }); // To get 2d array 2nd parameter = {header: 1}
        if (!this.hasMaxRecords(this.membersPreviewDetails)) {
          this.membersPreviewDetails.shift();
          this.worksheetHeaders =
            this._groupMemberImportService.getWorkSheetHeaders(worksheet);
        } else {
          this.membersPreviewDetails = [];
        }
      });
  }

  public fileOnImport(file: File): void {
    this.importMembersFile = false;
    this.parseMembersFile(file);
    this.membersFile = file;
  }

  public goBackOnEmit(): void {
    this.importMembersFile = true;
  }
}

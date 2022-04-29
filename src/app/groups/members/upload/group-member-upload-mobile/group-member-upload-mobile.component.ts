import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatCheckboxChange } from '@angular/material/checkbox';

import { ImportModel } from 'src/app/api/groups/groups.models';
import { ImportMappingFields } from 'src/app/api/lookups/lookups.models';

import { GroupRedirectPaths } from 'src/app/groups/enums/group-redirect.enum';

import { GroupMemberService } from 'src/app/groups/services/group-member.service';
import { GroupMemberImportService } from 'src/app/groups/services/group-member-import.service';

@Component({
  selector: 'app-group-member-upload-mobile',
  templateUrl: './group-member-upload-mobile.component.html',
  styleUrls: ['./group-member-upload-mobile.component.scss'],
})
export class GroupMemberUploadMobileComponent {
  @Input() groupId: number;
  @Input() membersPreviewFile: File;
  @Input() membersPreviewDetails: Array<string | number>[] = [];
  @Input() importMappingFields: Array<ImportMappingFields> = [];
  @Input() set headers(previewHeaders: Array<string>) {
    if (!previewHeaders.length) {
      return;
    }
    this.memberPreviewHeaders = [...previewHeaders];
    this.patchHeadersFormArray(previewHeaders?.length, previewHeaders);
  }

  @Output() goBack: EventEmitter<boolean>;

  public membersPreviewForm: FormGroup;
  public memberPreviewHeaders: Array<string> = [];

  constructor(
    private _location: Location,
    private _formBuilder: FormBuilder,
    private _groupMemberService: GroupMemberService,
    private _groupMemberImportService: GroupMemberImportService
  ) {
    this.goBack = new EventEmitter<boolean>();
    this.membersPreviewForm = this.createForm();
  }

  private setHeaders(): void {
    this.membersPreviewDetails.shift();
    this.membersPreviewDetails = [...this.membersPreviewDetails];
  }

  private unsetHeaders(): void {
    this.membersPreviewDetails.unshift(this.memberPreviewHeaders);
    this.membersPreviewDetails = [...this.membersPreviewDetails];
  }

  private get hasFirstRowHeader(): boolean {
    return this.membersPreviewForm.get(['firstRowHeader']).value;
  }

  private get importModelDetails(): Partial<ImportModel> {
    return {
      groupId: this.groupId,
      importMappings: this.membersPreviewForm.get(['memberHeaders']).value,
      firstRowHeader: this.hasFirstRowHeader,
      fileName: this.membersPreviewFile.name,
      importedMembers: this.membersPreviewDetails?.length,
    };
  }

  private createForm(): FormGroup {
    return this._formBuilder.group({
      firstRowHeader: [true],
      memberHeaders: this._formBuilder.array([]),
    });
  }

  private patchHeadersFormArray(
    noOfHeaders: number,
    headers: Array<string>
  ): void {
    for (let index = 0; index < noOfHeaders; index++) {
      const importField = this._groupMemberImportService.getFieldImportMapping(
        headers[index],
        this.importMappingFields
      );
      (this.membersPreviewForm.get('memberHeaders') as FormArray).push(
        this._formBuilder.group({
          fieldId: [importField.fieldId],
          fieldName: [importField.fieldName],
          identifier: [importField.identifier],
        })
      );
    }
  }

  public goBackOnEmit(): void {
    this.goBack.emit(true);
  }

  public headerOptionOnChange(index: number): void {
    const fieldId = this.membersPreviewForm.get([
      'memberHeaders',
      index,
      'fieldId',
    ]).value;

    const toBeUpdatedFields =
      this._groupMemberImportService.getRemainingImportFields(
        fieldId,
        this.importMappingFields
      );
    this.membersPreviewForm
      .get(['memberHeaders', index])
      .patchValue(toBeUpdatedFields);
  }

  public firstRowHeaderOnSelect(event: MatCheckboxChange): void {
    if (event.checked) {
      this.setHeaders();
    } else {
      this.unsetHeaders();
    }
  }

  public importOnClick(): void {
    this._groupMemberService.importGroupMembers(
      this.groupId,
      this.importModelDetails,
      this.membersPreviewFile,
      `${GroupRedirectPaths.Group}/${this.groupId}`
    );
  }

  public cancelOnClick(): void {
    this._location.back();
  }
}

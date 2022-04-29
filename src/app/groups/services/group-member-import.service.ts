import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';

import { ImportMappingFields } from 'src/app/api/lookups/lookups.models';

@Injectable({providedIn: 'root'})
export class GroupMemberImportService {
  constructor() {}
  public getWorkSheetHeaders(workSheet: XLSX.WorkSheet): Array<string> {
    const headers = [];
    const columnCount = XLSX.utils.decode_range(workSheet['!ref']).e.c + 1;
    for (let i = 0; i < columnCount; ++i) {
      headers[i] = workSheet[`${XLSX.utils.encode_col(i)}1`]?.v;
    }
    return headers;
  }

  public getRemainingImportFields(
    fieldId: number,
    importMappingFields: Array<ImportMappingFields>
  ): {
    fieldName: string;
    identifier: string;
  } {
    const importField = importMappingFields.find(
      (field) => field.fieldId === fieldId
    );
    return {
      fieldName: importField.fieldName,
      identifier: importField.identifier,
    };
  }

  public getFieldImportMapping(
    fieldName: string,
    importMappingFields: Array<ImportMappingFields>
  ): ImportMappingFields {
    fieldName =
      typeof fieldName === 'string'
        ? fieldName?.replace(/\s/g, '')?.toLowerCase()
        : fieldName;

    const index = importMappingFields.findIndex((field) =>
      (<any>field.acceptedNames)?.includes(fieldName)
    );
    return index === -1
      ? importMappingFields[index + 1]
      : importMappingFields[index];
  }
}

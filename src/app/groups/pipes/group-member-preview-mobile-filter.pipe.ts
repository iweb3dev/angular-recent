import { Pipe, PipeTransform } from '@angular/core';

import { hasValue } from 'src/app/shared/utils/verifications/value-check';

@Pipe({ name: 'memberPreviewMobileFilter' })
export class GroupMemberPreviewMobileFilterPipe implements PipeTransform {
  transform(
    index: number,
    membersPreviewDetails: Array<string | number>[],
    recordLimit = 5,
    secondaryText = ', and more'
  ): string {
    let recordCount = 0;
    const memberColumnDetail: Array<string | number> = [];
    membersPreviewDetails.forEach((rowItem) => {
      if (
        hasValue(rowItem) &&
        hasValue(rowItem[index]) &&
        recordCount < recordLimit
      ) {
        memberColumnDetail.push(rowItem[index]);
        ++recordCount;
      }
      if (recordCount < recordLimit) {
        return;
      }
    });
    return recordCount === recordLimit
      ? `${this.stringify(memberColumnDetail)}${secondaryText}`
      : this.stringify(memberColumnDetail);
  }
  private stringify(
    value: unknown[] | number | string,
    joinSeparator = ', '
  ): string {
    if (Array.isArray(value)) {
      return hasValue(value) ? value.join(joinSeparator) : '';
    } else {
      return hasValue(value) ? value.toString() : '';
    }
  }
}

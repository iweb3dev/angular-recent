import { Pipe, PipeTransform } from '@angular/core';

import { SMSKeyword } from 'src/app/api/sms/sms.models';
import { PagedList } from 'src/app/api/shared/shared.models';

@Pipe({ name: 'groupKeywordFilter' })
export class GroupKeywordFilterPipe implements PipeTransform {
  transform(keywords: PagedList<SMSKeyword>, groupId: number): string {
    return keywords && groupId ? this.getGroupKeyword(keywords, groupId) : '';
  }
  private getGroupKeyword(keywords: PagedList<SMSKeyword>, groupId: number) {
    const [group] = keywords?.pagedObjects?.filter(
      (pagedObj) => pagedObj.groupId === groupId
    );
    return group ? ` ${group.keyword}` : '';
  }
}

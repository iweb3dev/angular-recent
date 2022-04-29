import { NgModule } from '@angular/core';

import { GroupSelectionPipe } from './group-selection.pipe';
import { GroupKeywordFilterPipe } from './group-keyword-filter.pipe';
import { GroupMemberPreviewMobileFilterPipe } from './group-member-preview-mobile-filter.pipe';

@NgModule({
  declarations: [
    GroupSelectionPipe,
    GroupKeywordFilterPipe,
    GroupMemberPreviewMobileFilterPipe,
  ],
  exports: [
    GroupSelectionPipe,
    GroupKeywordFilterPipe,
    GroupMemberPreviewMobileFilterPipe,
  ],
})
export class GroupPipeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberTextablePipe } from './member-textable.pipe';
import { MemberCallablePipe } from './member-callable.pipe';
import { MemberEmailablePipe } from './member-emailable.pipe';
import { MemberSelectionPipe } from './member-selection.pipe';
import { MemberPhoneStatusPipe } from './member-phone-status.pipe';
import { MemberEmailStatusPipe } from './member-email-status.pipe';
import { MemberContactsCountPipe } from './member-contacts-count.pipe';
import { MemberEmailAvailabilityStylePipe } from './member-email-availability-style.pipe';
import { MemberPhoneAvailabilityStylePipe } from './member-phone-availability-style.pipe';

@NgModule({
  declarations: [
    MemberTextablePipe,
    MemberCallablePipe,
    MemberEmailablePipe,
    MemberSelectionPipe,
    MemberPhoneStatusPipe,
    MemberEmailStatusPipe,
    MemberContactsCountPipe,
    MemberEmailAvailabilityStylePipe,
    MemberPhoneAvailabilityStylePipe
  ],
  imports: [CommonModule],
  exports: [
    MemberTextablePipe,
    MemberCallablePipe,
    MemberEmailablePipe,
    MemberSelectionPipe,
    MemberPhoneStatusPipe,
    MemberEmailStatusPipe,
    MemberContactsCountPipe,
    MemberEmailAvailabilityStylePipe,
    MemberPhoneAvailabilityStylePipe
  ],
})
export class MemberSharedPipeModule {}

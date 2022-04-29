import { Pipe, PipeTransform } from '@angular/core';

import { GroupMemberDisplay } from '@api/members/members.models';

import { MemberContactsAvailabilityStatus } from '../enums/member-contacts-availability-status.enum';

@Pipe({
  name: 'memberEmailStatus'
})
export class MemberEmailStatusPipe implements PipeTransform {
  transform(member: GroupMemberDisplay): string {
    return !member.emailAddress
      ? MemberContactsAvailabilityStatus.Default
      : member.blackListedEmailAddress
        ? MemberContactsAvailabilityStatus.BlacklistedEmail
        : !member.hasActiveEmailAddresses
          ? MemberContactsAvailabilityStatus.InactiveEmail
          : MemberContactsAvailabilityStatus.Default;
  }
}

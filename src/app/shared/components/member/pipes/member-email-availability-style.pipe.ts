import { Pipe, PipeTransform } from '@angular/core';

import { GroupMemberDisplay } from '@api/members/members.models';

import { MemberContactsAvailabilityStyle } from '../enums/member-contacts-availability-style.enum';

@Pipe({
  name: 'memberEmailAvailabilityStyle'
})
export class MemberEmailAvailabilityStylePipe implements PipeTransform {
  transform(member: GroupMemberDisplay): string {
    return !member.emailAddress
      ? MemberContactsAvailabilityStyle.Default
      : member.blackListedEmailAddress
        ? MemberContactsAvailabilityStyle.BlackListedContact
        : !member.hasActiveEmailAddresses
          ? MemberContactsAvailabilityStyle.InactiveContact
          : MemberContactsAvailabilityStyle.Default;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { GroupMemberDisplay } from 'src/app/api/members/members.models';

import { MemberContactAvailability } from 'src/app/shared/components/member/enums/member-contacts-availability.enum';

@Pipe({ name: 'emailable' })
export class MemberEmailablePipe implements PipeTransform {
  transform(member: GroupMemberDisplay): number {
    return !member.emailAddress
      ? MemberContactAvailability.NotAvailable
      : member.blackListedEmailAddress
        ? MemberContactAvailability.BlackListed
        : !member.hasActiveEmailAddresses
          ? MemberContactAvailability.Inactive
          : MemberContactAvailability.Available;
  }
}

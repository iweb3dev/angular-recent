import { Pipe, PipeTransform } from '@angular/core';

import { GroupMemberDisplay } from 'src/app/api/members/members.models';

import { MemberContactAvailability } from 'src/app/shared/components/member/enums/member-contacts-availability.enum';

@Pipe({ name: 'callable' })
export class MemberCallablePipe implements PipeTransform {
  transform(member: GroupMemberDisplay): number {
    return !member.phoneNumber
      ? MemberContactAvailability.NotAvailable
      : member.blackListedPhoneNumber
        ? MemberContactAvailability.BlackListed
        : !member.hasActivePhoneNumbers
          ? MemberContactAvailability.Inactive
          : MemberContactAvailability.Available;
  }
}

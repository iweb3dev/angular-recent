import { Pipe, PipeTransform } from '@angular/core';

import { GroupMemberDisplay } from '@api/members/members.models';

import { MemberContactsAvailabilityStatus } from '../enums/member-contacts-availability-status.enum';

@Pipe({
  name: 'memberPhoneStatus'
})
export class MemberPhoneStatusPipe implements PipeTransform {
  transform(member: GroupMemberDisplay): string {
    return !member.phoneNumber
      ? MemberContactsAvailabilityStatus.Default
      : member.blackListedPhoneNumber
        ? MemberContactsAvailabilityStatus.BlackListedPhone
        : !member.hasActivePhoneNumbers
          ? MemberContactsAvailabilityStatus.InactivePhone
          : MemberContactsAvailabilityStatus.Default;
  }
}

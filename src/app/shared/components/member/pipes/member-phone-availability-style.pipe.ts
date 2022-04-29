import { Pipe, PipeTransform } from '@angular/core';

import { GroupMemberDisplay } from '@api/members/members.models';

import { MemberContactsAvailabilityStyle } from '../enums/member-contacts-availability-style.enum';

@Pipe({
  name: 'memberPhoneAvailabilityStyle'
})
export class MemberPhoneAvailabilityStylePipe implements PipeTransform {
  transform(member: GroupMemberDisplay): string {
    return !member.phoneNumber
      ? MemberContactsAvailabilityStyle.Default
      : member.blackListedPhoneNumber
        ? MemberContactsAvailabilityStyle.BlackListedContact
        : !member.hasActivePhoneNumbers
          ? MemberContactsAvailabilityStyle.InactiveContact
          : MemberContactsAvailabilityStyle.Default;
  }
}

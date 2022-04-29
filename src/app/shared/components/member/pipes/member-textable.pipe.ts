import { Pipe, PipeTransform } from '@angular/core';

import { SMSStatuses } from 'src/app/api/shared/shared.enums';

import { GroupMemberDisplay } from 'src/app/api/members/members.models';

import { MemberContactAvailability } from 'src/app/shared/components/member/enums/member-contacts-availability.enum';

@Pipe({ name: 'textable' })
export class MemberTextablePipe implements PipeTransform {
  transform(member: GroupMemberDisplay): number {
    return !member.phoneNumber
      ? MemberContactAvailability.NotAvailable
      : this.getAvailabilityStatus(member);
  }

  private getAvailabilityStatus(member: GroupMemberDisplay): number {
    if (member.blackListedPhoneNumber) {
      return MemberContactAvailability.BlackListed;
    }

    if (
      member.tollFreeSMSStatus === SMSStatuses.unknown ||
      member.tollFreeSMSStatus === SMSStatuses.optedIn ||
      member.shortCodeSMSStatus === SMSStatuses.optedIn ||
      member.activePhoneNumbers > 1
    ) {
      return SMSStatuses.optedIn;
    }

    if (member.shortCodeSMSStatus === SMSStatuses.optinRequestSent) {
      return SMSStatuses.optinRequestSent;
    }

    if (
      member.shortCodeSMSStatus === SMSStatuses.optedOut ||
      (member.shortCodeSMSStatus === SMSStatuses.optedOutGlobal &&
        member.tollFreeSMSStatus === SMSStatuses.optedOut) ||
      member.tollFreeSMSStatus === SMSStatuses.optedOutGlobal
    ) {
      return SMSStatuses.optedOut;
    }

    return MemberContactAvailability.NotAvailable;
  }
}

export enum MemberContactsAvailabilityStatus {
  Default = '',
  SubscribeEmail = '/email/subscribe',

  BlackListedPhone = 'This member has BLOCKED their phone number.',
  BlacklistedEmail = 'This member has UNSUBSCRIBED their email address.',

  InactiveEmail = 'INACTIVE EMAIL',
  InactivePhone = 'INACTIVE Phone Number',

  BlackListedEmailHelp = `To Re-subscribe please have your member go to the following
    link: `,
  BlackListedPhoneHelp = `Red Italicized numbers have blocked themselves from receiving
    further phone messages. To unblock have member call 877-665-5646 from the phone number
    that is blocked and request to unblock from the CallingPost system.`,
}

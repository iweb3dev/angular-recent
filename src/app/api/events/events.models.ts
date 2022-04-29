import { EventReminderSendToTypes, EventStatuses, EventTypes, SignUpTypes, EventMemberStatuses, IntervalTypes, VolunteerSheetStatuses } from '../shared/shared.enums';
import { CAPIBase, PaymentProgramPayment, SignMeUpMember, SuccessResultDetail, TimeZone, Picture } from '../shared/shared.models';

export interface ReminderToSend {
  id: number;
  flaggedForDelete: boolean;
  occuranceDateTime: Date;
  whenToSend: Date;
  isCreateReminder: boolean;
  whoToSendTo: EventReminderSendToTypes;
  timeInterval: IntervalTypes;
  timeSpanBefore: number;
  notificationFormatsValue: number;
  notificationId: number;
  recurranceRule: string;
}

export interface SaveEvent extends CAPIBase {
  name: string;
  description: string;
  ownerId: number;
  ownersTimeZone: number;
  eventType: EventTypes;
  displayOnCalendar: boolean;
  startDateTime: Date;
  endDateTime: Date;
  recuranceRule: string;
  availableForAllGroups: boolean;
  groupIds: number[];
  financialAccountId: number;
  paymentProgramId: number;
  signUpFee: number;
  maxParticipants: number;
  signUpType: SignUpTypes;
  volunteerSheet: SaveVolunteerSheet;
  reminders: ReminderToSend[];
  isPublic: boolean;
  eventPhotoId: number;
  locationDescription: string;
  locationAddressLine1: string;
  locationAddressLine2: string;
  locationCity: string;
  locationState: string;
  locationZip: string;
}

export interface SaveVolunteerSheet extends CAPIBase {
  name: string;
  parentEventName: string;
  description: string;
  ownerId: number;
  availableToAllGroups: boolean;
  groupIds: number[];
  volunteerRoles: SaveEvent;
  sendCreationNoticeFormats: number;
  parentEventId: number;
  isPublic: boolean;
  createVolunteerSheetReminder: ReminderToSend;
  ownersTimeZone: number;
}

export interface GroupEvent {
  id: number;
  flaggedForDelete: boolean;
  pictures: Picture[];
  defaultEventImageName: string;
  name: string;
  description: string;
  ownerId: number;
  ownersTimeZone: TimeZone;
  eventType: EventTypes;
  displayOnCalendar: boolean;
  startDateTime: Date;
  endDateTime: Date;
  recurranceRule: string;
  availableForAllGroups: boolean;
  groupIds: number[];
  financialAccountId: number;
  paymentProgramId: number;
  signUpFee: number;
  maxParticipants: number;
  signUpType: SignUpTypes;
  volunteerSheet: SaveVolunteerSheet;
  reminders: ReminderToSend[];
  isPublic: boolean;
  eventPhotoId: number;
  locationDescription: string;
  locationAddressLine1: string;
  locationAddressLine2: string;
  locationCity: string;
  locationState: string;
  locationZip: string;
}

export interface DisplayEvent extends CAPIBase {
  name: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  recurranceRule: string;
  eventType: EventTypes;
  eventFee: number;
  maxParticipants: number;
  ownersTimeZone: TimeZone;
  slotsAvailable: number;
  ownerId: number;
  financialAccountId: number;
  paymentProgramId: number;
  isSignUpFull: boolean;
  isVolunteerSheetSignUpFull: boolean;
  eventDuration: string;
  eventStatus: EventStatuses;
  eventMemberStatus: EventMemberStatuses;
  volunteerSheetID: number;
  signUpType: SignUpTypes;
  isPublic: boolean;
  availableToAllGroups: boolean;
  eventPhotoId: number;
  locationDescription: string;
  locationAddressLine1: string;
  locationAddressLine2: string;
  locationCity: string;
  locationState: string;
  locationZip: string;
  groupId: number;
  groupName: string;
  parentEvent: string;
}

export interface EventSignUpAttendanceSummary {
  numberAttendingEvent: number;
  numberVolunteeringForTasks: number;
}

export interface EventReminder {
  id: number;
  flaggedForDelete: boolean;
  occuranceDateTime: Date;
  whenToSend: Date;
  isCreateReminder: boolean;
  whoToSendTo: EventReminderSendToTypes;
  timeInterval: IntervalTypes;
  timeSpanBefore: number;
  notificationFormatsValue: number;
  notificationId: number;
  recurranceRule: string;
  volunteerSheetID: number;
  eventId: number;
  parentEventId: number;
  description: string;
}

export interface SignMeUp {
  members: SignMeUpMember[];
  eventId: number;
  eventName: string;
  startDateTime: Date;
  feeRequired: boolean;
  eventOwnerId: number;
  eventType: EventTypes;
  ownersTimeZone: TimeZone;
  eventPayment: PaymentProgramPayment;
  groupId: number;
}

export interface SignedUpForEvent extends SuccessResultDetail {
  transactionNumber: string;
}

export interface EventSignedUpMember extends CAPIBase {
  userMemberId: number;
  feePaid: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber; string;
}

export interface EventSignupMemberExport {
  userMemberId: number;
  feePaid: number;
  firstName: string;
  lastName: string;
  phoneNumber; string;
  emailAddress: string;
  eventName: string;
}
export interface VolunteerSignedUpMember {
  userMemberId: number;
  roleName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber; string;
}

export interface DisplayVolunteerSheetAndRoles extends CAPIBase {
  parentEventName: string;
  volunteerSheetName: string;
  roleId: number;
  roleName: string;
  roleDescription: string;
  roleCount: number;
  startDateTime: Date;
  endDateTime: Date;
  volunteerSheetStatus: VolunteerSheetStatuses;
  recurranceRule: string;
  ownerId: number;
  isVolunteerSheetSignUpFull: boolean;
  slotsAvailable: number;
  ownersTimeZone: TimeZone;
}

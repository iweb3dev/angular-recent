import { NotificationFormatValues } from 'src/app/shared/models/message/message.models';
import {
  SentViaTypes,
  BuildCommunicationResults,
  NotificationStatusTypes,
  CommunicationEndpointTypes,
} from '../shared/shared.enums';
import { DateAndTimeSettings, DTOException } from '../shared/shared.models';

export interface SendCommunication {
  communicationStartDateTime: DateAndTimeSettings;
  communicationEndDateTime: DateAndTimeSettings;
  notificationFormatValue: NotificationFormatValues;
  notificationID: number;
  ehm: boolean;
  twentyFourSevenMessaging: boolean;
  startDateTime: Date;
  endDateTime: Date;
  groupIDs: number[];
  isInitialOptIn: boolean;
  isEmergency: boolean;
  isPriorityCallout: boolean;
  cid: string;
  lat: string;
  latMax: number;
  svm: boolean;
  reducedTrailer: boolean;
  noTrailer: boolean;
  sendInMembersTimeZone: boolean;
  sendInMembersPreferredTime: boolean;
  sentVia: SentViaTypes;
  sendNow: boolean;
  setMessageEndTime: boolean;
  notificationName: string;
  controlTime: Date;
  acceptResponses: boolean;
  alternateFormatSend: boolean;
  textAlternateFormatSend: boolean;
  emailAlternateFormatSend: boolean;
  includeGroupSiteLink: boolean;
  isSendEmailSmsOptIn: boolean;
  phoneMessageLength: string | number;
  textNumber: string;
}

export interface BuildCommuniationsQueue {
  communicationID: number;
  phoneNumbersToSend: number;
  phonesToChangeFor: number;
  emailToSend: number;
  emailsToChargeFor: number;
  textsToSend: number;
  textsToChargeFor: number;
  totalCredits: number;
  freeEmailsRemaining: number;
  totalMembers: number;
  authorizationCode: string;
  amountCharged: number;
  result: BuildCommunicationResults;
  resultTest: string;
  currentBalance: number;
  neededBalance: number;
  latCost: number;
  svmCost: number;
  reducedTrailerCost: number;
  exceptions: DTOException[];
}

export interface CommunicationDetailHeader {
  startDate: Date;
  startedBy: string;
  notificationName: string;
  notificationId: number;
  notificationFormatValue: number;
  groups: string;
  activationMethod: string;
  toDeliverCount: number;
  deliveredCount: number;
  failedCount: number;
  percentDelivered: number;
  status: string;
  canceledBy: string;
  notificationStatus: NotificationStatusTypes;
  mfa_UserID: number;
  sendNow: boolean;
  textAlternateFormatSend: boolean;
  emailAlternateFormatSend: boolean;
  lat: string;
  latMade: number;
  svm: boolean;
  reducedTrailer: boolean;
  cid: string;
  noTrailer: boolean;
  textNumber: string;
}

export interface CommunicationDetails {
  memberName: string;
  address: string;
  attempt: number;
  result: string;
  resultDate: Date;
  memberFirstName: string;
  memberLastName: string;
  textAlternateFormatSent: boolean;
  emailAlternateFormatSent: boolean;
  response: string;
  latTransferred?: boolean;
  mfa_UserMemberID: number;
}

export interface CommunucationDetailsAll {
  memberName: string;
  address: string;
  emailAddress: string;
  phoneAttempt: number;
  smsAttempt: number;
  emailAttempt: number;
  resultPhone: string;
  resultText: string;
  resultEmail: string;
  resultDate: Date;
  memberFirstName: string;
  memberLastName: string;
  textAlternateFormatSent: boolean;
  emailAlternateFormatSent: boolean;
  response: string;
  latTransferred: string;
  mfa_UserMemberID: number;
}

export interface ToDeliverTotal {
  toDeliver: number;
  endPoint: CommunicationEndpointTypes;
  cfa_CommunicationId: number;
}

export interface DeliveredTotal {
  delivered: number;
  endPoint: CommunicationEndpointTypes;
  cfa_CommunicationId: number;
  liveAnswers: number;
  answeringMachines: number;
  undeliverableTexts: number;
  openEmails: number;
  clickedEmails: number;
  undeliverableEmails: number;
}

export interface DeliveryStatistics {
  toDeliver: ToDeliverTotal[];
  delivered: DeliveredTotal[];
}

export interface CommunicationHistory {
  id: number;
  notificationId: number;
  notificationName: string;
  lat: string;
  cid: string;
  startDateTime: Date;
  endDateTime: Date;
  isEmergency: boolean;
  communicationCompletionValue: number;
  notificationStatus: NotificationStatusTypes;
  earliestStartHour: number;
  latestStartHour: number;
  sendInMembersTimeZone: boolean;
  sendInMembersPreferredTime: boolean;
  isInitialOptIn: boolean;
  callsCanceled: number;
  callsDeliverd: number;
  callsToMake: number;
  callsUnDelivered: number;
  emailsCanceled: number;
  emailsDeliverd: number;
  emailsToMake: number;
  emailsUnDelivered: number;
  faxsCanceled: number;
  faxsDeliverd: number;
  faxsToMake: number;
  faxsUnDelivered: number;
  smSsCharged: number;
  smSsCanceled: number;
  smSsDeliverd: number;
  smSsToMake: number;
  smSsUnDelivered: number;
  statusDateTime: Date;
  notificationFormatValue: number;
  acceptResponses: boolean;
  sendNow: boolean;
  textAlternateFormatSend: boolean;
  emailAlternateFormatSend: boolean;
  groupNames: string[];
}

export interface CommunicationEndPointResponseRollup {
  responseCount: number;
  response: string;
}

export interface SMSResponse {
  smsKey: string;
  modifiedByUserID: number;
  modifiedByDateTime: Date;
}

export interface CommunicationEndPointResponse {
  communicationID: number;
  memberID: number;
  processBySMSService: boolean;
  communicationEndPointID: number;
  responseID: number;
  response: string;
}

export interface GetPossibleSurveyResponses {
  responseID: number;
  response: string;
}

export interface SimpleCommunicationStatus {
  communicationID: number;
  notificationName: string;
  statusDateTime: Date;
  communicationStatus: string;
}

export interface CommunicationsSummaryByDateRange {
  communicationsSent: number;
  endpointsSentTo: number;
  timeSavings: Date;
}


import { CommunicationEndpointTypes } from 'src/app/api/shared/shared.enums';

export enum CommunicationResultsSort {
  NewToOld,
  OldToNew,
}

export enum CommunicationMessageTypes {
  Voice,
  Text,
  Email,
}

export interface MessageResultsToDeliverTotal {
  toDeliver: number;
  endPoint: CommunicationEndpointTypes;
  cfa_CommunicationId: number;
}

export interface MessageResultsDeliveredTotal {
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

export interface MessageResultsDeliveryStatistics {
  toDeliver: MessageResultsToDeliverTotal[];
  delivered: MessageResultsDeliveredTotal[];
}

export interface MessageRecipient {
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

export interface MessageRecipientViewModel {
  endpointAddress: string;
  recipient: string;
  deliveryDate: Date;
  attempts: number;
  results: string;
  icon: {
    name: string;
    extraClass: string;
  };
}

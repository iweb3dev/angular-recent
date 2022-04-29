import { environment } from '../../../environments/environment';

export const COMMUNICATIONS_BASE_ENDPOINT
  = `/api/communications`;

export const DELETE_COMMUNICATION
  = (communicationId: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/${communicationId}`;

export const GET_COMMUNICATION
  = (communicationId: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/${communicationId}`;

export const UPDATE_COMMUNICATION_IN_QUEUE
  = (communicationId: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/${communicationId}`;

export const CONFIRM_OR_CANCEL_COMMUNICATION
  = (communicationId: number, actionType: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/${communicationId}/${actionType}`;

export const CONFIRM_OR_CANCEL_COMMUNICATION_WITH_AUTHCODE
  = (communicationId: number, actionType: number, authCode: string) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/${communicationId}/${actionType}/${authCode}`;

export const GET_COMMUNICATION_DETAILS
  = (communicationId: number, sortExpression: string, endpointTypeId?: number, pageSize?: number, pageIndex?: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/${communicationId}/details?sortExpression=${sortExpression}&endpointTypeId=${endpointTypeId}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const GET_ALL_COMMUNICATION_DETAILS
  = (communicationId: number, sortExpression: string, pageSize?: number, pageIndex?: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/${communicationId}/details/all?sortExpression=${sortExpression}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const GET_COMMUNICATION_DELIVERY_STATISTICS
  = (communicationId: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/${communicationId}/details/deliveryStatistics`;

export const GET_COMMUNICATIONS_SEARCH
  = (searchCriteria: string, historyTypeId: number, groupId?: number, pageSize?: number, pageIndex?: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/search/${searchCriteria}/?groupId=${groupId}&historyTypeId=${historyTypeId}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const GET_COMMUNICATIONS
  = (searchCriteria: string, historyTypeId: number, groupId?: number, pageSize?: number, pageIndex?: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/${searchCriteria}/?groupId=${groupId}&historyTypeId=${historyTypeId}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const SEND_DEMO_COMMUNICATION
  = (phoneNumber: string, ipAddress: string, message: string, phoneOrSMS: string) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/demo/${phoneNumber}/${ipAddress}/${message}/${phoneOrSMS}`;

export const GET_EMAILS_REMAINING_THIS_BILLING_CYCLE = `${COMMUNICATIONS_BASE_ENDPOINT}/emailsremaining`;

export const GET_COMMUNICATION_ENDPOINT_RESPONSES_ROLLUP
  = (communicationId: number) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/endpointresponses/${communicationId}`;

export const GET_LAST_COMM_MSG_FOR_MEMBER_PHONENUMBER
  = (memberPhoneNumber: string) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/gp/lastmsgsent?memberPhoneNumber=${memberPhoneNumber}`;

export const SAVE_COMMUNICATION_ENDPOINT_RESPONSE = `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/pollresponse`;

export const GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS
  = (message: string) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/pollresponse/decrypt/${message}`;

export const GET_POSSIBLE_SURVEY_RESPONSES
  = (communicationId: number) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/possiblesurveyresponses/${communicationId}`;

export const GET_COMMUNICATIONS_SNAPSHOT
  = (groupId?: number, pageSize?: number, pageIndex?: number) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/snapshot?groupId=${groupId}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

export const GET_LAST_COMM_MSG_FOR_SPA_MEMBER_PHONENUMBER
  = (memberPhoneNumber: string) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/spa/lastmsgsent?memberPhoneNumber=${memberPhoneNumber}`;

export const GET_COMMUNICATIONS_SUMMARY_BY_DATE_RANGE
  = (startDate: Date, endDate: Date) =>
    `${COMMUNICATIONS_BASE_ENDPOINT}/summarybydaterange?startDate=${startDate}&endDate=${endDate}`;

export const GET_LAST_COMM_MSG_FOR_SYSTEM_MEMBER_PHONENUMBER
  = (memberPhoneNumber: string) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/system/lastmsgsent?memberPhoneNumber=${memberPhoneNumber}`;

export const INSERT_MCA_DAILY_PLAYCOUNTS
  = (Date: Date, vmaPlaysCount: number, spaPlaysCount: number, gnePlaysCount: number) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/system/mcamessageplays/${Date}/${vmaPlaysCount}/${spaPlaysCount}/${gnePlaysCount}`;

export const TRANSLATE_SMS_MESSAGE = `${COMMUNICATIONS_BASE_ENDPOINT}/translate`;

export const GET_UNIQUE_CONTACTS_SENT_TO_FOR_BILLING_CYCLE
  = (userId: number) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/uniquecontacts/${userId}`;

export const VALIDATION_CREATE_COMMUNICATION = `${COMMUNICATIONS_BASE_ENDPOINT}/validate`;

export const GET_LAST_COMM_MSG_FOR_VMA_MEMBER_PHONENUMBER
  = (memberPhoneNumber: string) =>
    `${environment.api.base}${COMMUNICATIONS_BASE_ENDPOINT}/vma/lastmsgsent?memberPhoneNumber=${memberPhoneNumber}`;

export const GET_COMMUNICATIONS_RESULTS = (groupId: number, histroyTypeId: number, pageSize: number, pageIndex: number) =>  `${COMMUNICATIONS_BASE_ENDPOINT}?groupId=${groupId}&historyTypeId=${histroyTypeId}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '../../core/http/http.service';
import { TranslationLanguageCodes } from 'src/app/shared/models/translations/translations.enum';
import { PagedList, SMSTranslateMe } from '../shared/shared.models';
import {
  BuildCommuniationsQueue,
  SendCommunication,
  CommunicationDetailHeader,
  CommunicationDetails,
  CommunucationDetailsAll,
  DeliveryStatistics,
  CommunicationHistory,
  CommunicationEndPointResponseRollup,
  SMSResponse,
  CommunicationEndPointResponse,
  GetPossibleSurveyResponses,
  SimpleCommunicationStatus,
  CommunicationsSummaryByDateRange,
} from './communications.models';

import {
  COMMUNICATIONS_BASE_ENDPOINT,
  DELETE_COMMUNICATION,
  GET_COMMUNICATION,
  GET_COMMUNICATION_DETAILS,
  GET_ALL_COMMUNICATION_DETAILS,
  UPDATE_COMMUNICATION_IN_QUEUE,
  CONFIRM_OR_CANCEL_COMMUNICATION,
  CONFIRM_OR_CANCEL_COMMUNICATION_WITH_AUTHCODE,
  GET_COMMUNICATION_DELIVERY_STATISTICS,
  GET_COMMUNICATIONS_SEARCH,
  SEND_DEMO_COMMUNICATION,
  GET_EMAILS_REMAINING_THIS_BILLING_CYCLE,
  GET_COMMUNICATION_ENDPOINT_RESPONSES_ROLLUP,
  GET_LAST_COMM_MSG_FOR_MEMBER_PHONENUMBER,
  SAVE_COMMUNICATION_ENDPOINT_RESPONSE,
  GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS,
  GET_POSSIBLE_SURVEY_RESPONSES,
  GET_COMMUNICATIONS_SNAPSHOT,
  GET_LAST_COMM_MSG_FOR_SPA_MEMBER_PHONENUMBER,
  GET_COMMUNICATIONS_SUMMARY_BY_DATE_RANGE,
  GET_LAST_COMM_MSG_FOR_SYSTEM_MEMBER_PHONENUMBER,
  INSERT_MCA_DAILY_PLAYCOUNTS,
  TRANSLATE_SMS_MESSAGE,
  GET_UNIQUE_CONTACTS_SENT_TO_FOR_BILLING_CYCLE,
  VALIDATION_CREATE_COMMUNICATION,
  GET_LAST_COMM_MSG_FOR_VMA_MEMBER_PHONENUMBER,
  GET_COMMUNICATIONS_RESULTS,
  GET_COMMUNICATIONS,
} from './communications.api';
import { CommunicationConfirmActionTypes, MessageHistoryTypes } from '../shared/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class CommunicationsService {
  public currentSearchText = '';
  public currentHistoryType = MessageHistoryTypes.all;

  constructor(private _http: Http, private _httpClient: HttpClient) {}

  getAllCommunications() {
    return this._http.get(COMMUNICATIONS_BASE_ENDPOINT);
  }

  getCommunicationsResults(
    groupId: number,
    historyTypeId: number,
    pageSize: number,
    pageIndex: number,
  ): Observable<PagedList<CommunicationHistory>> {
    return this._http.get(
      GET_COMMUNICATIONS_RESULTS(groupId, historyTypeId, pageSize, pageIndex),
    );
  }

  fetchTranslation(
    SMSMessage: string,
    dstLanguageCode: TranslationLanguageCodes,
  ): Observable<string> {
    return this._http.post(`${COMMUNICATIONS_BASE_ENDPOINT}/translate`, {
      SMSMessage,
      dstLanguageCode,
    });
  }

  createCommunicationQueue(
    communication: SendCommunication,
  ): Observable<BuildCommuniationsQueue> {
    return this._http.post<BuildCommuniationsQueue>(
      COMMUNICATIONS_BASE_ENDPOINT,
      communication,
    );
  }

  deleteCommuncation(communicationId: number): Observable<object> {
    return this._http.delete(DELETE_COMMUNICATION(communicationId));
  }

  getCommunication(
    communicationId: number,
  ): Observable<CommunicationDetailHeader> {
    return this._http.get<CommunicationDetailHeader>(
      GET_COMMUNICATION(communicationId),
    );
  }

  updateCommunicationInQueue(
    communicationId: number,
    communication: SendCommunication,
  ): Observable<boolean> {
    return this._http.put<boolean>(
      UPDATE_COMMUNICATION_IN_QUEUE(communicationId),
      communication,
    );
  }

  confirmOrCancelCommunication(
    communicationId: number,
    actionType: CommunicationConfirmActionTypes,
  ): Observable<boolean> {
    return this._http.put<boolean>(
      CONFIRM_OR_CANCEL_COMMUNICATION(communicationId, actionType),
      null,
    );
  }

  confirmOrCancelCommunicationWithAuthCode(
    communicationId: number,
    actionType: number,
    authCode: string,
  ): Observable<boolean> {
    return this._http.put<boolean>(
      CONFIRM_OR_CANCEL_COMMUNICATION_WITH_AUTHCODE(
        communicationId,
        actionType,
        authCode,
      ),
      null,
    );
  }

  getCommunicationDetails(
    communicationId: number,
    sortExpr: string,
    endpointTypeId?: number,
    pageSize?: number,
    pageIndex?: number,
  ): Observable<CommunicationDetails> {
    return this._http.get<CommunicationDetails>(
      GET_COMMUNICATION_DETAILS(
        communicationId,
        sortExpr,
        endpointTypeId,
        pageSize,
        pageIndex,
      ),
    );
  }

  getAllCommunicationDetails(
    communicationId: number,
    sortExpression: string,
    pageSize?: number,
    pageIndex?: number,
  ): Observable<PagedList<CommunucationDetailsAll>> {
    return this._http.get<PagedList<CommunucationDetailsAll>>(
      GET_ALL_COMMUNICATION_DETAILS(
        communicationId,
        sortExpression,
        pageSize,
        pageIndex,
      ),
    );
  }

  getCommunicationDeliveryStatistics(
    communicationId: number,
  ): Observable<DeliveryStatistics> {
    return this._http.get<DeliveryStatistics>(
      GET_COMMUNICATION_DELIVERY_STATISTICS(communicationId),
    );
  }

  getCommunicationsSearch(
    searchCriteria: string,
    groupId?: number,
    historyTypeId?: number,
    pageSize?: number,
    pageIndex?: number,
  ): Observable<any> {
    if (searchCriteria && searchCriteria.length > 0) {
      return this._http.get<any>(
        GET_COMMUNICATIONS_SEARCH(
          searchCriteria,
          historyTypeId,
          groupId,
          pageSize,
          pageIndex,
        ),
      );
    } else {
      return this._http.get<any>(
        GET_COMMUNICATIONS(
          searchCriteria,
          historyTypeId,
          groupId,
          pageSize,
          pageIndex,
        ),
      );
    }
  }

  sendDemoCommunication(
    phoneNumber: string,
    ipAddress: string,
    message: string,
    phoneOrSMS: string,
  ): Observable<boolean> {
    return this._httpClient.get<boolean>(
      SEND_DEMO_COMMUNICATION(phoneNumber, ipAddress, message, phoneOrSMS),
    );
  }

  getEmailsRemainingThisBillingCycle(): Observable<number> {
    return this._http.get<number>(GET_EMAILS_REMAINING_THIS_BILLING_CYCLE);
  }

  getCommunicationEndPointResponsesRollup(
    communicationId: number,
  ): Observable<CommunicationEndPointResponseRollup[]> {
    return this._httpClient.get<CommunicationEndPointResponseRollup[]>(
      GET_COMMUNICATION_ENDPOINT_RESPONSES_ROLLUP(communicationId),
    );
  }

  getLastCommMsgForGPMemberPhoneNumber(
    memberPhoneNumber: string,
  ): Observable<string> {
    return this._httpClient.get<string>(
      GET_LAST_COMM_MSG_FOR_MEMBER_PHONENUMBER(memberPhoneNumber),
    );
  }

  saveCommunicationEndpointResponse(message: SMSResponse): Observable<boolean> {
    return this._httpClient.post<boolean>(
      SAVE_COMMUNICATION_ENDPOINT_RESPONSE,
      message,
    );
  }

  getCommunicationEndPointResponseArgs(
    message: string,
  ): Observable<CommunicationEndPointResponse> {
    return this._httpClient.get<CommunicationEndPointResponse>(
      GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS(message),
    );
  }

  getPossibleSurveyResponses(
    communicationId: number,
  ): Observable<GetPossibleSurveyResponses[]> {
    return this._httpClient.get<GetPossibleSurveyResponses[]>(
      GET_POSSIBLE_SURVEY_RESPONSES(communicationId),
    );
  }

  getCommunicationsSnapshot(
    groupId?: number,
    pageSize?: number,
    pageIndex?: number,
  ): Observable<SimpleCommunicationStatus> {
    return this._http.get<SimpleCommunicationStatus>(
      GET_COMMUNICATIONS_SNAPSHOT(groupId, pageSize, pageIndex),
    );
  }

  getLastCommMsgForSPAMemberPhoneNumber(
    memberPhoneNumber: string,
  ): Observable<string> {
    return this._httpClient.get<string>(
      GET_LAST_COMM_MSG_FOR_SPA_MEMBER_PHONENUMBER(memberPhoneNumber),
    );
  }

  getCommunicationsSummaryByDateRange(
    startDate: Date,
    endDate: Date,
  ): Observable<CommunicationsSummaryByDateRange> {
    return this._http.get<CommunicationsSummaryByDateRange>(
      GET_COMMUNICATIONS_SUMMARY_BY_DATE_RANGE(startDate, endDate),
    );
  }

  getLastCommMsgForSystemMemberPhoneNumber(
    memberPhoneNumber: string,
  ): Observable<number> {
    return this._httpClient.get<number>(
      GET_LAST_COMM_MSG_FOR_SYSTEM_MEMBER_PHONENUMBER(memberPhoneNumber),
    );
  }

  insertMcaDailyPlayCounts(
    date: Date,
    vmaPlaysCount: number,
    spaPlaysCount: number,
    gnePlaysCount: number,
  ): Observable<number> {
    return this._httpClient.put<number>(
      INSERT_MCA_DAILY_PLAYCOUNTS(
        date,
        vmaPlaysCount,
        spaPlaysCount,
        gnePlaysCount,
      ),
      null,
    );
  }

  translateSMSMessage(smsObj: SMSTranslateMe): Observable<string> {
    return this._http.post<string>(TRANSLATE_SMS_MESSAGE, smsObj);
  }

  getUniqueContactsSentToForBillCycle(userId: number): Observable<number> {
    return this._httpClient.get<number>(
      GET_UNIQUE_CONTACTS_SENT_TO_FOR_BILLING_CYCLE(userId),
    );
  }

  validationCreateCommunication(
    communication: SendCommunication,
  ): Observable<boolean> {
    return this._http.post<boolean>(
      VALIDATION_CREATE_COMMUNICATION,
      communication,
    );
  }

  getLastCommMsgForVMAMemberPhoneNumber(
    memberPhoneNumber: string,
  ): Observable<string> {
    return this._httpClient.get<string>(
      GET_LAST_COMM_MSG_FOR_VMA_MEMBER_PHONENUMBER(memberPhoneNumber),
    );
  }

  get searchText() {
    return this.currentSearchText;
  }

  setSearchText(text: string) {
    this.currentSearchText = text;
  }

  get historyType() {
    return this.currentHistoryType;
  }

  setHistoryType(type) {
    this.currentHistoryType = type;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '../../core/http/http.service';
import { PagedList, SignMeUpMember } from '../shared/shared.models';
import {
  DELETE_ALL_KEYWORDS_BY_USER_ID, DELETE_KEYWORD_BY_NAME,
  GET_KEYWORD_PREPAY_OPTIONS, GET_KEYWORD_REQUEST_COUNT,
  GET_USER_INCLUDED_USED_KEYWORD_COUNT, GET_USER_KEYWORDS,
  LOOKUP_AVAILABLE_KEYWORD, PURCHASE_KEYWORDS,
  SAVE_MEMBER_RESPONSE, UPDATE_KEYWORD_GROUP_ASSIGNMENT,
  GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS,
  OPT_IN_NUMBER, OPT_OUT_NUMBER
} from './sms.api';
import { KeywordMember, KeywordMembers, KeywordPrepayOption, SMSKeyword } from './sms.models';

@Injectable({
  providedIn: 'root',

})

export class SmsService {

  constructor(private _http: Http, private _httpClient: HttpClient, ) {}

  deleteAllKeywords():
    Observable<object> {
    return this._http
      .delete(DELETE_ALL_KEYWORDS_BY_USER_ID);
  }

  deleteKeywordByName(keyword: string):
    Observable<object> {
    return this._http
      .delete(DELETE_KEYWORD_BY_NAME(keyword));
  }

  getUserKeywordList(pageSize?: number, pageIndex?: number):
    Observable<PagedList<SMSKeyword>> {
    return this._http
      .get<PagedList<SMSKeyword>>(GET_USER_KEYWORDS(pageSize, pageIndex));
  }

  updateKeywordGroupAssignment(keyword: SMSKeyword):
    Observable<boolean> {
    return this._http
      .put<boolean>(UPDATE_KEYWORD_GROUP_ASSIGNMENT, keyword);
  }

  purchaseKeyword(paymentProfileId: number, keyword: SMSKeyword):
    Observable<string> {
    return this._http
      .post<string>(PURCHASE_KEYWORDS(paymentProfileId), keyword);
  }

  getUserIncludedUsedKeywordCount():
    Observable<number> {
    return this._http
      .get<number>(GET_USER_INCLUDED_USED_KEYWORD_COUNT);
  }

  LookupAvailableKeyword(keyword: string):
    Observable<boolean> {
    return this._http
      .get<boolean>(LOOKUP_AVAILABLE_KEYWORD(keyword));
  }

  saveMemberResponse(groupId: number, memberId: number, member: KeywordMember):
    Observable<boolean> {
    return this._httpClient
      .post<boolean>(SAVE_MEMBER_RESPONSE(groupId, memberId), member);
  }

  getKeywordPrepayOptions():
    Observable<KeywordPrepayOption[]> {
    return this._httpClient
      .get<KeywordPrepayOption[]>(GET_KEYWORD_PREPAY_OPTIONS);
  }

  getUserKeywordRequestCount():
    Observable<number> {
    return this._http
      .get<number>(GET_KEYWORD_REQUEST_COUNT);
  }

  getCommunicationEndPointResponseArgs(memberEncryptedString: string):
    Observable<KeywordMembers> {
    return this._httpClient
      .get<KeywordMembers>(GET_COMMUNICATION_ENDPOINT_RESPONSE_ARGS(memberEncryptedString));
  }

  optInNumber(phoneNumber: string):
    Observable<number> {
    return this._httpClient
      .post<number>(OPT_IN_NUMBER(phoneNumber), null);
  }

  optOutNumber(phoneNumber: string):
    Observable<number> {
    return this._httpClient
      .post<number>(OPT_OUT_NUMBER(phoneNumber), null);
  }
}

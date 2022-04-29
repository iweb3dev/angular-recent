import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '../../core/http/http.service';
import {
  SuccessResult,
  SuccessResultDetail,
  SignMeUpMember,
  AddressDetail,
  EmailAddressDetail,
  PhoneNumberDetail,
} from '../shared/shared.models';
import {
  GroupMembersDisplay,
  Member,
  MemberInsertComplete,
  ResponseMemberInsertComplete,
  ResponseSignMeUpMember,
  SaveMemberEndpointDetail,
  AdditionalFieldValue,
  OptinRequest,
  GroupMemberDisplay,
  RequestPagingFiltering,
} from './members.models';
import {
  MEMBERS_API_BASE,
  GET_MY_CONTACTS,
  DELETE_MEMBERS_FROM_CONTACTS,
  GET_MEMBER,
  INSERT_MEMBER,
  DELETE_MEMBER,
  POST_QUICKADD_MEMBER_TO_GROUP,
  UPDATE_MEMBER,
  UPDATE_ADDITIONAL_FIELD,
  DELETE_ADDRESS,
  SAVE_ADDRESS,
  SAVE_MEMBER_ADDRESS,
  DELETE_EMAILADDRESS,
  SAVE_MEMBER_EMAIL_ADDRESS,
  UPDATE_MEMBER_EMAIL_ADDRESS,
  DELETE_PHONE_NUMBER,
  UPDATE_MEMBER_PHONE_NUMBER,
  SAVE_MEMEBER_PHONE_NUMBER,
  DELETE_MEMBER_PICTURE,
  OPTIN_FROM_EMAIL_OR_SMSREQUEST,
  OPTIN_OVER_WEB,
  QUICK_UPDATE_MEMBER,
  ACTIVATE_MEMBERS_FROM_CONTACTS,
  ACTIVATE_ALL_MEMBERS_FROM_CONTACTS,
  DEACTIVATE_MEMBERS_FROM_CONTACTS,
  DEACTIVATE_ALL_MEMBERS_FROM_CONTACTS,
  GET_MY_CONTACTS_NOT_IN_GROUP,
  SEARCH_MY_CONTACTS,
  ADD_EXISTING_MEMBERS_TO_GROUP,
  MCA_ADD_BLOCK_NUMBER,
  SUBSCRIBE_TO_CALLINGPOST_EMAILS,
  UNSUBSCRIBE_TO_ALL_CALLINGPOST_EMAILS,
  VERIFY_SUBSCRIBED_TO_CALLINGPOST_EMAILS,
} from './members.api';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private _http: Http, private _httpClient: HttpClient) {}

  deleteAllMembersFromContacts(): Observable<object> {
    return this._http.delete(MEMBERS_API_BASE);
  }

  getMyContacts(
    pageSize?: number,
    pageIndex?: number,
  ): Observable<GroupMembersDisplay> {
    return this._http.get<GroupMembersDisplay>(
      GET_MY_CONTACTS(pageSize, pageIndex),
    );
  }

  deleteMembersFromContacts(
    membersToDelete: number[],
  ): Observable<SuccessResult[]> {
    return this._http.post<SuccessResult[]>(
      DELETE_MEMBERS_FROM_CONTACTS,
      membersToDelete,
    );
  }

  getMember(memberId: number): Observable<Member> {
    return this._http.get<Member>(GET_MEMBER(memberId));
  }

  insertMember(
    groupId: number,
    member: MemberInsertComplete,
  ): Observable<number> {
    return this._http.post<number>(INSERT_MEMBER(groupId), member);
  }

  postQuickAddMemberToGroup(
    groupId: number,
    member: SignMeUpMember,
  ): Observable<ResponseSignMeUpMember> {
    return this._httpClient.post<ResponseSignMeUpMember>(
      POST_QUICKADD_MEMBER_TO_GROUP(groupId),
      member,
    );
  }

  deleteMember(memberId: number): Observable<object> {
    return this._http.delete(DELETE_MEMBER(memberId));
  }

  updateMember(
    memberId: number,
    memberToUpdate: Member,
  ): Observable<SuccessResultDetail> {
    return this._http.put<SuccessResultDetail>(
      UPDATE_MEMBER(memberId),
      memberToUpdate,
    );
  }

  updateAdditionalField(
    memberId: number,
    fieldId: number,
    additionalFieldValue: AdditionalFieldValue,
  ): Observable<SaveMemberEndpointDetail> {
    return this._http.put<SaveMemberEndpointDetail>(
      UPDATE_ADDITIONAL_FIELD(memberId, fieldId),
      additionalFieldValue,
    );
  }

  deleteAddress(memberId: number, addressId: number): Observable<object> {
    return this._http.delete(DELETE_ADDRESS(memberId, addressId));
  }

  saveAddress(
    memberId: number,
    addressDetail: AddressDetail,
  ): Observable<SaveMemberEndpointDetail> {
    return this._http.post<SaveMemberEndpointDetail>(
      SAVE_ADDRESS(memberId),
      addressDetail,
    );
  }

  saveMemberAddress(
    memberId: number,
    addressId: number,
    addressDetail: AddressDetail,
  ): Observable<SaveMemberEndpointDetail> {
    return this._http.put<SaveMemberEndpointDetail>(
      SAVE_MEMBER_ADDRESS(memberId, addressId),
      addressDetail,
    );
  }

  deleteEmailAddress(
    memberId: number,
    emailAddressId: number,
  ): Observable<object> {
    return this._http.delete(DELETE_EMAILADDRESS(memberId, emailAddressId));
  }

  saveMemberEmailAddress(
    memberId: number,
    emailAddress: EmailAddressDetail,
  ): Observable<number> {
    return this._http.post<number>(
      SAVE_MEMBER_EMAIL_ADDRESS(memberId),
      emailAddress,
    );
  }

  updateMemberEmailAddress(
    memberId: number,
    emailAddressId: number,
    emailAddressDetail,
  ): Observable<number> {
    return this._http.put<number>(
      UPDATE_MEMBER_EMAIL_ADDRESS(memberId, emailAddressId),
      emailAddressDetail,
    );
  }

  deletePhoneNumber(
    memberId: number,
    phoneNumberId: number,
  ): Observable<object> {
    return this._http.delete(DELETE_PHONE_NUMBER(memberId, phoneNumberId));
  }

  updateMemberPhoneNumber(
    memberId: number,
    phoneNumberId: number,
    phoneNumberDetail: PhoneNumberDetail,
  ): Observable<number> {
    return this._http.put<number>(
      UPDATE_MEMBER_PHONE_NUMBER(memberId, phoneNumberId),
      phoneNumberDetail,
    );
  }

  saveMemberPhoneNumber(
    memberId: number,
    phoneNumberDetail: PhoneNumberDetail,
  ): Observable<number> {
    return this._http.post<number>(
      SAVE_MEMEBER_PHONE_NUMBER(memberId),
      phoneNumberDetail,
    );
  }

  deleteMemberPicture(memberId: number, pictureId: number): Observable<object> {
    return this._http.delete(DELETE_MEMBER_PICTURE(memberId, pictureId));
  }

  optInFromEmailOrSmsRequest(
    memberId: number,
    optInRequest: OptinRequest,
  ): Observable<number> {
    return this._httpClient.post<number>(
      OPTIN_FROM_EMAIL_OR_SMSREQUEST(memberId),
      optInRequest,
    );
  }

  optInOverWeb(
    memberId: number,
    optInRequest: OptinRequest,
  ): Observable<boolean> {
    return this._httpClient.post<boolean>(
      OPTIN_OVER_WEB(memberId),
      optInRequest,
    );
  }

  quickUpdateMember(
    memberId: number,
    memberToUpdate: GroupMemberDisplay,
  ): Observable<SuccessResultDetail> {
    return this._http.put<SuccessResultDetail>(
      QUICK_UPDATE_MEMBER(memberId),
      memberToUpdate,
    );
  }

  activateMembersFromContacts(members: number[]): Observable<boolean> {
    return this._http.post<boolean>(ACTIVATE_MEMBERS_FROM_CONTACTS, members);
  }

  activateAllMembersFromContacts(): Observable<boolean> {
    return this._http.post<boolean>(ACTIVATE_ALL_MEMBERS_FROM_CONTACTS, null);
  }

  deactivateMembersFromContacts(members: number[]): Observable<boolean> {
    return this._http.post<boolean>(DEACTIVATE_MEMBERS_FROM_CONTACTS, members);
  }

  deactivateAllMembersFromContacts(): Observable<boolean> {
    return this._http.post<boolean>(DEACTIVATE_ALL_MEMBERS_FROM_CONTACTS, null);
  }

  getMyContactsNotInGroup(
    excludedGroupId: number,
    pageSize?: number,
    pageIndex?: number,
    includePhotos?: boolean,
  ): Observable<GroupMembersDisplay> {
    return this._http.get<GroupMembersDisplay>(
      GET_MY_CONTACTS_NOT_IN_GROUP(
        excludedGroupId,
        pageSize,
        pageIndex,
        includePhotos,
      ),
    );
  }

  addExistingMembersToGroup(
    groupId: number,
    membersToAdd: number[],
  ): Observable<ResponseMemberInsertComplete[]> {
    return this._http.post<ResponseMemberInsertComplete[]>(
      ADD_EXISTING_MEMBERS_TO_GROUP(groupId),
      membersToAdd,
    );
  }

  mcaAddBlockedNumber(phoneNumberToBlock: string): Observable<boolean> {
    return this._httpClient.post<boolean>(
      MCA_ADD_BLOCK_NUMBER(phoneNumberToBlock),
      null,
    );
  }

  searchMyContacts(
    filter: RequestPagingFiltering,
  ): Observable<GroupMembersDisplay> {
    return this._http.post<GroupMembersDisplay>(SEARCH_MY_CONTACTS, filter);
  }

  subscribeToCallingPostEmails(
    memberEmailAddress: string,
  ): Observable<boolean> {
    return this._httpClient.post<boolean>(
      SUBSCRIBE_TO_CALLINGPOST_EMAILS(memberEmailAddress),
      null,
    );
  }

  unsubscribeToAllCallingPostEmails(args: string): Observable<boolean> {
    return this._httpClient.post<boolean>(
      UNSUBSCRIBE_TO_ALL_CALLINGPOST_EMAILS(args),
      null,
    );
  }

  verifySubscribedToCallingPostEmails(args: string): Observable<boolean> {
    return this._httpClient.post<boolean>(
      VERIFY_SUBSCRIBED_TO_CALLINGPOST_EMAILS(args),
      null,
    );
  }
}

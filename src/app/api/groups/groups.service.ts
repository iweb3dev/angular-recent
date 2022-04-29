import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import { AdditionalField, GroupMembersDisplay, Member, RequestPagingFiltering } from '../members/members.models';
import { UserGroupRole } from '../users/users.models';
import {
  GroupsDtoResponse, GroupDisplay, ExtendedGroupDetails,
  GroupWithStats,
  // GroupStats,
  ImportModel,
  ImportFileDetails,
  SuggestedGroup
} from './groups.models';
import {
  GROUP_API_BASE, DELETE_ALL_GROUPS, GET_GROUPS_USER_LEADS,
  INSERT_GROUP, GET_GROUP_WITH_STATS, DELETE_GROUP,
  INSERT_GROUP_ADDITIONAL_FIELD, DELETE_GROUP_ADDITIONAL_FIELD, UPDATE_GROUP_ADDITIONAL_FIELD,
  REMOVE_BAD_NUMBERS_FROM_SPECIFIC_GROUP,
  REMOVE_BAD_NUMBERS_FROM_ALL_GROUPS,
  GET_BAD_PHONENUMBER_DETAILS_FOR_EXPORT,
  GET_BITLY,
  UPDATE_GROUP_NAME,
  IMPORT_GROUP_MEMBERS_FROM_FILE,
  INSERT_GROUP_MANAGER,
  DELETE_GROUP_MANAGER,
  GET_GROUP_MEMBER, GET_GROUP_MEMBER_PHOTO, DELETE_ALL_GROUP_MEMBERS,
  GET_GROUP_CONTACTS,
  GET_GROUP_NAME_SEARCH,
  DELETE_SELECTED_GROUP_MEMBERS,
  ACTIVATE_GROUP_MEMBERS_BY_MEMBER_ID,
  ACTIVATE_ALL_GROUP_MEMBERS,
  DEACTIVATE_ALL_GROUP_MEMBERS,
  DEACTIVATE_GROUP_MEMBERS_BY_MEMBER_ID,
  ACTIVATE_OR_DEACTIVATE_SPECIFIC_GROUP_MEMBER_BY_GSM_ID,
  GET_GROUP_MEMBERS_FOR_EXPORT,
  SEARCH_GROUP_CONTACTS,
  SEARCH_MEMBERS_NOT_IN_GROUP,
  GET_NOT_OPTED_IN_MEMBER_DETAILS,
  GET_IMPORT_FILE_DATA,
  GET_GROUPS_USER_LEADS_SORTED, GET_GROUPS_BY_SORT_ORDER,
  GET_SUGGESTED_GROUPS_BY_ORG_SUB_TYPE
} from './groups.api';
import { PagedList } from '../shared/shared.models';
import { PartialExtendedGroup } from 'src/app/groups/types/partial-extended-group.type';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class GroupService {
  constructor(private _http: Http) {}

  fetchGroups() {
    return this._http.get<GroupsDtoResponse>(GROUP_API_BASE);
  }

  deleteAllGroups():
    Observable<object>  {
    return this._http
      .delete(DELETE_ALL_GROUPS);
  }

  getGroupsUserLeads(pageSize?: number, pageIndex?: number, callIn?: boolean):
    Observable<GroupDisplay> {
    return this._http
      .get<GroupDisplay>(GET_GROUPS_USER_LEADS(pageSize, pageIndex, callIn));
  }

  insertGroup(group: PartialExtendedGroup<ExtendedGroupDetails>):
    Observable<number> {
    return this._http
      .post<number>(INSERT_GROUP, group);
  }

  getGroupWithStats(groupId: number):
    Observable<GroupWithStats> {
    return this._http
      .get<GroupWithStats>(GET_GROUP_WITH_STATS(groupId));
  }

  deleteGroup(groupId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_GROUP(groupId));
  }

  insertGroupAdditionalField(groupId: number, model: AdditionalField):
    Observable<number> {
    return this._http
      .post<number>(INSERT_GROUP_ADDITIONAL_FIELD(groupId), model);
  }

  deleteGroupAdditionalField(groupId: number, fieldId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_GROUP_ADDITIONAL_FIELD(groupId, fieldId));
  }

  updateGroupAdditionalField(groupId: number, fieldId: number, model: AdditionalField):
    Observable<number> {
    return this._http
      .put<number>(UPDATE_GROUP_ADDITIONAL_FIELD(groupId, fieldId), model);
  }

  removeBadNumbersFromSpecificGroup(groupId: number):
    Observable<object> {
    return this._http
      .delete(REMOVE_BAD_NUMBERS_FROM_SPECIFIC_GROUP(groupId));
  }

  removeBadNumbersFromAllGroups(groupId: number):
    Observable<object> {
    return this._http
      .delete(REMOVE_BAD_NUMBERS_FROM_ALL_GROUPS(groupId));
  }

  getBadPhoneNumberDetailsForExport(groupId: number) {
    return this._http
      .get<string[]>(GET_BAD_PHONENUMBER_DETAILS_FOR_EXPORT(groupId));
  }

  getGroupBitlyLink(groupId: number):
    Observable<string> {
    return this._http
      .post<string>(GET_BITLY(groupId), null);
  }

  updateGroupName(groupId: number, groupName: string):
    Observable<boolean> {
    return this._http
      .put<boolean>(UPDATE_GROUP_NAME(groupId, groupName), null);
  }

  importGroupMembersFromFile(groupId: number, importRequest: Partial<ImportModel>):
    Observable<number> {
    return this._http
      .post<number>(IMPORT_GROUP_MEMBERS_FROM_FILE(groupId), importRequest);
  }

  insertGroupManager(groupId: number, model: UserGroupRole):
    Observable<number> {
    return this._http
      .post<number>(INSERT_GROUP_MANAGER(groupId), model);
  }

  deleteGroupManager(groupId: number, managerId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_GROUP_MANAGER(groupId, managerId));
  }

  getGroupMember(groupId: number, memberId: number, includePhoto?: boolean):
    Observable<Member> {
    return this._http
      .get<Member>(GET_GROUP_MEMBER(groupId, memberId, includePhoto));
  }

  getGroupMemberPhoto(groupId: number, memberId: number):
    Observable<Member> {
    return this._http
      .get<Member>(GET_GROUP_MEMBER_PHOTO(groupId, memberId));
  }

  deleteAllGroupMembers(groupId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_ALL_GROUP_MEMBERS(groupId));
  }

  getGroupContacts(groupId: number, pageSize?: number, pageIndex?: number):
    Observable<GroupMembersDisplay> {
    return this._http
      .get<GroupMembersDisplay>(GET_GROUP_CONTACTS(groupId, pageSize, pageIndex));
  }

  deleteSelectedGroupMembers(groupId: number, membersToDelete: number[]):
    Observable<boolean> {
    return this._http
      .post<boolean>(DELETE_SELECTED_GROUP_MEMBERS(groupId), membersToDelete);
  }

  activateGroupMembersByMemberId(groupId: number, memberIds: number[]):
    Observable<boolean> {
    return this._http
      .post<boolean>(ACTIVATE_GROUP_MEMBERS_BY_MEMBER_ID(groupId), memberIds);
  }

  activateAllGroupMembers(groupId: number):
    Observable<boolean> {
    return this._http
      .post<boolean>(ACTIVATE_ALL_GROUP_MEMBERS(groupId), null);
  }

  deactivateGroupMembersByMemberId(groupId: number, memberIds: number[]):
    Observable<boolean> {
    return this._http
      .post<boolean>(DEACTIVATE_GROUP_MEMBERS_BY_MEMBER_ID(groupId), memberIds);
  }

  deactivateAllGroupMembers(groupId: number):
    Observable<boolean> {
    return this._http
      .post<boolean>(DEACTIVATE_ALL_GROUP_MEMBERS(groupId), null);
  }

  activateOrDeactivateSpecificGroupMemberByGsmId(groupId: number, groupsStaticMemberID: number, isActive: boolean):
    Observable<boolean> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http
      .post<boolean>(ACTIVATE_OR_DEACTIVATE_SPECIFIC_GROUP_MEMBER_BY_GSM_ID(groupId, groupsStaticMemberID),
      isActive, {headers: headers});
  }

  getGroupMembersForExport(groupId: number, pageSize?: number, pageIndex?: number):
    Observable<string[]> {
    return this._http
      .get<string[]>(GET_GROUP_MEMBERS_FOR_EXPORT(groupId, pageSize, pageIndex));
  }

  searchGroupContacts(groupId: number, filter: RequestPagingFiltering, includePhotos?: boolean):
    Observable<GroupMembersDisplay> {
    return this._http
      .post<GroupMembersDisplay>(SEARCH_GROUP_CONTACTS(groupId, includePhotos), filter);
  }

  searchMembersNotInGroup(groupId: number, filter: RequestPagingFiltering, includePhotos?: boolean):
    Observable<GroupMembersDisplay> {
    return this._http
      .post<GroupMembersDisplay>(SEARCH_MEMBERS_NOT_IN_GROUP(groupId, includePhotos), filter);
  }

  getNotOptedInMemberDetails(groupId: number, pageSize?: number, pageIndex?: number):
    Observable<string[]> {
    return this._http
      .get<string[]>(GET_NOT_OPTED_IN_MEMBER_DETAILS(groupId, pageSize, pageIndex), null);
  }

  getImportFileData(encryptedFileName: string, groupId: number):
    Observable<ImportFileDetails> {
    return this._http
      .get<ImportFileDetails>(GET_IMPORT_FILE_DATA(encryptedFileName, groupId));
  }

  getGroupsUserLeadsSorted(requestedSortOrder: string, pageSize?: number, pageIndex?: number):
    Observable<PagedList<GroupDisplay>> {
    return this._http
      .get<PagedList<GroupDisplay>>(GET_GROUPS_USER_LEADS_SORTED(requestedSortOrder, pageSize, pageIndex));
  }

  getGroupsBySortOrder(requestedSortOrder: string, pageSize?: number, pageIndex?: number):
    Observable<PagedList<GroupDisplay>> {
    return this._http
      .get<PagedList<GroupDisplay>>(GET_GROUPS_BY_SORT_ORDER(requestedSortOrder, pageSize, pageIndex));
  }

  // Note: If the searchString parameter is the empty string all groups are returned
  getGroupNameSearch(searchString?: string, sortOrder?: number, pageSize?: number, pageIndex?: number):
    Observable<PagedList<GroupDisplay>> {
    return this._http
      .get<PagedList<GroupDisplay>>(GET_GROUP_NAME_SEARCH(searchString, sortOrder, pageSize, pageIndex));
  }

  getSuggestedGroupsByOrganizationSubType(subOrgType: number): Observable<SuggestedGroup[]> {
    return this._http
      .get<SuggestedGroup[]>(GET_SUGGESTED_GROUPS_BY_ORG_SUB_TYPE(subOrgType));
  }
}

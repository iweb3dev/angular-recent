import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '../../core/http/http.service';
import { PagedList, Picture } from '../shared/shared.models';
import {
  DisplayEvent,
  GroupEvent,
  EventSignUpAttendanceSummary,
  ReminderToSend,
  EventReminder,
  SignMeUp,
  SignedUpForEvent,
  EventSignedUpMember,
  EventSignupMemberExport,
  VolunteerSignedUpMember,
  DisplayVolunteerSheetAndRoles,
  SaveEvent,

} from './events.models';

import {
  DELETE_ALL_EVENTS,
  GET_EVENTS,
  SAVE_NEW_EVENT,
  DELETE_EVENT,
  GET_EVENT,
  GET_EVENT_SIGNUP_ATTENDANCE_SUMMARY,
  GET_EVENT_DETAILS,
  GET_EVENT_DETAILS_PHOTO,
  CREATE_EVENT_NOTIFICATION,
  DELETE_EVENT_REMINDER,
  CREATE_EVENT_REMINDER,
  GET_EVENT_REMINDERS_SUMMARY,
  CREATE_UPDATE_EVENT_PHOTO,
  SET_EVENT_DEFAULT_IMAGE,
  GET_EVENT_PAYPAL_SIGNUP_URL,
  SIGNUP_FOR_EVENT,
  GET_EVENT_SIGNUPS,
  GET_EVENT_SIGNUPS_FOR_EXPORT,
  DELETE_EVENT_SUMMARY_REMINDER,
  UPDATE_EVENT_SHARE_PAGE_ITEMS,
  UPDATE_EVENT_START_PAGE_ITEMS,
  CREATE_NEW_VOLUNTEER_ROLE_FOR_EVENT,
  DELETE_EVENT_VOLUNTEER_ROLE,
  DELETE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER,
  CREATE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER,
  GET_VOLUNTEER_SIGNUPS,
  GET_VOLUNTEER_SIGNUPS_FOR_EXPORT,
  CALCULATE_EVENT_NEXT_OR_PREVIOUS_OCCURANCE,
  GET_EVENTS_BY_GROUP_ID,
  GET_VOLUNTEER_SHEETS_AND_ROLES_BY_GROUP_ID,
  CREATE_AN_EVENT_FOR_TESTING

} from './events.api';


@Injectable({
  providedIn: 'root'
})

// EventsService Class - This class allows users to ceate calender
// tracked events with sign - up sheets and Volunteer Sheets.
export class EventsService {

  constructor(private _http: Http, private _httpClient: HttpClient, ) {}

  deleteAllUserEvents():
    Observable<object> {
    return this._http
      .delete(DELETE_ALL_EVENTS);
  }

  getEvents(pageSize?: number, pageIndex?: number, currentDate?: Date):
    Observable<PagedList<DisplayEvent>> {
    return this._http
      .get<PagedList<DisplayEvent>>(GET_EVENTS(pageSize, pageIndex, currentDate));
  }

  saveEvent(newEvent: GroupEvent):
    Observable<number> {
    return this._http
      .post<number>(SAVE_NEW_EVENT, newEvent);
  }

  deleteEvent(eventId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_EVENT(eventId));
  }

  getEvent(eventId: number):
    Observable<DisplayEvent> {
    return this._http
      .get<DisplayEvent>(GET_EVENT(eventId));
  }

  getEventSignUpAttendanceSummary(eventId: number) {
    return this._http
      .get<EventSignUpAttendanceSummary>(GET_EVENT_SIGNUP_ATTENDANCE_SUMMARY(eventId));
  }

  getEventDetails(eventId: number):
    Observable<GroupEvent> {
    return this._http
      .get<GroupEvent>(GET_EVENT_DETAILS(eventId));
  }

  getEventDetailsPhoto(eventId: number, imageId: number):
    Observable<Picture> {
    return this._http
      .get<Picture>(GET_EVENT_DETAILS_PHOTO(eventId, imageId));
  }

  createEventNotification(eventId: number, notificationFormatsValue: number):
    Observable<boolean> {
    return this._http
      .get<boolean>(CREATE_EVENT_NOTIFICATION(eventId, notificationFormatsValue));
  }

  deleteEventReminder(eventId: number, reminderId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_EVENT_REMINDER(eventId, reminderId));
  }

  createEventReminder(eventId: number, eventReminder: ReminderToSend):
    Observable<number> {
    return this._http
      .post<number>(CREATE_EVENT_REMINDER(eventId), eventReminder);
  }

  // Gets a summary of all Reminders for a specified event
  getEventRemindersSummary(eventId: number): Observable<EventReminder[]> {
    return this._http
      .get<EventReminder[]>(GET_EVENT_REMINDERS_SUMMARY(eventId));
  }

  createUpdateEventPhoto(eventId: number, eventPicture: Picture) {
    return this._http
      .put<number>(CREATE_UPDATE_EVENT_PHOTO(eventId), eventPicture);
  }

  setEventDefaultImage(eventId: number, theEvent: GroupEvent):
    Observable<number> {
    return this._http
      .put<number>(SET_EVENT_DEFAULT_IMAGE(eventId), theEvent);
  }

  // Get the PayPal event donation URL
  getEventPayPalDonationUrl(eventId: number):
    Observable<string> {
    return this._httpClient
      .get<string>(GET_EVENT_PAYPAL_SIGNUP_URL(eventId));
  }

  signUpForEvent(eventId: number, signUp: SignMeUp):
    Observable<SignedUpForEvent> {
    return this._http
      .post<SignedUpForEvent>(SIGNUP_FOR_EVENT(eventId), signUp);
  }

  // Gets a report of all the sign ups for an Event
  getEventSignups(eventId: number, pageSize: number, pageIndex: number):
    Observable<PagedList<EventSignedUpMember>> {
    return this._http
      .get<PagedList<EventSignedUpMember>>(GET_EVENT_SIGNUPS(eventId, pageSize, pageIndex));
  }

  getEventSignupsForExport(eventId: number):
    Observable<EventSignupMemberExport[]> {
    return this._http
      .get<EventSignupMemberExport[]>(GET_EVENT_SIGNUPS_FOR_EXPORT(eventId));
  }

  deleteEventSummaryReminder(eventId: number, reminderId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_EVENT_SUMMARY_REMINDER(eventId, reminderId));
  }

  updateEventSharePageItems(eventId: number, theEvent: GroupEvent):
    Observable<boolean> {
    return this._http
      .put<boolean>(UPDATE_EVENT_SHARE_PAGE_ITEMS(eventId), theEvent);
  }

  updateEventStartPageItems(eventId: number, theEvent: GroupEvent):
    Observable<boolean> {
    return this._http
      .post<boolean>(UPDATE_EVENT_START_PAGE_ITEMS(eventId), theEvent);
  }

  postNewVolunteerRoleForEvent(eventId: number, volunteerSheetId: number, eventVolunteerRole: GroupEvent):
    Observable<number> {
    return this._http
      .post<number>(CREATE_NEW_VOLUNTEER_ROLE_FOR_EVENT(eventId, volunteerSheetId), eventVolunteerRole);
  }

  deleteEventVolunteerRole(eventId: number, volunteerSheetId: number, roleId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_EVENT_VOLUNTEER_ROLE(eventId, volunteerSheetId, roleId));
  }

  deleteEventVolunteerSheetRoleReminder(eventId: number, volunteerSheetId: number, roleId: number, reminderId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER(eventId, volunteerSheetId, roleId, reminderId));
  }

  createEventVolunteerSheetRoleReminder(eventId: number, volunteerSheetId: number, roleId: number, volunteerRoleReminder: ReminderToSend):
    Observable<number> {
    return this._http
      .post<number>(CREATE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER(eventId, volunteerSheetId, roleId), volunteerRoleReminder);
  }

  // Gets a report of Volunteer Signups for a specified event
  getVolunteerMembers(eventId: number, pageSize: number, pageIndex: number) {
    return this._http
      .get<PagedList<VolunteerSignedUpMember>>(GET_VOLUNTEER_SIGNUPS(eventId, pageSize, pageIndex));
  }

  // Get the Volunteer Signups for an event ready to be exported
  getVolunteerSignUpsForExport(eventId: number):
    Observable<EventSignupMemberExport[]> {
    return this._http
      .get<EventSignupMemberExport[]>(GET_VOLUNTEER_SIGNUPS_FOR_EXPORT(eventId));
  }

  calculateEventNextOrPreviousOccurance(occurrenceId: number, displayEvent: DisplayEvent): Observable<DisplayEvent> {
    return this._http
      .post<DisplayEvent>(CALCULATE_EVENT_NEXT_OR_PREVIOUS_OCCURANCE(occurrenceId), displayEvent);
  }

  // Gets the volunteer sheets for a groups event, and generates a report
  getEventsByGroupId(groupId: number, pageSize: number, pageIndex: number):
    Observable<PagedList<DisplayEvent>> {
    return this._http
      .get<PagedList<DisplayEvent>>(GET_EVENTS_BY_GROUP_ID(groupId, pageSize, pageIndex));
  }

  // Gets the volunteer sheets for a groups event, and generates a report
  getVolunteerSheetsAndRolesByGroupId(groupId: number, pageSize: number, pageIndex: number):
    Observable<PagedList<DisplayVolunteerSheetAndRoles>> {
    return this._http
      .get<PagedList<DisplayVolunteerSheetAndRoles>>(GET_VOLUNTEER_SHEETS_AND_ROLES_BY_GROUP_ID(groupId, pageSize, pageIndex));
  }

  // Creates an Event for Testing
  createAnEventForTesting():
    Observable<GroupEvent | SaveEvent> {
    return this._http
      .get<GroupEvent | SaveEvent>(CREATE_AN_EVENT_FOR_TESTING);
  }
}

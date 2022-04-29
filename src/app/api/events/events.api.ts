import { environment } from '../../../environments/environment';

export const EVENTS_API = `/api/events`;
export const DELETE_ALL_EVENTS = `${EVENTS_API}`;
export const GET_EVENTS = (pageSize?: number, pageIndex?: number, currentDate?: Date) => `${EVENTS_API}?pageSize=${pageSize}&pageIndex=${pageIndex}&currentDate=${currentDate}`;
export const SAVE_NEW_EVENT = `${EVENTS_API}`;
export const DELETE_EVENT = (eventId: number) => `${EVENTS_API}/${eventId}`;
export const GET_EVENT = (eventId: number) => `${environment.api.base}${EVENTS_API}/${eventId}`;
export const GET_EVENT_SIGNUP_ATTENDANCE_SUMMARY = (eventId: number) => `${EVENTS_API}/${eventId}/attendancesummary`;
export const GET_EVENT_DETAILS = (eventId: number) => `${EVENTS_API}/${eventId}/details`;
export const GET_EVENT_DETAILS_PHOTO = (eventId: number, imageId: number) => `${environment.api.base}${EVENTS_API}/${eventId}/details/${imageId}`;
export const CREATE_EVENT_NOTIFICATION = (eventId: number, notificationFormatsValue: number) => `${EVENTS_API}/${eventId}/notifications/${notificationFormatsValue}`;
export const DELETE_EVENT_REMINDER = (eventId: number, reminderId: number) => `${EVENTS_API}/${eventId}/reminders/${reminderId}`;
export const CREATE_EVENT_REMINDER = (eventId: number) => `${EVENTS_API}/${eventId}/reminders`;
export const GET_EVENT_REMINDERS_SUMMARY = (eventId: number) => `${EVENTS_API}/${eventId}/reminderssummary`;
export const CREATE_UPDATE_EVENT_PHOTO = (eventId: number) => `${EVENTS_API}/${eventId}/setcustomimage`;
export const SET_EVENT_DEFAULT_IMAGE = (eventId: number) => `${EVENTS_API}/${eventId}/setdefaultimage`;
export const GET_EVENT_PAYPAL_SIGNUP_URL = (eventId: number) => `${environment.api.base}${EVENTS_API}/${eventId}/signup/paypalurl`;
export const SIGNUP_FOR_EVENT = (eventId: number) => `${environment.api.base}${EVENTS_API}/${eventId}/signup`;
export const GET_EVENT_SIGNUPS = (eventId: number, pageSize: number, pageIndex: number) => `${EVENTS_API}/${eventId}/signups?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const GET_EVENT_SIGNUPS_FOR_EXPORT = (eventId: number) => `${EVENTS_API}/${eventId}/signupsexport`;
export const DELETE_EVENT_SUMMARY_REMINDER = (eventId: number, reminderId: number) => `${EVENTS_API}/${eventId}/summaryreminders/${reminderId}`;
export const UPDATE_EVENT_SHARE_PAGE_ITEMS = (eventId: number) => `${EVENTS_API}/${eventId}/updatesharepage`;
export const UPDATE_EVENT_START_PAGE_ITEMS = (eventId: number) => `${EVENTS_API}/${eventId}/updatestartpage`;
export const CREATE_NEW_VOLUNTEER_ROLE_FOR_EVENT = (eventId: number, volunteerSheetId: number) => `${EVENTS_API}/${eventId}/volunteersheet/${volunteerSheetId}`;
export const DELETE_EVENT_VOLUNTEER_ROLE = (eventId: number, volunteerSheetId: number, roleId: number) => `${EVENTS_API}/${eventId}/volunteersheet/${volunteerSheetId}/roles/${roleId}`;
export const DELETE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER
  = (eventId: number, volunteerSheetId: number, roleId: number, reminderId: number) =>
    `${EVENTS_API}/${eventId}/volunteersheet/${volunteerSheetId}/roles/${roleId}/reminders/${reminderId}`;
export const CREATE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER
  = (eventId: number, volunteerSheetId: number, roleId: number) =>
    `${EVENTS_API}/${eventId}/volunteersheet/${volunteerSheetId}/roles/${roleId}/reminders`;
export const GET_VOLUNTEER_SIGNUPS = (eventId: number, pageSize: number, pageIndex: number) => `${EVENTS_API}/${eventId}/volunteersignups?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const GET_VOLUNTEER_SIGNUPS_FOR_EXPORT = (eventId: number) => `${EVENTS_API}/${eventId}/volunteersignupsexport`;
export const CALCULATE_EVENT_NEXT_OR_PREVIOUS_OCCURANCE
  = (occurrenceId: number) =>
  `${environment.api.base}${EVENTS_API}/${occurrenceId}/nextpreviousoccurrence/${occurrenceId}`;
export const GET_EVENTS_BY_GROUP_ID = (groupId: number, pageSize: number, pageIndex: number) => `${environment.api.base}${EVENTS_API}/search/${groupId}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const GET_VOLUNTEER_SHEETS_AND_ROLES_BY_GROUP_ID
  = (groupId: number, pageSize: number, pageIndex: number) =>
  `${environment.api.base}${EVENTS_API}/search/${groupId}/volunteersheets?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const CREATE_AN_EVENT_FOR_TESTING = `${EVENTS_API}/test`;

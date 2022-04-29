"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
var core_1 = require("@angular/core");
var events_api_1 = require("./events.api");
var EventsService = /** @class */ (function () {
    function EventsService(_http, __http) {
        this._http = _http;
        this.__http = __http;
    }
    EventsService.prototype.deleteAllUserEvents = function () {
        return this._http
            .delete(events_api_1.DELETE_ALL_EVENTS);
    };
    EventsService.prototype.getEvents = function (pageSize, pageIndex, currentDate) {
        return this.__http
            .get(events_api_1.GET_EVENTS(pageSize, pageIndex, currentDate));
    };
    EventsService.prototype.saveEvent = function (newEvent) {
        return this._http
            .post(events_api_1.SAVE_NEW_EVENT, newEvent);
    };
    EventsService.prototype.deleteEvent = function (eventId) {
        return this._http
            .delete(events_api_1.DELETE_EVENT(eventId));
    };
    EventsService.prototype.getEvent = function (eventId) {
        return this._http
            .get(events_api_1.GET_EVENT(eventId));
    };
    EventsService.prototype.getEventSignUpAttendanceSummary = function (eventId) {
        return this._http
            .get(events_api_1.GET_EVENT_SIGNUP_ATTENDANCE_SUMMARY(eventId));
    };
    EventsService.prototype.getEventDetails = function (eventId) {
        return this._http
            .get(events_api_1.GET_EVENT_DETAILS(eventId));
    };
    EventsService.prototype.getEventDetailsPhoto = function (eventId, imageId) {
        return this.__http
            .get(events_api_1.GET_EVENT_DETAILS_PHOTO(eventId, imageId));
    };
    EventsService.prototype.createEventNotification = function (eventId, notificationFormatsValue) {
        return this._http
            .get(events_api_1.CREATE_EVENT_NOTIFICATION(eventId, notificationFormatsValue));
    };
    EventsService.prototype.deleteEventReminder = function (eventId, reminderId) {
        return this._http
            .delete(events_api_1.DELETE_EVENT_REMINDER(eventId, reminderId));
    };
    EventsService.prototype.createEventReminder = function (eventId, eventReminder) {
        return this._http
            .post(events_api_1.CREATE_EVENT_REMINDER(eventId), eventReminder);
    };
    // Gets a summary of all Reminders for a specified event
    EventsService.prototype.getEventRemindersSummary = function (eventId) {
        return this._http
            .get(events_api_1.GET_EVENT_REMINDERS_SUMMARY(eventId));
    };
    EventsService.prototype.createUpdateEventPhoto = function (eventId, eventPicture) {
        return this._http
            .put(events_api_1.CREATE_UPDATE_EVENT_PHOTO(eventId), eventPicture);
    };
    EventsService.prototype.setEventDefaultImage = function (eventId, theEvent) {
        return this._http
            .put(events_api_1.SET_EVENT_DEFAULT_IMAGE(eventId), theEvent);
    };
    // Get the PayPal event donation URL
    EventsService.prototype.getEventPayPalDonationUrl = function (eventId) {
        return this.__http
            .get(events_api_1.GET_EVENT_PAYPAL_SIGNUP_URL(eventId));
    };
    EventsService.prototype.signUpForEvent = function (eventId, signUp) {
        return this.__http
            .post(events_api_1.SIGNUP_FOR_EVENT(eventId), signUp);
    };
    // Gets a report of all the sign ups for an Event
    EventsService.prototype.getEventSignups = function (eventId, pageSize, pageIndex) {
        return this._http
            .get(events_api_1.GET_EVENT_SIGNUPS(eventId, pageSize, pageIndex));
    };
    EventsService.prototype.getEventSignupsForExport = function (eventId) {
        return this._http
            .get(events_api_1.GET_EVENT_SIGNUPS_FOR_EXPORT(eventId));
    };
    EventsService.prototype.deleteEventSummaryReminder = function (eventId, reminderId) {
        return this._http
            .delete(events_api_1.DELETE_EVENT_SUMMARY_REMINDER(eventId, reminderId));
    };
    EventsService.prototype.updateEventSharePageItems = function (eventId, theEvent) {
        return this._http
            .put(events_api_1.UPDATE_EVENT_SHARE_PAGE_ITEMS(eventId), theEvent);
    };
    EventsService.prototype.updateEventStartPageItems = function (eventId, theEvent) {
        return this._http
            .post(events_api_1.UPDATE_EVENT_START_PAGE_ITEMS(eventId), theEvent);
    };
    EventsService.prototype.postNewVolunteerRoleForEvent = function (eventId, volunteerSheetId, eventVolunteerRole) {
        return this._http
            .post(events_api_1.CREATE_NEW_VOLUNTEER_ROLE_FOR_EVENT(eventId, volunteerSheetId), eventVolunteerRole);
    };
    EventsService.prototype.deleteEventVolunteerRole = function (eventId, volunteerSheetId, roleId) {
        return this._http
            .delete(events_api_1.DELETE_EVENT_VOLUNTEER_ROLE(eventId, volunteerSheetId, roleId));
    };
    EventsService.prototype.deleteEventVolunteerSheetRoleReminder = function (eventId, volunteerSheetId, roleId, reminderId) {
        return this._http
            .delete(events_api_1.DELETE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER(eventId, volunteerSheetId, roleId, reminderId));
    };
    EventsService.prototype.createEventVolunteerSheetRoleReminder = function (eventId, volunteerSheetId, roleId, volunteerRoleReminder) {
        return this._http
            .post(events_api_1.CREATE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER(eventId, volunteerSheetId, roleId), volunteerRoleReminder);
    };
    // Gets a report of Volunteer Signups for a specified event
    EventsService.prototype.getVolunteerMembers = function (eventId, pageSize, pageIndex) {
        return this._http
            .get(events_api_1.GET_VOLUNTEER_SIGNUPS(eventId, pageSize, pageIndex));
    };
    // Get the Volunteer Signups for an event ready to be exported
    EventsService.prototype.getVolunteerSignUpsForExport = function (eventId) {
        return this._http
            .get(events_api_1.GET_VOLUNTEER_SIGNUPS_FOR_EXPORT(eventId));
    };
    EventsService.prototype.calculateEventNextOrPreviousOccurance = function (occurrenceId, displayEvent) {
        return this.__http
            .post(events_api_1.CALCULATE_EVENT_NEXT_OR_PREVIOUS_OCCURANCE(occurrenceId), displayEvent);
    };
    // Gets the volunteer sheets for a groups event, and generates a report
    EventsService.prototype.getEventsByGroupId = function (groupId, pageSize, pageIndex) {
        return this.__http
            .get(events_api_1.GET_EVENTS_BY_GROUP_ID(groupId, pageSize, pageIndex));
    };
    // Gets the volunteer sheets for a groups event, and generates a report
    EventsService.prototype.getVolunteerSheetsAndRolesByGroupId = function (groupId, pageSize, pageIndex) {
        return this.__http
            .get(events_api_1.GET_VOLUNTEER_SHEETS_AND_ROLES_BY_GROUP_ID(groupId, pageSize, pageIndex));
    };
    // Creates an Event for Testing
    EventsService.prototype.createAnEventForTesting = function () {
        return this._http
            .get(events_api_1.CREATE_AN_EVENT_FOR_TESTING);
    };
    EventsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
        // EventsService Class - This class allows users to ceate calender
        // tracked events with sign - up sheets and Volunteer Sheets.
    ], EventsService);
    return EventsService;
}());
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_AN_EVENT_FOR_TESTING = exports.GET_VOLUNTEER_SHEETS_AND_ROLES_BY_GROUP_ID = exports.GET_EVENTS_BY_GROUP_ID = exports.CALCULATE_EVENT_NEXT_OR_PREVIOUS_OCCURANCE = exports.GET_VOLUNTEER_SIGNUPS_FOR_EXPORT = exports.GET_VOLUNTEER_SIGNUPS = exports.CREATE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER = exports.DELETE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER = exports.DELETE_EVENT_VOLUNTEER_ROLE = exports.CREATE_NEW_VOLUNTEER_ROLE_FOR_EVENT = exports.UPDATE_EVENT_START_PAGE_ITEMS = exports.UPDATE_EVENT_SHARE_PAGE_ITEMS = exports.DELETE_EVENT_SUMMARY_REMINDER = exports.GET_EVENT_SIGNUPS_FOR_EXPORT = exports.GET_EVENT_SIGNUPS = exports.SIGNUP_FOR_EVENT = exports.GET_EVENT_PAYPAL_SIGNUP_URL = exports.SET_EVENT_DEFAULT_IMAGE = exports.CREATE_UPDATE_EVENT_PHOTO = exports.GET_EVENT_REMINDERS_SUMMARY = exports.CREATE_EVENT_REMINDER = exports.DELETE_EVENT_REMINDER = exports.CREATE_EVENT_NOTIFICATION = exports.GET_EVENT_DETAILS_PHOTO = exports.GET_EVENT_DETAILS = exports.GET_EVENT_SIGNUP_ATTENDANCE_SUMMARY = exports.GET_EVENT = exports.DELETE_EVENT = exports.SAVE_NEW_EVENT = exports.GET_EVENTS = exports.DELETE_ALL_EVENTS = exports.EVENTS_API = void 0;
var environment_1 = require("../../../environments/environment");
exports.EVENTS_API = "/api/events";
exports.DELETE_ALL_EVENTS = "" + exports.EVENTS_API;
var GET_EVENTS = function (pageSize, pageIndex, currentDate) { return exports.EVENTS_API + "?pageSize=" + pageSize + "&pageIndex=" + pageIndex + "&currentDate=" + currentDate; };
exports.GET_EVENTS = GET_EVENTS;
exports.SAVE_NEW_EVENT = "" + exports.EVENTS_API;
var DELETE_EVENT = function (eventId) { return exports.EVENTS_API + "/" + eventId; };
exports.DELETE_EVENT = DELETE_EVENT;
var GET_EVENT = function (eventId) { return "" + environment_1.environment.api.base + exports.EVENTS_API + "/" + eventId; };
exports.GET_EVENT = GET_EVENT;
var GET_EVENT_SIGNUP_ATTENDANCE_SUMMARY = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/attendancesummary"; };
exports.GET_EVENT_SIGNUP_ATTENDANCE_SUMMARY = GET_EVENT_SIGNUP_ATTENDANCE_SUMMARY;
var GET_EVENT_DETAILS = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/details"; };
exports.GET_EVENT_DETAILS = GET_EVENT_DETAILS;
var GET_EVENT_DETAILS_PHOTO = function (eventId, imageId) { return "" + environment_1.environment.api.base + exports.EVENTS_API + "/" + eventId + "/details/" + imageId; };
exports.GET_EVENT_DETAILS_PHOTO = GET_EVENT_DETAILS_PHOTO;
var CREATE_EVENT_NOTIFICATION = function (eventId, notificationFormatsValue) { return exports.EVENTS_API + "/" + eventId + "/notifications/" + notificationFormatsValue; };
exports.CREATE_EVENT_NOTIFICATION = CREATE_EVENT_NOTIFICATION;
var DELETE_EVENT_REMINDER = function (eventId, reminderId) { return exports.EVENTS_API + "/" + eventId + "/reminders/" + reminderId; };
exports.DELETE_EVENT_REMINDER = DELETE_EVENT_REMINDER;
var CREATE_EVENT_REMINDER = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/reminders"; };
exports.CREATE_EVENT_REMINDER = CREATE_EVENT_REMINDER;
var GET_EVENT_REMINDERS_SUMMARY = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/reminderssummary"; };
exports.GET_EVENT_REMINDERS_SUMMARY = GET_EVENT_REMINDERS_SUMMARY;
var CREATE_UPDATE_EVENT_PHOTO = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/setcustomimage"; };
exports.CREATE_UPDATE_EVENT_PHOTO = CREATE_UPDATE_EVENT_PHOTO;
var SET_EVENT_DEFAULT_IMAGE = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/setdefaultimage"; };
exports.SET_EVENT_DEFAULT_IMAGE = SET_EVENT_DEFAULT_IMAGE;
var GET_EVENT_PAYPAL_SIGNUP_URL = function (eventId) { return "" + environment_1.environment.api.base + exports.EVENTS_API + "/" + eventId + "/signup/paypalurl"; };
exports.GET_EVENT_PAYPAL_SIGNUP_URL = GET_EVENT_PAYPAL_SIGNUP_URL;
var SIGNUP_FOR_EVENT = function (eventId) { return "" + environment_1.environment.api.base + exports.EVENTS_API + "/" + eventId + "/signup"; };
exports.SIGNUP_FOR_EVENT = SIGNUP_FOR_EVENT;
var GET_EVENT_SIGNUPS = function (eventId, pageSize, pageIndex) { return exports.EVENTS_API + "/" + eventId + "/signups?pageSize=" + pageSize + "&pageIndex=" + pageIndex; };
exports.GET_EVENT_SIGNUPS = GET_EVENT_SIGNUPS;
var GET_EVENT_SIGNUPS_FOR_EXPORT = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/signupsexport"; };
exports.GET_EVENT_SIGNUPS_FOR_EXPORT = GET_EVENT_SIGNUPS_FOR_EXPORT;
var DELETE_EVENT_SUMMARY_REMINDER = function (eventId, reminderId) { return exports.EVENTS_API + "/" + eventId + "/summaryreminders/" + reminderId; };
exports.DELETE_EVENT_SUMMARY_REMINDER = DELETE_EVENT_SUMMARY_REMINDER;
var UPDATE_EVENT_SHARE_PAGE_ITEMS = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/updatesharepage"; };
exports.UPDATE_EVENT_SHARE_PAGE_ITEMS = UPDATE_EVENT_SHARE_PAGE_ITEMS;
var UPDATE_EVENT_START_PAGE_ITEMS = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/updatestartpage"; };
exports.UPDATE_EVENT_START_PAGE_ITEMS = UPDATE_EVENT_START_PAGE_ITEMS;
var CREATE_NEW_VOLUNTEER_ROLE_FOR_EVENT = function (eventId, volunteerSheetId) { return exports.EVENTS_API + "/" + eventId + "/volunteersheet/" + volunteerSheetId; };
exports.CREATE_NEW_VOLUNTEER_ROLE_FOR_EVENT = CREATE_NEW_VOLUNTEER_ROLE_FOR_EVENT;
var DELETE_EVENT_VOLUNTEER_ROLE = function (eventId, volunteerSheetId, roleId) { return exports.EVENTS_API + "/" + eventId + "/volunteersheet/" + volunteerSheetId + "/roles/" + roleId; };
exports.DELETE_EVENT_VOLUNTEER_ROLE = DELETE_EVENT_VOLUNTEER_ROLE;
var DELETE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER = function (eventId, volunteerSheetId, roleId, reminderId) {
    return exports.EVENTS_API + "/" + eventId + "/volunteersheet/" + volunteerSheetId + "/roles/" + roleId + "/reminders/" + reminderId;
};
exports.DELETE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER = DELETE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER;
var CREATE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER = function (eventId, volunteerSheetId, roleId) {
    return exports.EVENTS_API + "/" + eventId + "/volunteersheet/" + volunteerSheetId + "/roles/" + roleId + "/reminders";
};
exports.CREATE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER = CREATE_EVENT_VOLUNTEER_SHEET_ROLE_REMINDER;
var GET_VOLUNTEER_SIGNUPS = function (eventId, pageSize, pageIndex) { return exports.EVENTS_API + "/" + eventId + "/volunteersignups?pageSize=" + pageSize + "&pageIndex=" + pageIndex; };
exports.GET_VOLUNTEER_SIGNUPS = GET_VOLUNTEER_SIGNUPS;
var GET_VOLUNTEER_SIGNUPS_FOR_EXPORT = function (eventId) { return exports.EVENTS_API + "/" + eventId + "/volunteersignupsexport"; };
exports.GET_VOLUNTEER_SIGNUPS_FOR_EXPORT = GET_VOLUNTEER_SIGNUPS_FOR_EXPORT;
var CALCULATE_EVENT_NEXT_OR_PREVIOUS_OCCURANCE = function (occurrenceId) {
    return "" + environment_1.environment.api.base + exports.EVENTS_API + "/" + occurrenceId + "/nextpreviousoccurrence/" + occurrenceId;
};
exports.CALCULATE_EVENT_NEXT_OR_PREVIOUS_OCCURANCE = CALCULATE_EVENT_NEXT_OR_PREVIOUS_OCCURANCE;
var GET_EVENTS_BY_GROUP_ID = function (groupId, pageSize, pageIndex) { return "" + environment_1.environment.api.base + exports.EVENTS_API + "/search/" + groupId + "?pageSize=" + pageSize + "&pageIndex=" + pageIndex; };
exports.GET_EVENTS_BY_GROUP_ID = GET_EVENTS_BY_GROUP_ID;
var GET_VOLUNTEER_SHEETS_AND_ROLES_BY_GROUP_ID = function (groupId, pageSize, pageIndex) {
    return "" + environment_1.environment.api.base + exports.EVENTS_API + "/search/" + groupId + "/volunteersheets?pageSize=" + pageSize + "&pageIndex=" + pageIndex;
};
exports.GET_VOLUNTEER_SHEETS_AND_ROLES_BY_GROUP_ID = GET_VOLUNTEER_SHEETS_AND_ROLES_BY_GROUP_ID;
exports.CREATE_AN_EVENT_FOR_TESTING = exports.EVENTS_API + "/test";
//# sourceMappingURL=events.api.js.map
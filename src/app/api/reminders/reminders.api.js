"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_USER_REMINDERS = exports.ADD_UPDATE_REMINDER = exports.DELETE_SPECIFIC_REMINDER = exports.DELETE_ALL_REMINDERS = exports.REMINDERS_API = void 0;
exports.REMINDERS_API = "/api/reminders";
exports.DELETE_ALL_REMINDERS = "" + exports.REMINDERS_API;
var DELETE_SPECIFIC_REMINDER = function (reminderId) { return "/api/reminder?reminderId=" + reminderId; };
exports.DELETE_SPECIFIC_REMINDER = DELETE_SPECIFIC_REMINDER;
exports.ADD_UPDATE_REMINDER = "" + exports.REMINDERS_API;
var GET_USER_REMINDERS = function (pageSize, pageIndex) { return exports.REMINDERS_API + "?pageSize=" + pageSize + "&pageIndex=" + pageIndex; };
exports.GET_USER_REMINDERS = GET_USER_REMINDERS;
//# sourceMappingURL=reminders.api.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemindersService = void 0;
var core_1 = require("@angular/core");
var reminders_api_1 = require("./reminders.api");
var RemindersService = /** @class */ (function () {
    function RemindersService(_Http) {
        this._Http = _Http;
    }
    // Delete all outstanding reminders for a user.
    RemindersService.prototype.deleteAllReminders = function () {
        return this._Http
            .delete(reminders_api_1.DELETE_ALL_REMINDERS);
    };
    // Delete a specific reminder by its ID number
    RemindersService.prototype.deleteSpecificReminder = function (reminderId) {
        return this._Http
            .delete(reminders_api_1.DELETE_SPECIFIC_REMINDER(reminderId));
    };
    RemindersService.prototype.addUpdateReminder = function (reminder) {
        return this._Http
            .post(reminders_api_1.ADD_UPDATE_REMINDER, reminder);
    };
    RemindersService.prototype.getUserReminders = function (pageSize, pageIndex) {
        return this._Http
            .get(reminders_api_1.GET_USER_REMINDERS(pageSize, pageIndex));
    };
    RemindersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RemindersService);
    return RemindersService;
}());
exports.RemindersService = RemindersService;
//# sourceMappingURL=reminders.service.js.map
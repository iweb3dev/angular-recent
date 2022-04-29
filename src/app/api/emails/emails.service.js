"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsService = void 0;
var core_1 = require("@angular/core");
var emails_api_1 = require("./emails.api");
var EmailsService = /** @class */ (function () {
    function EmailsService(__http) {
        this.__http = __http;
    }
    EmailsService.prototype.sendGroupPageContactUsEmail = function (groupId, systemEmail) {
        return this.__http
            .post(emails_api_1.SEND_GROUP_PAGE_CONTACT_US_EMAIL(groupId), systemEmail);
    };
    EmailsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EmailsService);
    return EmailsService;
}());
exports.EmailsService = EmailsService;
//# sourceMappingURL=emails.service.js.map
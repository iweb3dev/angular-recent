"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
var core_1 = require("@angular/core");
var account_api_1 = require("./account.api");
var AccountService = /** @class */ (function () {
    function AccountService(_Http) {
        this._Http = _Http;
    }
    AccountService.prototype.login = function (accountModel) {
        return this._Http
            .post(account_api_1.LOGIN_USER_NAME, accountModel);
    };
    AccountService.prototype.register = function (registerModel) {
        return this._Http
            .post(account_api_1.REGISTER, registerModel);
    };
    AccountService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map
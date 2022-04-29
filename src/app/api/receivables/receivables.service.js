"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivablesService = void 0;
var core_1 = require("@angular/core");
var receivables_api_1 = require("./receivables.api");
var ReceivablesService = /** @class */ (function () {
    function ReceivablesService(_http) {
        this._http = _http;
    }
    ReceivablesService.prototype.getReceivableAccounts = function (pageSize, pageIndex) {
        return this._http
            .get(receivables_api_1.GET_RECEIVABLE_ACCOUNTS(pageSize, pageIndex));
    };
    ReceivablesService.prototype.saveReceivableAccount = function (account) {
        return this._http
            .post(receivables_api_1.CREATE_RECEIVABLE_ACCOUNT, account);
    };
    ReceivablesService.prototype.deleteReceivableAccount = function (accountId) {
        return this._http
            .delete(receivables_api_1.DELETE_RECEIVABLE_ACCOUNT(accountId));
    };
    ReceivablesService.prototype.getReceivableAccount = function (accountId, pageSize, pageIndex) {
        return this._http
            .get(receivables_api_1.GET_RECEIVABLE_ACCOUNT(accountId, pageSize, pageIndex));
    };
    // Save Receivable Account Changes
    ReceivablesService.prototype.updateReceivableAccount = function (accountId, account) {
        return this._http
            .put(receivables_api_1.UPDATE_RECEIVABLE_ACCOUNT(accountId), account);
    };
    // Save Receivable Account Status
    ReceivablesService.prototype.updateReceivableAccountStatus = function (accountId, isActive) {
        return this._http
            .put(receivables_api_1.UPDATE_RECEIVABLE_ACCOUNT_STATUS(accountId, isActive), null);
    };
    ReceivablesService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], ReceivablesService);
    return ReceivablesService;
}());
exports.ReceivablesService = ReceivablesService;
//# sourceMappingURL=receivables.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
var core_1 = require("@angular/core");
var transactions_api_1 = require("./transactions.api");
var TransactionsService = /** @class */ (function () {
    function TransactionsService(_http) {
        this._http = _http;
    }
    TransactionsService.prototype.getUserOrdersReceiptList = function (pageSize, pageIndex) {
        return this._http
            .get(transactions_api_1.GET_USERS_ORDER_RECEIPTS_LIST(pageSize, pageIndex));
    };
    TransactionsService.prototype.getSpecificOrderReceipt = function (orderId) {
        return this._http
            .get(transactions_api_1.GET_SPECIFIC_ORDER_RECEIPT(orderId));
    };
    TransactionsService.prototype.getSpecificOrderDetails = function (orderId) {
        return this._http
            .get(transactions_api_1.GET_SPECIFIC_ORDER_DETAILS(orderId));
    };
    TransactionsService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], TransactionsService);
    return TransactionsService;
}());
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map
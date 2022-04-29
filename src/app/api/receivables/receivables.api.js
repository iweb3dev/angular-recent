"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_RECEIVABLE_ACCOUNT_STATUS = exports.UPDATE_RECEIVABLE_ACCOUNT = exports.GET_RECEIVABLE_ACCOUNT = exports.DELETE_RECEIVABLE_ACCOUNT = exports.CREATE_RECEIVABLE_ACCOUNT = exports.GET_RECEIVABLE_ACCOUNTS = exports.RECEIVABLES_API = void 0;
exports.RECEIVABLES_API = "/api/receivables";
var GET_RECEIVABLE_ACCOUNTS = function (pageSize, pageIndex) { return exports.RECEIVABLES_API + "?pageSize=" + pageSize + "&pageIndex=" + pageIndex; };
exports.GET_RECEIVABLE_ACCOUNTS = GET_RECEIVABLE_ACCOUNTS;
exports.CREATE_RECEIVABLE_ACCOUNT = "" + exports.RECEIVABLES_API;
var DELETE_RECEIVABLE_ACCOUNT = function (accountId) { return exports.RECEIVABLES_API + "/" + accountId; };
exports.DELETE_RECEIVABLE_ACCOUNT = DELETE_RECEIVABLE_ACCOUNT;
var GET_RECEIVABLE_ACCOUNT = function (accountId, pageSize, pageIndex) { return exports.RECEIVABLES_API + "/" + accountId + "?pageSize=" + pageSize + "&pageIndex=" + pageIndex; };
exports.GET_RECEIVABLE_ACCOUNT = GET_RECEIVABLE_ACCOUNT;
var UPDATE_RECEIVABLE_ACCOUNT = function (accountId) { return exports.RECEIVABLES_API + "/" + accountId; };
exports.UPDATE_RECEIVABLE_ACCOUNT = UPDATE_RECEIVABLE_ACCOUNT;
var UPDATE_RECEIVABLE_ACCOUNT_STATUS = function (accountId, isActive) { return exports.RECEIVABLES_API + "/" + accountId + "/" + isActive; };
exports.UPDATE_RECEIVABLE_ACCOUNT_STATUS = UPDATE_RECEIVABLE_ACCOUNT_STATUS;
//# sourceMappingURL=receivables.api.js.map
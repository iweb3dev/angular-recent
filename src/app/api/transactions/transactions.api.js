"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_SPECIFIC_ORDER_DETAILS = exports.GET_SPECIFIC_ORDER_RECEIPT = exports.GET_USERS_ORDER_RECEIPTS_LIST = exports.ORDERS_API = void 0;
exports.ORDERS_API = "/api/financials/orders";
var GET_USERS_ORDER_RECEIPTS_LIST = function (pageSize, pageIndex) { return exports.ORDERS_API + "?pageSize=" + pageSize + "&pageIndex=" + pageIndex; };
exports.GET_USERS_ORDER_RECEIPTS_LIST = GET_USERS_ORDER_RECEIPTS_LIST;
var GET_SPECIFIC_ORDER_RECEIPT = function (orderId) { return exports.ORDERS_API + "/" + orderId; };
exports.GET_SPECIFIC_ORDER_RECEIPT = GET_SPECIFIC_ORDER_RECEIPT;
var GET_SPECIFIC_ORDER_DETAILS = function (orderId) { return exports.ORDERS_API + "/" + orderId + "/details"; };
exports.GET_SPECIFIC_ORDER_DETAILS = GET_SPECIFIC_ORDER_DETAILS;
//# sourceMappingURL=transactions.api.js.map
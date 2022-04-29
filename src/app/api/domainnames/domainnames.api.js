"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_SUGGESTED_DOMAIN_NAMES = exports.PURCHASE_DOMAIN_NAME = exports.SET_ALL_DOMAIN_EMAIL_FORWARDERS = exports.GET_DOMAIN_EMAIL_FORWARDERS = exports.GET_DOMAIN_STATUS = exports.DOMAIN_NAMES_API = void 0;
exports.DOMAIN_NAMES_API = "/api/domainnames";
var GET_DOMAIN_STATUS = function (name) { return exports.DOMAIN_NAMES_API + "/available/" + name; };
exports.GET_DOMAIN_STATUS = GET_DOMAIN_STATUS;
var GET_DOMAIN_EMAIL_FORWARDERS = function (SLD, TLD) { return exports.DOMAIN_NAMES_API + "/email/forwarders/" + SLD + "/" + TLD; };
exports.GET_DOMAIN_EMAIL_FORWARDERS = GET_DOMAIN_EMAIL_FORWARDERS;
var SET_ALL_DOMAIN_EMAIL_FORWARDERS = function (SLD, TLD) { return exports.DOMAIN_NAMES_API + "/email/setforwarders/" + SLD + "/" + TLD; };
exports.SET_ALL_DOMAIN_EMAIL_FORWARDERS = SET_ALL_DOMAIN_EMAIL_FORWARDERS;
exports.PURCHASE_DOMAIN_NAME = exports.DOMAIN_NAMES_API + "/purchase";
var GET_SUGGESTED_DOMAIN_NAMES = function (keyword) { return exports.DOMAIN_NAMES_API + "/suggest/" + keyword; };
exports.GET_SUGGESTED_DOMAIN_NAMES = GET_SUGGESTED_DOMAIN_NAMES;
//# sourceMappingURL=domainnames.api.js.map
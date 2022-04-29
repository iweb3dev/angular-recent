"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEND_GROUP_PAGE_CONTACT_US_EMAIL = exports.EMAILS_API = void 0;
var environment_1 = require("../../../environments/environment");
exports.EMAILS_API = "/api/emails";
var SEND_GROUP_PAGE_CONTACT_US_EMAIL = function (groupId) { return "" + environment_1.environment.api.base + exports.EMAILS_API + "/" + groupId + "/contactus"; };
exports.SEND_GROUP_PAGE_CONTACT_US_EMAIL = SEND_GROUP_PAGE_CONTACT_US_EMAIL;
//# sourceMappingURL=emails.api.js.map
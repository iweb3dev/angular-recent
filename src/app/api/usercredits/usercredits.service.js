"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreditsService = void 0;
var core_1 = require("@angular/core");
var usercredits_api_1 = require("./usercredits.api");
var UserCreditsService = /** @class */ (function () {
    function UserCreditsService(_http) {
        this._http = _http;
    }
    UserCreditsService.prototype.postResultOfUserCreditPurchase = function (purchase) {
        return this._http
            .post(usercredits_api_1.POST_RESULT_OF_USER_CREDIT_PURCHASE, purchase);
    };
    UserCreditsService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], UserCreditsService);
    return UserCreditsService;
}());
exports.UserCreditsService = UserCreditsService;
//# sourceMappingURL=usercredits.service.js.map
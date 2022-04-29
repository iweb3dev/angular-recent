"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
var core_1 = require("@angular/core");
var roles_api_1 = require("./roles.api");
var RolesService = /** @class */ (function () {
    function RolesService(_http) {
        this._http = _http;
    }
    RolesService.prototype.getVolunteerRoleTesting = function (volunteerSheetId) {
        return this._http
            .get(roles_api_1.GET_VOLUNTEER_ROLE_TESTING(volunteerSheetId));
    };
    RolesService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], RolesService);
    return RolesService;
}());
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map
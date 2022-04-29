"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsService = void 0;
var core_1 = require("@angular/core");
var errors_api_1 = require("./errors.api");
var ErrorsService = /** @class */ (function () {
    function ErrorsService(_Http) {
        this._Http = _Http;
    }
    // Service for logging client side errors into the database
    ErrorsService.prototype.clientSideErrors = function (clientErrors) {
        return this._Http
            .post(errors_api_1.CLIENT_SIDE_ERRORS, clientErrors);
    };
    // Gets reports of client side error origin information for logging into the database
    ErrorsService.prototype.clientSideOrigin = function (clientOrigin) {
        return this._Http
            .post(errors_api_1.CLIENT_SIDE_ORIGIN, clientOrigin);
    };
    ErrorsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ErrorsService);
    return ErrorsService;
}());
exports.ErrorsService = ErrorsService;
//# sourceMappingURL=errors.service.js.map
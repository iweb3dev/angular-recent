"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Http = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../environments/environment");
var Http = /** @class */ (function () {
    function Http(_httpClient, _tokensService) {
        this._httpClient = _httpClient;
        this._tokensService = _tokensService;
    }
    Http.prototype.get = function (url, options) {
        var getOptions = this.createHttpOptions(options);
        return this._httpClient.get("" + environment_1.environment.api.base + url, getOptions);
    };
    Http.prototype.post = function (url, body, options) {
        var postOptions = this.createHttpOptions(options);
        return this._httpClient.post("" + environment_1.environment.api.base + url, body, postOptions);
    };
    Http.prototype.put = function (url, body, options) {
        var putOptions = this.createHttpOptions(options);
        return this._httpClient.put("" + environment_1.environment.api.base + url, body, putOptions);
    };
    Http.prototype.delete = function (url, options) {
        var deleteOptions = this.createHttpOptions(options);
        return this._httpClient.delete("" + environment_1.environment.api.base + url, deleteOptions);
    };
    Http.prototype.createHttpOptions = function (options) {
        var accessToken = this._tokensService.getAccessToken();
        return this.resolveHttpOptions(accessToken, options);
    };
    Http.prototype.resolveHttpOptions = function (accessToken, options) {
        if (options) {
            if (!options.headers) {
                options.headers = new http_1.HttpHeaders();
            }
            options.headers = options.headers.append("authorization", "bearer " + accessToken);
        }
        else {
            options = {};
            var requestHeaders = new http_1.HttpHeaders();
            requestHeaders = requestHeaders.set("authorization", "bearer " + accessToken);
            options.headers = requestHeaders;
        }
        return options;
    };
    Http = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], Http);
    return Http;
}());
exports.Http = Http;
//# sourceMappingURL=http.service.js.map
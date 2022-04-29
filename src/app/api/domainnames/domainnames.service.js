"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainNamesService = void 0;
var core_1 = require("@angular/core");
var domainnames_api_1 = require("./domainnames.api");
var DomainNamesService = /** @class */ (function () {
    function DomainNamesService(_http) {
        this._http = _http;
    }
    DomainNamesService.prototype.getDomainStatus = function (name) {
        return this._http
            .get(domainnames_api_1.GET_DOMAIN_STATUS(name));
    };
    DomainNamesService.prototype.getDomainEmailForwarders = function (SLD, TLD) {
        return this._http
            .get(domainnames_api_1.GET_DOMAIN_EMAIL_FORWARDERS(SLD, TLD));
    };
    DomainNamesService.prototype.setAllDomainEmailForwarders = function (SLD, TLD, item) {
        return this._http
            .post(domainnames_api_1.SET_ALL_DOMAIN_EMAIL_FORWARDERS(SLD, TLD), item);
    };
    DomainNamesService.prototype.purchaseDomainName = function (domain) {
        return this._http
            .post(domainnames_api_1.PURCHASE_DOMAIN_NAME, domain);
    };
    DomainNamesService.prototype.getSuggestedDomainNames = function (keyword) {
        return this._http
            .get(domainnames_api_1.GET_SUGGESTED_DOMAIN_NAMES(keyword));
    };
    DomainNamesService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], DomainNamesService);
    return DomainNamesService;
}());
exports.DomainNamesService = DomainNamesService;
//# sourceMappingURL=domainnames.service.js.map
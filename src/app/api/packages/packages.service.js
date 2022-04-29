"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageService = void 0;
var core_1 = require("@angular/core");
var packages_api_1 = require("../packages/packages.api");
var PackageService = /** @class */ (function () {
    function PackageService(_http) {
        this._http = _http;
    }
    PackageService.prototype.getAllPackageFeatures = function () {
        return this._http
            .get(packages_api_1.GET_ALL_PACKAGE_FEATURES);
    };
    PackageService.prototype.getFeaturesByPackageId = function (packageId) {
        return this._http
            .get(packages_api_1.GET_FEATURES_BY_PACKAGEID(packageId));
    };
    PackageService.prototype.cancelSubscriptionDowngrade = function () {
        return this._http
            .delete(packages_api_1.CANCEL_SUBSCRIPTION_DOWNGRADE);
    };
    // Commented out as this was duplicated in the usercredits controller
    // purchaseCredits(purchase: PurchaseCredits):
    //   Observable<string> {
    //   return this._http
    //     .post<string>(PURCHASE_CREDITS, purchase);
    // }
    PackageService.prototype.purchaseDomain = function (purchase) {
        return this._http
            .post(packages_api_1.PURCHASE_DOMAIN, purchase);
    };
    PackageService.prototype.canUserDowngrade = function (currentPackageId, targetPackageId) {
        return this._http
            .get(packages_api_1.CAN_USER_DOWNGRADE(currentPackageId, targetPackageId));
    };
    PackageService.prototype.validatePackageChange = function (packageChange) {
        return this._http
            .put(packages_api_1.VALIDATE_PACKAGE_CHANGE, packageChange);
    };
    PackageService.prototype.getPaymentProfileTest = function () {
        return this._http
            .get(packages_api_1.GET_PAYMENT_PROFILE_TEST);
    };
    PackageService.prototype.paypalCreditPurchase = function (purchase) {
        return this._http
            .post(packages_api_1.PAYPAL_CREDIT_PURCHASE, purchase);
    };
    PackageService.prototype.getSuspensionReasons = function (isPublic) {
        return this._http
            .get(packages_api_1.GET_SUSPENSION_REASONS(isPublic));
    };
    PackageService.prototype.getPackageFeaturesByPackageId = function (packageId) {
        return this._http
            .get(packages_api_1.GET_PACKAGES_BY_TYPE_ID(packageId));
    };
    PackageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PackageService);
    return PackageService;
}());
exports.PackageService = PackageService;
//# sourceMappingURL=packages.service.js.map
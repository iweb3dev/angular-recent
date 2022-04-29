"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemHelpComponent = void 0;
var core_1 = require("@angular/core");
var MenuItemHelpComponent = /** @class */ (function () {
    function MenuItemHelpComponent() {
        this.showTitle = true;
    }
    MenuItemHelpComponent.prototype.ngOnInit = function () {};
    __decorate([
        core_1.Input()
    ], MenuItemHelpComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input()
    ], MenuItemHelpComponent.prototype, "icon", void 0);
    __decorate([
        core_1.Input()
    ], MenuItemHelpComponent.prototype, "showTitle", void 0);
    MenuItemHelpComponent = __decorate([
        core_1.Component({
            selector: 'app-menu-item-help',
            templateUrl: './menu-item-help.component.html',
            styleUrls: ['./menu-item-help.component.scss'],
        })
    ], MenuItemHelpComponent);
    return MenuItemHelpComponent;
}());
exports.MenuItemHelpComponent = MenuItemHelpComponent;
//# sourceMappingURL=menu-item-help.component.js.map
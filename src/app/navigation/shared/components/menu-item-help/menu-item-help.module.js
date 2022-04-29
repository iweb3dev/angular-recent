"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemHelpModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var menu_item_help_component_1 = require("./menu-item-help.component");
var router_1 = require("@angular/router");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var flex_layout_1 = require("@angular/flex-layout");
var MenuItemHelpModule = /** @class */ (function () {
    function MenuItemHelpModule() {
    }
    MenuItemHelpModule = __decorate([
        core_1.NgModule({
            declarations: [menu_item_help_component_1.MenuItemHelpComponent],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                flex_layout_1.FlexLayoutModule,
            ],
            exports: [menu_item_help_component_1.MenuItemHelpComponent],
        })
    ], MenuItemHelpModule);
    return MenuItemHelpModule;
}());
exports.MenuItemHelpModule = MenuItemHelpModule;
//# sourceMappingURL=menu-item-help.module.js.map
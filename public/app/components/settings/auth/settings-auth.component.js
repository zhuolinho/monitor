"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../../../config");
var user_service_1 = require("../../../services/user.service");
var router_1 = require("@angular/router");
var SettingsAuth = (function () {
    function SettingsAuth(localUserService, router) {
        this.localUserService = localUserService;
        this.router = router;
        this.user = { username: '', password: '' };
        console.log("SettingsAuth is up and running");
        if (this.localUserService.getSettingAcess()) {
            this.router.navigate(['/admin/settings/access']);
            return;
        }
        this.authUser = this.localUserService.getUser();
        this.user.username = this.authUser.name;
        this.initUi();
    }
    SettingsAuth.prototype.initUi = function () {
        setTimeout(function (_) {
            jQuery('select').material_select();
        });
    };
    SettingsAuth.prototype.login = function () {
        var _this = this;
        this.localUserService.login({ username: this.user.username, password: this.user.password }).subscribe(function (response) {
            console.log('got settings login respone---', response);
            if (!response.er) {
                _this.localUserService.logedInSettings();
                setTimeout(function () {
                    _this.router.navigate(['/admin/settings/access']);
                });
            }
        });
    };
    return SettingsAuth;
}());
SettingsAuth = __decorate([
    core_1.Component({
        selector: 'settings-auth',
        templateUrl: config_1.config.prefix + '/components/settings/auth/settings-auth.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
], SettingsAuth);
exports.SettingsAuth = SettingsAuth;

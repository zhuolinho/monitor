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
var config_1 = require("../../config");
var router_1 = require("@angular/router");
var user_service_1 = require("../../services/user.service");
var routerNav_service_1 = require("../../services/routerNav.service");
var Settings = (function () {
    function Settings(localUserService, router, routerNavServ) {
        this.localUserService = localUserService;
        this.router = router;
        this.routerNavServ = routerNavServ;
        console.log("Settings is up and running");
        this.routerNavServ.currentModule = 'settings';
        // this.user = this.localUserService.Auth();
        console.log("this.user---", this.user);
        // if(!this.user.settingsAcces){
        //       console.log('settings user not logged in ----');
        //     this.router.navigate(['/Admin','Settings','SettingsAuth']);
        // }
    }
    return Settings;
}());
Settings = __decorate([
    core_1.Component({
        selector: 'settings',
        templateUrl: config_1.config.prefix + '/components/settings/settings.component.html',
    })
    //
    // @RouteConfig([
    //   {path:'/auth', component:SettingsAuth, name:'SettingsAuth',useAsDefault:true},
    //   {path:'/sms', component:SettingsSms, name:'SettingsSms'},
    //   {path:'/access', component:SettingsAccess, name:'SettingsAccess'},
    //   {path:'/address', component:SettingsAddress, name:'SettingsAddress'},
    //   {path:'/offline-users', component:SettingsOfflineUsers, name:'SettingsOfflineUsers'},
    //   {path:'/formula', component:SettingsFormula, name:'SettingsFormula'}
    // ])
    ,
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router,
        routerNav_service_1.routerNavService])
], Settings);
exports.Settings = Settings;

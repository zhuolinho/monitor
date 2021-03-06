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
// import {CORE_DIRECTIVES} from '@angular/common';
var router_1 = require("@angular/router");
var user_service_1 = require("../../services/user.service");
var config_1 = require("../../config");
var AdminComponent = (function () {
    function AdminComponent(localUserService, router) {
        this.localUserService = localUserService;
        this.router = router;
        console.log("admin is up and running:user ", this.localUserService.getUser());
    }
    return AdminComponent;
}());
AdminComponent = __decorate([
    core_1.Component({
        selector: 'admin',
        templateUrl: config_1.config.prefix + 'components/admin/admin.component.html',
    })
    // @CanActivate((to, from) => {
    //   return isLoggedIn();  //working fine.ignore red line warning
    // })
    // @RouteConfig([
    //   {path:'/home/...', component:Home, name:'Home', useAsDefault:true},
    //   {path:'/monitor/...', component:Monitor, name:'Monitor'},
    //   {path:'/gps/...', component:Gps, name:'Gps'},
    //   {path:'/settings/...', component:Settings, name:'Settings'}
    // ])
    ,
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
], AdminComponent);
exports.AdminComponent = AdminComponent;

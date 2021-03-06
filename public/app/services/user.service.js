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
var request_service_1 = require("./request.service");
require("rxjs/add/operator/map");
var loginApi = 'users/login.json';
var UserService = (function () {
    function UserService(request) {
        this.request = request;
        this.settingsAcces = false;
    }
    UserService.prototype.getUser = function () {
        return JSON.parse(sessionStorage.getItem('user'));
    };
    UserService.prototype.getToken = function () {
        return JSON.parse(sessionStorage.getItem('jwt'));
    };
    UserService.prototype.login = function (user) {
        return this.request.post(loginApi, user);
    };
    UserService.prototype.saveUser = function (userInfo) {
        sessionStorage.setItem('jwt', userInfo.token);
        sessionStorage.setItem('user', JSON.stringify(userInfo.user));
    };
    UserService.prototype.logedInSettings = function () {
        sessionStorage.setItem('settingsAccess', 'true');
    };
    UserService.prototype.getSettingAcess = function () {
        return sessionStorage.getItem('settingsAccess');
    };
    UserService.prototype.logout = function () {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("jwt");
        sessionStorage.removeItem("settingsAccess");
    };
    UserService.prototype.redirectUser = function () {
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], UserService);
exports.UserService = UserService;

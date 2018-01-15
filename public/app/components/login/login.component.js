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
var user_service_1 = require("../../services/user.service");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(localUserService, router) {
        this.localUserService = localUserService;
        this.user = { username: '', password: '' };
        this.loginError = false;
        this.router = router;
        console.log("login is up and running");
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        console.log("this.user.password---", this.user);
        this.loginError = false;
        this.localUserService.login({ username: this.user.username, password: this.user.password }).subscribe(function (res) {
            if (!res.er) {
                // if ((res.pl && res.pl.user && res.pl.user.ap > 3)) {
                //   alert('无权限');
                //   return;
                // }
                _this.localUserService.saveUser(res.pl);
                var patern = /^[GCL]\d{3}$/;
                if (res.pl && res.pl.user && patern.test(res.pl.user.name)) {
                    _this.router.navigate(['/view/tank-stats', res.pl.user.name]);
                }
                else {
                    _this.router.navigate(['/admin/home/alerts']);
                }
            }
            else {
                _this.loginError = true;
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: config_1.config.prefix + '/components/login/login.component.html',
        styleUrls: [config_1.config.prefix + '/components/login/resources/css/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;

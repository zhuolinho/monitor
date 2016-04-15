System.register(['angular2/core', '../../../config', '../../../services/request', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, config_1, request_1, router_1;
    var SettingsAuth;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (request_1_1) {
                request_1 = request_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            SettingsAuth = (function () {
                function SettingsAuth(request, router) {
                    this.user = { username: '', password: '' };
                    this.request = request;
                    this.router = router;
                    console.log("SettingsAuth is up and running");
                }
                SettingsAuth.prototype.login = function () {
                    var _this = this;
                    this.request.post('users/login', { name: this.user.username, password: this.user.password }).subscribe(function (response) {
                        console.log('got respone---', response);
                        _this.router.navigate(['SettingsAccess']);
                    });
                };
                SettingsAuth = __decorate([
                    core_1.Component({
                        selector: 'settings-auth',
                        templateUrl: config_1.config.prefix + '/components/settings/auth/settings-auth.component.html'
                    }), 
                    __metadata('design:paramtypes', [request_1.Request, router_1.Router])
                ], SettingsAuth);
                return SettingsAuth;
            }());
            exports_1("SettingsAuth", SettingsAuth);
        }
    }
});

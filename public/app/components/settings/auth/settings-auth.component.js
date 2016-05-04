System.register(['angular2/core', '../../../config', '../../../services/user.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, config_1, user_service_1, router_1;
    var SettingsAuth;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            SettingsAuth = (function () {
                function SettingsAuth(localUserService, router) {
                    this.localUserService = localUserService;
                    this.router = router;
                    this.user = { username: 'saf', password: '111111' };
                    console.log("SettingsAuth is up and running");
                    // this.user.username = this.localUserService.getUser().name;
                    this.initUi();
                }
                SettingsAuth.prototype.initUi = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                SettingsAuth.prototype.login = function () {
                    var _this = this;
                    this.localUserService.login({ name: this.user.username, password: this.user.password }).subscribe(function (response) {
                        console.log('got settings login respone---', response);
                        if (!response.er) {
                            _this.localUserService.logedInSettings();
                            setTimeout(function () {
                                _this.router.parent.navigate(['SettingsAccess']);
                            });
                        }
                    });
                };
                SettingsAuth = __decorate([
                    core_1.Component({
                        selector: 'settings-auth',
                        templateUrl: config_1.config.prefix + '/components/settings/auth/settings-auth.component.html'
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
                ], SettingsAuth);
                return SettingsAuth;
            }());
            exports_1("SettingsAuth", SettingsAuth);
        }
    }
});

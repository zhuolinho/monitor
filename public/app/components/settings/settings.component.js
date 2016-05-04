System.register(['angular2/core', '../../config', 'angular2/router', '../../services/user.service', './sms/settings-sms.component', './auth/settings-auth.component', './access/settings-access.component', './address/settings-address.component', './formula/settings-formula.component'], function(exports_1, context_1) {
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
    var core_1, config_1, router_1, user_service_1, settings_sms_component_1, settings_auth_component_1, settings_access_component_1, settings_address_component_1, settings_formula_component_1;
    var Settings;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (settings_sms_component_1_1) {
                settings_sms_component_1 = settings_sms_component_1_1;
            },
            function (settings_auth_component_1_1) {
                settings_auth_component_1 = settings_auth_component_1_1;
            },
            function (settings_access_component_1_1) {
                settings_access_component_1 = settings_access_component_1_1;
            },
            function (settings_address_component_1_1) {
                settings_address_component_1 = settings_address_component_1_1;
            },
            function (settings_formula_component_1_1) {
                settings_formula_component_1 = settings_formula_component_1_1;
            }],
        execute: function() {
            Settings = (function () {
                function Settings(localUserService, router) {
                    this.localUserService = localUserService;
                    this.router = router;
                    console.log("Settings is up and running");
                    // this.user = this.localUserService.Auth();
                    console.log("this.user---", this.user);
                    // if(!this.user.settingsAcces){
                    //       console.log('settings user not logged in ----');
                    //     this.router.navigate(['/Admin','Settings','SettingsAuth']);
                    // }
                }
                Settings = __decorate([
                    core_1.Component({
                        selector: 'settings',
                        templateUrl: config_1.config.prefix + '/components/settings/settings.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink]
                    }),
                    router_1.RouteConfig([
                        { path: '/auth', component: settings_auth_component_1.SettingsAuth, name: 'SettingsAuth', useAsDefault: true },
                        { path: '/sms', component: settings_sms_component_1.SettingsSms, name: 'SettingsSms' },
                        { path: '/access', component: settings_access_component_1.SettingsAccess, name: 'SettingsAccess' },
                        { path: '/address', component: settings_address_component_1.SettingsAddress, name: 'SettingsAddress' },
                        { path: '/formula', component: settings_formula_component_1.SettingsFormula, name: 'SettingsFormula' }
                    ]), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
                ], Settings);
                return Settings;
            }());
            exports_1("Settings", Settings);
        }
    }
});

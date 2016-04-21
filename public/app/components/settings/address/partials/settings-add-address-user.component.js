System.register(['angular2/core', '../../../../config'], function(exports_1, context_1) {
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
    var core_1, config_1;
    var SettingsAddAddressUser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            SettingsAddAddressUser = (function () {
                function SettingsAddAddressUser() {
                    this.editMode = false;
                    console.log("add user address modal is up and running---");
                }
                Object.defineProperty(SettingsAddAddressUser.prototype, "users", {
                    get: function () { return this.data; },
                    set: function (data) {
                        this.data = data;
                    },
                    enumerable: true,
                    configurable: true
                });
                SettingsAddAddressUser.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SettingsAddAddressUser.prototype, "users", null);
                SettingsAddAddressUser = __decorate([
                    core_1.Component({
                        selector: 'settings-add-address-user',
                        templateUrl: config_1.config.prefix + '/components/settings/address/partials/settings-add-address-user.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], SettingsAddAddressUser);
                return SettingsAddAddressUser;
            }());
            exports_1("SettingsAddAddressUser", SettingsAddAddressUser);
        }
    }
});

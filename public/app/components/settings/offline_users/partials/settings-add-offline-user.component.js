System.register(['angular2/core', '../../../../config', '../../../../services/request.service', '../../../../services/settings.service'], function(exports_1, context_1) {
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
    var core_1, config_1, request_service_1, settings_service_1;
    var SettingsAddOfflineUser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            }],
        execute: function() {
            SettingsAddOfflineUser = (function () {
                function SettingsAddOfflineUser(request, settingsSrvc) {
                    this.request = request;
                    this.settingsSrvc = settingsSrvc;
                    this.newUser = {
                        name: "",
                        phone: "",
                        pw: "111111",
                        addr: "",
                        ap: "",
                        sex: ""
                    };
                    this.editMode = false;
                    console.log("add offline user modal is up and running>>---");
                    this.initUi();
                }
                Object.defineProperty(SettingsAddOfflineUser.prototype, "users", {
                    get: function () { return this.data; },
                    set: function (data) {
                        this.data = data;
                    },
                    enumerable: true,
                    configurable: true
                });
                SettingsAddOfflineUser.prototype.addNewUser = function () {
                    var _this = this;
                    this.newUser.ap = this.data.id;
                    console.log("posting ----", this.newUser);
                    this.request.post('/users/signup', this.newUser).subscribe(function (res) {
                        console.log("sub comp user added-----", res);
                        if (res.pl && res.pl.user) {
                            _this.settingsSrvc.addUser(res.pl.user);
                            jQuery("#" + _this.data.id).closeModal();
                        }
                    });
                };
                SettingsAddOfflineUser.prototype.updateUser = function () {
                    var _this = this;
                    console.log("posting ----", this.editTarget);
                    this.request.put('/users/update', this.editTarget).subscribe(function (res) {
                        console.log("user added-----", res);
                        if (res.pl && res.pl.user) {
                            _this.settingsSrvc.updateUser(res.pl.user);
                            jQuery("#" + _this.data.id).closeModal();
                        }
                    });
                };
                SettingsAddOfflineUser.prototype.initUi = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SettingsAddOfflineUser.prototype, "users", null);
                SettingsAddOfflineUser = __decorate([
                    core_1.Component({
                        selector: 'settings-add-offline-user',
                        templateUrl: config_1.config.prefix + '/components/settings/offline_users/partials/settings-add-offline-user.component.html'
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService, settings_service_1.SettingsService])
                ], SettingsAddOfflineUser);
                return SettingsAddOfflineUser;
            }());
            exports_1("SettingsAddOfflineUser", SettingsAddOfflineUser);
        }
    }
});

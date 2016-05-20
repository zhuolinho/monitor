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
    var SettingsAddUser;
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
            SettingsAddUser = (function () {
                function SettingsAddUser(request, settingsSrvc) {
                    this.request = request;
                    this.settingsSrvc = settingsSrvc;
                    this.newUser = {
                        name: "",
                        phone: "",
                        pw: "",
                        addr: "",
                        ap: "",
                        sex: ""
                    };
                    this.editMode = false;
                    console.log("add user modal is up and running>>---");
                    this.initUi();
                }
                Object.defineProperty(SettingsAddUser.prototype, "users", {
                    get: function () { return this.data; },
                    set: function (data) {
                        this.data = data;
                    },
                    enumerable: true,
                    configurable: true
                });
                SettingsAddUser.prototype.addNewUser = function () {
                    var _this = this;
                    this.newUser.ap = this.data.users.type.id;
                    console.log("posting ----", this.newUser);
                    this.request.post('/users/signup', this.newUser).subscribe(function (res) {
                        console.log("sub comp user added-----", res);
                        if (res.pl && res.pl.user) {
                            _this.settingsSrvc.addUser(res.pl.user);
                            jQuery("#" + _this.data.id).closeModal();
                        }
                    });
                };
                SettingsAddUser.prototype.updateUser = function () {
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
                // vePrivilegeSelected(event, compRef){
                //   compRef.newUser.ap = parseInt(event.target.value);
                // }
                SettingsAddUser.prototype.veSelectGender = function (event) {
                    console.log("value-----", event);
                };
                SettingsAddUser.prototype.validateForm = function () {
                    setTimeout(function (_) {
                        console.log("validating----");
                        jQuery("#addNewUserModal").validate({
                            rules: {
                                name: "required",
                                phone: {
                                    required: true,
                                    minlength: 11
                                },
                                password: {
                                    required: true,
                                    minlength: 6
                                }
                            },
                            //For custom messages
                            messages: {
                                name: "safort",
                                phone: {
                                    required: "safort",
                                    minlength: "too short"
                                }
                            },
                            errorElement: 'div',
                            errorPlacement: function (error, element) {
                                var placement = jQuery(element).data('error');
                                if (placement) {
                                    jQuery(placement).append(error);
                                }
                                else {
                                    error.insertAfter(element);
                                }
                            }
                        });
                        jQuery.validator.setDefaults({
                            ignore: []
                        });
                    }, 1000);
                };
                SettingsAddUser.prototype.initUi = function () {
                    var _this = this;
                    setTimeout(function (_) {
                        //  jQuery('select.privilege').on('change',function(event){
                        //    _this.vePrivilegeSelected(event, _this)
                        //  });
                        _this.validateForm();
                    });
                };
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SettingsAddUser.prototype, "users", null);
                SettingsAddUser = __decorate([
                    core_1.Component({
                        selector: 'settings-add-user',
                        templateUrl: config_1.config.prefix + '/components/settings/access/partials/settings-add-user.component.html'
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService, settings_service_1.SettingsService])
                ], SettingsAddUser);
                return SettingsAddUser;
            }());
            exports_1("SettingsAddUser", SettingsAddUser);
        }
    }
});

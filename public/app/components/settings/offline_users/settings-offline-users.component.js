System.register(['angular2/core', '../../../config', './partials/settings-add-offline-user.component', '../../../services/has-settings-access', 'angular2/router', '../../../services/request.service', '../../../services/settings.service'], function(exports_1, context_1) {
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
    var core_1, config_1, settings_add_offline_user_component_1, has_settings_access_1, router_1, request_service_1, settings_service_1;
    var SettingsOfflineUsers;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (settings_add_offline_user_component_1_1) {
                settings_add_offline_user_component_1 = settings_add_offline_user_component_1_1;
            },
            function (has_settings_access_1_1) {
                has_settings_access_1 = has_settings_access_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            }],
        execute: function() {
            SettingsOfflineUsers = (function () {
                function SettingsOfflineUsers(request, settingsSrvc) {
                    var _this = this;
                    this.request = request;
                    this.settingsSrvc = settingsSrvc;
                    // staffArray = [
                    //     {
                    //         type: { id: 1, value: '司机' },
                    //         data: [
                    //             {
                    //                 an: '601',
                    //                 name: '刘强',
                    //                 addr: '----',
                    //                 phone: '13987226225',
                    //                 ap: '1******6',
                    //                 p: '1' //permission
                    //             },
                    //             {
                    //                 an: '602',
                    //                 name: '徐某某',
                    //                 addr: '----',
                    //                 phone: '18987226225',
                    //                 ap: '1******6',
                    //                 p: '1' //permission
                    //             },
                    //             {
                    //                 an: '603',
                    //                 name: '高阳',
                    //                 addr: '----',
                    //                 phone: '17987226228',
                    //                 ap: '1******6',
                    //                 p: '1' //permission
                    //             },
                    //             {
                    //                 an: '604',
                    //                 name: '高琳',
                    //                 addr: '----',
                    //                 phone: '13987226228',
                    //                 ap: '1******6',
                    //                 p: '1' //permission
                    //             }
                    //         ]
                    //     },
                    //     {
                    //         type: { id: 2, value: '押运员' },
                    //         data: [
                    //             {
                    //                 an: '801',
                    //                 name: '徐国龙',
                    //                 addr: '----',
                    //                 phone: '13987226223',
                    //                 ap: '1******6',
                    //                 p: '2' //permission
                    //             },
                    //             {
                    //                 an: '802',
                    //                 name: '宋红',
                    //                 addr: '----',
                    //                 phone: '14987226225',
                    //                 ap: '1******6',
                    //                 p: '2' //permission
                    //             },
                    //             {
                    //                 an: '803',
                    //                 name: '高阳',
                    //                 addr: '----',
                    //                 phone: '17987226228',
                    //                 ap: '1******6',
                    //                 p: '2' //permission
                    //             },
                    //             {
                    //                 an: '804',
                    //                 name: '梁凯',
                    //                 addr: '----',
                    //                 phone: '1392226228',
                    //                 ap: '1******6',
                    //                 p: '2' //permission
                    //             }
                    //         ]
                    //     }
                    // ];
                    this.currentSort = 'all';
                    this.selectedtab = 1;
                    this.staffArray = [];
                    console.log("Settings Offline users is up and running");
                    var self = this;
                    this.request.get("/users/offline").subscribe(function (res) {
                        console.log("got response--", res);
                        if (res.pl && res.pl.users) {
                            _this.users = res.pl.users;
                        }
                        console.log("got users--", _this.users);
                        var groupUsersObj = _.groupBy(_this.users, 'ap');
                        [6, 8].forEach(function (key) {
                            if (config_1.config.usersPrivileges[key + '']) {
                                var group = { type: { id: key, value: config_1.config.usersPrivileges[key + ''] }, data: groupUsersObj[key] || [] };
                                self.staffArray.push(group);
                            }
                        });
                        _this.settingsSrvc.newUserAdded$.subscribe(function (newUser) {
                            console.log("here is the new user----", newUser);
                            var correspondingGroup = _.find(self.staffArray, function (o) {
                                return o.type.id == newUser.ap;
                            });
                            if (correspondingGroup) {
                                correspondingGroup.data.unshift(newUser);
                            }
                        });
                        _this.settingsSrvc.userUpdated$.subscribe(function (user) {
                            console.log("here is the updated user----", user);
                        });
                        _this.initUi();
                        // console.log("key by", self.staffArray)
                    });
                }
                SettingsOfflineUsers.prototype.veSortBy = function (which) {
                    var _this = this;
                    if (this.currentSort != which) {
                        this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
                        setTimeout(function (_) {
                            _this.currentSort = which;
                            _this.initUi();
                        }, 100);
                    }
                };
                SettingsOfflineUsers.prototype.initUi = function () {
                    var _this = this;
                    setTimeout(function (_) {
                        jQuery('.modal-trigger').leanModal({
                            dismissible: true,
                            opacity: .5,
                            in_duration: 300,
                            out_duration: 200,
                            ready: function () { console.log('Ready'); _this.initSelect(); },
                            complete: function () { console.log('Closed'); } // Callback for Modal close
                        });
                        jQuery('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                    });
                };
                ;
                SettingsOfflineUsers.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                ;
                SettingsOfflineUsers = __decorate([
                    core_1.Component({
                        selector: 'settings-address',
                        templateUrl: config_1.config.prefix + '/components/settings/offline_users/settings-offline-users.component.html',
                        directives: [settings_add_offline_user_component_1.SettingsAddOfflineUser]
                    }),
                    router_1.CanActivate(function (to, from) {
                        return has_settings_access_1.hasSettingsAcess(); //working fine.ignore red line warning
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService, settings_service_1.SettingsService])
                ], SettingsOfflineUsers);
                return SettingsOfflineUsers;
            }());
            exports_1("SettingsOfflineUsers", SettingsOfflineUsers);
        }
    }
});

System.register(['@angular/core', '../../../config', '../../../services/request.service', '../../../services/settings.service'], function(exports_1, context_1) {
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
    var SettingsAccess;
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
            SettingsAccess = (function () {
                function SettingsAccess(request, settingsSrvc) {
                    var _this = this;
                    this.request = request;
                    this.settingsSrvc = settingsSrvc;
                    // userArray:any[] = [
                    //           {
                    //             type:{id:1,value:'管理层'}, // 管理层
                    //             data:[
                    //               {
                    //                 an:'101',  //account number
                    //                 name: '胡某某',
                    //                 addr:'----',
                    //                 phone:'13987226225',
                    //                 ap:'1******6',  // account password
                    //                 p:'1', //permission
                    //                 sex:0
                    //               },
                    //               {
                    //                 an:'102',  //account number
                    //                 name: '徐某某',
                    //                 addr:'----',
                    //                 phone:'18987226225',
                    //                 ap:'1******6',  // account password
                    //                 p:'1', //permission
                    //                 sex:1
                    //               },
                    //               {
                    //                 an:'103',  //account number
                    //                 name: '高阳',
                    //                 addr:'----',
                    //                 phone:'17987226228',
                    //                 ap:'1******6',  // account password
                    //                 p:'1', //permission
                    //                 sex:0
                    //               },
                    //               {
                    //                 an:'104',  //account number
                    //                 name: '高琳',
                    //                 addr:'----',
                    //                 phone:'13987226228',
                    //                 ap:'1******6',  // account password
                    //                 p:'1', //permission
                    //                 sex:1
                    //               }
                    //             ]
                    //           },
                    //           {
                    //             type:{id:2,value:'监管员'},
                    //             data:[
                    //               {
                    //                 an:'201',  //account number
                    //                 name: '韩丽',
                    //                 addr:'----',
                    //                 phone:'13987226223',
                    //                 ap:'1******6',  // account password
                    //                 p:'2' //permission
                    //               },
                    //               {
                    //                 an:'202',  //account number
                    //                 name: '宋红',
                    //                 addr:'----',
                    //                 phone:'14987226225',
                    //                 ap:'1******6',  // account password
                    //                 p:'2' //permission
                    //               },
                    //               {
                    //                 an:'203',  //account number
                    //                 name: '高阳',
                    //                 addr:'----',
                    //                 phone:'17987226228',
                    //                 ap:'1******6',  // account password
                    //                 p:'2' //permission
                    //               },
                    //               {
                    //                 an:'204',  //account number
                    //                 name: '梁凯',
                    //                 addr:'----',
                    //                 phone:'1392226228',
                    //                 ap:'1******6',  // account password
                    //                 p:'2' //permission
                    //               }
                    //             ]
                    //           },
                    //           {
                    //             type:{id:3,value:'调度员'},
                    //             data:[
                    //               {
                    //                 an:'301',  //account number
                    //                 name: '赵敏',
                    //                 addr:'----',
                    //                 phone:'13987226223',
                    //                 ap:'1******6',  // account password
                    //                 p:'3' //permission
                    //               },
                    //               {
                    //                 an:'302',  //account number
                    //                 name: '孔德',
                    //                 addr:'----',
                    //                 phone:'13987226225',
                    //                 ap:'1******6',  // account password
                    //                 p:'3' //permission
                    //               }
                    //             ]
                    //           },
                    //           {
                    //             type:{id:4,value:'客户'},
                    //             data:[
                    //               {
                    //                 an:'401',  //account number
                    //                 name: 'Candy',
                    //                 addr:'----',
                    //                 phone:'13987226223',
                    //                 ap:'1******6',  // account password
                    //                 p:'4' //permission
                    //               },
                    //               {
                    //                 an:'402',  //account number
                    //                 name: '周璐',
                    //                 addr:'----',
                    //                 phone:'18987226003',
                    //                 ap:'1******6',  // account password
                    //                 p:'4' //permission
                    //               },
                    //               {
                    //                 an:'403',  //account number
                    //                 name: '黄金红',
                    //                 addr:'----',
                    //                 phone:'13937722609',
                    //                 ap:'1******6',  // account password
                    //                 p:'4' //permission
                    //               }
                    //             ]
                    //           }
                    //
                    // ];
                    this.userArray = [];
                    this.currentSort = 'all';
                    this.selectedtab = 0;
                    var self = this;
                    console.log("SettingsAccess is up and running");
                    this.request.get("/users/access.json").subscribe(function (res) {
                        console.log("got response--", res);
                        if (res.pl && res.pl.users) {
                            _this.users = res.pl.users;
                        }
                        console.log("got users--", _this.users);
                        var groupUsersObj = _.groupBy(_this.users, 'ap');
                        [1, 2, 3, 4].forEach(function (key) {
                            if (config_1.config.usersPrivileges[key + '']) {
                                var group = { type: { id: key, value: config_1.config.usersPrivileges[key + ''] }, data: groupUsersObj[key] || [] };
                                self.userArray.push(group);
                            }
                        });
                        _this.settingsSrvc.newUserAdded$.subscribe(function (newUser) {
                            console.log("here is the new user----", newUser);
                            var correspondingGroup = _.find(self.userArray, function (o) {
                                return o.type.id == newUser.ap;
                            });
                            if (correspondingGroup) {
                                correspondingGroup.data.unshift(newUser);
                                self.initModal();
                            }
                        });
                        _this.settingsSrvc.userUpdated$.subscribe(function (user) {
                            console.log("here is the updated user----", user);
                        });
                        _this.initUi();
                        // console.log("key by", self.userArray)
                    });
                }
                SettingsAccess.prototype.veSortBy = function (wich) {
                    var _this = this;
                    if (this.currentSort != wich) {
                        this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
                        setTimeout(function (_) {
                            _this.currentSort = wich;
                            _this.initUi();
                        }, 100);
                    }
                };
                SettingsAccess.prototype.initUi = function () {
                    this.initCollapase();
                    this.initModal();
                };
                SettingsAccess.prototype.initCollapase = function () {
                    setTimeout(function (_) {
                        jQuery('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                    });
                };
                SettingsAccess.prototype.initModal = function () {
                    var that = this;
                    setTimeout(function (_) {
                        jQuery('.modal-trigger').leanModal({
                            dismissible: true,
                            opacity: .5,
                            in_duration: 300,
                            out_duration: 200,
                            ready: function () { console.log('Ready'); that.initSelect(); },
                            complete: function () { console.log('Closed'); } // Callback for Modal close
                        });
                    });
                };
                SettingsAccess.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                SettingsAccess = __decorate([
                    core_1.Component({
                        selector: 'settings-access',
                        templateUrl: config_1.config.prefix + '/components/settings/access/settings-access.component.html',
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService, settings_service_1.SettingsService])
                ], SettingsAccess);
                return SettingsAccess;
            }());
            exports_1("SettingsAccess", SettingsAccess);
        }
    }
});

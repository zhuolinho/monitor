System.register(['angular2/core', '../../../config', './partials/settings-add-user.component'], function(exports_1, context_1) {
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
    var core_1, config_1, settings_add_user_component_1;
    var SettingsAccess;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (settings_add_user_component_1_1) {
                settings_add_user_component_1 = settings_add_user_component_1_1;
            }],
        execute: function() {
            SettingsAccess = (function () {
                function SettingsAccess() {
                    this.userArray = [
                        {
                            type: { id: 1, value: '管理层' },
                            data: [
                                {
                                    an: '101',
                                    name: '胡某某',
                                    addr: '----',
                                    phone: '13987226225',
                                    ap: '1******6',
                                    p: '1' //permission
                                },
                                {
                                    an: '102',
                                    name: '徐某某',
                                    addr: '----',
                                    phone: '18987226225',
                                    ap: '1******6',
                                    p: '1' //permission
                                },
                                {
                                    an: '103',
                                    name: '高阳',
                                    addr: '----',
                                    phone: '17987226228',
                                    ap: '1******6',
                                    p: '1' //permission
                                },
                                {
                                    an: '104',
                                    name: '高琳',
                                    addr: '----',
                                    phone: '13987226228',
                                    ap: '1******6',
                                    p: '1' //permission
                                }
                            ]
                        },
                        {
                            type: { id: 2, value: '接警员' },
                            data: [
                                {
                                    an: '201',
                                    name: '韩丽',
                                    addr: '----',
                                    phone: '13987226223',
                                    ap: '1******6',
                                    p: '2' //permission
                                },
                                {
                                    an: '202',
                                    name: '宋红',
                                    addr: '----',
                                    phone: '14987226225',
                                    ap: '1******6',
                                    p: '2' //permission
                                },
                                {
                                    an: '203',
                                    name: '高阳',
                                    addr: '----',
                                    phone: '17987226228',
                                    ap: '1******6',
                                    p: '2' //permission
                                },
                                {
                                    an: '204',
                                    name: '梁凯',
                                    addr: '----',
                                    phone: '1392226228',
                                    ap: '1******6',
                                    p: '2' //permission
                                }
                            ]
                        },
                        {
                            type: { id: 3, value: '配送员' },
                            data: [
                                {
                                    an: '301',
                                    name: '赵敏',
                                    addr: '----',
                                    phone: '13987226223',
                                    ap: '1******6',
                                    p: '3' //permission
                                },
                                {
                                    an: '302',
                                    name: '孔德',
                                    addr: '----',
                                    phone: '13987226225',
                                    ap: '1******6',
                                    p: '3' //permission
                                }
                            ]
                        },
                        {
                            type: { id: 4, value: '客户' },
                            data: [
                                {
                                    an: '401',
                                    name: 'Candy',
                                    addr: '----',
                                    phone: '13987226223',
                                    ap: '1******6',
                                    p: '4' //permission
                                },
                                {
                                    an: '401',
                                    name: '周璐',
                                    addr: '----',
                                    phone: '18987226003',
                                    ap: '1******6',
                                    p: '4' //permission
                                },
                                {
                                    an: '401',
                                    name: '黄金红',
                                    addr: '----',
                                    phone: '13937722609',
                                    ap: '1******6',
                                    p: '4' //permission
                                }
                            ]
                        }
                    ];
                    this.currentSort = 'all';
                    this.selectedtab = 0;
                    console.log("SettingsAccess is up and running");
                    this.initUi();
                }
                SettingsAccess.prototype.veSortByClient = function () {
                    if (this.currentSort != '4') {
                        this.currentSort = '4';
                    }
                };
                SettingsAccess.prototype.veSortByDeliveryStaff = function () {
                    if (this.currentSort != '3') {
                        this.currentSort = '3';
                    }
                };
                SettingsAccess.prototype.veSortByAlertHandler = function () {
                    if (this.currentSort != '2') {
                        this.currentSort = '2';
                    }
                };
                SettingsAccess.prototype.veSortByAdmin = function () {
                    if (this.currentSort != '1') {
                        this.currentSort = '1';
                    }
                };
                SettingsAccess.prototype.initUi = function () {
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
                SettingsAccess.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                SettingsAccess = __decorate([
                    core_1.Component({
                        selector: 'settings-access',
                        templateUrl: config_1.config.prefix + '/components/settings/access/settings-access.component.html',
                        directives: [settings_add_user_component_1.SettingsAddUser]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SettingsAccess);
                return SettingsAccess;
            }());
            exports_1("SettingsAccess", SettingsAccess);
        }
    }
});

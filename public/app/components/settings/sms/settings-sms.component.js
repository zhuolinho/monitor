System.register(['@angular/core', '../../../config'], function(exports_1, context_1) {
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
    var SettingsSms;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            SettingsSms = (function () {
                function SettingsSms() {
                    this.userArray = [
                        {
                            type: { id: 1, value: '报警短信' },
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
                            type: { id: 2, value: '接警短信' },
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
                            type: { id: 3, value: '配送短信' },
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
                            type: { id: 4, value: '到达短信' },
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
                    this.editMode = false;
                    console.log("SettingsSms is up and running");
                    this.initUi();
                }
                SettingsSms.prototype.veSortBy = function (wich) {
                    var _this = this;
                    if (this.currentSort != wich) {
                        this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
                        setTimeout(function (_) {
                            _this.currentSort = wich;
                            _this.initUi();
                        }, 100);
                    }
                };
                SettingsSms.prototype.showDetailModal = function (arg) {
                    console.log("selected item----", arg);
                    var that = this;
                    if (arg.user) {
                        this.editMode = true;
                        this.editTarget = arg.user;
                    }
                    else {
                        this.editMode = false;
                        this.editTarget = null;
                    }
                    this.smsType = arg.type;
                    jQuery("#settingsSmsDetailsModal").openModal({
                        ready: function () {
                            that.initSelect();
                        }
                    });
                };
                SettingsSms.prototype.closeDetailModal = function () {
                    jQuery("#settingsSmsDetailsModal").closeModal();
                };
                SettingsSms.prototype.initUi = function () {
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
                SettingsSms.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                SettingsSms = __decorate([
                    core_1.Component({
                        selector: 'settings-sms',
                        templateUrl: config_1.config.prefix + '/components/settings/sms/settings-sms.component.html',
                    }), 
                    __metadata('design:paramtypes', [])
                ], SettingsSms);
                return SettingsSms;
            }());
            exports_1("SettingsSms", SettingsSms);
        }
    }
});

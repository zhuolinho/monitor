System.register(['angular2/core', '../../../config', './partials/settings-add-address-user.component', '../../../services/has-settings-access', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, config_1, settings_add_address_user_component_1, has_settings_access_1, router_1;
    var SettingsAddress;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (settings_add_address_user_component_1_1) {
                settings_add_address_user_component_1 = settings_add_address_user_component_1_1;
            },
            function (has_settings_access_1_1) {
                has_settings_access_1 = has_settings_access_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            SettingsAddress = (function () {
                function SettingsAddress() {
                    this.addressArray = [
                        {
                            type: { id: 1, value: 'CNG' },
                            data: [
                                {
                                    code: 'C001',
                                    addr: '闸北区天目东路111号XX站',
                                    plcaddr: '192.167.0.1'
                                },
                                {
                                    code: 'C002',
                                    addr: '闸北区天目东路111号XXX站',
                                    plcaddr: '192.167.1.2'
                                },
                                {
                                    code: 'C003',
                                    addr: '闸北区天目东路111号XX站',
                                    plcaddr: '192.167.1.3'
                                }
                            ]
                        },
                        {
                            type: { id: 2, value: 'LNG' },
                            data: [
                                {
                                    code: 'L001',
                                    addr: '闸北区沪太路111号XX站',
                                    plcaddr: '192.167.1.8'
                                },
                                {
                                    code: 'L002',
                                    addr: '闸北区沪太路121号XXXX站',
                                    plcaddr: '192.167.1.2'
                                },
                                {
                                    code: 'L003',
                                    addr: '闸北区沪太路222号XXX站',
                                    plcaddr: '192.167.0.3'
                                }
                            ]
                        },
                        {
                            type: { id: 3, value: '小罐' },
                            data: [
                                {
                                    code: 'X001',
                                    addr: '闸北区新闸路55号XX站',
                                    plcaddr: ''
                                },
                                {
                                    code: 'X002',
                                    addr: '闸北区新闸路980号XXXX站',
                                    plcaddr: ''
                                },
                                {
                                    code: 'X003',
                                    addr: '闸北区新闸路201号XX站',
                                    plcaddr: ''
                                }
                            ]
                        },
                        {
                            type: { id: 4, value: '管网' },
                            data: [
                                {
                                    code: 'G001',
                                    addr: '闸北区新闸路55号XX站',
                                    plcaddr: '192.167.1.8'
                                },
                                {
                                    code: 'G002',
                                    addr: '闸北区新闸路980号XXXX站',
                                    plcaddr: '192.167.1.2'
                                },
                                {
                                    code: 'G003',
                                    addr: '闸北区新闸路201号XX站',
                                    plcaddr: '192.167.0.3'
                                }
                            ]
                        }
                    ];
                    this.staffArray = [
                        {
                            type: { id: 1, value: '司机' },
                            data: [
                                {
                                    an: '601',
                                    name: '刘强',
                                    addr: '----',
                                    phone: '13987226225',
                                    ap: '1******6',
                                    p: '1' //permission
                                },
                                {
                                    an: '602',
                                    name: '徐某某',
                                    addr: '----',
                                    phone: '18987226225',
                                    ap: '1******6',
                                    p: '1' //permission
                                },
                                {
                                    an: '603',
                                    name: '高阳',
                                    addr: '----',
                                    phone: '17987226228',
                                    ap: '1******6',
                                    p: '1' //permission
                                },
                                {
                                    an: '604',
                                    name: '高琳',
                                    addr: '----',
                                    phone: '13987226228',
                                    ap: '1******6',
                                    p: '1' //permission
                                }
                            ]
                        },
                        {
                            type: { id: 2, value: '押运员' },
                            data: [
                                {
                                    an: '801',
                                    name: '徐国龙',
                                    addr: '----',
                                    phone: '13987226223',
                                    ap: '1******6',
                                    p: '2' //permission
                                },
                                {
                                    an: '802',
                                    name: '宋红',
                                    addr: '----',
                                    phone: '14987226225',
                                    ap: '1******6',
                                    p: '2' //permission
                                },
                                {
                                    an: '803',
                                    name: '高阳',
                                    addr: '----',
                                    phone: '17987226228',
                                    ap: '1******6',
                                    p: '2' //permission
                                },
                                {
                                    an: '804',
                                    name: '梁凯',
                                    addr: '----',
                                    phone: '1392226228',
                                    ap: '1******6',
                                    p: '2' //permission
                                }
                            ]
                        }
                    ];
                    this.currentSort = 'all';
                    this.currentSubSort = 'all';
                    this.selectedtab = 1;
                    this.selectedsubtab = 0;
                    console.log("SettingsAddress is up and running");
                    this.initUi();
                }
                SettingsAddress.prototype.veSortByAddress = function () {
                    if (this.currentSort != '1') {
                        this.currentSort = '1';
                    }
                    this.currentSubSort = 'all';
                    this.selectedsubtab = 0;
                    this.initUi();
                };
                ;
                SettingsAddress.prototype.veSortByStaff = function () {
                    if (this.currentSort != '2') {
                        this.currentSort = '2';
                    }
                    this.currentSubSort = 'all';
                    this.selectedsubtab = 0;
                    this.initUi();
                };
                ;
                SettingsAddress.prototype.veSortByCng = function () {
                    if (this.currentSubSort != '1') {
                        this.currentSubSort = '1';
                    }
                    this.initUi();
                };
                ;
                SettingsAddress.prototype.veSortByLng = function () {
                    if (this.currentSubSort != '2') {
                        this.currentSubSort = '2';
                    }
                    this.initUi();
                };
                ;
                SettingsAddress.prototype.veSortBySmallTank = function () {
                    if (this.currentSubSort != '3') {
                        this.currentSubSort = '3';
                    }
                    this.initUi();
                };
                ;
                SettingsAddress.prototype.veSortByWebsite = function () {
                    if (this.currentSubSort != '4') {
                        this.currentSubSort = '4';
                    }
                    this.initUi();
                };
                ;
                SettingsAddress.prototype.veSortByGuard = function () {
                    if (this.currentSubSort != '1') {
                        this.currentSubSort = '1';
                    }
                    this.initUi();
                };
                ;
                SettingsAddress.prototype.veSortByDriver = function () {
                    if (this.currentSubSort != '2') {
                        this.currentSubSort = '2';
                    }
                    this.initUi();
                };
                ;
                SettingsAddress.prototype.initUi = function () {
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
                SettingsAddress.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                ;
                SettingsAddress = __decorate([
                    core_1.Component({
                        selector: 'settings-address',
                        templateUrl: config_1.config.prefix + '/components/settings/address/settings-address.component.html',
                        directives: [settings_add_address_user_component_1.SettingsAddAddressUser]
                    }),
                    router_1.CanActivate(function (to, from) {
                        return has_settings_access_1.hasSettingsAcess(); //working fine.ignore red line warning
                    }), 
                    __metadata('design:paramtypes', [])
                ], SettingsAddress);
                return SettingsAddress;
            }());
            exports_1("SettingsAddress", SettingsAddress);
        }
    }
});

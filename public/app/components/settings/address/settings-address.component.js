System.register(['angular2/core', '../../../config', './partials/settings-add-address.component', '../../../services/has-settings-access', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, config_1, settings_add_address_component_1, has_settings_access_1, router_1;
    var SettingsAddress;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (settings_add_address_component_1_1) {
                settings_add_address_component_1 = settings_add_address_component_1_1;
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
                                    addr: '闸北区天目东路112号XXX站',
                                    plcaddr: '192.167.1.2'
                                },
                                {
                                    code: 'C003',
                                    addr: '闸北区天目东路114号XX站',
                                    plcaddr: '192.167.1.3'
                                }
                            ]
                        },
                        {
                            type: { id: 2, value: 'LNG' },
                            data: [
                                {
                                    code: 'L001',
                                    addr: '闸北区沪太路113号XX站',
                                    plcaddr: '192.167.1.8'
                                },
                                {
                                    code: 'L002',
                                    addr: '闸北区沪太路121号XXXX站',
                                    plcaddr: '192.167.1.2'
                                },
                                {
                                    code: 'L003',
                                    addr: '闸北区沪太路220号XXX站',
                                    plcaddr: '192.167.0.3'
                                }
                            ]
                        },
                        {
                            type: { id: 3, value: '集格' },
                            data: [
                                {
                                    code: 'J001',
                                    addr: '闸北区新闸路55号XX站',
                                    plcaddr: ''
                                },
                                {
                                    code: 'J002',
                                    addr: '闸北区新闸路980号XXXX站',
                                    plcaddr: ''
                                },
                                {
                                    code: 'J003',
                                    addr: '闸北区新闸路201号XX站',
                                    plcaddr: ''
                                }
                            ]
                        },
                        {
                            type: { id: 4, value: '杜瓦瓶' },
                            data: [
                                {
                                    code: 'D011',
                                    addr: '闸北区新闸路77号XX站',
                                    plcaddr: ''
                                },
                                {
                                    code: 'D022',
                                    addr: '闸北区新闸路180号XXXX站',
                                    plcaddr: ''
                                },
                                {
                                    code: 'D013',
                                    addr: '闸北区新闸路331号XX站',
                                    plcaddr: ''
                                }
                            ]
                        },
                        {
                            type: { id: 5, value: '管网' },
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
                        },
                        {
                            type: { id: 6, value: '中转站' },
                            data: [
                                {
                                    code: '总公司',
                                    addr: '闸北区新闸路55号XX站',
                                    plcaddr: ''
                                },
                                {
                                    code: '中转站1号',
                                    addr: '闸北区新闸路180号',
                                    plcaddr: ''
                                },
                                {
                                    code: '中转站2号',
                                    addr: '闸北区新闸路801号',
                                    plcaddr: ''
                                }
                            ]
                        }
                    ];
                    this.currentSort = 'all';
                    this.selectedtab = 1;
                    console.log("SettingsAddress is up and running");
                    this.initUi();
                }
                SettingsAddress.prototype.veSortBy = function (which) {
                    var _this = this;
                    if (this.currentSort != which) {
                        this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
                        setTimeout(function (_) {
                            _this.currentSort = which;
                            _this.initUi();
                        }, 100);
                    }
                };
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
                        directives: [settings_add_address_component_1.SettingsAddAddress]
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

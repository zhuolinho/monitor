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
    var SettingsAddAddress;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            SettingsAddAddress = (function () {
                function SettingsAddAddress() {
                    this.editMode = false;
                    this.lngTanks = [
                        'L004', 'L005', 'L006', 'L007'
                    ];
                    this.cngTanks = [
                        'C004', 'C005', 'C006', 'C007'
                    ];
                    this.jigeTanks = [
                        'J004', 'J005', 'J006', 'J007'
                    ];
                    this.duwapingTanks = [
                        'D004', 'D005', 'D006', 'D007'
                    ];
                    this.guanwangTanks = [
                        'G004', 'G005', 'G006', 'G007'
                    ];
                    this.zhongzhuanTanks = [
                        '中转站3号', '中转站4号', '中转站5号'
                    ];
                    this.currentTanks = [];
                    console.log("add  address modal is up and running---");
                }
                Object.defineProperty(SettingsAddAddress.prototype, "users", {
                    get: function () { return this.data; },
                    set: function (data) {
                        this.data = data;
                        switch (data.addresses.type.value) {
                            case 'CNG':
                                this.currentTanks = this.cngTanks;
                                break;
                            case 'LNG':
                                this.currentTanks = this.lngTanks;
                                break;
                            case '集格':
                                this.currentTanks = this.jigeTanks;
                                break;
                            case '杜瓦瓶':
                                this.currentTanks = this.duwapingTanks;
                                break;
                            case '管网':
                                this.currentTanks = this.guanwangTanks;
                                break;
                            case '中转站':
                                this.currentTanks = this.zhongzhuanTanks;
                                break;
                            default:
                                console.log('default');
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                SettingsAddAddress.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                __decorate([
                    core_1.Input('data'), 
                    __metadata('design:type', Object), 
                    __metadata('design:paramtypes', [Object])
                ], SettingsAddAddress.prototype, "users", null);
                SettingsAddAddress = __decorate([
                    core_1.Component({
                        selector: 'settings-add-address',
                        templateUrl: config_1.config.prefix + '/components/settings/address/partials/settings-add-address.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], SettingsAddAddress);
                return SettingsAddAddress;
            }());
            exports_1("SettingsAddAddress", SettingsAddAddress);
        }
    }
});

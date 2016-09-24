System.register(['@angular/core', '../../../config', '../../../services/settings.service', '../../../services/request.service'], function(exports_1, context_1) {
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
    var core_1, config_1, settings_service_1, request_service_1;
    var SettingsAddress;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            }],
        execute: function() {
            SettingsAddress = (function () {
                function SettingsAddress(settingsSrvc, request) {
                    var _this = this;
                    this.settingsSrvc = settingsSrvc;
                    this.request = request;
                    this.currentSort = 'all';
                    this.selectedtab = 1;
                    this.addressArray = [];
                    console.log("SettingsAddress is up and running");
                    var self = this;
                    this.request.get("/plc/address/all.json").subscribe(function (res) {
                        console.log("got response--", res);
                        if (res.pl && res.pl.address) {
                            _this.addresses = res.pl.address;
                        }
                        var groupAddressesObj = _.groupBy(_this.addresses, 'at');
                        console.log("groupaddressesObj--", groupAddressesObj);
                        config_1.config.addresses.forEach(function (key, index) {
                            var group = { type: { id: index + 1, value: key }, data: groupAddressesObj[key] || [] };
                            self.addressArray.push(group);
                        });
                        _this.settingsSrvc.newAddressAdded$.subscribe(function (newAddr) {
                            console.log("here is the new newAddr----", newAddr);
                            var correspondingGroup = _.find(self.addressArray, function (o) {
                                return o.type.value == newAddr.at;
                            });
                            if (correspondingGroup) {
                                correspondingGroup.data.unshift(newAddr);
                                self.initModal();
                            }
                        });
                        _this.settingsSrvc.addressUpdated$.subscribe(function (addr) {
                            console.log("here is the updated addr----", addr);
                        });
                        _this.initUi();
                        // console.log("key by", self.userArray)
                    });
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
                    this.initCollapase();
                    this.initModal();
                };
                SettingsAddress.prototype.initCollapase = function () {
                    setTimeout(function (_) {
                        jQuery('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                    });
                };
                SettingsAddress.prototype.initModal = function () {
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
                SettingsAddress.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                SettingsAddress = __decorate([
                    core_1.Component({
                        selector: 'settings-address',
                        templateUrl: config_1.config.prefix + '/components/settings/address/settings-address.component.html',
                    }), 
                    __metadata('design:paramtypes', [settings_service_1.SettingsService, request_service_1.RequestService])
                ], SettingsAddress);
                return SettingsAddress;
            }());
            exports_1("SettingsAddress", SettingsAddress);
        }
    }
});

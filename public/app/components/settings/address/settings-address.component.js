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
                    this.editMode = false;
                    this.newAddress = {
                        code: '',
                        cn: '',
                        addr: '',
                        at: '',
                        plcaddr1: '',
                        plcaddr2: ''
                    };
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
                SettingsAddress.prototype.showDetailModal = function (arg) {
                    console.log("selected item----", arg);
                    var that = this;
                    if (arg.addr) {
                        this.editMode = true;
                        this.editTarget = arg.addr;
                    }
                    else {
                        this.editMode = false;
                        this.editTarget = null;
                        this.newAddress.at = arg.addressType;
                    }
                    this.addressType = arg.addressType;
                    jQuery("#settinsAddressDetailModal").openModal({
                        ready: function () {
                            that.initSelect();
                        }
                    });
                };
                SettingsAddress.prototype.closeDetailModal = function () {
                    jQuery("#settinsAddressDetailModal").closeModal();
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
                    var that = this;
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                        jQuery('select#plcAddr1').on('change', function (event) {
                            that.veSelecedPlcAddr1(event, that);
                        });
                        jQuery('select#plcAddr2').on('change', function (event) {
                            that.veSelecedPlcAddr2(event, that);
                        });
                    });
                };
                SettingsAddress.prototype.addNewAddress = function () {
                    var _this = this;
                    console.log("posting ----", this.newAddress);
                    this.request.post('/plc/address.json', this.newAddress).subscribe(function (res) {
                        console.log("sub comp address added-----", res);
                        _this.closeDetailModal();
                        if (res.pl && res.pl.address) {
                            _this.settingsSrvc.addAddress(res.pl.address);
                        }
                        else {
                            alert("系统错误!");
                        }
                    });
                };
                SettingsAddress.prototype.updateAddress = function () {
                    var _this = this;
                    console.log("posting ----", this.editTarget);
                    this.request.put('/plc/address.json', this.editTarget).subscribe(function (res) {
                        console.log("sub comp address updated-----", res);
                        _this.closeDetailModal();
                        if (res.pl && res.pl.address) {
                            _this.settingsSrvc.updateAddress(res.pl.address);
                        }
                        else {
                            alert("系统错误!");
                        }
                    });
                };
                SettingsAddress.prototype.veSelecedPlcAddr1 = function (event, compRef) {
                    if (event && event.target && event.target.value) {
                        if (!compRef.editTarget) {
                            compRef.newAddress.plcaddr1 = event.target.value;
                        }
                        else {
                            compRef.editTarget.plcaddr1 = event.target.value;
                        }
                    }
                    compRef.initSelect();
                };
                SettingsAddress.prototype.veSelecedPlcAddr2 = function (event, compRef) {
                    if (event && event.target && event.target.value) {
                        if (!compRef.editTarget) {
                            compRef.newAddress.plcaddr2 = event.target.value;
                        }
                        else {
                            compRef.editTarget.plcaddr2 = event.target.value;
                        }
                        compRef.initSelect();
                    }
                };
                SettingsAddress.prototype.setCurrentTanks = function (addressType) {
                    switch (addressType) {
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

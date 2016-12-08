System.register(["@angular/core", "../../../config", "../../../services/settings.service", "../../../services/request.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, config_1, settings_service_1, request_service_1, SettingsAddress, plcAddress;
    return {
        setters: [
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
            }
        ],
        execute: function () {
            // @CanActivate((to, from) => {
            //   return hasSettingsAcess();  //working fine.ignore red line warning
            // })
            SettingsAddress = (function () {
                function SettingsAddress(settingsSrvc, request) {
                    var _this = this;
                    this.settingsSrvc = settingsSrvc;
                    this.request = request;
                    this.testPlcs = [
                        {
                            "_id": "5810d7cfa7d1a71e69621e6b",
                            "muID": "system",
                            "cuID": "system",
                            "oID": "10000000001",
                            "cd": "2016-10-27 00:20:31",
                            "y": "2016",
                            "m": "10",
                            "d": "27",
                            "dct": "2016-10-27 0:5:2",
                            "cdct": "2016-10-27 0:5:23",
                            "addr1": "0",
                            "iwc1": "0",
                            "isc1": "0",
                            "p1": "0",
                            "temp1": "0",
                            "pwc1": "0",
                            "psc1": "0",
                            "rsc1": "0",
                            "cf1": "1",
                            "er1": "0",
                            "addr2": "3",
                            "iwc2": "13.8",
                            "isc2": "55.1",
                            "p2": "398.1",
                            "temp2": "17.5",
                            "pwc2": "164633.0",
                            "psc2": "2522930.0",
                            "rsc2": "61.0",
                            "cf2": "0",
                            "er2": "0",
                            "tank": "L001",
                            "__v": 0
                        },
                        {
                            "_id": "5810d7cfa7d1a71e69621e6c",
                            "muID": "system",
                            "cuID": "system",
                            "oID": "10000000001",
                            "cd": "2016-10-27 00:20:31",
                            "y": "2016",
                            "m": "10",
                            "d": "27",
                            "dct": "2016-10-27 0:5:2",
                            "cdct": "2016-10-27 0:4:32",
                            "addr1": "2",
                            "iwc1": "0",
                            "isc1": "0",
                            "p1": "365.7",
                            "temp1": "22.6",
                            "pwc1": "346385.0",
                            "psc1": "6374181.0",
                            "rsc1": "653.0",
                            "cf1": "0",
                            "er1": "0",
                            "addr2": "0",
                            "iwc2": "0",
                            "isc2": "0",
                            "p2": "0",
                            "temp2": "0",
                            "pwc2": "0",
                            "psc2": "0",
                            "rsc2": "0",
                            "cf2": "1",
                            "er2": "0",
                            "tank": "L002",
                            "__v": 0
                        },
                        {
                            "_id": "5810d7cfa7d1a71e69621e6d",
                            "muID": "system",
                            "cuID": "system",
                            "oID": "10000000001",
                            "cd": "2016-10-27 00:20:31",
                            "y": "2016",
                            "m": "10",
                            "d": "27",
                            "dct": "2016-10-27 0:5:2",
                            "cdct": "2016-10-27 0:5:27",
                            "addr1": "2",
                            "iwc1": "28.2",
                            "isc1": "107",
                            "p1": "372.0",
                            "temp1": "23.2",
                            "pwc1": "37889.0",
                            "psc1": "1649238.0",
                            "rsc1": "0",
                            "cf1": "0",
                            "er1": "0",
                            "addr2": "0",
                            "iwc2": "0",
                            "isc2": "0",
                            "p2": "0",
                            "temp2": "0",
                            "pwc2": "0",
                            "psc2": "0",
                            "rsc2": "0",
                            "cf2": "1",
                            "er2": "0",
                            "tank": "L003",
                            "__v": 0
                        },
                        {
                            "_id": "5810d7cfa7d1a71e69621e6e",
                            "muID": "system",
                            "cuID": "system",
                            "oID": "10000000001",
                            "cd": "2016-10-27 00:20:31",
                            "y": "2016",
                            "m": "10",
                            "d": "27",
                            "dct": "2016-10-27 0:5:2",
                            "cdct": "2016-10-26 11:26:9",
                            "addr1": "0",
                            "iwc1": "0",
                            "isc1": "0",
                            "p1": "0",
                            "temp1": "0",
                            "pwc1": "0",
                            "psc1": "0",
                            "rsc1": "0",
                            "cf1": "1",
                            "er1": "0",
                            "addr2": "0",
                            "iwc2": "0",
                            "isc2": "0",
                            "p2": "0",
                            "temp2": "0",
                            "pwc2": "0",
                            "psc2": "0",
                            "rsc2": "0",
                            "cf2": "1",
                            "er2": "0",
                            "tank": "L004",
                            "__v": 0
                        },
                        {
                            "_id": "5810d7cfa7d1a71e69621e6f",
                            "muID": "system",
                            "cuID": "system",
                            "oID": "10000000001",
                            "cd": "2016-10-27 00:20:31",
                            "y": "2016",
                            "m": "10",
                            "d": "27",
                            "dct": "2016-10-27 0:5:2",
                            "cdct": "2016-10-27 0:5:10",
                            "addr1": "2",
                            "iwc1": "83.5",
                            "isc1": "298",
                            "p1": "362.9",
                            "temp1": "21.1",
                            "pwc1": "605653.0",
                            "psc1": "12117552.0",
                            "rsc1": "545.0",
                            "cf1": "0",
                            "er1": "0",
                            "addr2": "3",
                            "iwc2": "0",
                            "isc2": "0",
                            "p2": "97.9",
                            "temp2": "20.3",
                            "pwc2": "0",
                            "psc2": "141222.0",
                            "rsc2": "0",
                            "cf2": "0",
                            "er2": "0",
                            "tank": "L005",
                            "__v": 0
                        },
                        {
                            "_id": "5810d7cfa7d1a71e69621e78",
                            "muID": "system",
                            "cuID": "system",
                            "oID": "10000000001",
                            "cd": "2016-10-27 00:20:31",
                            "y": "2016",
                            "m": "10",
                            "d": "27",
                            "dct": "2016-10-27 0:5:2",
                            "cdct": "2016-10-26 14:51:52",
                            "addr1": "0",
                            "iwc1": "0",
                            "isc1": "0",
                            "p1": "0",
                            "temp1": "0",
                            "pwc1": "0",
                            "psc1": "0",
                            "rsc1": "0",
                            "cf1": "1",
                            "er1": "0",
                            "addr2": "0",
                            "iwc2": "0",
                            "isc2": "0",
                            "p2": "0",
                            "temp2": "0",
                            "pwc2": "0",
                            "psc2": "0",
                            "rsc2": "0",
                            "cf2": "1",
                            "er2": "0",
                            "tank": "L014",
                            "__v": 0
                        },
                        {
                            "_id": "5810d7cfa7d1a71e69621e7b",
                            "muID": "system",
                            "cuID": "system",
                            "oID": "10000000001",
                            "cd": "2016-10-27 00:20:31",
                            "y": "2016",
                            "m": "10",
                            "d": "27",
                            "dct": "2016-10-27 0:5:2",
                            "cdct": "2016-10-27 0:5:19",
                            "addr1": "2",
                            "iwc1": "28.0",
                            "isc1": "103",
                            "p1": "372.6",
                            "temp1": "22.9",
                            "pwc1": "460190.0",
                            "psc1": "7104624.0",
                            "rsc1": "0",
                            "cf1": "0",
                            "er1": "0",
                            "addr2": "3",
                            "iwc2": "0",
                            "isc2": "0",
                            "p2": "94.6",
                            "temp2": "22.8",
                            "pwc2": "22693.0",
                            "psc2": "440.0",
                            "rsc2": "334.0",
                            "cf2": "0",
                            "er2": "0",
                            "tank": "L017",
                            "__v": 0
                        }
                    ];
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
                    this.plcAddrTanks = [];
                    this.targetTanks = [];
                    this.newAddress = new plcAddress();
                    console.log("SettingsAddress is up and running");
                    var self = this;
                    this.request.get("/plc/address/all.json").subscribe(function (res) {
                        console.log("got response--", res);
                        if (res.pl && res.pl.address) {
                            _this.addresses = res.pl.address;
                        }
                        _this._processAddr(_this.addresses);
                        _this.initUi();
                        // console.log("key by", self.userArray)
                    });
                    this.request.get('/plc/latest.json').subscribe(function (resp) {
                        console.log("latest plc-----", resp);
                        if (resp && resp.pl && resp.pl.plc) {
                            _this.plcAddrTanks = _.map(resp.pl.plc, function (plc) {
                                return plc;
                            });
                            _this.targetTanks = _this.plcAddrTanks;
                            console.log('got this.plcAddrTanks ', _this.plcAddrTanks);
                        }
                    });
                }
                SettingsAddress.prototype._processAddr = function (addr) {
                    var that = this;
                    var groupAddressesObj = _.groupBy(addr, 'at');
                    console.log("groupaddressesObj--", groupAddressesObj);
                    config_1.config.addresses.forEach(function (key, index) {
                        var group = { type: { id: index + 1, value: key }, data: groupAddressesObj[key.en] || [] };
                        that.addressArray.push(group);
                    });
                };
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
                    console.log("selected item----", arg, this.plcAddrTanks);
                    var that = this;
                    if (arg.addr) {
                        this.editMode = true;
                        this.editTarget = arg.addr;
                        jQuery('select#plcAddrTank').val(this.editTarget.tank);
                        jQuery('select#plcAddrTank').attr('disabled', 'disabled');
                    }
                    else {
                        this.editMode = false;
                        this.editTarget = null;
                        this.newAddress = new plcAddress();
                        this.newAddress.at = arg.addressType.en;
                        this.targetTanks = _.find(this.plcAddrTanks, function (plc) {
                            return plc.plcType == arg.addressType.en;
                        });
                        console.log("targetTanks----", this.targetTanks);
                        jQuery('select#plcAddrTank').val(null);
                        jQuery('select#plcAddrTank').attr('disabled', null);
                    }
                    this.addressType = arg.addressType.cn;
                    console.log("this.addressType ----", this.addressType);
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
                        jQuery('select#plcAddrTank').on('change', function (event) {
                            that.veSelecedPlcTank(event, that);
                        });
                        jQuery('select#plcip1').on('change', function (event) {
                            that.veSelecedplcip1(event, that);
                        });
                        jQuery('select#plcip2').on('change', function (event) {
                            that.veSelecedplcip2(event, that);
                        });
                    });
                };
                SettingsAddress.prototype.addNewAddress = function () {
                    var _this = this;
                    console.log("posting ----", this.newAddress);
                    if (this.newAddress.tank) {
                        this.request.post('/plc/address.json', this.newAddress).subscribe(function (res) {
                            if (res.pl && res.pl.address) {
                                console.log('added new addr----', res.pl.address);
                                // var group = {type:{id:index+1,value:key},data:groupAddressesObj[key]||[]};
                                // that.addressArray.push(group);
                                var addrGroup = _.find(_this.addressArray, function (addrGrp) {
                                    return addrGrp.type.value.en == res.pl.address.at;
                                });
                                addrGroup.data.unshift(res.pl.address);
                                // this.settingsSrvc.addAddress(res.pl.address);
                                jQuery("#settinsAddressDetailModal").closeModal();
                            }
                            else {
                                alert("系统错误!");
                            }
                        });
                    }
                    else {
                        alert("请选择plc");
                    }
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
                SettingsAddress.prototype.veSelecedPlcTank = function (event, compRef) {
                    if (event && event.target && event.target.value) {
                        compRef.newAddress.tank = event.target.value;
                    }
                    compRef.initSelect();
                };
                // veSelecedplcip1(event, compRef){
                //   if(event && event.target && event.target.value){
                //     if(!compRef.editTarget){
                //           compRef.newAddress.plcip1 = event.target.value;
                //     }
                //     else{
                //           compRef.editTarget.plcip1 = event.target.value;
                //     }
                //   }
                //   compRef.initSelect();
                // }
                //
                // veSelecedplcip2(event, compRef){
                //   if(event && event.target && event.target.value){
                //     if(!compRef.editTarget){
                //           compRef.newAddress.plcip2 = event.target.value;
                //     }
                //     else{
                //           compRef.editTarget.plcip2 = event.target.value;
                //     }
                //     compRef.initSelect();
                //   }
                // }
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
                return SettingsAddress;
            }());
            SettingsAddress = __decorate([
                core_1.Component({
                    selector: 'settings-address',
                    templateUrl: config_1.config.prefix + '/components/settings/address/settings-address.component.html',
                }),
                __metadata("design:paramtypes", [settings_service_1.SettingsService, request_service_1.RequestService])
            ], SettingsAddress);
            exports_1("SettingsAddress", SettingsAddress);
            plcAddress = (function () {
                function plcAddress() {
                    this.code = '';
                    this.cn = '';
                    this.addr = '';
                    this.at = '';
                    this.plcip1 = '';
                    this.plcip2 = '';
                    this.tank = '';
                }
                return plcAddress;
            }());
            exports_1("plcAddress", plcAddress);
            ;
        }
    };
});

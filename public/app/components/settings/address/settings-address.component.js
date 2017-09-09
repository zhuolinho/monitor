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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../../../config");
// import {SettingsAddAddress} from './partials/settings-add-address.component';
var request_service_1 = require("../../../services/request.service");
var SettingsAddress = (function () {
    function SettingsAddress(request) {
        var _this = this;
        this.request = request;
        this.currentSort = 'all';
        this.selectedtab = 1;
        this.indexedAddresses = {};
        this.addressArray = [];
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
                _this.indexedAddresses = _.keyBy(_this.addresses, function (o) {
                    return o.tank;
                });
            }
            console.log("this.indexedAddresses ------", _this.indexedAddresses);
            _this._processAddr(_this.addresses);
            _this.request.get('/plc/latest.json').subscribe(function (resp) {
                console.log("latest plc-----", resp);
                if (resp && resp.pl && resp.pl.plc) {
                    _this.plcAddrTanks = _.map(resp.pl.plc, function (plc) {
                        return plc;
                    });
                    _this.targetTanks = _this.plcAddrTanks;
                    console.log('got this.plcAddrTanks ', _this.plcAddrTanks);
                    _this.initUi();
                }
            });
            // console.log("key by", self.userArray)
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
            this.editTarget = _.assign({}, arg.addr);
            jQuery('select#plcAddrTank').val(this.editTarget.tank);
            jQuery('select#plcAddrTank').attr('disabled', 'disabled');
        }
        else {
            this.editMode = false;
            this.editTarget = null;
            this.newAddress = new plcAddress();
            this.newAddress.at = arg.addressType.en;
            this.targetTanks = []; //TODO only show address for current group.And only if there is not addres assigned yet
            for (var i = 0; i < this.plcAddrTanks.length; i++) {
                if (this.plcAddrTanks[i].plcType == arg.addressType.en) {
                    if (!this.indexedAddresses[this.plcAddrTanks[i].tank]) {
                        this.targetTanks.push(this.plcAddrTanks[i]);
                    }
                }
                ;
            }
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
            var addrGroupIndex = _.findIndex(_this.addressArray, function (addrGrp) {
                return addrGrp.type.value.en == res.pl.address.at;
            });
            var index = _.findIndex(_this.addressArray[addrGroupIndex].data, function (o) {
                return o._id == res.pl.address._id;
            });
            if (index > -1) {
                _this.addressArray[addrGroupIndex].data.splice(index, 1, res.pl.address);
            }
            _this.closeDetailModal();
        });
    };
    SettingsAddress.prototype.veSelecedPlcTank = function (event, compRef) {
        if (event && event.target && event.target.value) {
            compRef.newAddress.tank = event.target.value;
        }
        compRef.initSelect();
    };
    return SettingsAddress;
}());
SettingsAddress = __decorate([
    core_1.Component({
        selector: 'settings-address',
        templateUrl: config_1.config.prefix + '/components/settings/address/settings-address.component.html',
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], SettingsAddress);
exports.SettingsAddress = SettingsAddress;
var plcAddress = (function () {
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
exports.plcAddress = plcAddress;
;

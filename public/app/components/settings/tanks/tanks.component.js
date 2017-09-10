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
var request_service_1 = require("../../../services/request.service");
var SettingsTank = (function () {
    function SettingsTank(request) {
        var _this = this;
        this.request = request;
        this.editMode = false;
        this.tanks = [];
        this.newTank = new plcTank();
        console.log("SettingsAddress is up and running");
        var self = this;
        this.request.get("/plc/tanks/all.json").subscribe(function (res) {
            console.log("got response--", res);
            if (res.pl && res.pl.tank) {
                _this.tanks = res.pl.tank;
            }
            // console.log("key by", self.userArray)
        });
    }
    SettingsTank.prototype.showDetailModal = function (arg) {
        console.log("selected item----", arg, this.tanks);
        var that = this;
        if (arg) {
            this.editMode = true;
            this.editTarget = _.assign({}, arg);
            jQuery('select#plcAddrTank').val(this.editTarget.tank);
            jQuery('select#plcAddrTank').attr('disabled', 'disabled');
        }
        else {
            this.editMode = false;
            this.editTarget = null;
            this.newTank = new plcTank();
        }
        jQuery("#settinsTanksDetailModal").openModal({
            ready: function () {
            }
        });
    };
    SettingsTank.prototype.closeDetailModal = function () {
        jQuery("#settinsTanksDetailModal").closeModal();
    };
    SettingsTank.prototype.initUi = function () {
        this.initModal();
    };
    SettingsTank.prototype.initModal = function () {
        var that = this;
        setTimeout(function (_) {
            jQuery('.modal-trigger').leanModal({
                dismissible: true,
                opacity: .5,
                in_duration: 300,
                out_duration: 200,
                ready: function () { console.log('Ready'); },
                complete: function () { console.log('Closed'); } // Callback for Modal close
            });
        });
    };
    SettingsTank.prototype.addNew = function () {
        var _this = this;
        console.log("posting ----", this.newTank);
        if (this.newTank) {
            this.request.post('/plc/tanks/new.json', this.newTank).subscribe(function (res) {
                if (res.pl && res.pl.tank) {
                    console.log('added new addr----', res.pl.tank);
                    _this.tanks.push(res.pl.tank);
                    jQuery("#settinsTanksDetailModal").closeModal();
                }
                else {
                    alert("系统错误!");
                }
            });
        }
        else {
            alert("请提供罐号");
        }
    };
    SettingsTank.prototype.update = function () {
        var _this = this;
        console.log("posting ----", this.editTarget);
        this.request.put('/plc/tanks.json', this.editTarget).subscribe(function (res) {
            if (res && res.pl && res.pl.tank) {
                var index = _.findIndex(_this.tanks, { _id: res.pl.tank._id });
                if (index > -1) {
                    _this.tanks.splice(index, 1, res.pl.tank);
                }
            }
            else {
                alert("系统错误!");
            }
            _this.closeDetailModal();
        });
    };
    return SettingsTank;
}());
SettingsTank = __decorate([
    core_1.Component({
        selector: 'settings-tanks',
        templateUrl: config_1.config.prefix + '/components/settings/tanks/tanks.component.html',
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], SettingsTank);
exports.SettingsTank = SettingsTank;
var plcTank = (function () {
    function plcTank() {
        this.tank = '';
        this.addr = '';
    }
    return plcTank;
}());
exports.plcTank = plcTank;
;

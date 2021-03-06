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
var SettingsFormula = (function () {
    function SettingsFormula(request) {
        var _this = this;
        this.request = request;
        this.selectedtab = 1;
        this.newFormula = new plcFormula();
        this.editMode = false;
        this.allFormula = [];
        this.targetTanks = [];
        this.formulas = [];
        this.indexedFormula = {};
        this.indexedAddresses = {};
        console.log("SettingsFormula is up and running");
        this.request.get("/plc/address/all.json").subscribe(function (res) {
            console.log("got response--", res);
            if (res.pl && res.pl.address) {
                var addresses = res.pl.address;
                _this.indexedAddresses = _.keyBy(addresses, function (o) {
                    return o.tank;
                });
            }
            console.log("this.indexedFormula ------", _this.indexedAddresses);
            _this.initUi();
        });
        this.request.get('/plc/formula/all.json').subscribe(function (resp) {
            console.log("got all formula-----", resp);
            if (resp && resp.pl && resp.pl.formula) {
                _this.allFormula = resp.pl.formula;
                console.log('got this.allFormula ', _this.allFormula);
            }
        });
    }
    SettingsFormula.prototype.initUi = function () {
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
    SettingsFormula.prototype.initSelect = function () {
        setTimeout(function (_) {
            jQuery('select').material_select();
        });
    };
    SettingsFormula.prototype.showDetailModal = function (arg) {
        console.log("selected item----", arg);
        this.editTarget = arg;
        var that = this;
        jQuery("#settingsFormulaComputeDetailModal").openModal({
            ready: function () {
                that.initSelect();
            }
        });
    };
    SettingsFormula.prototype.closeDetailModal = function () {
        jQuery("#settingsFormulaComputeDetailModal").closeModal();
    };
    SettingsFormula.prototype.submitFormula = function () {
        var _this = this;
        this.request.put('/plc/formula.json', this.editTarget).subscribe(function (resp) {
            console.log("formular edited all formula-----", resp);
            //binding will update the formula array
            _this.closeDetailModal();
        });
    };
    return SettingsFormula;
}());
SettingsFormula = __decorate([
    core_1.Component({
        selector: 'settings-formula',
        templateUrl: config_1.config.prefix + '/components/settings/formula/settings-formula.component.html'
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], SettingsFormula);
exports.SettingsFormula = SettingsFormula;
var plcFormula = (function () {
    function plcFormula() {
        this.code = '';
        this.divisor = null;
        this.factor = null;
        this.tt = null;
        this.pt = null;
        this.tankType = '';
        this.tank = '';
    }
    return plcFormula;
}());
exports.plcFormula = plcFormula;
;

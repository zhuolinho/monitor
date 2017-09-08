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
var SettingsFormula = (function () {
    function SettingsFormula() {
        this.selectedtab = 1;
        this.newFormula = new plcFormula();
        this.editMode = false;
        this.allTanks = [];
        this.targetTanks = [];
        console.log("SettingsFormula is up and running");
        this.initUi();
    }
    SettingsFormula.prototype.veCalculateParameter = function () {
        this.initUi();
    };
    SettingsFormula.prototype.veElertParameter = function () {
        this.initUi();
    };
    SettingsFormula.prototype.initUi = function () {
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
        });
    };
    SettingsFormula.prototype.initSelect = function () {
        setTimeout(function (_) {
            jQuery('select').material_select();
        });
    };
    SettingsFormula.prototype.showDetailModal = function (arg) {
        console.log("selected item----", arg);
        var that = this;
        jQuery("#" + arg.modalId).openModal({
            ready: function () {
                that.initSelect();
            }
        });
    };
    SettingsFormula.prototype.closeDetailModal = function () {
        // jQuery("#").closeModal();
    };
    return SettingsFormula;
}());
SettingsFormula = __decorate([
    core_1.Component({
        selector: 'settings-formula',
        templateUrl: config_1.config.prefix + '/components/settings/formula/settings-formula.component.html'
    }),
    __metadata("design:paramtypes", [])
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

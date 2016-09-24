System.register(['@angular/core', '../../../config'], function(exports_1, context_1) {
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
    var SettingsFormula;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            SettingsFormula = (function () {
                function SettingsFormula() {
                    this.selectedtab = 1;
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
                SettingsFormula = __decorate([
                    core_1.Component({
                        selector: 'settings-formula',
                        templateUrl: config_1.config.prefix + '/components/settings/formula/settings-formula.component.html',
                    }), 
                    __metadata('design:paramtypes', [])
                ], SettingsFormula);
                return SettingsFormula;
            }());
            exports_1("SettingsFormula", SettingsFormula);
        }
    }
});

System.register(['angular2/core', '../../../config', './details/gas.detail.component'], function(exports_1, context_1) {
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
    var core_1, config_1, gas_detail_component_1;
    var Gas;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (gas_detail_component_1_1) {
                gas_detail_component_1 = gas_detail_component_1_1;
            }],
        execute: function() {
            Gas = (function () {
                function Gas() {
                    this.availableTanks = [
                        { id: '12345', selected: false },
                        { id: '62545', selected: false },
                        { id: '27456', selected: false },
                        { id: '72145', selected: false },
                        { id: '19345', selected: false },
                        { id: '82345', selected: false },
                        { id: '32345', selected: false },
                        { id: '11345', selected: false },
                        { id: '22345', selected: false },
                        { id: '82322', selected: false },
                        { id: '22325', selected: false },
                        { id: '99345', selected: false },
                        { id: '902345', selected: false },
                        { id: '102345', selected: false },
                        { id: '444235', selected: false },
                        { id: '602345', selected: false },
                        { id: '62340', selected: false },
                        { id: '72305', selected: false },
                        { id: '50345', selected: false },
                        { id: '56665', selected: false }
                    ];
                    this.allTankSelected = false;
                    this.selectedTanks = [];
                    console.log("gas is up and running");
                    this.initSelect();
                    this.initModal();
                }
                Gas.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                Gas.prototype.veReturnSelectedTanks = function () {
                    if (this.selectedTanks.length) {
                        console.log("selectedTanks--", this.selectedTanks.length, this.selectedTanks);
                    }
                };
                Gas.prototype.veAddSelectedTanks = function () {
                    if (this.selectedTanks.length) {
                        console.log("selectedTanks--", this.selectedTanks.length, this.selectedTanks);
                    }
                };
                Gas.prototype.veToggleSelectAllTanks = function () {
                    this.selectedTanks = [];
                    if (!this.allTankSelected) {
                        for (var i = 0; i < this.availableTanks.length; i++) {
                            this.availableTanks[i].selected = true;
                            this.selectedTanks.push(this.availableTanks[i]);
                        }
                    }
                    else {
                        for (var i = 0; i < this.availableTanks.length; i++) {
                            this.availableTanks[i].selected = null;
                        }
                    }
                    console.log("this.selectedTanks ----", this.selectedTanks.length, this.selectedTanks);
                    this.allTankSelected = !this.allTankSelected;
                };
                Gas.prototype.veSelectTank = function (tank) {
                    tank.selected = !tank.selected;
                    if (tank.selected) {
                        this.selectedTanks.push(tank);
                    }
                    else {
                        var array = _.remove(this.selectedTanks, function (o) {
                            return o.id == tank.id;
                        });
                    }
                    console.log("selectedTanks--", this.selectedTanks.length, this.selectedTanks, tank, array);
                };
                Gas.prototype.initModal = function () {
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
                        //  alert('getting models up');
                    });
                };
                Gas = __decorate([
                    core_1.Component({
                        selector: 'gas',
                        templateUrl: config_1.config.prefix + '/components/monitor/gas/gas.component.html',
                        directives: [gas_detail_component_1.GasDetail]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Gas);
                return Gas;
            }());
            exports_1("Gas", Gas);
        }
    }
});

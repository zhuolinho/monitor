System.register(['angular2/core', '../../../config', 'angular2/router', 'angular2/common', '../../../services/request.service'], function(exports_1, context_1) {
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
    var core_1, config_1, router_1, common_1, request_service_1;
    var Shipment;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            }],
        execute: function() {
            Shipment = (function () {
                function Shipment(router, request) {
                    this.router = router;
                    this.request = request;
                    this.shipmentList = [
                        {
                            name: 'C002-闸北区大宁路335号XX站',
                            id: '6848',
                            remainingTime: '2小时02分',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '6%/12kg/hps'
                        },
                        {
                            name: 'L002-闸北区大宁路335号XX站',
                            id: '2848',
                            remainingTime: '2小时02分',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '6%/12kg/hps'
                        },
                        {
                            name: 'C002-闸北区大宁路335号XX站',
                            id: '4845',
                            remainingTime: '2小时02分',
                            upTime: '15.5.3-13:02/----',
                            processed: true,
                            alertTime: '5.5.3-13:02',
                            alertValue: '6%/12kg/hps'
                        },
                        {
                            name: 'C002-闸北区大宁路335号XX站',
                            id: '4845',
                            remainingTime: '2小时02分',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '6%/12kg/hps'
                        }
                    ]; //todo user flag and ng if to hide when filtering;
                    console.log("Shipment is up and running");
                    this.request.get("/plc/shipments").subscribe(function (res) {
                        console.log("res------", res);
                    });
                    // this.initUi();
                }
                Shipment.prototype.veSubmitForShipment = function (alert) {
                    // alert.processed = !alert.processed;
                    this.router.navigate(['ShipmentMap']);
                };
                Shipment = __decorate([
                    core_1.Component({
                        selector: 'shipment',
                        templateUrl: config_1.config.prefix + '/components/gps/shipment/shipment.component.html',
                        directives: [common_1.CORE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, request_service_1.RequestService])
                ], Shipment);
                return Shipment;
            }());
            exports_1("Shipment", Shipment);
        }
    }
});

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
var router_1 = require("@angular/router");
var request_service_1 = require("../../../services/request.service");
var Shipment = (function () {
    function Shipment(router, request) {
        var _this = this;
        this.router = router;
        this.request = request;
        // testShipmentList:any[]=[
        //
        //     {
        //       name:'C002-闸北区大宁路335号XX站',
        //       id:'6848',
        //       remainingTime:'2小时02分',
        //       upTime:'15.5.3-13:02/----',
        //       processed:false,
        //       alertTime:'5.5.3-13:02',
        //       alertValue:'6%/12kg/hps'
        //     },
        //     {
        //       name:'L002-闸北区大宁路335号XX站',
        //       id:'2848',
        //       remainingTime:'2小时02分',
        //       upTime:'15.5.3-13:02/----',
        //       processed:false,
        //       alertTime:'5.5.3-13:02',
        //       alertValue:'6%/12kg/hps'
        //     },
        //     {
        //       name:'C002-闸北区大宁路335号XX站',
        //       id:'4845',
        //       remainingTime:'2小时02分',
        //       upTime:'15.5.3-13:02/----',
        //       processed:true,
        //       alertTime:'5.5.3-13:02',
        //       alertValue:'6%/12kg/hps'
        //     },
        //     {
        //       name:'C002-闸北区大宁路335号XX站',
        //       id:'4845',
        //       remainingTime:'2小时02分',
        //       upTime:'15.5.3-13:02/----',
        //       processed:false,
        //       alertTime:'5.5.3-13:02',
        //       alertValue:'6%/12kg/hps'
        //     }
        // ];
        //todo user flag and ng if to hide when filtering;
        this.shipmentList = [];
        console.log("Shipment is up and running");
        this.request.get("/plc/shipments.json").subscribe(function (res) {
            console.log("shipment res------", res);
            // this.shipmentList = this.testShipmentList;
            if (res.pl && res.pl.shipmentList) {
                _this.shipmentList = res.pl.shipmentList;
            }
        });
        // this.initUi();
    }
    Shipment.prototype.veSubmitForShipment = function (alert) {
        // alert.processed = !alert.processed;
        var _this = this;
        alert.status = 2;
        console.log("alert-----", alert);
        this.request.put("/plc/alert.json", alert).subscribe(function (res) {
            console.log("res----", res);
            if (res.pl && res.pl.alert && res.pl.alert.tank) {
                _this.router.navigate(["/admin/gps/shipment-map/" + res.pl.alert.tank]);
            }
        });
    };
    return Shipment;
}());
Shipment = __decorate([
    core_1.Component({
        selector: "shipment",
        templateUrl: config_1.config.prefix + "/components/gps/shipment/shipment.component.html"
        // directives:[CORE_DIRECTIVES]
    }),
    __metadata("design:paramtypes", [router_1.Router, request_service_1.RequestService])
], Shipment);
exports.Shipment = Shipment;

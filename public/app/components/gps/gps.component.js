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
var config_1 = require("../../config");
var request_service_1 = require("../../services/request.service");
var routerNav_service_1 = require("../../services/routerNav.service");
// import {ShipmentMap} from './map/shipment-map.component';
// import {ProcessedShipment} from './processed/processed-shipment.component';
// import {Shipment} from './shipment/shiment.component';
var Gps = (function () {
    function Gps(request, routerNavServ) {
        this.request = request;
        this.routerNavServ = routerNavServ;
        this.routerNavServ.currentModule = 'gps';
        console.log("Gps is up and running");
    }
    return Gps;
}());
Gps.points = {};
Gps = __decorate([
    core_1.Component({
        selector: 'gps',
        templateUrl: config_1.config.prefix + '/components/gps/gps.component.html'
    })
    // @RouteConfig([
    //   {path:'/shipment', component:Shipment, name:'Shipment',useAsDefault:true},
    //   {path:'/map/:tank', component:ShipmentMap, name:'ShipmentMap'},
    //   {path:'/processed', component:ProcessedShipment, name:'ProcessedShipment'}
    // ])
    ,
    __metadata("design:paramtypes", [request_service_1.RequestService,
        routerNav_service_1.routerNavService])
], Gps);
exports.Gps = Gps;

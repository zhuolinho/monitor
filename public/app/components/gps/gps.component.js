System.register(['angular2/core', '../../config', 'angular2/router', '../../services/request.service', './map/shipment-map.component', './processed/processed-shipment.component', './shipment/shiment.component'], function(exports_1, context_1) {
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
    var core_1, config_1, router_1, request_service_1, shipment_map_component_1, processed_shipment_component_1, shiment_component_1;
    var Gps;
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
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            },
            function (shipment_map_component_1_1) {
                shipment_map_component_1 = shipment_map_component_1_1;
            },
            function (processed_shipment_component_1_1) {
                processed_shipment_component_1 = processed_shipment_component_1_1;
            },
            function (shiment_component_1_1) {
                shiment_component_1 = shiment_component_1_1;
            }],
        execute: function() {
            Gps = (function () {
                function Gps(request) {
                    this.request = request;
                    console.log("Gps is up and running");
                }
                Gps.points = {};
                Gps = __decorate([
                    core_1.Component({
                        selector: 'gps',
                        templateUrl: config_1.config.prefix + '/components/gps/gps.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink]
                    }),
                    router_1.RouteConfig([
                        { path: '/shipment', component: shiment_component_1.Shipment, name: 'Shipment', useAsDefault: true },
                        { path: '/map', component: shipment_map_component_1.ShipmentMap, name: 'ShipmentMap' },
                        { path: '/processed', component: processed_shipment_component_1.ProcessedShipment, name: 'ProcessedShipment' }
                    ]), 
                    __metadata('design:paramtypes', [request_service_1.RequestService])
                ], Gps);
                return Gps;
            }());
            exports_1("Gps", Gps);
        }
    }
});

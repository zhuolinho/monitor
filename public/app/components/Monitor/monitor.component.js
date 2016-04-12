System.register(['angular2/core', '../../config', './gas/gas.component', './camera/camera.component', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, config_1, gas_component_1, camera_component_1, router_1;
    var Monitor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (gas_component_1_1) {
                gas_component_1 = gas_component_1_1;
            },
            function (camera_component_1_1) {
                camera_component_1 = camera_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Monitor = (function () {
                function Monitor() {
                    console.log("Monitor is up and running");
                }
                Monitor = __decorate([
                    core_1.Component({
                        selector: 'monitor',
                        templateUrl: config_1.config.prefix + '/components/monitor/monitor.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink]
                    }),
                    router_1.RouteConfig([
                        { path: '/gas', component: gas_component_1.Gas, name: 'Gas', useAsDefault: true },
                        { path: '/camera', component: camera_component_1.Camera, name: 'Camera' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], Monitor);
                return Monitor;
            }());
            exports_1("Monitor", Monitor);
        }
    }
});

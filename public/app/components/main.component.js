System.register(['angular2/core', 'angular2/common', 'angular2/http', 'angular2/router', '../services/request', '../layout_components/header/header', '../layout_components/navigator/navigator', './home/home.component', './gps/gps.component', '../config'], function(exports_1, context_1) {
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
    var core_1, common_1, http_1, router_1, request_1, header_1, navigator_1, home_component_1, gps_component_1, config_1;
    var MainComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (request_1_1) {
                request_1 = request_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (navigator_1_1) {
                navigator_1 = navigator_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (gps_component_1_1) {
                gps_component_1 = gps_component_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            MainComponent = (function () {
                function MainComponent() {
                    console.log("MainComponent is up and running");
                }
                MainComponent = __decorate([
                    core_1.Component({
                        selector: 'main',
                        templateUrl: config_1.config.prefix + '/components/main.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES,
                            header_1.Header,
                            navigator_1.Navigator,
                            common_1.CORE_DIRECTIVES, router_1.RouterLink],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            router_1.ROUTER_PROVIDERS,
                            core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                            request_1.Request
                        ]
                    }),
                    router_1.RouteConfig([
                        { path: '/home', component: home_component_1.Home, name: 'Home' },
                        { path: '/gps', component: gps_component_1.Gps, name: 'Gps' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], MainComponent);
                return MainComponent;
            }());
            exports_1("MainComponent", MainComponent);
        }
    }
});

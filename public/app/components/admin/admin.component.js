System.register(['angular2/core', 'angular2/common', 'angular2/router', '../../layout_components/header/header', '../../layout_components/navigator/navigator', '../home/home.component', '../monitor/monitor.component', '../gps/gps.component', '../../config', '../settings/settings.component'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, header_1, navigator_1, home_component_1, monitor_component_1, gps_component_1, config_1, settings_component_1;
    var AdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
            function (monitor_component_1_1) {
                monitor_component_1 = monitor_component_1_1;
            },
            function (gps_component_1_1) {
                gps_component_1 = gps_component_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (settings_component_1_1) {
                settings_component_1 = settings_component_1_1;
            }],
        execute: function() {
            AdminComponent = (function () {
                function AdminComponent() {
                    console.log("admin is up and running");
                }
                AdminComponent = __decorate([
                    core_1.Component({
                        selector: 'admin',
                        templateUrl: config_1.config.prefix + 'components/admin/admin.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES,
                            header_1.Header,
                            navigator_1.Navigator,
                            common_1.CORE_DIRECTIVES, router_1.RouterLink],
                        providers: [
                            router_1.ROUTER_PROVIDERS
                        ]
                    }),
                    router_1.RouteConfig([
                        { path: '/...', component: home_component_1.Home, name: 'Home' },
                        { path: '/monitor', component: monitor_component_1.Monitor, name: 'Monitor' },
                        { path: '/gps', component: gps_component_1.Gps, name: 'Gps' },
                        { path: '/settings', component: settings_component_1.Settings, name: 'Settings' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AdminComponent);
                return AdminComponent;
            }());
            exports_1("AdminComponent", AdminComponent);
        }
    }
});

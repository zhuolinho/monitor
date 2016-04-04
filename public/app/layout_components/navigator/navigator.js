System.register(['angular2/core', 'angular2/router', '../../config'], function(exports_1, context_1) {
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
    var core_1, router_1, config_1;
    var Navigator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            Navigator = (function () {
                function Navigator() {
                    this.navigations = [
                        { link: 'Home', title: '首页', icon: 'dashboard' },
                        { link: 'Monitor', title: '实时监控', icon: 'videocam' },
                        { link: 'Gps', title: 'GPS ', icon: 'my_location' }
                    ];
                }
                Navigator = __decorate([
                    core_1.Component({
                        selector: 'navigator',
                        templateUrl: config_1.config.prefix + 'layout_components/navigator/navigator.html',
                        directives: [router_1.RouterLink, router_1.ROUTER_DIRECTIVES],
                        styleUrls: [config_1.config.prefix + 'layout_components/navigator/resources/css/style.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], Navigator);
                return Navigator;
            }());
            exports_1("Navigator", Navigator);
        }
    }
});

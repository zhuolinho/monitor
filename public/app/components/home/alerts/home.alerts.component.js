System.register(['angular2/core', '../../../config', './details/home.alerts.detail.component'], function(exports_1, context_1) {
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
    var core_1, config_1, home_alerts_detail_component_1;
    var HomeAlerts;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (home_alerts_detail_component_1_1) {
                home_alerts_detail_component_1 = home_alerts_detail_component_1_1;
            }],
        execute: function() {
            HomeAlerts = (function () {
                function HomeAlerts() {
                    console.log("Home alerts is up and running");
                    this.initModal();
                }
                HomeAlerts.prototype.initModal = function () {
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
                HomeAlerts.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                HomeAlerts = __decorate([
                    core_1.Component({
                        selector: 'home-alerts',
                        templateUrl: config_1.config.prefix + '/components/home/alerts/home.alerts.component.html',
                        directives: [home_alerts_detail_component_1.HomeAlertsDetail]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomeAlerts);
                return HomeAlerts;
            }());
            exports_1("HomeAlerts", HomeAlerts);
        }
    }
});

System.register(['angular2/core', '../../../config', './details/home.alerts.detail.component', './return_details/home.return.alerts.detail.component', '../../../services/request.service', '../../../services/user.service', 'angular2/common', '../../../services/lib.service'], function(exports_1, context_1) {
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
    var core_1, config_1, home_alerts_detail_component_1, home_return_alerts_detail_component_1, request_service_1, user_service_1, common_1, lib_service_1;
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
            },
            function (home_return_alerts_detail_component_1_1) {
                home_return_alerts_detail_component_1 = home_return_alerts_detail_component_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lib_service_1_1) {
                lib_service_1 = lib_service_1_1;
            }],
        execute: function() {
            HomeAlerts = (function () {
                function HomeAlerts(request, userSrvc, libSrvc) {
                    var _this = this;
                    this.request = request;
                    this.userSrvc = userSrvc;
                    this.libSrvc = libSrvc;
                    this.currentSort = 'all';
                    this.alertsList = [];
                    this.hasData = true;
                    console.log("Home alerts is up and running");
                    var self = this;
                    this.user = this.userSrvc.getUser();
                    console.log("this.user----", this.user);
                    this.request.get('/plc/alerts/unprocessed.json').subscribe(function (res) {
                        if (res.pl && res.pl.alerts) {
                            _this.alertsList = res.pl.alerts;
                            if (!_this.alertsList.length) {
                                _this.hasData = false;
                            }
                            console.log("this.alertsList---", _this.alertsList);
                            _this.alertGroups = _.groupBy(_this.alertsList, 'atype');
                        }
                    });
                    // /plc/alerts/all
                }
                HomeAlerts.prototype.ngAfterViewInit = function () {
                    this.iniSocket();
                    this.initUi();
                };
                HomeAlerts.prototype.veSortBy = function (wich) {
                    var _this = this;
                    if (this.currentSort != wich) {
                        this.currentSort = null; //clear view to reinit; otherwise modal won't open properly on firs sort; ng if (will reinit on show).
                        setTimeout(function (_) {
                            _this.currentSort = wich;
                            _this.initUi();
                        }, 100);
                    }
                };
                HomeAlerts.prototype.veProcessed = function (alert) {
                    var _this = this;
                    var self = this;
                    alert.pt = this.libSrvc.dateTime();
                    alert.status = 1;
                    alert.pa = this.user.an;
                    console.log("alert------", alert);
                    this.request.put('/plc/alert.json', alert).subscribe(function (res) {
                        console.log("alert updated", res);
                        var newArray = _.remove(_this.alertGroups[alert.atype], function (o) {
                            return o._id == alert._id;
                        });
                    });
                };
                HomeAlerts.prototype.initUi = function () {
                    var self = this;
                    setTimeout(function (_) {
                        jQuery('.modal-trigger').leanModal({
                            dismissible: true,
                            opacity: .5,
                            in_duration: 300,
                            out_duration: 200,
                            ready: function () { console.log('Ready'); self.initSelect(); },
                            complete: function () { console.log('Closed'); } // Callback for Modal close
                        });
                        //  alert('getting models up');
                    });
                };
                HomeAlerts.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                HomeAlerts.prototype.iniSocket = function () {
                    var that = this;
                    var url = 'http://' + window.location.hostname + ':3003';
                    var socket = io(url);
                    socket.on('newPlcAlert', function (data) {
                        console.log("got new alert---", data);
                        if (data && data.pl && data.pl.alert) {
                            that.alertsList.unshift(data.pl.alert);
                        }
                    });
                };
                HomeAlerts = __decorate([
                    core_1.Component({
                        selector: 'home-alerts',
                        templateUrl: config_1.config.prefix + '/components/home/alerts/home.alerts.component.html',
                        directives: [home_alerts_detail_component_1.HomeAlertsDetail, home_return_alerts_detail_component_1.HomeReturnAlertsDetail, common_1.CORE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService, user_service_1.UserService, lib_service_1.LibService])
                ], HomeAlerts);
                return HomeAlerts;
            }());
            exports_1("HomeAlerts", HomeAlerts);
        }
    }
});

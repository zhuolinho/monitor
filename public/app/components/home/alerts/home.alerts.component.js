System.register(['@angular/core', '../../../config', '../../../services/request.service', '../../../services/user.service', '../../../services/lib.service'], function(exports_1, context_1) {
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
    var core_1, config_1, request_service_1, user_service_1, lib_service_1;
    var HomeAlerts;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (lib_service_1_1) {
                lib_service_1 = lib_service_1_1;
            }],
        execute: function() {
            HomeAlerts = (function () {
                function HomeAlerts(request, userSrvc, lib) {
                    var _this = this;
                    this.request = request;
                    this.userSrvc = userSrvc;
                    this.lib = lib;
                    this.currentSort = 'all';
                    this.alertsList = [];
                    this.hasData = true;
                    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                    // months:string[] = ['2016年1月','2016年2月','2016年3月','2016年4月','2016年5月','2016年6月','2016年7月','2016年8月','2016年9月','2016年10月','2016年11月','2016年12月'];
                    this.years = [];
                    // days:string[] = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日',
                    //                   '13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日',
                    //                   '25日','26日','27日','28日','29日','30日','31日'
                    //                 ];
                    this.days = [];
                    this.detailmodal = {};
                    this.currentStatSelectedYear = 2016;
                    this.currentStatSelectedMonth = 1;
                    console.log("Home alerts is up and running");
                    var self = this;
                    this.user = this.userSrvc.getUser();
                    console.log("this.user----", this.user);
                    this.setYears(null);
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
                    alert.pt = this.lib.dateTime();
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
                HomeAlerts.prototype.iniSocket = function () {
                    var that = this;
                    var url = 'http://' + window.location.hostname + ':3003';
                    var socket = io(url);
                    socket.on('newPlcAlert', function (data) {
                        console.log("got new alert---", data);
                        if (data && data.pl && data.pl.alert) {
                            that.alertsList.unshift(data.pl.alert);
                            that.alertGroups = _.groupBy(that.alertsList, 'atype');
                        }
                    });
                };
                HomeAlerts.prototype.initSelect = function () {
                    var that = this;
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                        jQuery('select.select-year').change(function (e) {
                            that.statYearSelected(e);
                        });
                        jQuery('select.select-month').change(function (e) {
                            that.statMothSelected(e);
                        });
                    });
                };
                HomeAlerts.prototype.setYears = function (startYear) {
                    var sY = startYear || 2009;
                    var y = 2016;
                    while (y >= sY) {
                        this.years.push(y--);
                    }
                };
                HomeAlerts.prototype.setDaysOfMonth = function (year, month) {
                    this.days = [];
                    var y = year || new Date().getFullYear();
                    var m = month || new Date().getMonth() + 1;
                    var numDays = this.lib.daysInMonth(y, m);
                    for (var i = 0; i < numDays; i++) {
                        this.days.push(i + 1);
                    }
                    console.log("this.days----", this.days);
                };
                HomeAlerts.prototype.statYearSelected = function (event) {
                    console.log('year changed1----', event.target.value);
                    this.currentStatSelectedYear = event.target.value;
                };
                HomeAlerts.prototype.statMothSelected = function (event) {
                    console.log('month changed1----', event.target.value);
                    this.currentStatSelectedMonth = event.target.value;
                    this.setDaysOfMonth(this.currentStatSelectedYear, this.currentStatSelectedMonth);
                };
                HomeAlerts.prototype.showDetailModal = function (alert) {
                    console.log("selected alert----", alert);
                    this.detailmodal.selectedtab = 1;
                    var that = this;
                    var d = new Date();
                    this.currentStatSelectedYear = d.getFullYear();
                    this.currentStatSelectedMonth = d.getMonth() + 1;
                    // jQuery('select.select-month').val(this.currentStatSelectedMonth);
                    // jQuery('select.select-year').val(this.currentStatSelectedYear);
                    jQuery("#alertDetailsModal").openModal({
                        ready: function () {
                            that.initGrapth();
                            that.initSelect();
                        }
                    });
                };
                HomeAlerts.prototype.getPlcStats = function (year, month) {
                    var _this = this;
                    this.statsData = [];
                    console.log('get plc stats----', year, month);
                    this.request.get('/plc/stats/' + year + '/' + month + '.json').subscribe(function (resp) {
                        console.log("plc stats-----", resp);
                        if (resp && resp.pl && resp.pl.plc) {
                            _this.statsData = resp.pl.plc;
                        }
                    });
                };
                HomeAlerts.prototype.computeStats = function () {
                    this.getPlcStats(this.currentStatSelectedYear, this.currentStatSelectedMonth);
                };
                // code for detail modal
                HomeAlerts.prototype.showByDay = function () {
                    var _this = this;
                    // alert('by day');
                    console.log("by day");
                    this.isShowByDay = true;
                    var d = new Date();
                    this.currentStatSelectedYear = d.getFullYear();
                    this.currentStatSelectedMonth = d.getMonth() + 1;
                    // re-initialize material-select
                    this.setDaysOfMonth(null, null);
                    this.computeStats();
                    setTimeout(function (_) {
                        jQuery('.select-year').val(_this.currentStatSelectedYear);
                        jQuery('.select-month').val(_this.currentStatSelectedMonth);
                        _this.initSelect();
                    });
                };
                HomeAlerts.prototype.showByMonth = function () {
                    var _this = this;
                    // alert('by month');
                    console.log("by month");
                    this.isShowByDay = false;
                    var d = new Date();
                    this.currentStatSelectedYear = d.getFullYear();
                    this.currentStatSelectedMonth = 0;
                    // re-initialize material-select
                    this.currentSelect = this.years;
                    this.computeStats();
                    setTimeout(function (_) {
                        jQuery('.select-year').val(_this.currentStatSelectedYear);
                        _this.initSelect();
                    });
                };
                // downloadData(){
                //
                //   this.request.post('/plc/download.json', this.statsData).subscribe(resp => {
                //     console.log("plc downdload-----",resp);
                //     if(resp&&resp.pl&&resp.pl.plc){
                //         this.statsData = resp.pl.plc;
                //     }
                //   });
                HomeAlerts.prototype.downloadData = function () {
                    this.request.post('/plc/stats/download.json', this.statsData).subscribe(function (res) {
                        console.log("res-----", res);
                        window.location = res.pl.file;
                    });
                };
                HomeAlerts.prototype.initGrapth = function () {
                    var that = this;
                };
                HomeAlerts = __decorate([
                    core_1.Component({
                        selector: 'home-alerts',
                        templateUrl: config_1.config.prefix + '/components/home/alerts/home.alerts.component.html',
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService, user_service_1.UserService, lib_service_1.LibService])
                ], HomeAlerts);
                return HomeAlerts;
            }());
            exports_1("HomeAlerts", HomeAlerts);
        }
    }
});

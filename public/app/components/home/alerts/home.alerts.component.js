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
var request_service_1 = require("../../../services/request.service");
var user_service_1 = require("../../../services/user.service");
var rt_messages_service_1 = require("../../../services/rt-messages.service");
var utils_service_1 = require("../../../services/utils.service");
// import {CORE_DIRECTIVES} from '@angular/common';
var lib_service_1 = require("../../../services/lib.service");
var HomeAlerts = (function () {
    function HomeAlerts(request, userSrvc, rtmgs, utilServ, lib) {
        var _this = this;
        this.request = request;
        this.userSrvc = userSrvc;
        this.rtmgs = rtmgs;
        this.utilServ = utilServ;
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
        this.currentTankMovingAlert = {};
        this.currentStatSelectedYear = 2016;
        this.currentStatSelectedMonth = 1;
        this.isShowByDay = false;
        this.showModal = false;
        this.tmpEditTtank = {};
        this.ttankNgModel = {};
        this.goodConnection = false;
        this.dataTimer = 300000;
        this.lastDataTime = 0;
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
    HomeAlerts.prototype.ngOnInit = function () {
        var _this = this;
        this.request.get('/plc/latest/withaddress.json').subscribe(function (resp) {
            console.log("latest plc>>>-----", resp);
            if (resp && resp.pl && resp.pl.plc && resp.pl.address) {
                // this.realTimeData = _.keyBy(resp.pl.plc,'tank');
                _this.realTimeData = resp.pl.plc;
                _this.plcAddresses = _.keyBy(resp.pl.address, 'tank');
                // this.realTimeData = _.keyBy(this.testPlcs,'tank');
                _this.connectedPlcs = Object.keys(_this.realTimeData);
            }
        });
        this.utilServ.homeAlertSortAll$.subscribe(function () {
            _this.veSortBy('all');
        });
    };
    HomeAlerts.prototype.ngOnDestroy = function () {
        clearInterval(this.dateTimer);
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
    HomeAlerts.prototype.veEditTransportableTank = function (alert) {
        this.tmpEditTtank[alert.tank] = alert.ttank; //temporarily keep tank.
        this.ttankNgModel[alert.tank] = alert.ttank;
        alert.ttank = null;
    };
    HomeAlerts.prototype.veCancelEditTransportableTank = function (alert) {
        alert.ttank = this.tmpEditTtank[alert.tank];
        this.tmpEditTtank[alert.tank] = null;
    };
    HomeAlerts.prototype.veSetTransportableTank = function (alert, ttank) {
        var _this = this;
        if (ttank) {
            alert.ttank = ttank;
        }
        console.log("ttank-----", ttank);
        console.log("posting alert-----", alert);
        this.request.put('/plc/alert.json', alert).subscribe(function (res) {
            console.log("alert ttank updated", res);
            _this.tmpEditTtank[alert.tank] = null;
        });
    };
    HomeAlerts.prototype.veProcessed = function (alert) {
        var _this = this;
        var self = this;
        alert.pt = this.lib.dateTime();
        console.log("alert.pt------", alert.pt);
        alert.status = 1;
        alert.pa = this.user.an;
        console.log("alert------", alert);
        this.request.put('/plc/processed/alert.json', alert).subscribe(function (res) {
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
                ready: function () { console.log('Ready'); jQuery('select').material_select(); },
                complete: function () { console.log('Closed'); } // Callback for Modal close
            });
            //  alert('getting models up');
        });
    };
    HomeAlerts.prototype.iniSocket = function () {
        var that = this;
        this.rtmgs.connect(3003);
        this.rtmgs.on('newPlcAlert', function (data) {
            console.log("got new alert---", data);
            if (data && data.pl && data.pl.alert) {
                that.alertsList.unshift(data.pl.alert);
                that.alertGroups = _.groupBy(that.alertsList, 'atype'); // TODO 余量报警 => 余量警报 sms can't use the word 报警
                console.log("that.alertGroups ----", that.alertGroups);
                that.hasData = true;
            }
        });
    };
    HomeAlerts.prototype.showTankMovingModal = function (alert) {
        console.log("selected alert----", alert);
        this.currentTankMovingAlert = alert;
        jQuery("#returnAlertDetailModal").openModal({
            ready: function () {
                // jQuery('select').material_select();
            }
        });
    };
    HomeAlerts.prototype.showDetailModal = function (alert) {
        var that = this;
        this.currentPlcTank = alert.tank;
        that.showModal = false;
        jQuery("#gasUsageDetailModal").openModal({
            ready: function () {
                that.showModal = true;
            }
        });
    };
    return HomeAlerts;
}());
HomeAlerts = __decorate([
    core_1.Component({
        selector: 'home-alerts',
        templateUrl: config_1.config.prefix + '/components/home/alerts/home.alerts.component.html',
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService,
        user_service_1.UserService,
        rt_messages_service_1.RTMessagesService,
        utils_service_1.UtilsService,
        lib_service_1.LibService])
], HomeAlerts);
exports.HomeAlerts = HomeAlerts;

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
var lib_service_1 = require("../../../services/lib.service");
var config_1 = require("../../../config");
// import {GasDetail} from './details/gas.detail.component';
var rt_messages_service_1 = require("../../../services/rt-messages.service");
var request_service_1 = require("../../../services/request.service");
var GasDetails = GasDetails_1 = (function () {
    function GasDetails(request, rtmgs, lib) {
        this.request = request;
        this.rtmgs = rtmgs;
        this.lib = lib;
        this.isShowByDay = true;
        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.years = [];
        this.startDays = [];
        this.endDays = [];
        this.detailmodal = {};
        this.goodConnection = false;
        this.dataTimer = 300000;
        this.lastDataTime = 0;
        this.currentPlcMetter = "1";
        this.chartData = [];
        this.gotTableData = false;
        this.realTimeData = {};
        this.connectedPlcs = [];
        this.selectedDownloadTab = 1;
        console.log("gas is up and running--->>>>");
        // realTimeData
        this.date = lib.dateTime();
        this.setYears(null);
    }
    GasDetails.prototype.ngOnInit = function () {
        this.setStatsInitValues();
        if (this.isShowByDay) {
            this.showByDay(true);
            this.selectedtab = 1;
        }
        else {
            this.selectedtab = 2;
            this.showByMonth(true);
        }
    };
    GasDetails.prototype.ngAfterViewInit = function () {
        this.updateTime();
    };
    GasDetails.prototype.ngOnDestroy = function () {
        clearInterval(this.dateTimer);
        // clearInterval(this.checkInterruptionTimer);
        GasDetails_1.graphIsRunning = false;
    };
    // code for detail modal
    GasDetails.prototype.showByDay = function (fromModal) {
        // alert('by day');
        console.log("by day");
        if (fromModal) {
            this.initChart();
        }
        this.isShowByDay = true;
        this.computeStats();
    };
    GasDetails.prototype.showByMonth = function (fromModal) {
        // alert('by month');
        console.log("by month");
        if (fromModal) {
            this.initChart();
        }
        this.isShowByDay = false;
        // re-initialize material-select
        // this.currentSelect = this.years;
        this.computeStats();
    };
    GasDetails.prototype.updateTime = function () {
        var _this = this;
        this.dateTimer = setInterval(function (_) {
            if (_this.goodConnection) {
                _this.date = _this.lib.dateTime();
            }
        }, 1000);
    };
    GasDetails.prototype.setYears = function (startYear) {
        var sY = startYear || 2009;
        var y = 2016;
        while (y >= sY) {
            this.years.push(y--);
        }
    };
    GasDetails.prototype.setDaysOfMonth = function (year, month) {
        this.startDays = [];
        var y = year || new Date().getFullYear();
        var m = month || new Date().getMonth() + 1;
        var numDays = this.lib.daysInMonth(y, m);
        for (var i = 0; i < numDays; i++) {
            this.startDays.push(i + 1);
        }
        console.log("this.days----", this.startDays);
    };
    //  statYearSelected(event){
    //
    //    console.log('year changed1----',event.target.value);
    //        this.currentStatSelectedYear = event.target.value;
    //  }
    GasDetails.prototype.statMothSelected = function (event) {
        //  console.log('month changed1----',event.target.value);
        //  this.currentStatSelectedMonth = event.target.value;
        //  this.setDaysOfMonth(this.currentStatSelectedYear,  this.currentStatSelectedMonth);
    };
    GasDetails.prototype.setStatsInitValues = function () {
        var d = new Date();
        this.statsEndDate = d.toISOString().slice(0, 10);
        d.setMonth(d.getMonth() - 1); //last month date;
        this.statsStartDate = d.toISOString().slice(0, 10);
        console.log("set stats date value-----", this.statsStartDate, this.statsEndDate);
    };
    GasDetails.prototype.getPlcStats = function () {
        var _this = this;
        this.statsData = [];
        var mode = "month";
        if (this.isShowByDay) {
            mode = "day";
        }
        this.gotTableData = false;
        console.log("get plc stats----", this.statsStartDate, this.statsEndDate, mode);
        this.request
            .get("/plc/stats/" +
            this.statsStartDate +
            "/" +
            this.statsEndDate +
            "/" +
            this.currentPlcTank +
            "/" +
            mode +
            ".json")
            .subscribe(function (resp) {
            console.log("plc stats-----", resp);
            if (resp && resp.pl && resp.pl.plc) {
                _this.statsData = resp.pl.plc;
            }
            _this.gotTableData = true;
        });
    };
    GasDetails.prototype.computeStats = function () {
        console.log("this.statsStartDate,this.statsEndDate------", this.statsStartDate, this.statsEndDate);
        this.getPlcStats();
    };
    GasDetails.prototype.downloadData = function () {
        var which = "";
        var mode = null;
        if (this.selectedDownloadTab === 1) {
            which = "instantaneous";
        }
        else if (this.selectedDownloadTab === 2) {
            which = "dayly-usage";
            mode = "day";
        }
        else if (this.selectedDownloadTab === 3) {
            which = "monthly-usage";
            mode = "month";
        }
        this.request
            .post("/plc/stats/download.json", {
            start: this.statsStartDate,
            end: this.statsEndDate,
            which: which,
            mode: mode,
            tank: this.currentPlcTank,
            meter: this.currentPlcMetter
        })
            .subscribe(function (res) {
            console.log("res-----", res);
            window.location.href = res.pl.file;
        });
    };
    GasDetails.prototype.initChart = function () {
        var _this = this;
        var that = this;
        this.request
            .get("/plc/forlasthours/" + this.currentPlcTank + ".json")
            .subscribe(function (resp) {
            console.log("plc stats chart data-->>>:---", resp);
            if (resp && resp.pl && resp.pl.plc) {
                _this.chartData = resp.pl.plc;
                _this.generateChart();
            }
        });
    };
    GasDetails.prototype.plcMeterChanged = function (event) {
        this.currentPlcMetter = event.target.value;
        this.generateChart();
    };
    GasDetails.prototype.generateChart = function () {
        var that = this;
        var Y;
        if (this.currentPlcMetter == "1") {
            Y = that.chartData.values || [];
        }
        else {
            Y = that.chartData.values2 || [];
        }
        Y.unshift("瞬时流量");
        var X = that.chartData.dates || [];
        X.unshift("x");
        var statsChart = c3.generate({
            bindto: "#statsChart",
            data: {
                x: "x",
                xFormat: "%Y-%m-%d %H:%M:%S",
                columns: [X, Y]
            },
            axis: {
                x: {
                    type: "timeseries",
                    tick: {
                        count: 24,
                        //  format: function (x) { return x.getFullYear(); }
                        format: "%H:%M" //how the date is displayed
                    }
                }
            }
        });
    };
    return GasDetails;
}());
GasDetails.graphIsRunning = false;
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GasDetails.prototype, "currentPlcTank", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GasDetails.prototype, "isShowByDay", void 0);
GasDetails = GasDetails_1 = __decorate([
    core_1.Component({
        selector: "gas-details",
        templateUrl: config_1.config.prefix + "/components/monitor/gas/gas-details.component.html"
        // directives:[GasDetail]
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService,
        rt_messages_service_1.RTMessagesService,
        lib_service_1.LibService])
], GasDetails);
exports.GasDetails = GasDetails;
var GasDetails_1;

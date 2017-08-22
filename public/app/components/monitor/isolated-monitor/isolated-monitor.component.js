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
var IsolatedMonitor = (function () {
    function IsolatedMonitor(request, rtmgs, lib) {
        this.request = request;
        this.rtmgs = rtmgs;
        this.lib = lib;
        this.availableStatsTanks = [
            { tank: 'G001', addr: '宝山', 'maxVal': '223424', usage: 2235552 },
            { tank: 'G011', addr: '闵行', 'maxVal': '22424', usage: 23222 },
            { tank: 'G021', addr: '徐汇', 'maxVal': '3424', usage: 22 },
            { tank: 'G031', addr: '静安', 'maxVal': '22223424', usage: 26782 },
            { tank: 'C041', addr: '黄埔', 'maxVal': '22893424', usage: 232 }
        ];
        this.statsData = [];
        console.log("gas-stats is up and running fine----->>>>---");
        // this.request.get('/plc/latest/withaddress.json').subscribe(resp => {
        //   console.log("latest plc>>>-----", resp);
        //   if (resp && resp.pl && resp.pl.plc && resp.pl.address) {
        //     this.realTimeData = resp.pl.plc;
        //     this.plcAddresses = _.keyBy(resp.pl.address, 'tank');
        //     this.connectedPlcs = _.orderBy(Object.keys(this.realTimeData), (o) => {
        //       return parseInt(o.slice(1, 4));
        //     }, ['asc']);
        //     this.currentPlcTank = this.connectedPlcs[0];
        //   }
        // });
    }
    IsolatedMonitor.prototype.ngOnInit = function () {
        this.getPlcStats();
    };
    IsolatedMonitor.prototype.getPlcStats = function () {
        var _this = this;
        this.statsData = [];
        // var mode = 'month';
        var mode = 'day';
        // if (this.isShowByDay) {
        //   mode = 'day';
        // }
        console.log('get plc stats----', this.statsStartDate, this.statsEndDate, mode);
        this.request.get('/plc/stats/' + this.statsStartDate + '/' + this.statsEndDate + '/' + this.currentPlcTank + '/' + mode + '.json').subscribe(function (resp) {
            console.log("plc stats-----", resp);
            if (resp && resp.pl && resp.pl.plc) {
                _this.statsData = resp.pl.plc;
            }
        });
    };
    return IsolatedMonitor;
}());
IsolatedMonitor = __decorate([
    core_1.Component({
        selector: 'isolated-monitor',
        templateUrl: config_1.config.prefix + '/components/monitor/isolated-monitor/isolated-monitor.component.html'
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService,
        rt_messages_service_1.RTMessagesService,
        lib_service_1.LibService])
], IsolatedMonitor);
exports.IsolatedMonitor = IsolatedMonitor;

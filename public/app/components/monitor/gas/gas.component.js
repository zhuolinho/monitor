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
var Gas = Gas_1 = (function () {
    function Gas(request, rtmgs, lib) {
        var _this = this;
        this.request = request;
        this.rtmgs = rtmgs;
        this.lib = lib;
        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.years = [];
        this.startDays = [];
        this.endDays = [];
        this.detailmodal = {};
        this.goodConnection = false;
        this.dataTimer = 300000;
        this.lastDataTime = 0;
        this.currentPlcMetter = '1';
        this.chartData = [];
        this.availableTanks = [];
        this.allTankSelected = false;
        this.selectedTanks = [];
        this.realTimeData = {};
        this.currentPlcTank = 'G001';
        this.connectedPlcs = [];
        this.showModal = false;
        this.plcAddresses = [];
        this.selectedDownloadTab = 1;
        this.newAlert = {
            st: [],
            atime: '',
            am: '',
            atype: '',
            addr: ''
        };
        console.log("gas is up and running--->>>>");
        // realTimeData
        this.date = lib.dateTime();
        this.setYears(null);
        this.request.get('/plc/latest/withaddress.json').subscribe(function (resp) {
            console.log("latest plc>>>-----", resp);
            if (resp && resp.pl && resp.pl.plc && resp.pl.address) {
                _this.realTimeData = resp.pl.plc;
                _this.plcAddresses = _.orderBy(resp.pl.address, function (o) {
                    if (o.addr) {
                        return parseInt(o.addr.slice(0, 3));
                    }
                    return undefined;
                }, ['asc']);
                _this.connectedPlcs = _.keyBy(_this.realTimeData, 'tank');
                console.log("this.connectedPlcs---", _this.connectedPlcs);
                if (_this.plcAddresses && _this.plcAddresses[0]) {
                    _this.currentPlcTank = _this.plcAddresses[0].tank; // TODO assuming there is matching plc available
                }
                _this.initSelect();
            }
        });
        this.request.get('/plc/tanks/all.json').subscribe(function (resp) {
            console.log("availableTanks>>>-----", resp);
            if (resp && resp.pl && resp.pl.tank && resp.pl.tank) {
                _this.availableTanks = resp.pl.tank;
            }
        });
    }
    Gas.prototype.ngAfterViewInit = function () {
        this.iniSocket();
        this.updateTime();
    };
    Gas.prototype.ngOnDestroy = function () {
        clearInterval(this.dateTimer);
        // clearInterval(this.checkInterruptionTimer);
        Gas_1.graphIsRunning = false;
    };
    Gas.prototype.updateTime = function () {
        var _this = this;
        this.dateTimer = setInterval(function (_) {
            if (_this.goodConnection) {
                _this.date = _this.lib.dateTime();
            }
        }, 1000);
    };
    // checkInterruption(){
    //     this.checkInterruptionTimer = setInterval(_=>{
    //       var currentTime  = Date.now();
    //       if((currentTime - this.lastDataTime)>this.dataTimer){
    //         this.goodConnection = false;
    //       }
    //     },100000);
    //   }
    Gas.prototype.veReturnSelectedTanks = function () {
        this.createNewAlert("拉回报警");
    };
    Gas.prototype.veAddSelectedTanks = function () {
        this.createNewAlert("进场报警");
    };
    Gas.prototype.createNewAlert = function (type) {
        console.log("selectedTanks--", this.selectedTanks.length, this.selectedTanks);
        this.newAlert = {
            st: [],
            atime: '',
            am: '',
            atype: '',
            addr: ''
        };
        if (this.selectedTanks.length) {
            for (var i = 0; i < this.selectedTanks.length; i++) {
                this.newAlert.st.push({ ti: this.selectedTanks[i].tank });
            }
            this.newAlert.am = type;
            this.newAlert.atype = type;
            this.newAlert.atime = this.lib.dateTime();
            this.newAlert.addr = "C003-闸北区大宁路3325号";
            console.log("posting--", this.newAlert);
            this.request.post('/plc/alert.json', this.newAlert).subscribe(function (res) {
                console.log("alert created----", res);
                jQuery('#moveTanksFeedbackModal').openModal();
            });
        }
    };
    Gas.prototype.veToggleSelectAllTanks = function () {
        this.selectedTanks = [];
        if (!this.allTankSelected) {
            for (var i = 0; i < this.availableTanks.length; i++) {
                this.availableTanks[i].selected = true;
            }
            this.selectedTanks = _.clone(this.availableTanks);
        }
        else {
            for (var i = 0; i < this.availableTanks.length; i++) {
                this.availableTanks[i].selected = false;
            }
        }
        //  console.log("this.selectedTanks ----",this.selectedTanks.length, this.selectedTanks );
        this.allTankSelected = !this.allTankSelected;
    };
    Gas.prototype.veToggleSelectTank = function (tank) {
        tank.selected = !tank.selected;
        console.log("veToggleSelectTank----", tank);
        if (tank.selected) {
            this.selectedTanks.push(tank);
        }
        else {
            var array = _.remove(this.selectedTanks, function (o) {
                return o.tank == tank.tank;
            });
        }
    };
    Gas.prototype.iniSocket = function () {
        var that = this;
        this.rtmgs.connect(3003);
        this.rtmgs.on('realTimePlc', function (data) {
            if (!that.goodConnection) {
                that.goodConnection = true;
            }
            console.log("realTimePlc-----", data);
            if (data && data.pl && data.pl.plc) {
                // that.realTimeData = _.keyBy(data.pl.plc,'tank');
                that.realTimeData = data.pl.plc;
                this.connectedPlcs = _.keyBy(that.realTimeData, 'tank');
                jQuery('select:not(simple-select)').material_select();
            }
        });
        this.rtmgs.on('plcDataInterruption', function (data) {
            console.log('plcDataInterruption', data);
            that.goodConnection = false;
        });
    };
    Gas.prototype.initSelect = function () {
        var that = this;
        setTimeout(function (_) {
            jQuery('select:not(simple-select)').material_select();
            jQuery('select.current-plc').change(function (e) {
                console.log('changed');
                that.setCurrentPlc(e);
            });
        });
    };
    Gas.prototype.setCurrentPlc = function (event) {
        this.currentPlcTank = event.target.value;
        console.log('this.currentPlcTank---', this.currentPlcTank);
    };
    Gas.prototype.setYears = function (startYear) {
        var sY = startYear || 2009;
        var y = 2016;
        while (y >= sY) {
            this.years.push(y--);
        }
    };
    Gas.prototype.setDaysOfMonth = function (year, month) {
        this.startDays = [];
        var y = year || new Date().getFullYear();
        var m = month || new Date().getMonth() + 1;
        var numDays = this.lib.daysInMonth(y, m);
        for (var i = 0; i < numDays; i++) {
            this.startDays.push(i + 1);
        }
        console.log("this.days----", this.startDays);
    };
    Gas.prototype.showDetailModal = function (param) {
        var that = this;
        if (param === 'day') {
            this.isShowByDay = true;
        }
        else if (param === 'month') {
            this.isShowByDay = false;
        }
        that.showModal = false;
        jQuery("#gasUsageDetailModal").openModal({
            ready: function () {
                that.showModal = true;
            }
        });
    };
    return Gas;
}());
Gas.graphIsRunning = false;
Gas = Gas_1 = __decorate([
    core_1.Component({
        selector: 'gas',
        templateUrl: config_1.config.prefix + '/components/monitor/gas/gas.component.html'
        // directives:[GasDetail]
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService,
        rt_messages_service_1.RTMessagesService,
        lib_service_1.LibService])
], Gas);
exports.Gas = Gas;
var Gas_1;
// availableTanks: any[] = [
//   { id: '12345', selected: false },
//   { id: '62545', selected: false },
//   { id: '27456', selected: false },
//   { id: '72145', selected: false },
//   { id: '19345', selected: false },
//   { id: '82345', selected: false },
//   { id: '32345', selected: false },
//   { id: '11345', selected: false },
//   { id: '22345', selected: false },
//   { id: '82322', selected: false },
//   { id: '22325', selected: false },
//   { id: '99345', selected: false },
//   { id: '902345', selected: false },
//   { id: '102345', selected: false },
//   { id: '444235', selected: false },
//   { id: '602345', selected: false },
//   { id: '62340', selected: false },
//   { id: '72305', selected: false },
//   { id: '50345', selected: false },
//   { id: '56665', selected: false }
// ]

System.register(['angular2/core', '../../../services/lib.service', '../../../config', '../../../services/request.service'], function(exports_1, context_1) {
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
    var core_1, lib_service_1, config_1, request_service_1;
    var Gas;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lib_service_1_1) {
                lib_service_1 = lib_service_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            }],
        execute: function() {
            Gas = (function () {
                function Gas(request, lib) {
                    var _this = this;
                    this.request = request;
                    this.lib = lib;
                    this.tableByday = [{ code: 'C002', date: '1月1号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月2号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月3号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月4号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月5号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月6号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月7号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月8号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月9号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月10号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月11号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月12号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月13号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月14号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月15号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月16号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月17号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月18号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月19号', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '1月20号', if: 0.0000, af: 0.0000, mf: 0.0000 }
                    ];
                    this.tableByMonth = [
                        { code: 'C002', date: '1月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '2月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '3月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '4月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '5月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '6月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '7月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '8月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '9月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '10月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '11月份', if: 0.0000, af: 0.0000, mf: 0.0000 },
                        { code: 'C002', date: '12月份', if: 0.0000, af: 0.0000, mf: 0.0000 }
                    ];
                    this.months = ['2016年1月', '2016年2月', '2016年3月', '2016年4月', '2016年5月', '2016年6月', '2016年7月', '2016年8月', '2016年9月', '2016年10月', '2016年11月', '2016年12月'];
                    this.years = ['2016年', '2015年', '2014年', '2013年', '2012年', '2011年', '2010年', '2009年', '2008年', '2007年'];
                    this.days = ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日',
                        '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日',
                        '25日', '26日', '27日', '28日', '29日', '30日', '31日'
                    ];
                    this.detailmodal = {};
                    this.availableTanks = [
                        { id: '12345', selected: false },
                        { id: '62545', selected: false },
                        { id: '27456', selected: false },
                        { id: '72145', selected: false },
                        { id: '19345', selected: false },
                        { id: '82345', selected: false },
                        { id: '32345', selected: false },
                        { id: '11345', selected: false },
                        { id: '22345', selected: false },
                        { id: '82322', selected: false },
                        { id: '22325', selected: false },
                        { id: '99345', selected: false },
                        { id: '902345', selected: false },
                        { id: '102345', selected: false },
                        { id: '444235', selected: false },
                        { id: '602345', selected: false },
                        { id: '62340', selected: false },
                        { id: '72305', selected: false },
                        { id: '50345', selected: false },
                        { id: '56665', selected: false }
                    ];
                    this.allTankSelected = false;
                    this.selectedTanks = [];
                    this.newAlert = {
                        st: [],
                        atime: '',
                        am: '',
                        atype: '',
                        addr: ''
                    };
                    console.log("gas is up and running");
                    // realTimeData
                    this.request.get('/plc/latest.json').subscribe(function (resp) {
                        console.log("latest plc-----", resp);
                        if (resp && resp.pl && resp.pl.plc) {
                            _this.realTimeData = resp.pl.plc;
                        }
                    });
                }
                Gas.prototype.ngAfterViewInit = function () {
                    this.iniSocket();
                    this.initSelect();
                    this.initModal();
                    this.showByDay();
                };
                Gas.prototype.initSelect = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
                };
                Gas.prototype.veReturnSelectedTanks = function () {
                    this.createNewAlert("拉回报警");
                };
                Gas.prototype.veAddSelectedTanks = function () {
                    this.createNewAlert("进场报警");
                };
                Gas.prototype.createNewAlert = function (type) {
                    console.log("selectedTanks--", this.selectedTanks.length, this.selectedTanks);
                    if (this.selectedTanks.length) {
                        for (var i = 0; i < this.selectedTanks.length; i++) {
                            this.newAlert.st.push({ ti: this.selectedTanks[i].id });
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
                        this.selectedTanks = this.availableTanks;
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
                    if (tank.selected) {
                        this.selectedTanks.push(tank);
                    }
                    else {
                        var array = _.remove(this.selectedTanks, function (o) {
                            return o.id == tank.id;
                        });
                    }
                };
                Gas.prototype.iniSocket = function () {
                    var that = this;
                    var url = 'http://139.196.18.222:3003';
                    if (window.location.hostname.indexOf('localhost') >= 0) {
                        url = 'http://localhost:3003';
                    }
                    var socket = io(url);
                    socket.on('realTimePlc', function (data) {
                        console.log("realTimePlc-----", data);
                        if (data && data.pl && data.pl.plc) {
                            that.realTimeData = data.pl.plc;
                        }
                    });
                };
                Gas.prototype.initModal = function () {
                    var that = this;
                    // gasUsageDetailModal
                    // setTimeout(_=>{
                    //     jQuery('.modal-trigger').leanModal({
                    //          dismissible: true, // Modal can be dismissed by clicking outside of the modal
                    //          opacity: .5, // Opacity of modal background
                    //          in_duration: 300, // Transition in duration
                    //          out_duration: 200, // Transition out duration
                    //          ready: function() { console.log('Ready');}, // Callback for Modal open
                    //          complete: function() { console.log('Closed'); } // Callback for Modal close
                    //    });
                    //   //  alert('getting models up');
                    // });
                };
                Gas.prototype.showDetailModal = function (mail) {
                    jQuery("#gasUsageDetailModal").openModal();
                };
                // code for detail modal
                Gas.prototype.showByDay = function () {
                    // alert('by day');
                    console.log("by day");
                    this.currentTable = this.tableByday;
                    this.currentSelect = this.months;
                    this.initSelect();
                };
                Gas.prototype.showByMonth = function () {
                    //  alert('by month');
                    console.log("by month");
                    this.currentTable = this.tableByMonth;
                    this.currentSelect = this.years;
                    this.initSelect();
                };
                Gas = __decorate([
                    core_1.Component({
                        selector: 'gas',
                        templateUrl: config_1.config.prefix + '/components/monitor/gas/gas.component.html'
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService, lib_service_1.LibService])
                ], Gas);
                return Gas;
            }());
            exports_1("Gas", Gas);
        }
    }
});

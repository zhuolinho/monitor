System.register(['@angular/core', '../../../services/lib.service', '../../../config', '../../../services/rt-messages.service', '../../../services/request.service'], function(exports_1, context_1) {
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
    var core_1, lib_service_1, config_1, rt_messages_service_1, request_service_1;
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
            function (rt_messages_service_1_1) {
                rt_messages_service_1 = rt_messages_service_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            }],
        execute: function() {
            Gas = (function () {
                function Gas(request, rtmgs, lib) {
                    var _this = this;
                    this.request = request;
                    this.rtmgs = rtmgs;
                    this.lib = lib;
                    // tableByday:any[] = [{code:'C002',date:'1月1号', if:0.0000, af:0.0000, mf:0.0000},  // Instantaneous flow,average flow,max flow
                    //                     {code:'C002',date:'1月2号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月3号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月4号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月5号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月6号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月7号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月8号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月9号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月10号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月11号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月12号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月13号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月14号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月15号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月16号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月17号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月18号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月19号', if:0.0000, af:0.0000, mf:0.0000},
                    //                     {code:'C002',date:'1月20号', if:0.0000, af:0.0000, mf:0.0000}
                    //   ];
                    //
                    //
                    //
                    //   tableByMonth:any[] = [
                    //                       {code:'C002',date:'1月份', if:0.0000, af:0.0000, mf:0.0000},  // Instantaneous flow,average flow,max flow
                    //                       {code:'C002',date:'2月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'3月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'4月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'5月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'6月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'7月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'8月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'9月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'10月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'11月份', if:0.0000, af:0.0000, mf:0.0000},
                    //                       {code:'C002',date:'12月份', if:0.0000, af:0.0000, mf:0.0000}
                    //     ];
                    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                    // months:string[] = ['2016年1月','2016年2月','2016年3月','2016年4月','2016年5月','2016年6月','2016年7月','2016年8月','2016年9月','2016年10月','2016年11月','2016年12月'];
                    this.years = [];
                    // days:string[] = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日',
                    //                   '13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日',
                    //                   '25日','26日','27日','28日','29日','30日','31日'
                    //                 ];
                    this.startDays = [];
                    this.endDays = [];
                    this.detailmodal = {};
                    this.goodConnection = false;
                    this.dataTimer = 300000;
                    this.lastDataTime = 0;
                    this.chartData = [];
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
                    this.date = lib.dateTime();
                    this.setYears(null);
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
                    this.updateTime();
                    this.getChartdata();
                    // this.checkInterruption();
                };
                Gas.prototype.ngOnDestroy = function () {
                    clearInterval(this.dateTimer);
                    // clearInterval(this.checkInterruptionTimer);
                    Gas.graphIsRunning = false;
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
                //  iniSocket(){
                //       var that = this;
                //        var url = 'http://'+window.location.hostname+':3003';
                //        var socket = io(url);
                //       socket.on('realTimePlc', function(data){
                //
                //         if(!that.goodConnection){
                //           that.goodConnection = true;
                //         }
                //
                //         console.log("realTimePlc-----",data);
                //         if(data&&data.pl&& data.pl.plc){
                //             that.realTimeData = data.pl.plc;
                //         }
                //
                //       });
                //
                //
                //       socket.on('plcDataInterruption', function(data){
                //             console.log('plcDataInterruption', data);
                //             that.goodConnection = false;
                //       });
                //    }
                Gas.prototype.iniSocket = function () {
                    var that = this;
                    this.rtmgs.connect(3003);
                    this.rtmgs.on('realTimePlc', function (data) {
                        if (!that.goodConnection) {
                            that.goodConnection = true;
                        }
                        console.log("realTimePlc-----", data);
                        if (data && data.pl && data.pl.plc) {
                            that.realTimeData = data.pl.plc;
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
                        // jQuery('select.select-year').change(function(e){
                        //           that.statYearSelected(e);
                        // });
                        //
                        // jQuery('select.select-month').change(function(e){
                        //     that.statMothSelected(e);
                        // });
                    });
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
                //  statYearSelected(event){
                //
                //    console.log('year changed1----',event.target.value);
                //        this.currentStatSelectedYear = event.target.value;
                //  }
                Gas.prototype.statMothSelected = function (event) {
                    //  console.log('month changed1----',event.target.value);
                    //  this.currentStatSelectedMonth = event.target.value;
                    //  this.setDaysOfMonth(this.currentStatSelectedYear,  this.currentStatSelectedMonth);
                };
                Gas.prototype.showDetailModal = function (param) {
                    var that = this;
                    this.setStatsInitValues();
                    jQuery("#gasUsageDetailModal").openModal({
                        ready: function () {
                            that.initChart();
                        }
                    });
                };
                Gas.prototype.setStatsInitValues = function () {
                    var d = new Date();
                    this.statsEndDate = d.toISOString().slice(0, 10);
                    d.setMonth(d.getMonth() - 1); //last month date;
                    this.statsStartDate = d.toISOString().slice(0, 10);
                    console.log('set stats date value-----', this.statsStartDate, this.statsEndDate);
                    //
                    // var d = new Date();
                    // this.statSelectedStartYear = d.getFullYear();
                    // this.statSelectedEndYear = d.getFullYear();
                    // this.statSelectedStartMonth = d.getMonth();
                    // this.statSelectedEndMonth = d.getMonth()+1;
                    // this.statSelecteEndDay = 1;
                    // this.statSelectedStartDay = 1;
                };
                Gas.prototype.getChartdata = function () {
                    var _this = this;
                    this.request.get('/plc/forlasthours.json').subscribe(function (resp) {
                        console.log("plc stats chart data-----", resp);
                        if (resp && resp.pl && resp.pl.plc) {
                            _this.chartData = resp.pl.plc;
                        }
                        console.log("plc stats chart data-----", _this.chartData);
                    });
                };
                Gas.prototype.getPlcStats = function () {
                    var _this = this;
                    this.statsData = [];
                    console.log('get plc stats----', this.statsStartDate, this.statsEndDate);
                    // var starty = '';
                    // var startm = '';
                    // var startd = '';
                    // var endy = '';
                    // var endm = '';
                    // var endd = '';
                    var mode = false;
                    if (this.showByDay) {
                        mode = true;
                    }
                    this.request.get('/plc/stats/' + this.statsStartDate + '/' + this.statsEndDate + '/' + mode + '.json').subscribe(function (resp) {
                        console.log("plc stats-----", resp);
                        if (resp && resp.pl && resp.pl.plc) {
                            _this.statsData = resp.pl.plc;
                        }
                    });
                };
                Gas.prototype.computeStats = function () {
                    console.log('this.statsStartDate,this.statsEndDate------', this.statsStartDate, this.statsEndDate);
                    this.getPlcStats();
                };
                Gas.prototype.downloadData = function () {
                    this.request.post('/plc/stats/download.json', this.statsData).subscribe(function (res) {
                        console.log("res-----", res);
                        window.location = res.pl.file;
                    });
                };
                // code for detail modal
                Gas.prototype.showByDay = function (fromModal) {
                    // alert('by day');
                    console.log("by day");
                    if (fromModal) {
                        this.initChart();
                    }
                    this.isShowByDay = true;
                    // var d = new Date();
                    // this.currentStatSelectedYear = d.getFullYear();
                    // this.currentStatSelectedMonth = d.getMonth()+1;
                    // re-initialize material-select
                    // this.setDaysOfMonth(null,null);
                    this.computeStats();
                    setTimeout(function (_) {
                        // jQuery('.select-year').val(this.currentStatSelectedYear);
                        // jQuery('.select-month').val(this.currentStatSelectedMonth);
                        // this.initSelect();
                    });
                };
                Gas.prototype.showByMonth = function (fromModal) {
                    // alert('by month');
                    console.log("by month");
                    if (fromModal) {
                        this.initChart();
                    }
                    this.isShowByDay = false;
                    // var d = new Date();
                    // this.currentStatSelectedYear = d.getFullYear();
                    // this.currentStatSelectedMonth =  0;
                    // re-initialize material-select
                    this.currentSelect = this.years;
                    this.computeStats();
                    setTimeout(function (_) {
                        // jQuery('.select-year').val(this.currentStatSelectedYear);
                        // this.initSelect();
                    });
                };
                Gas.prototype.initChart = function () {
                    var that = this;
                    console.log("init grapth----", that.chartData);
                    var Y = that.chartData.values || [];
                    Y.unshift("瞬时流量");
                    var X = that.chartData.dates || [];
                    X.unshift('x');
                    var statsChart = c3.generate({
                        bindto: '#statsChart',
                        data: {
                            x: 'x',
                            xFormat: '%Y-%m-%d %H:%M:%S',
                            columns: [X, Y]
                        },
                        axis: {
                            x: {
                                type: 'timeseries',
                                tick: {
                                    count: 12,
                                    format: '%H:%M' //how the date is displayed
                                }
                            }
                        }
                    });
                };
                Gas.graphIsRunning = false;
                Gas = __decorate([
                    core_1.Component({
                        selector: 'gas',
                        templateUrl: config_1.config.prefix + '/components/monitor/gas/gas.component.html'
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService, rt_messages_service_1.RTMessagesService, lib_service_1.LibService])
                ], Gas);
                return Gas;
            }());
            exports_1("Gas", Gas);
        }
    }
});

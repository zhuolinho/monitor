System.register(["@angular/core", "../../../services/lib.service", "../../../config", "../../../services/rt-messages.service", "../../../services/request.service"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, lib_service_1, config_1, rt_messages_service_1, request_service_1, GasStats;
    return {
        setters: [
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
            }
        ],
        execute: function () {
            GasStats = (function () {
                function GasStats(request, rtmgs, lib) {
                    this.request = request;
                    this.rtmgs = rtmgs;
                    this.lib = lib;
                    this.availableStatsTanks = [
                        { tank: 'G001', addr: '宝山', 'maxVal': '223424', usage: 225552 },
                        { tank: 'G011', addr: '闵行', 'maxVal': '22424', usage: 23222 },
                        { tank: 'G021', addr: '徐汇', 'maxVal': '3424', usage: 22 },
                        { tank: 'G031', addr: '静安', 'maxVal': '22223424', usage: 26782 },
                        { tank: 'C041', addr: '黄埔', 'maxVal': '22893424', usage: 232 }
                    ];
                    console.log("gas-stats is up and running----->>>>---");
                    this.showAllPlc();
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
                GasStats.prototype.ngOnInit = function () {
                    this.showAllPlc();
                };
                GasStats.prototype.showAllPlc = function () {
                    var _this = this;
                    this.request.get('/plc/connected/get-all.json')
                        .subscribe(function (res) {
                        var list = {};
                        res.pl.address.forEach(function (obj) {
                            list[obj.tank] = obj;
                        });
                        _this.realTimeData = res.pl.plc.map(function (obj) { obj.addr = list[obj.tank].addr; return obj; });
                    });
                };
                GasStats = __decorate([
                    core_1.Component({
                        selector: 'gas-stats',
                        templateUrl: config_1.config.prefix + '/components/monitor/gas-stats/gas-stats.component.html'
                    }),
                    __metadata("design:paramtypes", [request_service_1.RequestService,
                        rt_messages_service_1.RTMessagesService,
                        lib_service_1.LibService])
                ], GasStats);
                return GasStats;
            }());
            exports_1("GasStats", GasStats);
        }
    };
});

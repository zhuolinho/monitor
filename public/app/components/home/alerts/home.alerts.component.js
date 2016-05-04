System.register(['angular2/core', '../../../config', './details/home.alerts.detail.component', './return_details/home.return.alerts.detail.component', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, config_1, home_alerts_detail_component_1, home_return_alerts_detail_component_1, common_1;
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
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            HomeAlerts = (function () {
                function HomeAlerts() {
                    this.alertsList = [
                        {
                            name: 'C002-闸北区大宁路335号XX站',
                            id: '6848',
                            type: '余量报警',
                            remainingTime: '2小时02分',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '6%/12kg/hps',
                            processedAgent: '234'
                        },
                        {
                            name: 'C003-闸北区大宁路335号XX站',
                            id: '6848',
                            type: '余量报警',
                            remainingTime: '2小时02分',
                            upTime: '15.5.3-13:02/----',
                            processed: true,
                            alertTime: '5.5.3-13:02',
                            alertValue: '6%/12kg/hps'
                        },
                        {
                            name: 'C004-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '信号中断',
                            remainingTime: '',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '信号中断'
                        },
                        {
                            name: 'C005-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '信号中断',
                            remainingTime: '',
                            upTime: '15.5.3-13:02/----',
                            processed: true,
                            alertTime: '5.5.3-13:02',
                            alertValue: '信号中断'
                        },
                        {
                            name: 'C006-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '信号中断',
                            remainingTime: '',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '信号中断'
                        },
                        {
                            name: 'C007-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '信号中断',
                            remainingTime: '',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '信号中断'
                        },
                        {
                            name: 'C007-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '泄漏报警',
                            remainingTime: '',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '泄漏报警'
                        },
                        {
                            name: 'C007-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '泄漏报警',
                            remainingTime: '',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '泄漏报警'
                        },
                        {
                            name: 'C007-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '压力报警',
                            remainingTime: '',
                            upTime: '15.5.3-13:02/----',
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            alertValue: '压力报警'
                        },
                        {
                            name: 'C007-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '压力报警',
                            remainingTime: '',
                            upTime: '15.5.3-13:02/----',
                            processed: true,
                            alertTime: '5.5.3-13:02',
                            alertValue: '压力报警'
                        },
                        {
                            name: 'C007-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '拉回报警',
                            selectedTanks: ['12345', '62545', '27456', '72145', '19345', '92342', '82345', '63245', '63245', '63245', '63245', '63245', '63245', '63245'],
                            processed: false,
                            alertTime: '5.5.3-13:02',
                            processedAgent: '267',
                            alertValue: '拉回报警'
                        },
                        {
                            name: 'C007-闸北区大宁路335号XX站',
                            id: '6832',
                            type: '拉回报警',
                            selectedTanks: ['12345', '62545', '27456', '72145', '19345', '92342', '82345', '63245', '63245', '63245', '63245', '63245', '63245', '63245'],
                            processed: true,
                            alertTime: '5.5.2-11:00',
                            processedAgent: '428',
                            alertValue: '拉回报警'
                        }
                    ]; //todo user flag and ng if to hide when filtering;
                    this.currentSort = 'all';
                    console.log("Home alerts is up and running");
                    this.initModal();
                }
                HomeAlerts.prototype.veSortByShortage = function () {
                    if (this.currentSort != '余量报警') {
                        this.currentSort = '余量报警';
                    }
                };
                HomeAlerts.prototype.veSortBySingal = function () {
                    if (this.currentSort != '信号中断') {
                        this.currentSort = '信号中断';
                    }
                };
                HomeAlerts.prototype.veSortByPresure = function () {
                    if (this.currentSort != '压力报警') {
                        this.currentSort = '压力报警';
                    }
                };
                HomeAlerts.prototype.veSortByLeakage = function () {
                    if (this.currentSort != '泄漏报警') {
                        this.currentSort = '泄漏报警';
                    }
                };
                HomeAlerts.prototype.veSortByReturn = function () {
                    if (this.currentSort != '拉回报警') {
                        this.currentSort = '拉回报警';
                    }
                };
                HomeAlerts.prototype.veProcessed = function (alert) {
                    alert.processed = !alert.processed;
                };
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
                        //  alert('getting models up');
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
                        directives: [home_alerts_detail_component_1.HomeAlertsDetail, home_return_alerts_detail_component_1.HomeReturnAlertsDetail, common_1.CORE_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomeAlerts);
                return HomeAlerts;
            }());
            exports_1("HomeAlerts", HomeAlerts);
        }
    }
});

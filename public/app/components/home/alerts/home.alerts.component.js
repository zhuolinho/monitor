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
                    // alertsList:any[]=[
                    //     {
                    //       name:'C002-闸北区大宁路335号XX站',
                    //       id:'6848',
                    //       type:'余量报警',
                    //       remainingTime:'2小时02分',
                    //       upTime:'15.5.3-13:02/----',
                    //       processed:false,
                    //       alertTime:'5.5.3-13:02',
                    //       alertValue:'6%/12kg/hps',
                    //       processedAgent:'234'
                    //     },
                    //     {
                    //       name:'C003-闸北区大宁路335号XX站',
                    //       id:'6848',
                    //       type:'余量报警',
                    //       remainingTime:'2小时02分',
                    //       upTime:'15.5.3-13:02/----',
                    //       processed:true,
                    //       alertTime:'5.5.3-13:02',
                    //       alertValue:'6%/12kg/hps'
                    //     },
                    //     {
                    //       name:'C004-闸北区大宁路335号XX站',
                    //       id:'6832',
                    //       type:'信号中断',
                    //       remainingTime:'',
                    //       upTime:'15.5.3-13:02/----',
                    //       processed:false,
                    //       alertTime:'5.5.3-13:02',
                    //       alertValue:'信号中断'
                    //     }
                    //     ,  {
                    //         name:'C005-闸北区大宁路335号XX站',
                    //         id:'6832',
                    //         type:'信号中断',
                    //         remainingTime:'',
                    //         upTime:'15.5.3-13:02/----',
                    //         processed:true,
                    //         alertTime:'5.5.3-13:02',
                    //         alertValue:'信号中断'
                    //       },
                    //       {
                    //         name:'C006-闸北区大宁路335号XX站',
                    //         id:'6832',
                    //         type:'信号中断',
                    //         remainingTime:'',
                    //         upTime:'15.5.3-13:02/----',
                    //         processed:false,
                    //         alertTime:'5.5.3-13:02',
                    //         alertValue:'信号中断'
                    //       },
                    //       {
                    //         name:'C007-闸北区大宁路335号XX站',
                    //         id:'6832',
                    //         type:'信号中断',
                    //         remainingTime:'',
                    //         upTime:'15.5.3-13:02/----',
                    //         processed:false,
                    //         alertTime:'5.5.3-13:02',
                    //         alertValue:'信号中断'
                    //       },
                    //       {
                    //         name:'C007-闸北区大宁路335号XX站',
                    //         id:'6832',
                    //         type:'泄漏报警',
                    //         remainingTime:'',
                    //         upTime:'15.5.3-13:02/----',
                    //         processed:false,
                    //         alertTime:'5.5.3-13:02',
                    //         alertValue:'泄漏报警'
                    //       },
                    //       {
                    //         name:'C007-闸北区大宁路335号XX站',
                    //         id:'6832',
                    //         type:'泄漏报警',
                    //         remainingTime:'',
                    //         upTime:'15.5.3-13:02/----',
                    //         processed:false,
                    //         alertTime:'5.5.3-13:02',
                    //         alertValue:'泄漏报警'
                    //       },
                    //       {
                    //         name:'C007-闸北区大宁路335号XX站',
                    //         id:'6832',
                    //         type:'压力报警',
                    //         remainingTime:'',
                    //         upTime:'15.5.3-13:02/----',
                    //         processed:false,
                    //         alertTime:'5.5.3-13:02',
                    //         alertValue:'压力报警'
                    //       },
                    //       {
                    //         name:'C007-闸北区大宁路335号XX站',
                    //         id:'6832',
                    //         type:'压力报警',
                    //         remainingTime:'',
                    //         upTime:'15.5.3-13:02/----',
                    //         processed:true,
                    //         alertTime:'5.5.3-13:02',
                    //         alertValue:'压力报警'
                    //       },
                    //       {
                    //         name:'C007-闸北区大宁路335号XX站',
                    //         id:'6832',
                    //         type:'拉回报警',
                    //         selectedTanks:['J1235','J6245','C27456','C7245','C1935','C92342','C82345','C63245','C63245'],
                    //         processed:false,
                    //         alertTime:'5.5.3-13:02',
                    //         processedAgent:'267',
                    //         alertValue:'拉回报警'
                    //       },
                    //       {
                    //         name:'C007-闸北区大宁路335号XX站',
                    //         id:'6832',
                    //         type:'拉回报警',
                    //         selectedTanks:['D12345','D62545','D27456','D72145','D19345','D92342','D82345','D63245','D63245','D63245'],
                    //         processed:true,
                    //         alertTime:'5.5.2-11:00',
                    //         processedAgent:'428',
                    //         alertValue:'拉回报警'
                    //       },
                    //       {
                    //         name:'C007-闸北区大宁路335号',
                    //         id:'1111',
                    //         type:'进场报警',
                    //         selectedTanks:['D82345','J62545','J27456','J72145','J19345','C92342','C82345','C63245','C63245','C63245','C63245','C63245','C63245','D63245'],
                    //         processed:false,
                    //         alertTime:'5.2.10-16:01',
                    //         processedAgent:'223',
                    //         alertValue:'进场报警'
                    //       },
                    //       {
                    //         name:'C007-闸北区大宁路335号',
                    //         id:'3333',
                    //         type:'进场报警',
                    //         selectedTanks:['C22345','C6666','8889','C72145','C19345','J92342','J82345','J63245','J3245','J3245','J3245','D3245','G3645','C9245'],
                    //         processed:true,
                    //         alertTime:'5.2.10-16:01',
                    //         processedAgent:'888',
                    //         alertValue:'进场报警'
                    //       }
                    //
                    //
                    // ];  //todo user flag and ng if to hide when filtering;
                    this.currentSort = 'all';
                    this.alertsList = [];
                    console.log("Home alerts is up and running");
                    this.user = this.userSrvc.getUser();
                    console.log("this.user----", this.user);
                    this.request.get('/plc/alerts/unprocessed').subscribe(function (res) {
                        if (res.pl && res.pl.alerts) {
                            _this.alertsList = res.pl.alerts;
                            console.log("this.alertsList---", _this.alertsList);
                        }
                        _this.initUi();
                    });
                    // /plc/alerts/all
                }
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
                    alert.pt = this.libSrvc.dateTime();
                    alert.status = 1;
                    alert.pa = this.user.an;
                    this.request.put('/plc/alert', alert).subscribe(function (res) {
                        console.log("alert updated", res);
                    });
                };
                HomeAlerts.prototype.initUi = function () {
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
                    __metadata('design:paramtypes', [request_service_1.RequestService, user_service_1.UserService, lib_service_1.LibService])
                ], HomeAlerts);
                return HomeAlerts;
            }());
            exports_1("HomeAlerts", HomeAlerts);
        }
    }
});

System.register(['angular2/core', '../../../config', '../../../services/request.service'], function(exports_1, context_1) {
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
    var core_1, config_1, request_service_1;
    var ProcessedShipment;
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
            }],
        execute: function() {
            ProcessedShipment = (function () {
                function ProcessedShipment(request) {
                    this.request = request;
                    // shipments:any[] =[];
                    // 'CNG','LNG','集格','杜瓦瓶','进场','拉回'
                    //
                    // sim:{type:String,required:true},  //sim card CAN BE REVERENCE TO TO GPS
                    // dest:String,
                    // dt:{type:Date, default: Date.now}, //departure time
                    // at:String, //arrival time
                    // origin:String,
                    // s:String, //Supercargo 押运员
                    // dist:String, //distance
                    // lp:{type:String,required:true},//license plate
                    // driver:String,
                    // rs:{type:String,default:""}, //refill station 加气站
                    // oti:String, //original tank id(原罐号)
                    // nti:String, //new tank id (换罐号)
                    // ntt:String, //new tank type;
                    // ed:String,  //estimated duration
                    // status:{type:Number,default:0} //0 ongoing , 1 done
                    this.shipments = [{
                            groupId: 1,
                            groupName: "CNG",
                            data: [{
                                    oti: 'C002-6328',
                                    nti: '6328',
                                    dt: '5.2-14:33',
                                    at: '5.2-23:10',
                                    lp: '2632',
                                    driver: '761',
                                    s: '822',
                                    alertType: '余量报警',
                                    typeId: 1,
                                },
                                {
                                    code: 'C002-6379',
                                    alertTime: '5.2-14:02',
                                    processedTime: '5.6-11:20',
                                    processedAgent: '2322',
                                    alertType: '余量报警',
                                    typeId: 1,
                                }
                            ] },
                        {
                            groupId: 2,
                            groupName: "LNG",
                            data: [{
                                    code: 'C003-9328',
                                    alertTime: '5.2-14:02',
                                    processedTime: '5.3-14:03',
                                    processedAgent: '2320',
                                    alertType: '压力报警',
                                    typeId: 2,
                                },
                                {
                                    code: 'C005-8370',
                                    alertTime: '5.2-14:02',
                                    processedTime: '5.1-11:12',
                                    processedAgent: '2372',
                                    alertType: '压力报警',
                                    typeId: 2,
                                }
                            ] },
                        {
                            groupId: 3,
                            groupName: "信号中断",
                            data: [{
                                    code: 'C004-9628',
                                    alertTime: '5.2-13:12',
                                    processedTime: '5.3-14:03',
                                    processedAgent: '4920',
                                    alertType: '信号中断',
                                    typeId: 3,
                                },
                                {
                                    code: 'C006-1379',
                                    alertTime: '5.2-12:17',
                                    processedTime: '5.1-18:30',
                                    processedAgent: '8328',
                                    alertType: '信号中断',
                                    typeId: 3,
                                },
                                {
                                    code: 'C006-1379',
                                    alertTime: '5.2-12:17',
                                    processedTime: '5.2-18:37',
                                    processedAgent: '5328',
                                    alertType: '信号中断',
                                    typeId: 3,
                                }
                            ] },
                        {
                            groupId: 4,
                            groupName: "泄漏报警",
                            data: [{
                                    code: 'C009-9828',
                                    alertTime: '5.2-13:12',
                                    processedTime: '5.3-14:03',
                                    processedAgent: '1977',
                                    alertType: '泄漏报警',
                                    typeId: 4,
                                },
                                {
                                    code: 'C007-8379',
                                    alertTime: '5.2-12:17',
                                    processedTime: '5.1-18:30',
                                    processedAgent: '8328',
                                    alertType: '泄漏报警',
                                    typeId: 4,
                                },
                                {
                                    code: 'C003-0379',
                                    alertTime: '5.2-12:17',
                                    processedTime: '5.2-18:37',
                                    processedAgent: '5328',
                                    alertType: '泄漏报警',
                                    typeId: 4,
                                }
                            ] },
                        {
                            groupId: 5,
                            groupName: "拉回报警",
                            data: [{
                                    code: 'C005-5528',
                                    alertTime: '5.2-13:12',
                                    processedTime: '5.3-14:03',
                                    processedAgent: '1997',
                                    alertType: '拉回报警',
                                    typeId: 5,
                                },
                                {
                                    code: 'C010-2279',
                                    alertTime: '4.2-12:17',
                                    processedTime: '5.1-22:32',
                                    processedAgent: '8118',
                                    alertType: '拉回报警',
                                    typeId: 5,
                                },
                                {
                                    code: 'C022-1379',
                                    alertTime: '5.2-12:17',
                                    processedTime: '4.2-18:37',
                                    processedAgent: '5668',
                                    alertType: '拉回报警',
                                    typeId: 5,
                                }
                            ] },
                        {
                            groupId: 6,
                            groupName: "进场报警",
                            data: [{
                                    code: 'C015-5528',
                                    alertTime: '5.2-13:12',
                                    processedTime: '5.6-14:03',
                                    processedAgent: '9997',
                                    alertType: '进场报警',
                                    typeId: 6,
                                },
                                {
                                    code: 'C019-2279',
                                    alertTime: '4.2-12:17',
                                    processedTime: '5.1-22:32',
                                    processedAgent: '8018',
                                    alertType: '进场报警',
                                    typeId: 6,
                                },
                                {
                                    code: 'C102-2379',
                                    alertTime: '5.8-22:17',
                                    processedTime: '4.2-18:37',
                                    processedAgent: '7668',
                                    alertType: '进场报警',
                                    typeId: 6,
                                }
                            ] }
                    ]; //todo user flag and ng if to hide when filtering;
                    var self = this;
                    console.log("processed-shipment is up and running");
                    this.initUi();
                    // this.request.get('/gps/shipments/done').subscribe(res => {
                    //       console.log("res ---",res);
                    //       if(res && res.pl && res.pl.shipments){
                    //
                    //
                    //           var groupObj =  _.groupBy(res.pl.shipments,'ntt');
                    //
                    //          config.shipmentTanks.forEach(function(key,index){
                    //             var group = {groupName:key,groupId:index+1,data:groupObj[key]||[]};
                    //             self.shipments.push(group);
                    //           });
                    //           console.log("self.shipments---",self.shipments);
                    //         this.initUi();
                    //       }
                    // });
                }
                ProcessedShipment.prototype.initUi = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                        jQuery('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                    });
                };
                ProcessedShipment = __decorate([
                    core_1.Component({
                        selector: 'processed-shipment',
                        templateUrl: config_1.config.prefix + '/components/gps/processed/processed-shipment.component.html'
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService])
                ], ProcessedShipment);
                return ProcessedShipment;
            }());
            exports_1("ProcessedShipment", ProcessedShipment);
        }
    }
});

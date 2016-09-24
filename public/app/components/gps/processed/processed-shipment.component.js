System.register(['@angular/core', '../../../config', '../../../services/request.service'], function(exports_1, context_1) {
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
                    var _this = this;
                    this.request = request;
                    // shipments:any[]=[{
                    //   groupId:1,
                    //   groupName:"CNG",
                    //   data:[{
                    //     oti:'C002-6328',
                    //     nti:'6328',
                    //     dt:'5.2-14:33',
                    //     at:'5.2-23:10',
                    //     lp:'2632',
                    //     driver:'761',
                    //     s:'822',
                    //     pa:'310',
                    //     dist:'12.2'
                    //   },
                    //   {
                    //     oti:'C002-6328',
                    //     nti:'6328',
                    //     dt:'5.2-14:33',
                    //     at:'5.2-23:10',
                    //     lp:'2632',
                    //     driver:'761',
                    //     s:'822',
                    //     pa:'310',
                    //     dist:'12.2'
                    //   }
                    //   ]},
                    //
                    //   {
                    //     groupId:2,
                    //     groupName:"LNG",
                    //     data:[{
                    //       oti:'C002-6328',
                    //       nti:'6328',
                    //       dt:'5.2-14:33',
                    //       at:'5.2-23:10',
                    //       lp:'2632',
                    //       driver:'761',
                    //       s:'822',
                    //       pa:'310',
                    //       dist:'12.2'
                    //     },
                    //     {
                    //       oti:'C002-6328',
                    //       nti:'6328',
                    //       dt:'5.2-14:33',
                    //       at:'5.2-23:10',
                    //       lp:'2632',
                    //       driver:'761',
                    //       s:'822',
                    //       pa:'310',
                    //       dist:'12.2'
                    //     }
                    //     ]},
                    //
                    //     {
                    //       groupId:3,
                    //       groupName:'集格',
                    //       data:[{
                    //         oti:'C002-6328',
                    //         nti:'6328',
                    //         dt:'5.2-14:33',
                    //         at:'5.2-23:10',
                    //         lp:'2632',
                    //         driver:'761',
                    //         s:'822',
                    //         pa:'310',
                    //         dist:'12.2'
                    //       },
                    //       {
                    //         oti:'C002-6328',
                    //         nti:'6328',
                    //         dt:'5.2-14:33',
                    //         at:'5.2-23:10',
                    //         lp:'2632',
                    //         driver:'761',
                    //         s:'822',
                    //         pa:'310',
                    //         dist:'12.2'
                    //       }
                    //       ]},
                    //
                    //       {
                    //         groupId:4,
                    //         groupName:'杜瓦瓶',
                    //         data:[{
                    //           oti:'C002-6328',
                    //           nti:'6328',
                    //           dt:'5.2-14:33',
                    //           at:'5.2-23:10',
                    //           lp:'2632',
                    //           driver:'761',
                    //           s:'822',
                    //           pa:'310',
                    //           dist:'12.2'
                    //         },
                    //         {
                    //           oti:'C002-6328',
                    //           nti:'6328',
                    //           dt:'5.2-14:33',
                    //           at:'5.2-23:10',
                    //           lp:'2632',
                    //           driver:'761',
                    //           s:'822',
                    //           pa:'310',
                    //           dist:'12.2'
                    //         }
                    //         ]},
                    //
                    //         {
                    //           groupId:5,
                    //           groupName:'进场',
                    //           data:[{
                    //             oti:'C002-6328',
                    //             nti:'6328',
                    //             dt:'5.2-14:33',
                    //             at:'5.2-23:10',
                    //             lp:'2632',
                    //             driver:'761',
                    //             s:'822',
                    //             pa:'310',
                    //             dist:'12.2'
                    //           },
                    //           {
                    //             oti:'C002-6328',
                    //             nti:'6328',
                    //             dt:'5.2-14:33',
                    //             at:'5.2-23:10',
                    //             lp:'2632',
                    //             driver:'761',
                    //             s:'822',
                    //             pa:'310',
                    //             dist:'12.2'
                    //           }
                    //           ]},
                    //
                    //           {
                    //             groupId:6,
                    //             groupName:'拉回',
                    //             data:[{
                    //               oti:'C002-6328',
                    //               nti:'6328',
                    //               dt:'5.2-14:33',
                    //               at:'5.2-23:10',
                    //               lp:'2632',
                    //               driver:'761',
                    //               s:'822',
                    //               pa:'310',
                    //               dist:'12.2'
                    //             },
                    //             {
                    //               oti:'C002-6328',
                    //               nti:'6328',
                    //               dt:'5.2-14:33',
                    //               at:'5.2-23:10',
                    //               lp:'2632',
                    //               driver:'761',
                    //               s:'822',
                    //               pa:'310',
                    //               dist:'12.2'
                    //             }
                    //             ]}
                    //
                    // ];  //todo user flag and ng if to hide when filtering;
                    this.shipments = [];
                    this.months = ['1月', '2月', '3月', '4月'];
                    var self = this;
                    console.log("processed-shipment is up and running");
                    this.request.get('/gps/shipments/done.json').subscribe(function (res) {
                        console.log("res ---", res);
                        if (res && res.pl && res.pl.shipments) {
                            var groupObj = _.groupBy(res.pl.shipments, 'ntt');
                            config_1.config.shipmentTanks.forEach(function (key, index) {
                                var group = { groupName: key, groupId: index + 1, data: groupObj[key] || [] };
                                self.shipments.push(group);
                            });
                            console.log("self.shipments---", self.shipments);
                            _this.initUi();
                        }
                    });
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

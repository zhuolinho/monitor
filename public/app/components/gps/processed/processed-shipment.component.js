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
var config_1 = require("../../../config");
var request_service_1 = require("../../../services/request.service");
var ProcessedShipment = (function () {
    function ProcessedShipment(request) {
        var _this = this;
        this.request = request;
        this.shipments = [];
        this.shimentStorage = [];
        this.months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        var self = this;
        console.log("processed-shipment is up and running");
        this.request.get('/gps/shipments/done.json').subscribe(function (res) {
            console.log("res ---", res);
            if (res && res.pl && res.pl.shipments) {
                // var groupObj = _.groupBy(res.pl.shipments, 'ntt');
                // config.shipmentTanks.forEach(function(key, index) {
                //   var group = { groupName: key, groupId: index + 1, data: groupObj[key] || [] };
                //   self.shipments.push(group);
                // });
                // console.log("self.shipments---", self.shipments);
                // this.initUi();
                //
                if (res.pl && res.pl.shipments) {
                    _this.shimentStorage = res.pl.shipments;
                    _this.shapeData(_.clone(_this.shimentStorage));
                }
                _this.initUi();
            }
        });
    }
    ProcessedShipment.prototype.initUi = function () {
        var that = this;
        setTimeout(function (_) {
            jQuery('select').material_select();
            jQuery('select').on('change', function (event) {
                that.veSelected(event, that);
            });
            jQuery('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
    };
    ProcessedShipment.prototype.shapeData = function (param) {
        var self = this;
        this.shipments = [];
        var groupObj = _.groupBy(param, 'ntt');
        config_1.config.alertTypes.forEach(function (key, index) {
            var group = { groupName: key, groupId: index + 1, data: groupObj[key] || [] };
            self.shipments.push(group);
        });
    };
    ProcessedShipment.prototype.veSelected = function (event, comp) {
        var temp = _.filter(comp.alertStorage, { m: event.target.value });
        comp.shapeData(temp);
    };
    ProcessedShipment.prototype.downloadData = function () {
        this.request.post('/gps/shipment/complete/download.json', {}).subscribe(function (res) {
            console.log("res-----", res);
            window.location = res.pl.file;
        });
    };
    return ProcessedShipment;
}());
ProcessedShipment = __decorate([
    core_1.Component({
        selector: 'processed-shipment',
        templateUrl: config_1.config.prefix + '/components/gps/processed/processed-shipment.component.html'
    }),
    __metadata("design:paramtypes", [request_service_1.RequestService])
], ProcessedShipment);
exports.ProcessedShipment = ProcessedShipment;
// testShipments:any[]=[{
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
// ];
//todo user flag and ng if to hide when filtering;

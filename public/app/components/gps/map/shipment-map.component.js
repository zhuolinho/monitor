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
    var ShipmentMap;
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
            Int16Array;
            ShipmentMap = (function () {
                function ShipmentMap(request) {
                    this.request = request;
                    this.selectedtab = 1;
                    this.delevered = false;
                    this.returnToRefill = true;
                    console.log("ShipmentMap is up and running");
                    this.initUi();
                    this.loadJScript();
                    this.iniSocket();
                }
                ShipmentMap.prototype.initUi = function () {
                    var _this = this;
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                        jQuery('select.returnToRefill').on('change', function (event) {
                            _this.veReturnToRefill(event, _this);
                        });
                    });
                };
                ShipmentMap.prototype.veReturnToRefill = function (event, compRef) {
                    if (event) {
                        if (event.target.value == "是") {
                            compRef.returnToRefill = true;
                        }
                        else {
                            compRef.returnToRefill = false;
                        }
                    }
                    compRef.initUi();
                };
                ShipmentMap.prototype.loadJScript = function () {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + config_1.config.bdmkey + '&callback=mapLoadedCb';
                    window.mapLoadedCb = this.mapLoadedCb; //set global reference for initMap callback;
                    document.body.appendChild(script);
                };
                ShipmentMap.prototype.mapLoadedCb = function () {
                    if (!ShipmentMap.mapLoaded) {
                        ShipmentMap.mapLoaded = true;
                        // 百度地图API功能
                        ShipmentMap.gpsmap = new BMap.Map("allmap");
                    }
                    // var map = new BMap.Map("allmap");
                    var point = new BMap.Point(118.273, 33.779);
                    ShipmentMap.gpsmap.centerAndZoom(point, 7);
                };
                //old one
                // mapLoadedCb(){
                //
                //
                //     // 百度地图API功能
                //     var map = new BMap.Map("allmap");
                //     map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
                //
                //     // 添加带有定位的导航控件
                //     var navigationControl = new BMap.NavigationControl({
                //       // 靠左上角位置
                //       anchor: BMAP_ANCHOR_TOP_LEFT,
                //       // LARGE类型
                //       type: BMAP_NAVIGATION_CONTROL_LARGE,
                //       // 启用显示定位
                //       enableGeolocation: true
                //     });
                //     map.addControl(navigationControl);
                //
                //
                //     var myP1 = new BMap.Point(116.380967,39.913285);    //起点
                //     var myP2 = new BMap.Point(116.424374,39.914668);    //终点
                //
                //     var iconImage = 'dist/images/truck.png';
                //     var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';
                //     var myIcon = new BMap.Icon(iconImage, new BMap.Size(32, 70), {    //小车图片
                //       // offset: new BMap.Size(0, -5),    //相当于CSS精灵
                //       imageOffset: new BMap.Size(0, 10)    //图片的偏移量。为了是图片底部中心对准坐标点。
                //       });
                //     var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
                //     driving2.search(myP1, myP2);    //显示一条公交线路
                //
                //     //car on the move
                //     var run = function (){
                //       var driving = new BMap.DrivingRoute(map);    //驾车实例
                //       driving.search(myP1, myP2);
                //       driving.setSearchCompleteCallback(function(){  //after route has been set
                //
                //
                //         var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
                //         var paths = pts.length;    //获得有几个点
                //
                //         //get distance and duration
                //         var routeData = {
                //                 distance:driving.getResults().getPlan(0).getDistance(true),
                //                 duration:driving.getResults().getPlan(0).getDuration(true)
                //         };
                //
                //         console.log("distance and time-----",routeData);
                //         var samplePoint  = pts[0];
                //
                //         var carMk = new BMap.Marker(samplePoint, {icon:myIcon});
                //         map.addOverlay(carMk);
                //         var i = 0;
                //
                //         function resetMkPoint(){
                //           // samplePoint.lng += 0.0001;
                //           // samplePoint.lat += 0.0001;
                //           samplePoint = pts[i]
                //           carMk.setPosition(samplePoint);
                //
                //
                //           if(i < paths){
                //             //  console.log('updating----',samplePoint);
                //
                //               calculateDistance(map,pts[i],pts[paths-1]).then(function(data){
                //                 var patern  = /[0,9]{1,3}['米']{1}/;
                //                   if(patern.test(data)){  //within metters
                //                       var distance = parseInt(data,10);  //parseInt asuming there is no decimal part. otherwise parseFloat
                //                       // console.log('distance>>>>',distance);
                //                       if(distance <= 100){
                //                         console.log('已配送');
                //                       }
                //                   }
                //               });
                //
                //               i++;
                //
                //             setTimeout(function(){
                //               resetMkPoint();
                //             },1000);
                //           }
                //           else{
                //             console.log('done----');
                //           }
                //
                //         }
                //         resetMkPoint();
                //       });
                //     }
                //
                //     run();
                //
                //
                //     var calculateDistance = function(map, scrPoint,desPoint){
                //
                //           var p1 = new BMap.Point(scrPoint.lng,scrPoint.lat);    //起点
                //           var p2 = new BMap.Point(desPoint.lng,desPoint.lat);    //终点
                //           // var p1 = new BMap.Point(scrPoint.lng, scrPoint.lat);    //起点
                //           // var p2 = new BMap.Point(scrPoint.lng+0.0001, scrPoint.lat+0.0001);    //终点
                //
                //           var tempDriving = new BMap.DrivingRoute(map);    //驾车实例
                //           tempDriving.search(p1, p2);
                //
                //           var distance = null;
                //
                //           var deferred = jQuery.Deferred();
                //
                //           tempDriving.setSearchCompleteCallback(function(){  //after route has been set
                //               distance = tempDriving.getResults().getPlan(0).getDistance(true);
                //               // console.log("new distance-----",distance);
                //               deferred.resolve(distance);
                //           });
                //
                //           return deferred.promise();
                //
                //     }
                // }
                ShipmentMap.prototype.addMarker = function (cardata) {
                    var point = new BMap.Point(cardata.lng, cardata.lat);
                    var marker = new BMap.Marker(point);
                    ShipmentMap.gpsmap.addOverlay(marker);
                };
                ShipmentMap.prototype.addCustomMarker = function (cardata) {
                    var iconImage = 'dist/images/truck.png';
                    var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';
                    var myIcon = new BMap.Icon(iconImage, new BMap.Size(32, 70), {
                        // offset: new BMap.Size(0, -5),    //相当于CSS精灵
                        imageOffset: new BMap.Size(0, 10) //图片的偏移量。为了是图片底部中心对准坐标点。
                    });
                    var point = new BMap.Point(cardata.lng, cardata.lat);
                    var marker = new BMap.Marker(point, { icon: myIcon });
                    this.targetMarker = marker;
                    ShipmentMap.gpsmap.addOverlay(this.targetMarker);
                };
                ShipmentMap.prototype.updatePosition = function (cardata) {
                    var _this = this;
                    console.log('updatePosition---');
                    if (!this.targetCar) {
                        // var initPoint = new BMap.Point(parseFloat(cardata.lng).toFixed(3),parseFloat(cardata.lat).toFixed(3));
                        // ShipmentMap.gpsmap.centerAndZoom(initPoint, 16);
                        this.targetCar = cardata;
                        this.addCustomMarker(cardata);
                    }
                    else if (cardata.sim == this.targetCar.sim) {
                        console.log('same car on the move-----');
                        this.targetMarker.setPosition(new BMap.Point(cardata.lng, cardata.lat));
                    }
                };
                ShipmentMap.prototype.iniSocket = function () {
                    var _this = this;
                    var url = 'http://139.196.18.222:3001';
                    if (window.location.hostname.indexOf('localhost') >= 0) {
                        url = 'http://localhost:3001';
                    }
                    var socket = io(url);
                    socket.on('carMove', function (data) {
                        if (data.pl && data.pl.gps) {
                            var cardata = data.pl.gps;
                            _this.updatePosition(cardata);
                        }
                    });
                };
                ShipmentMap.prototype.showAllCars = function () {
                    var _this = this;
                    //shandong shanghai: 118.273, 33.779  //7
                    //shanghai 121.454,31.153   //10
                    var point = new BMap.Point(121.454, 31.153);
                    ShipmentMap.gpsmap.centerAndZoom(point, 10);
                    this.request.get('/gps/cars/all').subscribe(function (res) {
                        var cars = res.pl.cars;
                        var allcars = Object.keys(cars).map(function (key) {
                            return cars[key];
                        });
                        for (var i = 0; i < allcars.length; i++) {
                            _this.addMarker(allcars[i]);
                        }
                    });
                };
                ShipmentMap.mapLoaded = false;
                ShipmentMap.allCars = {};
                ShipmentMap = __decorate([
                    core_1.Component({
                        selector: 'shipment-map',
                        templateUrl: config_1.config.prefix + '/components/gps/map/shipment-map.component.html',
                        styleUrls: [config_1.config.prefix + '/components/gps/map/resources//css/style.css']
                    }), 
                    __metadata('design:paramtypes', [request_service_1.RequestService])
                ], ShipmentMap);
                return ShipmentMap;
            }());
            exports_1("ShipmentMap", ShipmentMap);
        }
    }
});

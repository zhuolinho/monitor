System.register(['angular2/core', '../../../config', '../../../services/request'], function(exports_1, context_1) {
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
    var core_1, config_1, request_1;
    var ShipmentMap;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (request_1_1) {
                request_1 = request_1_1;
            }],
        execute: function() {
            Int16Array;
            ShipmentMap = (function () {
                function ShipmentMap(request) {
                    this.request = request;
                    this.selectedtab = 1;
                    this.delevered = false;
                    console.log("ShipmentMap is up and running");
                    this.initUi();
                    this.loadJScript();
                    this.iniSocket();
                }
                ShipmentMap.prototype.initUi = function () {
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                    });
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
                    var point = new BMap.Point(121.459, 31.293);
                    ShipmentMap.gpsmap.centerAndZoom(point, 7);
                    // // 编写自定义函数,创建标注
                    // // 随机向地图添加25个标注
                    var bounds = ShipmentMap.gpsmap.getBounds();
                    var sw = bounds.getSouthWest();
                    var ne = bounds.getNorthEast();
                    var lngSpan = Math.abs(sw.lng - ne.lng);
                    var latSpan = Math.abs(ne.lat - sw.lat);
                    // for (var i = 0; i < 25; i ++) {
                    //   var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                    //   addMarker(point);
                    // }
                };
                ShipmentMap.prototype.addMarker = function (cardata) {
                    var point = new BMap.Point(cardata.lng, cardata.lat);
                    var marker = new BMap.Marker(point);
                    ShipmentMap.gpsmap.addOverlay(marker);
                };
                ShipmentMap.prototype.addCustomMarker = function (cardata) {
                    var iconImage = 'dist/images/truck.png';
                    var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';
                    var myIcon = new BMap.Icon(testIconImage, new BMap.Size(32, 70), {
                        //offset: new BMap.Size(0, -5),    //相当于CSS精灵
                        imageOffset: new BMap.Size(0, 0.5) //图片的偏移量。为了是图片底部中心对准坐标点。
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
                ShipmentMap.prototype.showAllCars = function (cardata) {
                    var _this = this;
                    if (!ShipmentMap.allCars[cardata.sim]) {
                        _this.addMarker(cardata);
                        ShipmentMap.allCars[cardata.sim] = cardata;
                    }
                    else {
                        console.log('same car------->>>>>>-----', cardata.sim);
                    }
                };
                ShipmentMap.mapLoaded = false;
                ShipmentMap.allCars = {};
                ShipmentMap = __decorate([
                    core_1.Component({
                        selector: 'shipment-map',
                        templateUrl: config_1.config.prefix + '/components/gps/map/shipment-map.component.html',
                        styleUrls: [config_1.config.prefix + '/components/gps/map/resources//css/style.css']
                    }), 
                    __metadata('design:paramtypes', [request_1.Request])
                ], ShipmentMap);
                return ShipmentMap;
            }());
            exports_1("ShipmentMap", ShipmentMap);
        }
    }
});

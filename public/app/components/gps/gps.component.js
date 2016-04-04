System.register(['angular2/core', '../../config', '../../services/request'], function(exports_1, context_1) {
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
    var Gps;
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
            Gps = (function () {
                function Gps(request) {
                    this.request = request;
                    console.log("Gps is up and running");
                    this.loadJScript();
                    this.iniSocket();
                }
                Gps.prototype.loadJScript = function () {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + config_1.config.bdmkey + '&callback=initMap';
                    window.initMap = this.initGpsMap; //set global reference for initMap callback;
                    document.body.appendChild(script);
                };
                Gps.prototype.initGpsMap = function () {
                    // 百度地图API功能
                    var map = new BMap.Map("allmap");
                    map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
                    var myP1 = new BMap.Point(116.380967, 39.913285); //起点
                    var myP2 = new BMap.Point(116.424374, 39.914668); //终点
                    //dist/images/truck.png
                    var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/Mario.png", new BMap.Size(32, 70), {
                        //offset: new BMap.Size(0, -5),    //相当于CSS精灵
                        imageOffset: new BMap.Size(0, 0) //图片的偏移量。为了是图片底部中心对准坐标点。
                    });
                    var driving2 = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } }); //驾车实例
                    driving2.search(myP1, myP2); //显示一条公交线路
                    //car on the move
                    var run = function () {
                        var driving = new BMap.DrivingRoute(map); //驾车实例
                        driving.search(myP1, myP2);
                        driving.setSearchCompleteCallback(function () {
                            var pts = driving.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组
                            var paths = pts.length; //获得有几个点
                            var routeData = {
                                distance: driving.getResults().getPlan(0).getDistance(true),
                                duration: driving.getResults().getPlan(0).getDuration(true)
                            };
                            console.log("distance and time-----", routeData);
                            var samplePoint = pts[0];
                            var carMk = new BMap.Marker(samplePoint, { icon: myIcon });
                            map.addOverlay(carMk);
                            var i = 0;
                            function resetMkPoint() {
                                // samplePoint.lng += 0.0001;
                                // samplePoint.lat += 0.0001;
                                samplePoint = pts[i];
                                carMk.setPosition(samplePoint);
                                if (i < paths) {
                                    //  console.log('updating----',samplePoint);
                                    calculateDistance(map, pts[i], pts[paths - 1]).then(function (data) {
                                        var patern = /[0,9]{1,3}['米']{1}/;
                                        if (patern.test(data)) {
                                            var distance = parseInt(data, 10); //parseInt asuming there is no decimal part. otherwise parseFloat
                                            // console.log('distance>>>>',distance);
                                            if (distance <= 100) {
                                                alert('已配送');
                                            }
                                        }
                                        // console.log("got new distance----",data);
                                        // console.log("got new distance----",parseFloat(data));
                                    });
                                    i++;
                                    setTimeout(function () {
                                        resetMkPoint();
                                    }, 500);
                                }
                                else {
                                    console.log('done----');
                                }
                            }
                            resetMkPoint();
                        });
                    };
                    run();
                    var calculateDistance = function (map, scrPoint, desPoint) {
                        var p1 = new BMap.Point(scrPoint.lng, scrPoint.lat); //起点
                        var p2 = new BMap.Point(desPoint.lng, desPoint.lat); //终点
                        // var p1 = new BMap.Point(scrPoint.lng, scrPoint.lat);    //起点
                        // var p2 = new BMap.Point(scrPoint.lng+0.0001, scrPoint.lat+0.0001);    //终点
                        var tempDriving = new BMap.DrivingRoute(map); //驾车实例
                        tempDriving.search(p1, p2);
                        var distance = null;
                        var deferred = jQuery.Deferred();
                        tempDriving.setSearchCompleteCallback(function () {
                            distance = tempDriving.getResults().getPlan(0).getDistance(true);
                            // console.log("new distance-----",distance);
                            deferred.resolve(distance);
                        });
                        return deferred.promise();
                    };
                };
                Gps.prototype.iniSocket = function () {
                    var socket = io('http://localhost:8080');
                    socket.on('carMove', function (data) {
                        //  console.log('carMove',data);
                        if (data.pl && data.pl.gps) {
                        }
                    });
                };
                Gps.points = {};
                Gps = __decorate([
                    core_1.Component({
                        selector: 'gps',
                        templateUrl: config_1.config.prefix + '/components/gps/gps.component.html'
                    }), 
                    __metadata('design:paramtypes', [request_1.Request])
                ], Gps);
                return Gps;
            }());
            exports_1("Gps", Gps);
        }
    }
});

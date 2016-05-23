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
            ShipmentMap = (function () {
                function ShipmentMap(request) {
                    this.request = request;
                    this.selectedtab = 1;
                    this.delevered = false;
                    this.returnToRefill = true;
                    this.newShipment = {
                        sim: '',
                        dest: '',
                        origin: '',
                        s: '',
                        dist: '',
                        lp: '',
                        driver: '',
                        rs: '',
                        oti: '',
                        nti: '',
                        ntt: '',
                        ed: '' //estimated duration
                    };
                    console.log("ShipmentMap is up and running");
                }
                ShipmentMap.prototype.ngAfterViewInit = function () {
                    this.initUi();
                    this.loadJScript();
                    this.iniSocket();
                };
                ShipmentMap.prototype.ngOnDestroy = function () {
                    ShipmentMap.mapLoaded = false;
                    ShipmentMap.allCars = {};
                    ShipmentMap.gpsmap = null;
                };
                ShipmentMap.prototype.initUi = function () {
                    var _this = this;
                    setTimeout(function (_) {
                        jQuery('select').material_select();
                        jQuery('select.return-to-refill').on('change', function (event) {
                            _this.veReturnToRefill(event, _this);
                        });
                        jQuery('select.select-license-plate').on('change', function (event) {
                            _this.veSelectedLicensePlate(event, _this);
                        });
                        jQuery('select.select-tank-type').on('change', function (event) {
                            _this.veSelectedTankType(event, _this);
                        });
                        jQuery('select.select-address').on('change', function (event) {
                            _this.veSelectedAddress(event, _this);
                        });
                        jQuery('select.select-license-plate').on('change', function (event) {
                            _this.veSelectedLicensePlate(event, _this);
                        });
                        jQuery('select.select-tank').on('change', function (event) {
                            _this.veSelectedTank(event, _this);
                        });
                        jQuery('select.select-refill-station').on('change', function (event) {
                            _this.veSelectedRefillStation(event, _this);
                        });
                        jQuery('select.select-supercargo').on('change', function (event) {
                            _this.veSelectedSupercargo(event, _this);
                        });
                        jQuery('select.select-driver').on('change', function (event) {
                            _this.veSelectedDriver(event, _this);
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
                ShipmentMap.prototype.veSelectedLicensePlate = function (event, compRef) {
                    if (event) {
                        compRef.selectedCarId = event.target.value;
                        compRef.newShipment.sim = compRef.selectedCarId;
                    }
                    compRef.initUi();
                };
                // newShipment:any = {
                //     sim:'',
                //     dest:'',
                //     origin:'',
                //     s:'', //Supercargo 押运员
                //     dist:'', //distance
                //     lp:'',//license plate
                //     driver:'',
                //     rs:'', //加气站
                //     oti:'', //original tank id(原罐号)
                //     nti:'' //new tank id (换罐号)
                // };
                ShipmentMap.prototype.veSelectedTankType = function (event, compRef) {
                    if (event) {
                        compRef.newShipment.ntt = event.target.value;
                    }
                    compRef.initUi();
                };
                ShipmentMap.prototype.veSelectedTank = function (event, compRef) {
                    if (event) {
                        compRef.newShipment.nti = event.target.value;
                    }
                    compRef.initUi();
                };
                ShipmentMap.prototype.veSelectedDriver = function (event, compRef) {
                    if (event) {
                        compRef.newShipment.driver = event.target.value;
                    }
                    compRef.initUi();
                };
                ShipmentMap.prototype.veSelectedSupercargo = function (event, compRef) {
                    if (event) {
                        compRef.newShipment.s = event.target.value;
                    }
                    compRef.initUi();
                };
                ShipmentMap.prototype.veSelectedAddress = function (event, compRef) {
                    if (event) {
                        compRef.newShipment.dest = event.target.value;
                    }
                    compRef.initUi();
                };
                ShipmentMap.prototype.veSelectedRefillStation = function (event, compRef) {
                    if (event) {
                        compRef.newShipment.rs = event.target.value;
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
                    // 添加带有定位的导航控件
                    var navigationControl = new BMap.NavigationControl({
                        // 靠左上角位置
                        anchor: BMAP_ANCHOR_TOP_LEFT,
                        // LARGE类型
                        type: BMAP_NAVIGATION_CONTROL_LARGE,
                        // 启用显示定位
                        enableGeolocation: true
                    });
                    ShipmentMap.gpsmap.addControl(navigationControl);
                };
                ShipmentMap.prototype.addMarker = function (data) {
                    var point = new BMap.Point(data.lng, data.lat);
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
                ShipmentMap.prototype.updatePosition = function (cardata, dest) {
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
                        var currentPosition = cardata;
                        var destination = dest;
                        _this.calculateDistance(currentPosition, destination).then(function (data) {
                            var patern = /[0,9]{1,3}['米']{1}/;
                            if (patern.test(data)) {
                                var distance = parseInt(data, 10); //parseInt asuming there is no decimal part. otherwise parseFloat
                                // console.log('distance>>>>',distance);
                                if (distance <= 100) {
                                    console.log('已配送');
                                    _this.targetCar = null;
                                    _this.completeShipment();
                                }
                            }
                        });
                    }
                };
                ShipmentMap.prototype.completeShipment = function () {
                };
                ShipmentMap.prototype.iniSocket = function () {
                    var _this = this;
                    var url = 'http://139.196.18.222:3001';
                    if (window.location.hostname.indexOf('localhost') >= 0) {
                        url = 'http://localhost:3001';
                    }
                    var socket = io(url);
                    //  socket.on('carMove', function(data){
                    //    console.log("socket got data-----",data);
                    //      if(_this.targetCar && data.pl&&data.pl.gps){
                    //         var cardata = data.pl.gps;
                    //         _this.updatePosition(cardata);
                    //      }
                    //  });
                };
                ShipmentMap.prototype.veConfirmShipment = function () {
                    var that = this;
                    // if (ShipmentMap.mapLoaded && this.selectedCarId){
                    //   this.request.get('/gps/cars/all').subscribe(res => {
                    //         var cars = res.pl.cars;
                    //         var c = cars[that.selectedCarId];
                    //         if(c){
                    //
                    //           var geocoder = new BMap.Geocoder();
                    //           geocoder.getPoint('闸北区大宁路355号', function(dest){
                    //                 that.showShipmentRoute(c,dest);
                    //           },'上海市');
                    //
                    //           geocoder.getLocation(c, function(origin){
                    //             console.log("origin-----",origin);
                    //             that.newShipment.origin = origin;
                    //           });
                    //         }
                    //   });
                    //   }
                    var myP1 = new BMap.Point(116.380967, 39.913285); //起点
                    var myP2 = new BMap.Point(116.424374, 39.914668); //终点
                    that.showShipmentRoute(myP1, myP2);
                    // var driving = new BMap.DrivingRoute(ShipmentMap.gpsmap);    //驾车实例
                    //     driving.search(myP1, myP2);
                    //
                    //   driving.setSearchCompleteCallback(function(){  //after route has been set
                    //
                    //       var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
                    //       var paths = pts.length;    //获得有几个点
                    //
                    //       var samplePoint  = pts[0];
                    //
                    //       // var carMk = new BMap.Marker(samplePoint, {icon:myIcon});
                    //       that.addMarker(samplePoint);
                    //       var i = 0;
                    //
                    //
                    // });
                };
                ShipmentMap.prototype.showShipmentRoute = function (car, dest) {
                    var that = this;
                    var myP1 = new BMap.Point(car.lng, car.lat); //起点
                    var myP2 = new BMap.Point(dest.lng, dest.lat); //终点
                    // toFixed(2)
                    var midLng = (parseFloat(car.lng) + parseFloat(dest.lng)) / 2;
                    var midLat = (parseFloat(car.lat) + parseFloat(dest.lat)) / 2;
                    var middle = new BMap.Point(midLng.toFixed(3), midLat.toFixed(3));
                    console.log("middle point----", middle);
                    console.log("car,dest", car, dest);
                    var iconImage = 'dist/images/truck.png';
                    var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';
                    var myIcon = new BMap.Icon(iconImage, new BMap.Size(32, 70), {
                        // offset: new BMap.Size(0, -5),    //相当于CSS精灵
                        imageOffset: new BMap.Size(0, 10) //图片的偏移量。为了是图片底部中心对准坐标点。
                    });
                    var route = new BMap.DrivingRoute(ShipmentMap.gpsmap, { renderOptions: { map: ShipmentMap.gpsmap, autoViewport: true } }); //驾车实例
                    route.search(myP1, myP2); //显示一条公交线路
                    route.setSearchCompleteCallback(function () {
                        that.updatePosition(car, dest);
                        ShipmentMap.gpsmap.centerAndZoom(middle, 12);
                        var distance = route.getResults().getPlan(0).getDistance(true);
                        var duration = route.getResults().getPlan(0).getDuration(true);
                        that.newShipment.dist = distance;
                        that.newShipment.ed = duration;
                        console.log("  route.getDistance()", distance);
                        console.log("  route.duration()", duration);
                        var pts = route.getResults().getPlan(0).getRoute(0).getPath(); //通过驾车实例，获得一系列点的数组
                        var paths = pts.length;
                        var i = 0;
                        function resetMkPoint() {
                            if (i < paths) {
                                that.updatePosition(pts[i], dest);
                                console.log('updating----', paths, pts[i]);
                                i++;
                                setTimeout(function () {
                                    resetMkPoint();
                                }, 1000);
                            }
                        }
                        resetMkPoint();
                        // this.request.post('/gps/shipment',this.newShipment).subscribe(res => {
                        //   console.log("new shipment saved-----", res);
                        // });
                    });
                };
                ShipmentMap.prototype.showAllCars = function () {
                    //shandong shanghai: 118.273, 33.779  //7
                    //shanghai 121.454,31.153   //10
                    var _this = this;
                    this.targetCar = null; // stop car moves.
                    var point = new BMap.Point(121.454, 31.153);
                    ShipmentMap.gpsmap.centerAndZoom(point, 10);
                    this.request.get('/gps/cars/all').subscribe(function (res) {
                        var cars = res.pl.cars;
                        console.log("cars----", cars);
                        var allcars = Object.keys(cars).map(function (key) {
                            return cars[key];
                        });
                        for (var i = 0; i < allcars.length; i++) {
                            _this.addMarker(allcars[i]);
                        }
                    });
                };
                ShipmentMap.prototype.calculateDistance = function (scrPoint, desPoint) {
                    var p1 = new BMap.Point(scrPoint.lng, scrPoint.lat); //起点
                    var p2 = new BMap.Point(desPoint.lng, desPoint.lat); //终点
                    var tempDriving = new BMap.DrivingRoute(ShipmentMap.gpsmap); //驾车实例
                    tempDriving.search(p1, p2);
                    var distance = null;
                    var deferred = jQuery.Deferred();
                    tempDriving.setSearchCompleteCallback(function () {
                        distance = tempDriving.getResults().getPlan(0).getDistance(true);
                        console.log("new distance-----", distance);
                        deferred.resolve(distance);
                    });
                    return deferred.promise();
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

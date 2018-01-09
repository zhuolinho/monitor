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
var router_1 = require("@angular/router");
var config_1 = require("../../../config");
var request_service_1 = require("../../../services/request.service");
var user_service_1 = require("../../../services/user.service");
var rt_messages_service_1 = require("../../../services/rt-messages.service");
var ShipmentMap = ShipmentMap_1 = (function () {
    function ShipmentMap(route, request, userSrvc, rtmgs) {
        this.route = route;
        this.request = request;
        this.userSrvc = userSrvc;
        this.rtmgs = rtmgs;
        this.allCars = [];
        this.selectedtab = 1;
        this.delevered = false;
        this.returnToRefill = true;
        this.allSims = [];
        this.isShiping = false;
        this.drivers = [];
        this.driverEscorts = [];
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
            pa: '',
            ed: '' //estimated duration
        };
        this.user = this.userSrvc.getUser();
        console.log("ShipmentMap is up and running---");
    }
    ShipmentMap.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.tankId = params['tank'];
            console.log("params['tank']----", _this.tankId);
        });
        this.request.get('/plc/latest/withaddress.json')
            .subscribe(function (resp) {
            console.log("latest plc>>>-----", resp);
            if (resp && resp.pl && resp.pl.plc && resp.pl.address) {
                var plcData = resp.pl.plc;
                _this.plcAddresses = _.keyBy(resp.pl.address, 'tank');
                _this.connectedPlcs = Object.keys(plcData);
                // this.initSelect();
                _this.request.get("/users/offline.json").subscribe(function (res) {
                    console.log("got response--", res);
                    if (res.pl && res.pl.users) {
                        _this.drivers = _.filter(res.pl.users, { ap: 6 });
                        _this.driverEscorts = _.filter(res.pl.users, { ap: 8 });
                    }
                    _this.request.get('/gps/sim/all.json')
                        .subscribe(function (resp) {
                        if (resp.pl && resp.pl.sim) {
                            Object.keys(resp.pl.sim).map(function (key) {
                                _this.allSims.push({ sim: key, lp: resp.pl.sim[key] });
                            });
                        }
                        _this.initUi();
                    });
                });
            }
        });
    };
    ShipmentMap.prototype.ngAfterViewInit = function () {
        this.loadJScript();
        this.iniSocket();
        this.loadCars();
    };
    ShipmentMap.prototype.ngOnDestroy = function () {
        //reset static variables
        ShipmentMap_1.mapLoaded = false;
        ShipmentMap_1.gpsmap = null;
        ShipmentMap_1.allMarkers = {};
        ShipmentMap_1.carsGroups = [];
    };
    ShipmentMap.prototype.loadCars = function () {
        var _this = this;
        console.log('load cars----');
        if (ShipmentMap_1.mapLoaded) {
            this.showAllCars();
        }
        else {
            setTimeout(function () {
                _this.loadCars();
            }, 500);
        }
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
        }, 500);
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
        jQuery('select').material_select();
    };
    ShipmentMap.prototype.veSelectedLicensePlate = function (event, compRef) {
        console.log("lp", event.target.value);
        if (event) {
            compRef.selectedCarId = event.target.value;
            compRef.newShipment.sim = compRef.selectedCarId;
            compRef.showCar(compRef.selectedCarId);
        }
    };
    ShipmentMap.prototype.veSelectedTankType = function (event, compRef) {
        if (event) {
            compRef.newShipment.ntt = event.target.value;
        }
    };
    ShipmentMap.prototype.veSelectedTank = function (event, compRef) {
        if (event) {
            compRef.newShipment.nti = event.target.value;
        }
    };
    ShipmentMap.prototype.veSelectedDriver = function (event, compRef) {
        if (event) {
            compRef.newShipment.driver = event.target.value;
        }
    };
    ShipmentMap.prototype.veSelectedSupercargo = function (event, compRef) {
        if (event) {
            compRef.newShipment.s = event.target.value;
        }
    };
    ShipmentMap.prototype.veSelectedAddress = function (event, compRef) {
        if (event) {
            compRef.newShipment.dest = event.target.value;
        }
    };
    ShipmentMap.prototype.veSelectedRefillStation = function (event, compRef) {
        if (event) {
            compRef.newShipment.rs = event.target.value;
        }
    };
    ShipmentMap.prototype.loadJScript = function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + config_1.config.bdmkey + '&callback=mapLoadedCb';
        window.mapLoadedCb = this.mapLoadedCb; //set global reference for initMap callback;
        document.body.appendChild(script);
    };
    ShipmentMap.prototype.mapLoadedCb = function () {
        if (!ShipmentMap_1.mapLoaded) {
            ShipmentMap_1.mapLoaded = true;
            // 百度地图API功能
            ShipmentMap_1.gpsmap = new BMap.Map("allmap");
        }
        // var map = new BMap.Map("allmap");
        var point = new BMap.Point(118.273, 33.779);
        ShipmentMap_1.gpsmap.centerAndZoom(point, 7);
        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        ShipmentMap_1.gpsmap.addControl(navigationControl);
        // function showInfo(e){
        //   console.log(e.point.lng + ", " + e.point.lat);
        // }
        // ShipmentMap.gpsmap.addEventListener("click", showInfo);
    };
    ShipmentMap.addMarker = function (data) {
        // var point = new BMap.Point(parseFloat(data.lng)+config.gpsError.lng, parseFloat(data.lat)+config.gpsError.lat);
        // var marker = new BMap.Marker(point);
        if (data.lp) {
            var point = new BMap.Point(data.lng, data.lat);
            ShipmentMap_1.allMarkers[data._id] = new BMap.Marker(point); //_id = sim;
            var opts = {
                width: 200,
                height: 100,
                title: "车辆信息",
                enableMessage: true //设置允许信息窗发送短息
            };
            var infoWindow = new BMap.InfoWindow("车牌号:" + data.lp + ", 速度:" + data.speed + "km/h " + ", 定位时间:" + data.time, opts); // 创建信息窗口对象
            ShipmentMap_1.allMarkers[data._id].addEventListener("click", function () {
                ShipmentMap_1.gpsmap.openInfoWindow(infoWindow, point); //开启信息窗口
            });
            ShipmentMap_1.gpsmap.addOverlay(ShipmentMap_1.allMarkers[data._id]);
        }
    };
    ShipmentMap.prototype.iniSocket = function () {
        var _this = this;
        // this.rtmgs.
        // var url = 'http://'+window.location.hostname+':3001';
        //
        // var socket = io(url);
        this.rtmgs.connect(3001);
        this.rtmgs.on('carMove', function (data) {
            console.log("carMove-----", data);
            // TODO put this back to restore real time
            //  if(data.pl&&data.pl.gps){
            //     var cardata = data.pl.gps;
            //     _this.handleAlarm(cardata);
            //     _this.updateShowAllPosition(cardata);
            //  }
        });
    };
    ShipmentMap.prototype.handleAlarm = function (param) {
        console.log("handle alarm------", param);
        var that = this;
        if (param.alarm) {
            if (param.alarm.slice(9, 10) === '1') {
                console.log("speed alert");
                var alert = {
                    sim: param.sim,
                    time: param.time,
                    lng: param.lng,
                    lat: param.lat,
                    speed: param.speed,
                    atype: "speed",
                    an: "超速报警",
                    addr: '',
                    lp: param.lp
                };
                var convertor = new BMap.Convertor();
                var pointArr = [];
                pointArr.push(new BMap.Point(alert.lng, alert.lat));
                convertor.translate(pointArr, 1, 5, function (resp) {
                    if (resp.status === 0) {
                        alert.lng = resp.points[0].lng;
                        alert.lat = resp.points[0].lat;
                        that.saveGpsAlert(alert);
                    }
                });
            }
            if (param.alarm.slice(10, 11) === '1') {
                console.log("prohibited zone alert");
                console.log("speed alert");
                var alert = {
                    sim: param.sim,
                    time: param.time,
                    lng: param.lng,
                    lat: param.lat,
                    speed: param.speed,
                    atype: "prohibitedzone",
                    an: "越界报警",
                    addr: '',
                    lp: param.lp
                };
                var convertor = new BMap.Convertor();
                var pointArr = [];
                pointArr.push(new BMap.Point(alert.lng, alert.lat));
                convertor.translate(pointArr, 1, 5, function (resp) {
                    if (resp.status === 0) {
                        alert.lng = resp.points[0].lng;
                        alert.lat = resp.points[0].lat;
                        that.saveGpsAlert(alert);
                    }
                });
            }
        }
    };
    ShipmentMap.prototype.saveGpsAlert = function (param) {
        var that = this;
        // console.log("saveGpsAlert----",param);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(new BMap.Point(param.lng, param.lat), function (rs) {
            var addComp = rs.addressComponents;
            param.addr = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
            // console.log("saving param-----", param);
            that.request.post('/gps/alert.json', param).subscribe(function (res) {
                console.log("gps alert created-----", res);
            });
        });
    };
    ShipmentMap.prototype.addCustomMarker = function (cardata) {
        var iconImage = 'dist/images/truck.new.gif';
        var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';
        var myIcon = new BMap.Icon(iconImage, new BMap.Size(32, 70), {
            // offset: new BMap.Size(0, -5),    //相当于CSS精灵
            imageOffset: new BMap.Size(0, 15) //图片的偏移量。为了是图片底部中心对准坐标点。
        });
        var point = new BMap.Point(cardata.lng, cardata.lat);
        var marker = new BMap.Marker(point, { icon: myIcon });
        this.targetMarker = marker;
        ShipmentMap_1.gpsmap.addOverlay(this.targetMarker);
    };
    ShipmentMap.prototype.updateShowAllPosition = function (cardata) {
        if (ShipmentMap_1.allMarkers[cardata.sim]) {
            // console.log("cardata.sim----",cardata.sim);
            ShipmentMap_1.allMarkers[cardata.sim].setPosition(new BMap.Point(cardata.lng, cardata.lat));
        }
    };
    ShipmentMap.prototype.updatePosition = function (cardata, dest) {
        var _this = this;
        console.log('updatePosition---');
        if (!this.targetCar) {
            // ShipmentMap.gpsmap.centerAndZoom(initPoint, 16);
            this.targetCar = cardata;
            this.addCustomMarker(cardata);
        }
        else if (cardata.sim == this.targetCar.sim) {
            console.log('same car on the move-----');
            if (this.isShiping) {
                this.targetMarker.setPosition(new BMap.Point(cardata.lng, cardata.lat));
                var currentPosition = cardata;
                var destination = dest;
                _this.calculateDistance(currentPosition, destination).then(function (data) {
                    var patern = /[0,9]{1,3}['米']{1}/;
                    if (patern.test(data)) {
                        var distance = parseInt(data, 10); //parseInt asuming there is no decimal part. otherwise parseFloat
                        // console.log('distance>>>>',distance);
                        if (distance <= 900) {
                            console.log('已配送');
                            _this.targetCar = null;
                            _this.completeShipment();
                        }
                    }
                });
            }
        }
    };
    ShipmentMap.prototype.completeShipment = function () {
        var that = this;
        console.log("posting end of shipment----", this.newShipment);
        this.isShiping = false;
        this.request.put('/gps/shipment/done.json', this.newShipment).subscribe(function (res) {
            console.log("res shipment done-----", res);
        });
    };
    ShipmentMap.prototype.veConfirmShipment = function () {
        var that = this;
        console.log("confirm-----", ShipmentMap_1.mapLoaded, this.selectedCarId);
        if (ShipmentMap_1.mapLoaded && this.selectedCarId && !this.isShiping) {
            this.request.get('/gps/cars/all.json').subscribe(function (res) {
                console.log("got cars----", res);
                var cars = res.pl.cars;
                var c = cars[that.selectedCarId];
                if (c) {
                    var origin = new BMap.Point(c.lng, c.lat);
                    var geocoder = new BMap.Geocoder();
                    geocoder.getLocation(origin, function (originAddr) {
                        console.log("originAddr-----", originAddr);
                        if (originAddr) {
                            that.newShipment.origin = originAddr.address;
                        }
                    });
                    geocoder.getPoint('闸北区大宁路355号', function (dest) {
                        var myP1 = new BMap.Point(116.380967, 39.913285); //起点
                        var myP2 = new BMap.Point(116.424374, 39.914668); //终点
                        // that.showShipmentRoute(origin,dest);
                        that.showShipmentRoute(myP1, myP2);
                    }, '上海市');
                }
                else {
                    alert("此车辆未发送gps信号, 请启动车后再试!");
                }
            });
        }
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
        var route = new BMap.DrivingRoute(ShipmentMap_1.gpsmap, { renderOptions: { map: ShipmentMap_1.gpsmap, autoViewport: true } }); //驾车实例
        route.search(myP1, myP2); //显示一条公交线路
        route.setSearchCompleteCallback(function () {
            that.updatePosition(car, dest);
            ShipmentMap_1.gpsmap.centerAndZoom(middle, 12);
            var distance = route.getResults().getPlan(0).getDistance(true);
            var duration = route.getResults().getPlan(0).getDuration(true);
            that.newShipment.dist = distance;
            that.newShipment.ed = duration;
            that.newShipment.pa = that.user.an;
            that.newShipment.oti = this.route.queryParams.map(function (params) { return params['tank'] || 'None'; });
            console.log("tank id----", that.newShipment.oti);
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
            console.log("this.newShipment----", that.newShipment);
            that.request.post('/gps/shipment.json', that.newShipment).subscribe(function (res) {
                console.log("new shipment saved-----", res);
                that.isShiping = true;
                that.newShipment = res.pl.shipment; //update shiment with _id; used on the shipment completion
            });
        });
    };
    ShipmentMap.prototype.showCar = function (sim) {
        ShipmentMap_1.gpsmap.clearOverlays();
        this.targetCar = _.find(this.allCars, { _id: sim });
        if (this.targetCar) {
            var point = new BMap.Point(this.targetCar.lng.toFixed(3), this.targetCar.lat.toFixed(3));
            ShipmentMap_1.gpsmap.centerAndZoom(point, 19);
            this.totalCarNumber = 1;
            this.addSigleMargerToMap(this.targetCar);
        }
    };
    ShipmentMap.prototype.showAllCars = function () {
        //shandong shanghai: 118.273, 33.779  //7
        //shanghai 121.454,31.153   //10
        var _this = this;
        this.targetCar = null; // stop car moves.
        ShipmentMap_1.gpsmap.clearOverlays();
        var point = new BMap.Point(121.454, 31.153);
        ShipmentMap_1.gpsmap.centerAndZoom(point, 10);
        this.request.get('/gps/cars/all.json').subscribe(function (res) {
            var cars = res.pl.cars;
            console.log("all cars----", cars);
            _this.allCars = Object.keys(cars).map(function (key) {
                return cars[key];
            });
            ShipmentMap_1.carsGroups = _this.groupByTen(_this.allCars); //convertor doen'st work for more thatn 10 points!! so we group by ten;
            for (var i = 0; i < ShipmentMap_1.carsGroups.length; i++) {
                _this.adjustPoint(ShipmentMap_1.carsGroups[i], _this.addToMap); //convertor doen'st work for more thatn 10 points
            }
            _this.totalCarNumber = _this.allCars.length;
        });
    };
    ShipmentMap.prototype.addSigleMargerToMap = function (marker) {
        ShipmentMap_1.addMarker(marker);
    };
    ShipmentMap.prototype.addToMap = function (adjusted, sigle) {
        // console.log("processed cars->>>>>>---",adjusted)
        if (adjusted.status === 0) {
            if (adjusted.points.length > 4) {
                for (var i = 0; i < adjusted.points.length; i++) {
                    ShipmentMap_1.carsGroups[0][i].lng = adjusted.points[i].lng;
                    ShipmentMap_1.carsGroups[0][i].lat = adjusted.points[i].lat;
                    ShipmentMap_1.carsGroups[0][i].valid = true;
                    ShipmentMap_1.addMarker(ShipmentMap_1.carsGroups[0][i]);
                }
            }
            else {
                for (var i = 0; i < adjusted.points.length; i++) {
                    ShipmentMap_1.carsGroups[1][i].lng = adjusted.points[i].lng;
                    ShipmentMap_1.carsGroups[1][i].lat = adjusted.points[i].lat;
                    ShipmentMap_1.carsGroups[1][i].valid = true;
                    ShipmentMap_1.addMarker(ShipmentMap_1.carsGroups[1][i]);
                }
            }
        }
    };
    ShipmentMap.prototype.adjustPoint = function (param, cb) {
        var convertor = new BMap.Convertor();
        var pointArr = [];
        if (Array.isArray(param)) {
            for (var i = 0; i < param.length; i++) {
                pointArr.push(new BMap.Point(param[i].lng, param[i].lat));
            }
        }
        else {
            pointArr.push(new BMap.Point(param.lng, param.lat));
        }
        convertor.translate(pointArr, 1, 5, cb); //can't take more than 10 point!!!
    };
    ShipmentMap.prototype.calculateDistance = function (scrPoint, desPoint) {
        var p1 = new BMap.Point(scrPoint.lng, scrPoint.lat); //起点
        var p2 = new BMap.Point(desPoint.lng, desPoint.lat); //终点
        var tempDriving = new BMap.DrivingRoute(ShipmentMap_1.gpsmap); //驾车实例
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
    ShipmentMap.prototype.groupByTen = function (arr) {
        var group = [];
        var tempArr = arr;
        while (tempArr.length > 10) {
            group.push(tempArr.slice(0, 10));
            tempArr = tempArr.slice(10, tempArr.length);
        }
        group.push(tempArr);
        return group;
    };
    return ShipmentMap;
}());
ShipmentMap.mapLoaded = false;
ShipmentMap.carsGroups = [];
ShipmentMap.allMarkers = {};
ShipmentMap = ShipmentMap_1 = __decorate([
    core_1.Component({
        selector: 'shipment-map',
        templateUrl: config_1.config.prefix + '/components/gps/map/shipment-map.component.html',
        styleUrls: [config_1.config.prefix + '/components/gps/map/resources//css/style.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        request_service_1.RequestService,
        user_service_1.UserService,
        rt_messages_service_1.RTMessagesService])
], ShipmentMap);
exports.ShipmentMap = ShipmentMap;
var ShipmentMap_1;

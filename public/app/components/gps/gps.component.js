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
                    var point = new BMap.Point(116.404, 39.915);
                    map.centerAndZoom(point, 15);
                    // 编写自定义函数,创建标注
                    function addMarker(point) {
                        var marker = new BMap.Marker(point);
                        var label = new BMap.Label("我是文字标注哦", { offset: new BMap.Size(20, -10) });
                        // marker.setLabel(label);
                        map.addOverlay(marker);
                    }
                    // 随机向地图添加25个标注
                    var bounds = map.getBounds();
                    var sw = bounds.getSouthWest();
                    var ne = bounds.getNorthEast();
                    var lngSpan = Math.abs(sw.lng - ne.lng);
                    var latSpan = Math.abs(ne.lat - sw.lat);
                    for (var i = 0; i < 25; i++) {
                        var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                        addMarker(point);
                    }
                };
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

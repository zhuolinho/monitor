
import {Component, provide, AfterViewInit, OnDestroy} from 'angular2/core';
import {config} from '../../../config';
import {RequestService} from '../../../services/request.service';

declare var BMAP_ANCHOR_TOP_LEFT:any;
declare var BMAP_NAVIGATION_CONTROL_LARGE:any;


declare var BMap:any;
declare var jQuery:any;
declare var window:any;
declare var io:any;

@Component({
  selector:'shipment-map',
  templateUrl:config.prefix + '/components/gps/map/shipment-map.component.html',
  styleUrls:[config.prefix + '/components/gps/map/resources//css/style.css']
})

export class ShipmentMap implements AfterViewInit, OnDestroy{

  static mapLoaded:boolean = false;
  static allCars:any = {};
  selectedtab:number=1;
  delevered:boolean=false;
  targetCar:any;
  selectCarId:string;
  targetMarker:any;
  returnToRefill:boolean = true;
  static gpsmap:any;
  constructor(public request:RequestService){
  console.log("ShipmentMap is up and running");

  }

  ngAfterViewInit(){
    this.initUi();
    this.loadJScript();
    this.iniSocket();
  }

  ngOnDestroy(){
    ShipmentMap.mapLoaded = false;
    ShipmentMap.allCars = {};
    ShipmentMap.gpsmap = null;

  }
  initUi(){
    var _this = this;
    setTimeout(_=>{
         jQuery('select').material_select();
         jQuery('select.return-to-refill').on('change',function(event){
           _this.veReturnToRefill(event, _this)
         });

         jQuery('select.select-license-plate').on('change',function(event){
           _this.veSelectedLicensePlate(event, _this)
         });
    });
  }


  veReturnToRefill(event, compRef){
        if(event){
          if(event.target.value == "是"){
            compRef.returnToRefill = true;
          }
          else{
              compRef.returnToRefill = false;
          }
        }
        compRef.initUi();
  }

  veSelectedLicensePlate(event, compRef){
        if(event){
            compRef.selectCarId = event.target.value;
        }
        compRef.initUi();
  }


 loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak='+config.bdmkey+'&callback=mapLoadedCb';
    window.mapLoadedCb = this.mapLoadedCb;  //set global reference for initMap callback;
    document.body.appendChild(script);
  }

  mapLoadedCb(){
    if (!ShipmentMap.mapLoaded){   //avoid initializing twice.
          ShipmentMap.mapLoaded = true ;
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
  }

  addMarker(cardata){
    var point = new BMap.Point(cardata.lng, cardata.lat);
    var marker = new BMap.Marker(point);
    ShipmentMap.gpsmap.addOverlay(marker);
  }

  addCustomMarker(cardata){
      var iconImage = 'dist/images/truck.png';
      var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';

      var myIcon = new BMap.Icon(iconImage, new BMap.Size(32, 70), {    //小车图片
          // offset: new BMap.Size(0, -5),    //相当于CSS精灵
          imageOffset: new BMap.Size(0, 10)    //图片的偏移量。为了是图片底部中心对准坐标点。
          });

        var point = new BMap.Point(cardata.lng, cardata.lat);
        var marker = new BMap.Marker(point, {icon:myIcon});

        this.targetMarker = marker;
        ShipmentMap.gpsmap.addOverlay(this.targetMarker);
  }


  updatePosition(cardata){

    var _this = this;

        console.log('updatePosition---');

        if(!this.targetCar){
              // var initPoint = new BMap.Point(parseFloat(cardata.lng).toFixed(3),parseFloat(cardata.lat).toFixed(3));
              // ShipmentMap.gpsmap.centerAndZoom(initPoint, 16);
              this.targetCar = cardata;
              this.addCustomMarker(cardata);
        }
        else if(cardata.sim == this.targetCar.sim){
            console.log('same car on the move-----');
            this.targetMarker.setPosition(new BMap.Point(cardata.lng, cardata.lat))
            // this.addCustomMarker(cardata)
        }

    }


    iniSocket(){
      var _this = this;
        var url = 'http://139.196.18.222:3001';

        if(window.location.hostname.indexOf('localhost')>=0){  // reset url for local developement;
          url = 'http://localhost:3001';
        }
        var socket = io(url);
       socket.on('carMove', function(data){
           if(data.pl&&data.pl.gps){
              var cardata = data.pl.gps;
              _this.updatePosition(cardata);
           }
       });
    }

    showAllCars(){
      //shandong shanghai: 118.273, 33.779  //7
      //shanghai 121.454,31.153   //10
      var point = new BMap.Point(121.454,31.153 );
      ShipmentMap.gpsmap.centerAndZoom(point, 10);
      this.request.get('/gps/cars/all').subscribe(res => {
            var cars = res.pl.cars;
            var allcars = Object.keys(cars).map(function (key) {
                  return cars[key];
              });

            for (let i = 0; i < allcars.length; i++) {
                this.addMarker(allcars[i]);
            }
      });
    }




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












 }

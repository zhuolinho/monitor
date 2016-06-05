
import {Component, provide, AfterViewInit, OnDestroy} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {config} from '../../../config';
import {RequestService} from '../../../services/request.service';
import {UserService} from '../../../services/user.service';

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
  selectedCarId:string;
  targetMarker:any;
  returnToRefill:boolean = true;
  static gpsmap:any;
  isShiping:boolean = false;
  user:any;
  newShipment:any = {
      sim:'',
      dest:'',
      origin:'',
      s:'', //Supercargo 押运员
      dist:'', //distance
      lp:'',//license plate
      driver:'',
      rs:'', //加气站
      oti:'', //original tank id(原罐号)
      nti:'', //new tank id (换罐号)
      ntt:'',// new tank type
      pa:'',
      ed:''//estimated duration
  };
  constructor(private request:RequestService,
              private userSrvc:UserService,
              private routeParams:RouteParams){
        this.user = this.userSrvc.getUser();
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

         jQuery('select.select-tank-type').on('change',function(event){
           _this.veSelectedTankType(event, _this)
         });

         jQuery('select.select-address').on('change',function(event){
           _this.veSelectedAddress(event, _this)
         });

         jQuery('select.select-license-plate').on('change',function(event){
           _this.veSelectedLicensePlate(event, _this)
         });

         jQuery('select.select-tank').on('change',function(event){
           _this.veSelectedTank(event, _this)
         });

         jQuery('select.select-refill-station').on('change',function(event){
           _this.veSelectedRefillStation(event, _this)
         });

         jQuery('select.select-supercargo').on('change',function(event){
           _this.veSelectedSupercargo(event, _this)
         });

         jQuery('select.select-driver').on('change',function(event){
           _this.veSelectedDriver(event, _this)
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
            compRef.selectedCarId = event.target.value;
            compRef.newShipment.sim = compRef.selectedCarId;
        }
  }

  veSelectedTankType(event, compRef){
        if(event){
            compRef.newShipment.ntt = event.target.value;
        }
  }


  veSelectedTank(event, compRef){
        if(event){
            compRef.newShipment.nti = event.target.value;
        }
  }

  veSelectedDriver(event, compRef){
        if(event){
            compRef.newShipment.driver = event.target.value;
        }
  }


  veSelectedSupercargo(event, compRef){
        if(event){
            compRef.newShipment.s = event.target.value;
        }
  }

  veSelectedAddress(event, compRef){
        if(event){
            compRef.newShipment.dest = event.target.value;
        }
  }

  veSelectedRefillStation(event, compRef){
        if(event){
            compRef.newShipment.rs = event.target.value;
        }
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

  addMarker(data){
    var point = new BMap.Point(data.lng, data.lat);
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


  updatePosition(cardata,dest){

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

              if(this.isShiping){   //to make sure the completeShipment func is only called once.

                this.targetMarker.setPosition(new BMap.Point(cardata.lng, cardata.lat));
                var currentPosition = cardata;
                var destination = dest;
                _this.calculateDistance(currentPosition, destination).then(function(data){
                  var patern  = /[0,9]{1,3}['米']{1}/;
                    if(patern.test(data)){  //within metters
                        var distance = parseInt(data,10);  //parseInt asuming there is no decimal part. otherwise parseFloat
                        // console.log('distance>>>>',distance);
                        if(distance <= 900){
                          console.log('已配送');
                          _this.targetCar = null;
                          _this.completeShipment();
                        }
                    }
                });
              }
        }

    }


    completeShipment(){
      var that = this;
        console.log("posting end of shipment----", this.newShipment);

        this.isShiping  = false;
      this.request.put('/gps/shipment/done', this.newShipment).subscribe(res => {
        console.log("res shipment done-----", res);
      });
    }


    iniSocket(){
      var _this = this;
        var url = 'http://139.196.18.222:3001';

        if(window.location.hostname.indexOf('localhost')>=0){  // reset url for local developement;
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
    }

    veConfirmShipment(){
      var that  = this;

        console.log("confirm-----",ShipmentMap.mapLoaded,this.selectedCarId);
        if (ShipmentMap.mapLoaded && this.selectedCarId && !this.isShiping){
          this.request.get('/gps/cars/all').subscribe(res => {

                  console.log("got cars----",res);
                var cars = res.pl.cars;
                var c = cars[that.selectedCarId];

                if(c){
                  var origin = new BMap.Point(c.lng, c.lat);
                  var geocoder = new BMap.Geocoder();

                  geocoder.getLocation(origin, function(originAddr){
                    console.log("originAddr-----",originAddr);
                    if(originAddr){
                        that.newShipment.origin = originAddr.address;
                    }
                  });

                  geocoder.getPoint('闸北区大宁路355号', function(dest){

                    var myP1 = new BMap.Point(116.380967,39.913285);    //起点
                    var myP2 = new BMap.Point(116.424374,39.914668);    //终点

                        // that.showShipmentRoute(origin,dest);

                          that.showShipmentRoute(myP1,myP2);
                  },'上海市');

                }
                else{
                  alert("此车辆未发送gps信号, 请启动车后再试!");
                }
          });
          }
    }

    showShipmentRoute(car,dest){

      var that = this;


      var myP1 = new BMap.Point(car.lng, car.lat);    //起点
      var myP2 = new BMap.Point(dest.lng, dest.lat);    //终点

      // toFixed(2)
      var midLng = (parseFloat(car.lng)  + parseFloat(dest.lng))/2;
      var midLat = (parseFloat(car.lat)  + parseFloat(dest.lat))/2;
      var middle = new BMap.Point(midLng.toFixed(3),midLat.toFixed(3));
      console.log("middle point----", middle);
      console.log("car,dest",car,dest);

      var iconImage = 'dist/images/truck.png';
      var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';
      var myIcon = new BMap.Icon(iconImage, new BMap.Size(32, 70), {    //小车图片
        // offset: new BMap.Size(0, -5),    //相当于CSS精灵
        imageOffset: new BMap.Size(0, 10)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });
      var route = new BMap.DrivingRoute(ShipmentMap.gpsmap, {renderOptions:{map: ShipmentMap.gpsmap, autoViewport: true}});    //驾车实例
      route.search(myP1, myP2);    //显示一条公交线路


      route.setSearchCompleteCallback(function(){

        that.updatePosition(car,dest);
        ShipmentMap.gpsmap.centerAndZoom(middle, 12);

        var  distance = route.getResults().getPlan(0).getDistance(true);
        var duration  = route.getResults().getPlan(0).getDuration(true);

        that.newShipment.dist = distance;
        that.newShipment.ed = duration;
        that.newShipment.pa = that.user.an;
        that.newShipment.oti = that.routeParams.get('tank');



        var pts = route.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
        var paths = pts.length;

        var i = 0;

          function resetMkPoint(){

            if(i < paths){

              that.updatePosition(pts[i],dest);
               console.log('updating----',paths,pts[i]);

                i++;

              setTimeout(function(){
                resetMkPoint();
              },1000);
            }
          }
          
       resetMkPoint();

       console.log("this.newShipment----",that.newShipment);

        that.request.post('/gps/shipment',that.newShipment).subscribe(res => {
          console.log("new shipment saved-----", res);
           that.isShiping = true;
           that.newShipment = res.pl.shipment;   //update shiment with _id; used on the shipment completion
        });

      });
    }

    showAllCars(){
      //shandong shanghai: 118.273, 33.779  //7
      //shanghai 121.454,31.153   //10

      this.targetCar = null;// stop car moves.

      var point = new BMap.Point(121.454,31.153 );
      ShipmentMap.gpsmap.centerAndZoom(point, 10);
      this.request.get('/gps/cars/all').subscribe(res => {
            var cars = res.pl.cars;
            console.log("cars----",cars);
            var allcars = Object.keys(cars).map(function (key) {
                  return cars[key];
              });

            for (let i = 0; i < allcars.length; i++) {
                this.addMarker(allcars[i]);
            }
      });
    }



    calculateDistance(scrPoint,desPoint){

              var p1 = new BMap.Point(scrPoint.lng,scrPoint.lat);    //起点
              var p2 = new BMap.Point(desPoint.lng,desPoint.lat);    //终点

              var tempDriving = new BMap.DrivingRoute(ShipmentMap.gpsmap);    //驾车实例
              tempDriving.search(p1, p2);

              var distance = null;

              var deferred = jQuery.Deferred();

              tempDriving.setSearchCompleteCallback(function(){  //after route has been set
                  distance = tempDriving.getResults().getPlan(0).getDistance(true);
                  console.log("new distance-----",distance);
                  deferred.resolve(distance);
              });

              return deferred.promise();
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

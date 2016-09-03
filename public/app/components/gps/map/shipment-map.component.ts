
import {Component, provide, AfterViewInit, OnDestroy} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {config} from '../../../config';
import {gpsAlert} from '../../../../models/gpsAlert';
import {RequestService} from '../../../services/request.service';
import {UserService} from '../../../services/user.service';

declare var BMAP_ANCHOR_TOP_LEFT:any;
declare var BMAP_NAVIGATION_CONTROL_LARGE:any;


declare var BMap:any;
declare var jQuery:any;
declare var window:any;
declare var io:any;
declare var Array:any;

@Component({
  selector:'shipment-map',
  templateUrl:config.prefix + '/components/gps/map/shipment-map.component.html',
  styleUrls:[config.prefix + '/components/gps/map/resources//css/style.css']
})

export class ShipmentMap implements AfterViewInit, OnDestroy{

  static mapLoaded:boolean = false;
  allCars:any[] = [];
  selectedtab:number=1;
  delevered:boolean=false;
  targetCar:any;
  selectedCarId:string;
  targetMarker:any;
  returnToRefill:boolean = true;
  static gpsmap:any;
  static carsGroups:any[] = [];
  static allMarkers:any = {};
  isShiping:boolean = false;
  user:any;
  totalCarNumber:number;
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
    //reset static variables
    ShipmentMap.mapLoaded = false;
    ShipmentMap.gpsmap = null;
    ShipmentMap.allMarkers = {};
    ShipmentMap.carsGroups = [];
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

          // function showInfo(e){
          //   console.log(e.point.lng + ", " + e.point.lat);
          // }
          // ShipmentMap.gpsmap.addEventListener("click", showInfo);
  }

  static addMarker(data){
    // var point = new BMap.Point(parseFloat(data.lng)+config.gpsError.lng, parseFloat(data.lat)+config.gpsError.lat);

      // var marker = new BMap.Marker(point);


      if(data.lp){

        var point = new BMap.Point(data.lng, data.lat);
        ShipmentMap.allMarkers[data._id] = new BMap.Marker(point);   //_id = sim;

        var opts = {
          width : 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title : "车辆信息" , // 信息窗口标题
          enableMessage:true//设置允许信息窗发送短息
        }
        var infoWindow = new BMap.InfoWindow("车牌号:"+data.lp+ ", 速度:"+data.speed+"km/h "+", 定位时间:"+data.time, opts);  // 创建信息窗口对象
        ShipmentMap.allMarkers[data._id].addEventListener("click", function(){
          ShipmentMap.gpsmap.openInfoWindow(infoWindow,point); //开启信息窗口
        });


        ShipmentMap.gpsmap.addOverlay(ShipmentMap.allMarkers[data._id]);
      }
  }

  iniSocket(){
      var _this = this;
        var url = 'http://'+window.location.hostname+':3001';
        // if(window.location.hostname.indexOf('localhost')>=0){  // reset url for local developement;
        //   url = 'http://localhost:3001';
        // }
        var socket = io(url);
       socket.on('carMove', function(data){
         console.log("carMove-----",data);
           if(data.pl&&data.pl.gps){
              var cardata = data.pl.gps;
              _this.handleAlarm(cardata);
              _this.updateShowAllPosition(cardata);
           }
       });
    }


  handleAlarm(param){
      console.log("handle alarm------",param);
      var that = this;

      if(param.alarm){
          if(param.alarm.slice(9,10) === '1'){

          console.log("speed alert");
          var alert:gpsAlert = {
              sim:param.sim,
              time:param.time,
              lng:param.lng,
              lat:param.lat,
              speed:param.speed,
              atype:"speed",  //prohibited
              an:"超速报警",
              addr:'',
              lp:param.lp
            };

            var convertor = new BMap.Convertor();
            var pointArr = [];
            pointArr.push(new BMap.Point(alert.lng,alert.lat));

            convertor.translate(pointArr, 1, 5, function(resp){
              if(resp.status === 0){
                  alert.lng = resp.points[0].lng;
                  alert.lat = resp.points[0].lat;
                  that.saveGpsAlert(alert);
              }

            });
          }

          if(param.alarm.slice(10,11) === '1'){
              console.log("prohibited zone alert");

              console.log("speed alert");
              var alert:gpsAlert = {
                  sim:param.sim,
                  time:param.time,
                  lng:param.lng,
                  lat:param.lat,
                  speed:param.speed,
                  atype:"prohibitedzone",  //prohibited
                  an:"越界报警",
                  addr:'',
                  lp:param.lp
                };

                var convertor = new BMap.Convertor();
                var pointArr = [];
                pointArr.push(new BMap.Point(alert.lng,alert.lat));

                convertor.translate(pointArr, 1, 5, function(resp){
                  if(resp.status === 0){
                      alert.lng = resp.points[0].lng;
                      alert.lat = resp.points[0].lat;
                      that.saveGpsAlert(alert);
                  }

                });

          }
      }
  }

  saveGpsAlert(param){
      var that = this;

      // console.log("saveGpsAlert----",param);
      var geoc = new BMap.Geocoder();
      geoc.getLocation(new BMap.Point(param.lng,param.lat) , function(rs){
        var addComp = rs.addressComponents;
        param.addr = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
        // console.log("saving param-----", param);
        that.request.post('/gps/alert.json',param).subscribe(res => {
          console.log("gps alert created-----", res);
        });
      });
  }

  addCustomMarker(cardata){
      var iconImage = 'dist/images/truck.new.gif';
      var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';

      var myIcon = new BMap.Icon(iconImage, new BMap.Size(32, 70), {    //小车图片
          // offset: new BMap.Size(0, -5),    //相当于CSS精灵
          imageOffset: new BMap.Size(0, 15)    //图片的偏移量。为了是图片底部中心对准坐标点。
          });

        var point = new BMap.Point(cardata.lng, cardata.lat);
        var marker = new BMap.Marker(point, {icon:myIcon});

        this.targetMarker = marker;
        ShipmentMap.gpsmap.addOverlay(this.targetMarker);
  }



  updateShowAllPosition(cardata){

        if(ShipmentMap.allMarkers[cardata.sim]){
            // console.log("cardata.sim----",cardata.sim);
            ShipmentMap.allMarkers[cardata.sim].setPosition(new BMap.Point(cardata.lng, cardata.lat));
        }
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
      this.request.put('/gps/shipment/done.json', this.newShipment).subscribe(res => {
        console.log("res shipment done-----", res);
      });
    }

    veConfirmShipment(){
      var that  = this;

        console.log("confirm-----",ShipmentMap.mapLoaded,this.selectedCarId);
        if (ShipmentMap.mapLoaded && this.selectedCarId && !this.isShiping){
          this.request.get('/gps/cars/all.json').subscribe(res => {

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

        that.request.post('/gps/shipment.json',that.newShipment).subscribe(res => {
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
      this.request.get('/gps/cars/all.json').subscribe(res => {
            var cars = res.pl.cars;
            console.log("all cars----",cars);
             this.allCars = Object.keys(cars).map(function (key) {
                  return cars[key];
              });



            ShipmentMap.carsGroups = this.groupByTen(this.allCars); //convertor doen'st work for more thatn 10 points!! so we group by ten;

          for (let i = 0; i <   ShipmentMap.carsGroups.length; i++) {
              this.adjustPoint(ShipmentMap.carsGroups[i],this.addToMap); //convertor doen'st work for more thatn 10 points
          }

          this.totalCarNumber =  this.allCars.length;
      });
    }


    addToMap(adjusted){
      console.log("processed cars->>>>>>---",adjusted)
      if(adjusted.status === 0){
        if(adjusted.points.length>4){  //for first ten cars , assuming 14 in total;
          for (let i = 0; i < adjusted.points.length; i++) {
              ShipmentMap.carsGroups[0][i].lng =   adjusted.points[i].lng;
              ShipmentMap.carsGroups[0][i].lat =   adjusted.points[i].lat;
              ShipmentMap.carsGroups[0][i].valid = true;
              ShipmentMap.addMarker(ShipmentMap.carsGroups[0][i]);
          }

        }
        else{
          for (let i = 0; i < adjusted.points.length; i++) {
              ShipmentMap.carsGroups[1][i].lng =   adjusted.points[i].lng;
              ShipmentMap.carsGroups[1][i].lat =   adjusted.points[i].lat;
              ShipmentMap.carsGroups[1][i].valid = true;
              ShipmentMap.addMarker(ShipmentMap.carsGroups[1][i]);
          }
        }
      }

    }

    adjustPoint(param,cb){

      var convertor = new BMap.Convertor();
      var pointArr = [];

      if(Array.isArray(param)){
        for (let i = 0; i < param.length; i++) {
          pointArr.push(new BMap.Point(param[i].lng,param[i].lat));
        }
      }
      else{
          pointArr.push(new BMap.Point(param.lng,param.lat));
      }

      convertor.translate(pointArr, 1, 5, cb);  //can't take more than 10 point!!!
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

        groupByTen(arr){
            var group = [];
            var tempArr = arr;
              while(tempArr.length>10){
                group.push(tempArr.slice(0,10));
                tempArr = tempArr.slice(10,tempArr.length);
              }
              group.push(tempArr);
            return group;
        }

 }

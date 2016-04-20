
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {Request} from '../../../services/request';

declare var BMap:any;
declare var jQuery:any;
declare var window:any;
declare var io:any;

@Component({
  selector:'shipment-map',
  templateUrl:config.prefix + '/components/gps/map/shipment-map.component.html',
  styleUrls:[config.prefix + '/components/gps/map/resources//css/style.css']
})

export class ShipmentMap{

  static mapLoaded:boolean = false;
  static allCars:any = {};
  selectedtab:number=1;
  delevered:boolean=false;
  targetCar:any;
  targetMarker:any;
  static gpsmap:any;
  constructor(public request:Request){
  console.log("ShipmentMap is up and running");
      this.initUi();
      this.loadJScript();
      this.iniSocket();
  }

  initUi(){
    setTimeout(_=>{
         jQuery('select').material_select();
    });
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
  }

  addMarker(cardata){
    var point = new BMap.Point(cardata.lng, cardata.lat);
    var marker = new BMap.Marker(point);
    ShipmentMap.gpsmap.addOverlay(marker);
  }

  addCustomMarker(cardata){
      var iconImage = 'dist/images/truck.png';
      var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';
      var myIcon = new BMap.Icon(testIconImage, new BMap.Size(32, 70), {    //小车图片
        //offset: new BMap.Size(0, -5),    //相当于CSS精灵
          imageOffset: new BMap.Size(0, 0.5)    //图片的偏移量。为了是图片底部中心对准坐标点。
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
        var url = 'http://139.196.18.222:8080';

        if(window.location.hostname.indexOf('localhost')>=0){  // reset url for local developement;
          url = 'http://localhost:8080';
        }
        var socket = io(url);
       socket.on('carMove', function(data){
           if(data.pl&&data.pl.gps){
              var cardata = data.pl.gps;
              _this.updatePosition(cardata);


           }
       });
    }

    showAllCars(cardata){
      var _this = this;
        if(!ShipmentMap.allCars[cardata.sim]){
           _this.addMarker(cardata);
           ShipmentMap.allCars[cardata.sim] = cardata;
        }
        else{  //
             console.log('same car------->>>>>>-----',cardata.sim);
        }
    }
 }

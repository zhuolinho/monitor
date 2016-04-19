
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
  static points:any = {};
  selectedtab:number=1;
  delevered:boolean=false;
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
    // if (!ShipmentMap.mapLoaded){
    //       ShipmentMap.mapLoaded = true ;
    //       // 百度地图API功能
    //       ShipmentMap.gpsmap = new BMap.Map("allmap");
    //   }

      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom(point, 15);
      // 编写自定义函数,创建标注
      function addMarker(point){
        var marker = new BMap.Marker(point);
        var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
        //
        // marker.setLabel(label);
        map.addOverlay(marker);
      }
      // 随机向地图添加25个标注
      var bounds = map.getBounds();
      var sw = bounds.getSouthWest();
      var ne = bounds.getNorthEast();
      var lngSpan = Math.abs(sw.lng - ne.lng);
      var latSpan = Math.abs(ne.lat - sw.lat);
      for (var i = 0; i < 25; i ++) {
        var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
        addMarker(point);
      }
  }

  initGpsMap(cardata:any){
    return;

      // avoid socket call before init callback
      if (!ShipmentMap.mapLoaded){
            return ;
        }

        console.log('map got car---', cardata);

      var center = new BMap.Point(116.404, 39.915);
    	map.centerAndZoom(point, 15);

      ShipmentMap.gpsmap.centerAndZoom(new BMap.Point(cardata.lon,  cardata.lat), 15);

      var myPoint = new BMap.Point(cardata.lon,cardata.lat);    //起点

      var iconImage = 'dist/images/truck.png';
      var testIconImage = 'http://developer.baidu.com/map/jsdemo/img/Mario.png';
      var myIcon = new BMap.Icon(testIconImage, new BMap.Size(32, 70), {    //小车图片
        //offset: new BMap.Size(0, -5),    //相当于CSS精灵
        imageOffset: new BMap.Size(0, 0.5)    //图片的偏移量。为了是图片底部中心对准坐标点。
        });

      // var carMk = new BMap.Marker(myPoint, {icon:myIcon});
      var carMk = new BMap.Marker(myPoint);
      ShipmentMap.gpsmap.addOverlay(carMk);


    }


    iniSocket(){
      var _this = this;
        var url = 'http://139.196.18.222:8080';

        if(window.location.hostname.indexOf('localhost')>=0){  // reset url for local developement;
          url = 'http://localhost:8080';
        }
        var socket = io(url);
       socket.on('carMove', function(data){
         console.log('carMove---->>>>---',data);

         if(data.pl&&data.pl.gps){


              var cardata = data.pl.gps;
            _this.initGpsMap(cardata);
          //  if(cardata.sim == "14721115321"){
          //    console.log('same cardata',data);
          //     Gps.points['14721115321'].lng = cardata.lon;
          //     Gps.points['14721115321'].lat = cardata.lat;
          //  }
         }
       });
    }
 }

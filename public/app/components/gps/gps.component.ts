
import {Component, provide} from 'angular2/core'
import {config} from '../../config';
import {Request} from '../../services/request';
declare var BMap:any;
declare var jQuery:any;
declare var window:any;

@Component({
  selector:'gps',
  templateUrl:config.prefix + '/components/gps/gps.component.html'
})

export class Gps{
  constructor(public request:Request){
  console.log("Gps is up and running");
      this.loadJScript();
  }

 loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak='+config.bdmkey+'&callback=initMap';
    window.initMap = this.initGpsMap;  //set global reference for initMap callback;
    document.body.appendChild(script);
  }

  initGpsMap(){
            // 百度地图API功能
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(116.404, 39.915);
          map.centerAndZoom(point, 15);
          // 编写自定义函数,创建标注
          function addMarker(point){
            var marker = new BMap.Marker(point);
            var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
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
}

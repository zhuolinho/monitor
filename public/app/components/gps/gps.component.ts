
import {Component, provide} from 'angular2/core'
import {config} from '../../config';
import {Request} from '../../services/request';
declare var BMap:any;
declare var jQuery:any;
declare var window:any;
declare var io:any;
@Component({
  selector:'gps',
  templateUrl:config.prefix + '/components/gps/gps.component.html'
})

export class Gps{

  static points:any = {};
  constructor(public request:Request){
  console.log("Gps is up and running");
      this.loadJScript();
      this.iniSocket();
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
    	map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);

    	var myP1 = new BMap.Point(116.380967,39.913285);    //起点
    	var myP2 = new BMap.Point(116.424374,39.914668);    //终点
      //dist/images/truck.png
      //http://developer.baidu.com/map/jsdemo/img/Mario.png
    	var myIcon = new BMap.Icon("dist/images/truck.png", new BMap.Size(32, 70), {    //小车图片
    		//offset: new BMap.Size(0, -5),    //相当于CSS精灵
    		imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
    	  });
    	var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
    	driving2.search(myP1, myP2);    //显示一条公交线路


      //car on the move
    	var run = function (){
    		var driving = new BMap.DrivingRoute(map);    //驾车实例
    		driving.search(myP1, myP2);
    		driving.setSearchCompleteCallback(function(){  //after route has been set


    			var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
    			var paths = pts.length;    //获得有几个点

          var routeData = { //get distance and duration
                  distance:driving.getResults().getPlan(0).getDistance(true),
                  duration:driving.getResults().getPlan(0).getDuration(true)
          };

          console.log("distance and time-----",routeData);
          var samplePoint  = pts[0];

    			var carMk = new BMap.Marker(samplePoint, {icon:myIcon});
    			map.addOverlay(carMk);
          var i = 0;

    			function resetMkPoint(){
            // samplePoint.lng += 0.0001;
            // samplePoint.lat += 0.0001;
            samplePoint = pts[i]
    				carMk.setPosition(samplePoint);


            if(i < paths){
              //  console.log('updating----',samplePoint);

                calculateDistance(map,pts[i],pts[paths-1]).then(function(data){


                  var patern  = /[0,9]{1,3}['米']{1}/;
                    if(patern.test(data)){  //within metters
                        var distance = parseInt(data,10);  //parseInt asuming there is no decimal part. otherwise parseFloat
                        // console.log('distance>>>>',distance);
                        if(distance <= 100){
                          alert('已配送');
                        }
                    }


                    // console.log("got new distance----",data);
                    // console.log("got new distance----",parseFloat(data));

                });






                i++;

              setTimeout(function(){
                resetMkPoint();
              },500);
            }
            else{
              console.log('done----');
            }

    			}
          resetMkPoint();
    		});
    	}

      run();



      var calculateDistance = function(map, scrPoint,desPoint){
            var p1 = new BMap.Point(scrPoint.lng,scrPoint.lat);    //起点
            var p2 = new BMap.Point(desPoint.lng,desPoint.lat);    //终点
            // var p1 = new BMap.Point(scrPoint.lng, scrPoint.lat);    //起点
            // var p2 = new BMap.Point(scrPoint.lng+0.0001, scrPoint.lat+0.0001);    //终点

            var tempDriving = new BMap.DrivingRoute(map);    //驾车实例
            tempDriving.search(p1, p2);

            var distance = null;

            var deferred = jQuery.Deferred();

            tempDriving.setSearchCompleteCallback(function(){  //after route has been set
                distance = tempDriving.getResults().getPlan(0).getDistance(true);
                // console.log("new distance-----",distance);
                deferred.resolve(distance);
            });

            return deferred.promise();

      }
    }


    iniSocket(){
        var socket = io('http://localhost:8080');
       socket.on('carMove', function(data){
        //  console.log('carMove',data);
         if(data.pl&&data.pl.gps){
          //  var car = data.pl.gps;
          //  if(car.sim == "14721115321"){
          //    console.log('same car',data);
          //     Gps.points['14721115321'].lng = car.lon;
          //     Gps.points['14721115321'].lat = car.lat;
          //  }
         }
       });
    }
}



 import {Component, provide,AfterViewInit} from 'angular2/core'
 import {config} from '../../config';
 import {Gas} from './gas/gas.component';
 import {Camera} from './camera/camera.component';
 import {ROUTER_DIRECTIVES,RouteConfig, RouterLink} from 'angular2/router';
 declare var jQuery:any;



@Component({
  selector:'monitor',
  templateUrl:config.prefix + '/components/monitor/monitor.component.html',
  directives:[ROUTER_DIRECTIVES,RouterLink]
})



 @RouteConfig([
   {path:'/gas', component:Gas, name:'Gas',useAsDefault:true},
   {path:'/camera', component:Camera, name:'Camera'}
 ])


 export class Monitor implements AfterViewInit{
   constructor(){
   console.log("Monitor is up and running");
   }
   ngAfterViewInit(){

   }
  }

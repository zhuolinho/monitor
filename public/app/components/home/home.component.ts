
import {Component, provide} from 'angular2/core'
import {config} from '../../config';
import {HomeAlerts} from './alerts/home.alerts.component';
import {HomeProcssedAlerts} from './alerts_processed/home.alerts.processed.component';
import {ROUTER_DIRECTIVES,RouteConfig} from 'angular2/router';
declare var jQuery:any;

@Component({
  selector:'home',
  templateUrl:config.prefix + '/components/home/home.component.html',
  directives:[ROUTER_DIRECTIVES]
})



@RouteConfig([
  {path:'/alerts', component:HomeAlerts, name:'HomeAlerts'},
  {path:'/processed', component:HomeProcssedAlerts, name:'HomeProcssedAlerts'}
])

export class Home{
  constructor(){
  console.log("Home is up and running");


    // var height = window.innerHeight - 150;
    //
    //
    //       setTimeout(_=>{
    //             console.log('height------',height);
    //            jQuery('#homeMainContainer').height(400).perfectScrollbar({
    //              suppressScrollX: true
    //            });
    //       },1000);

  }


 }

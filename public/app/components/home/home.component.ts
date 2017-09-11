
import { Component } from '@angular/core'
import { config } from '../../config';
// import {HomeAlerts} from './alerts/home.alerts.component';
// import {HomeProcssedAlerts} from './alerts_processed/home.alerts.processed.component';
import { RouterLink } from '@angular/router';
import { routerNavService } from '../../services/routerNav.service';
import { UtilsService } from '../../services/utils.service';
declare var jQuery: any;

@Component({
  selector: 'home',
  templateUrl: config.prefix + '/components/home/home.component.html',
  // directives:[ROUTER_DIRECTIVES,RouterLink]
})



// @RouteConfig([
//   {path:'/alerts', component:HomeAlerts, name:'HomeAlerts',useAsDefault:true},
//   {path:'/processed', component:HomeProcssedAlerts, name:'HomeProcssedAlerts'}
// ])

export class Home {
  constructor(private routerNavServ: routerNavService, private utilServ: UtilsService) {
    console.log("Home is up and running");

    this.routerNavServ.currentModule = 'home';
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


  homeAlertSortAll() {
    this.utilServ.homeAlertSortAll();
  }


}


import { Component } from '@angular/core'
import { config } from '../../config';
import { RouterLink } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { routerNavService } from '../../services/routerNav.service';

// import {ShipmentMap} from './map/shipment-map.component';
// import {ProcessedShipment} from './processed/processed-shipment.component';
// import {Shipment} from './shipment/shiment.component';

@Component({
  selector: 'gps',
  templateUrl: config.prefix + '/components/gps/gps.component.html'
})




// @RouteConfig([
//   {path:'/shipment', component:Shipment, name:'Shipment',useAsDefault:true},
//   {path:'/map/:tank', component:ShipmentMap, name:'ShipmentMap'},
//   {path:'/processed', component:ProcessedShipment, name:'ProcessedShipment'}
// ])

export class Gps {
  static points: any = {};
  constructor(
    public request: RequestService,
    private routerNavServ: routerNavService
  ) {
    this.routerNavServ.currentModule = 'gps';
    console.log("Gps is up and running");
  }
}

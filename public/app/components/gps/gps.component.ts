
import {Component, provide} from 'angular2/core'
import {config} from '../../config';
import {RouteConfig, ROUTER_DIRECTIVES, RouterLink} from 'angular2/router';
import {RequestService} from '../../services/request.service';
import {ShipmentMap} from './map/shipment-map.component';
import {ProcessedShipment} from './processed/processed-shipment.component';
import {Shipment} from './shipment/shiment.component';

@Component({
  selector:'gps',
  templateUrl:config.prefix + '/components/gps/gps.component.html',
  directives:[ROUTER_DIRECTIVES,RouterLink]
})




 @RouteConfig([
   {path:'/shipment', component:Shipment, name:'Shipment',useAsDefault:true},
   {path:'/map', component:ShipmentMap, name:'ShipmentMap'},
   {path:'/processed', component:ProcessedShipment, name:'ProcessedShipment'}
 ])

export class Gps{
  static points:any = {};
  constructor(public request:RequestService){
    console.log("Gps is up and running");
  }
}


import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'processed-shipment',
  templateUrl:config.prefix + '/components/gps/processed/processed-shipment.component.html'
})

export class ProcessedShipment{

    constructor(){
    console.log("processed-shipment is up and running");
    this.initUi();

    }
    initUi(){
      setTimeout(_=>{
           jQuery('select').material_select();
           jQuery('.collapsible').collapsible({
             accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
           });
      });
    }
 }

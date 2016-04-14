
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'home-processed-alerts',
  templateUrl:config.prefix + '/components/home/alerts_processed/home.alerts.processed.component.html'
})

export class HomeProcssedAlerts{


    constructor(){
    console.log("Home processed alerts is up and running");
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

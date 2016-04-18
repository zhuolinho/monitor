
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;
declare var window:any;

@Component({
  selector:'home-processed-alerts',
  templateUrl:config.prefix + '/components/home/alerts_processed/home.alerts.processed.component.html'
})

export class HomeProcssedAlerts{

  months:string[] = ['1月','2月','3月','4月'];
  selectedMonth:string='';


    constructor(){
        console.log("Home processed alerts is up and running");
        this.initUi();
    }

    veSelected(event, item){
      this.selectedMonth = event.target.value;
    }

    initUi(){
      setTimeout(_=>{
           jQuery('select').material_select();
           jQuery('select').on('change',this.veSelected);
           jQuery('.collapsible').collapsible({
             accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
           });
      });
    }
 }

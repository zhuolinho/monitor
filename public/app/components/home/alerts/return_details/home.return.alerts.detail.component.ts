
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
declare var jQuery:any;

@Component({
  selector:'home-return-alerts-detail',
  templateUrl:config.prefix + '/components/home/alerts/return_details/home.alerts.detail.component.html'
})

export class HomeReturnAlertsDetail{
     paramTable:any;
    @Input('data')
    set table(data){
      this.paramTable = data;
    }

    get table(){return this.paramTable;}

    constructor(){
    console.log("Home return alerts detail is up and running---");
    }
 }

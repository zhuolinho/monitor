
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'home-alerts',
  templateUrl:config.prefix + '/components/home/alerts/home.alerts.component.html'
})

export class HomeAlerts{
    constructor(){
    console.log("Home alerts is up and running");
    }
 }

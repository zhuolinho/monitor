
import {Component, provide} from 'angular2/core'
import {config} from '../../config';

@Component({
  selector:'monitor',
  templateUrl:config.prefix + '/components/monitor/monitor.component.html'
})

export class Monitor{
  constructor(){
  console.log("Monitor is up and running");
  }
 }

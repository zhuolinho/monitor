
import {Component, provide} from 'angular2/core'
import {config} from '../../config';

@Component({
  selector:'gps',
  templateUrl:config.prefix + '/components/gps/gps.component.html'
})

export class Gps{
  constructor(){
  console.log("Gps is up and running");
  }
 }

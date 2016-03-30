
import {Component, provide} from 'angular2/core'
import {config} from '../../config';

@Component({
  selector:'home',
  templateUrl:config.prefix + '/components/home/home.component.html'
})

export class Home{
  constructor(){
  console.log("Home is up and running");
  }
 }

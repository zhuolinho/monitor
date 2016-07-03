
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'camera',
  templateUrl:config.prefix + '/components/monitor/camera/camera.component.html'
})

export class Camera{

    constructor(){
    console.log("camera is up and running");
    this.initUi();

    }

    initUi(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }

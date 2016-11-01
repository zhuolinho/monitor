
import {Component} from '@angular/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'camera',
  templateUrl:config.prefix + '/components/monitor/camera/camera.component.html'
})

export class Camera{


    currentCamera:string = '1';

    constructor(){
    console.log("camera is up and running");
    this.initUi();

    }

    veCameraChanged(event){
      this.currentCamera  = event.target.value;
      console.log('this.currentPlcTank---',this.currentCamera);
    }

    initUi(){
      var that = this;
      setTimeout(_=>{

           jQuery('select:not(simple-select)').material_select();
           jQuery('select.select-camera').change(function(e){
             console.log('changed');
             that.veCameraChanged(e);
           });
      });
    }
 }

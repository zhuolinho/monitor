
import {Component} from '@angular/core';
import {config} from '../../../config';
declare var jQuery:any;
declare var _:any;

@Component({
  selector:'camera',
  templateUrl:config.prefix + '/components/monitor/camera/camera.component.html'
})

export class Camera{


    selectedCam:string = config.camera[0].cameras[0].id;
    currentCameras:any[] = config.camera[0].cameras;
    allCameras:any[] = config.camera;

    constructor(){
    console.log("camera is up and running",this.allCameras,this.currentCameras,this.selectedCam);
    this.initUi();

    }

    veCameraChanged(event){
      this.selectedCam  = event.target.value;
      console.log('this.selectedCam---',this.selectedCam);
    }
    veAddressChanged(event){
      console.log("event.target.value-----",event.target.value);
      var temp  = _.find(this.allCameras,{id:event.target.value});
      this.currentCameras = temp.cameras;
      this.selectedCam = this.currentCameras[0].id;
      console.log('this.currentCameras---',this.currentCameras);
      this.initUi();
    }

    initUi(){
      var that = this;
      setTimeout(_=>{

           jQuery('select:not(simple-select)').material_select();

           jQuery('select.select-camera').change(function(e){
             console.log('camera changed');
             that.veCameraChanged(e);
           });

           jQuery('select.select-address').change(function(e){
             console.log('addres changed');
             that.veAddressChanged(e);
           });
      });
    }
 }

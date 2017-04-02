
import {Component, AfterViewInit} from '@angular/core';
import {config} from '../../../config';
declare var jQuery:any;
declare var _:any;

@Component({
  selector:'camera',
  templateUrl:config.prefix + '/components/monitor/camera/camera.component.html'
})

export class Camera implements AfterViewInit{


    selectedCam:string = config.camera[0].cameras[0].id;
    currentCameras:any[] = config.camera[0].cameras;
    allCameras:any[] = config.camera;

    ngAfterViewInit () {
      this.initUi();
    }

    veCameraChanged(event){
      this.selectedCam  = event.target.value;
    }
    veAddressChanged(event){
      var temp  = _.find(this.allCameras,{id:event.target.value});
      this.currentCameras = temp.cameras;
      this.selectedCam = this.currentCameras[0].id;
      jQuery('select:not(simple-select)').material_select();
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

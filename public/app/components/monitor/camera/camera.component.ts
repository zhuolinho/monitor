
import { Component, AfterViewInit } from '@angular/core';
import { config } from '../../../config';
declare var jQuery: any;
declare var _: any;

@Component({
  selector: 'camera',
  templateUrl: config.prefix + '/components/monitor/camera/camera.component.html'
})

export class Camera implements AfterViewInit {


  selectedCam: string = config.camera[0].cameras[0].id;
  currentCameras: any[] = config.camera[0].cameras;
  allCameras: any[] = config.camera;

  ngAfterViewInit() {
    this.initUi();
  }

  veCameraChanged(event, comp) {
    comp.selectedCam = event.target.value;
    console.log("veCameraChanged---", event, comp.selectedCam);
  }
  veAddressChanged(event, comp) {
    var temp = _.find(comp.allCameras, { id: event.target.value });
    comp.currentCameras = temp.cameras;
    comp.selectedCam = comp.currentCameras[0].id;
    // jQuery('select:not(simple-select)').material_select();
    this.initUi();
    console.log("veAddressChanged---", event, temp);
  }

  initUi() {
    var that = this;
    setTimeout(_ => {
      jQuery('select:not(simple-select)').material_select();

      jQuery('select.select-camera').change(function(e) {
        console.log('camera changed');
        that.veCameraChanged(e, that);
      });

      jQuery('select.select-address').change(function(e) {
        console.log('addres changed');
        that.veAddressChanged(e, that);
      });
    });
  }
}

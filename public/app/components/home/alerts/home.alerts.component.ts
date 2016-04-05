
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {HomeAlertsDetail} from './details/home.alerts.detail.component';
declare var jQuery:any;

@Component({
  selector:'home-alerts',
  templateUrl:config.prefix + '/components/home/alerts/home.alerts.component.html',
  directives:[HomeAlertsDetail]
})

export class HomeAlerts{
    constructor(){
    console.log("Home alerts is up and running");
      this.initModal();
    }

    initModal(){

      var _this = this;

        setTimeout(_=>{
            jQuery('.modal-trigger').leanModal({
                 dismissible: true, // Modal can be dismissed by clicking outside of the modal
                 opacity: .5, // Opacity of modal background
                 in_duration: 300, // Transition in duration
                 out_duration: 200, // Transition out duration
                 ready: function() { console.log('Ready');  _this.initSelect()}, // Callback for Modal open
                 complete: function() { console.log('Closed'); } // Callback for Modal close
           });
        });
    }

    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });

    }
 }

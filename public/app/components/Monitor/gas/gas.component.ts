
import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {GasDetail} from './details/gas.detail.component';
declare var jQuery:any;

@Component({
  selector:'gas',
  templateUrl:config.prefix + '/components/monitor/gas/gas.component.html',
  directives:[GasDetail]
})

export class Gas{
    constructor(){
      console.log("gas is up and running");
      this.initSelect();
      this.initModal();
    }


    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
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
          //  alert('getting models up');
        });
    }
 }

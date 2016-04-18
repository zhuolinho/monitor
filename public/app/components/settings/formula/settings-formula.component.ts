import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {SettingsEditFormula} from './partials/settings-edit-formula.component';
declare var jQuery:any;

@Component({
  selector:'settings-formula',
  templateUrl:config.prefix + '/components/settings/formula/settings-formula.component.html',
  directives:[SettingsEditFormula]
})

export class SettingsFormula{

      selectedtab:number = 1;
      constructor(){
        console.log("SettingsFormula is up and running");
        this.initUi();

      }

      initUi(){

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

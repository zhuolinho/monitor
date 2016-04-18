
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
declare var jQuery:any;

@Component({
  selector:'settings-edit-formula',
  templateUrl:config.prefix + '/components/settings/formula/partials/settings-edit-formula.component.html'
})

export class SettingsEditFormula{
     data:any;
    @Input('data')
    set users(data){
      this.data = data;
    }

    get users(){return this.data;}


    constructor(){
      console.log("SettingsEditFormula modal is up and running---");
    }


    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }

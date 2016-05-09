
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
declare var jQuery:any;

@Component({
  selector:'settings-add-address',
  templateUrl:config.prefix + '/components/settings/address/partials/settings-add-address.component.html'
})

export class SettingsAddAddress{
     data:any;
    @Input('data')
    set users(data){
      this.data = data;
    }

    editMode:boolean = false;
    editTarget:any;

    get users(){return this.data;}


    constructor(){
      console.log("add  address modal is up and running---");
    }


    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }

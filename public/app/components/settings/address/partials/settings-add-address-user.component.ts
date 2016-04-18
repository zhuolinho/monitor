
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
declare var jQuery:any;

@Component({
  selector:'settings-add-address-user',
  templateUrl:config.prefix + '/components/settings/address/partials/settings-add-address-user.component.html'
})

export class SettingsAddAddressUser{
     data:any;
    @Input('data')
    set users(data){
      this.data = data;
    }

    get users(){return this.data;}


    constructor(){
      console.log("add user address modal is up and running---");
    }


    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }

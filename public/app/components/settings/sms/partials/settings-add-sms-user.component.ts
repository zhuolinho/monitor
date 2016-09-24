
import {Component,Input} from '@angular/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
declare var jQuery:any;

@Component({
  selector:'settings-add-sms-user',
  templateUrl:config.prefix + '/components/settings/sms/partials/settings-add-sms-user.component.html'
})

export class SettingsAddSmsUser{
     data:any;
     editMode:boolean = false;
     editTarget:any;
    @Input('data')
    set users(data){
      this.data = data;
    }

    get users(){return this.data;}


    constructor(){
      console.log("add SettingsAddSmsUser modal is up and running---");
    }


    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }

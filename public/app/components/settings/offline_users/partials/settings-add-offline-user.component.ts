
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
declare var jQuery:any;

@Component({
  selector:'settings-add-offline-user',
  templateUrl:config.prefix + '/components/settings/offline_users/partials/settings-add-offline-user.component.html'
})

export class SettingsAddOfflineUser{
     data:any;
    @Input('data')
    set users(data){
      this.data = data;
    }

    editMode:boolean = false;
    editTarget:any;

    get users(){return this.data;}


    constructor(){
      console.log("add user offline modal is up and running---");
    }


    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }

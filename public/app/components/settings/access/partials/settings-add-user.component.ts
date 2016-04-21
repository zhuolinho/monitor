
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
declare var jQuery:any;

@Component({
  selector:'settings-add-user',
  templateUrl:config.prefix + '/components/settings/access/partials/settings-add-user.component.html'
})

export class SettingsAddUser{
     data:any;
    @Input('data')
    set users(data){
      this.data = data;
    }

    get users(){return this.data;}

    editMode:boolean = false;
    editTarget:any;


    constructor(){
      console.log("add user modal is up and running---");
    }


    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }

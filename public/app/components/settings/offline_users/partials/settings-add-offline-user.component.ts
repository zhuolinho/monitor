
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
import {RequestService} from '../../../../services/request.service';
import {SettingsService} from '../../../../services/settings.service';
declare var jQuery:any;

@Component({
  selector:'settings-add-offline-user',
  templateUrl:config.prefix + '/components/settings/offline_users/partials/settings-add-offline-user.component.html'
})

export class SettingsAddOfflineUser{
     data:any;
     newUser:any = {
       name:"",
       phone:"",
       pw:"111111",
       addr:"",
       ap:"",
       sex:""
     };
    @Input('data')
    set users(data){
      this.data = data;
    }

    editMode:boolean = false;
    editTarget:any;

    get users(){return this.data;}

    constructor(
      private request:RequestService, private settingsSrvc:SettingsService
    ){
      console.log("add offline user modal is up and running>>---");
      this.initUi();
    }

    addNewUser(){
       console.log("this.data.userGroup----");

      this.newUser.ap = this.data.users.type.id;
      console.log("posting ----",this.newUser);

        this.request.post('/users/signup',this.newUser).subscribe(res => {
            console.log("sub comp offline user added-----", res);
            if(res.pl && res.pl.user){
                this.settingsSrvc.addUser(res.pl.user);
                jQuery("#"+this.data.id).closeModal();
            }
        });
    }

    updateUser(){
      console.log("posting ----",this.editTarget);
      this.request.put('/users/update',this.editTarget).subscribe(res => {
          console.log("user added-----", res);
          if(res.pl && res.pl.user){
              this.settingsSrvc.updateUser(res.pl.user);
             jQuery("#"+this.data.id).closeModal();
          }

      });
    }


    initUi(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }

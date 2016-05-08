import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
import {UserService} from '../../../services/user.service';
import {Router, CanActivate} from 'angular2/router';
import {hasSettingsAcess} from '../../../services/has-settings-access';

declare var jQuery:any;

@Component({
  selector:'settings-auth',
  templateUrl:config.prefix + '/components/settings/auth/settings-auth.component.html'
})

export class SettingsAuth{
  user:any = {username:'', password:''};

  constructor(public localUserService:UserService,public router:Router){
      console.log("SettingsAuth is up and running");

      if(this.localUserService.getSettingAcess()){  //redirect if already signed in.
        this.router.navigate(['SettingsAccess']);
        return;
      }
      this.user.username = this.localUserService.getUser().name;
      this.initUi();
      }
      initUi(){
        setTimeout(_=>{
             jQuery('select').material_select();
        });
      }

    login(){
      var _this = this;
      this.localUserService.login({name:this.user.username, password:this.user.password}).subscribe(response => {
         console.log('got settings login respone---',response);
         if(!response.er){
           _this.localUserService.logedInSettings();
          setTimeout(function(){
             _this.router.parent.navigate(['SettingsAccess']);
          });
         }

      });
    }
 }

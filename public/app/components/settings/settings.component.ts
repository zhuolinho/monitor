
import {Component, provide} from 'angular2/core';
import {config} from '../../config';
import {ROUTER_DIRECTIVES,RouteConfig,Router, RouterLink} from 'angular2/router';
import {UserService} from '../../services/user.service';
import {SettingsSms} from './sms/settings-sms.component';
import {SettingsAuth} from './auth/settings-auth.component';
import {SettingsAccess} from './access/settings-access.component';
import {SettingsAddress} from './address/settings-address.component';
import {SettingsFormula} from './formula/settings-formula.component';
import {SettingsOfflineUsers} from './offline_users/settings-offline-users.component';
declare var jQuery:any;

@Component({
  selector:'settings',
  templateUrl:config.prefix + '/components/settings/settings.component.html',
  directives:[ROUTER_DIRECTIVES, RouterLink]
})


 @RouteConfig([
   {path:'/auth', component:SettingsAuth, name:'SettingsAuth',useAsDefault:true},
   {path:'/sms', component:SettingsSms, name:'SettingsSms'},
   {path:'/access', component:SettingsAccess, name:'SettingsAccess'},
   {path:'/address', component:SettingsAddress, name:'SettingsAddress'},
   {path:'/offline-users', component:SettingsOfflineUsers, name:'SettingsOfflineUsers'},
   {path:'/formula', component:SettingsFormula, name:'SettingsFormula'}
 ])


export class Settings{
  user:any;
    constructor(public localUserService:UserService, public router:Router){
    console.log("Settings is up and running");

    // this.user = this.localUserService.Auth();
    console.log("this.user---",this.user);
      // if(!this.user.settingsAcces){
      //       console.log('settings user not logged in ----');
      //     this.router.navigate(['/Admin','Settings','SettingsAuth']);
      // }
    }
 }

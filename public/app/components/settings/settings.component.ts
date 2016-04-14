
import {Component, provide} from 'angular2/core';
import {config} from '../../config';
import {ROUTER_DIRECTIVES,RouteConfig, RouterLink} from 'angular2/router';
import {SettingsSms} from './sms/settings-sms.component';
import {SettingsAuth} from './auth/settings-auth.component';
import {SettingsAccess} from './access/settings-access.component';
import {SettingsAddress} from './address/settings-address.component';
import {SettingsFormula} from './formula/settings-formula.component';
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
   {path:'/formula', component:SettingsFormula, name:'SettingsFormula'}
 ])


export class Settings{

    constructor(){
    console.log("Settings is up and running");

    }
 }

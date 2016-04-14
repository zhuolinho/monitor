import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'settings-auth',
  templateUrl:config.prefix + '/components/settings/auth/settings-auth.component.html'
})

export class SettingsAuth{
    constructor(){
      console.log("SettingsAuth is up and running");

    }

 }

import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'settings-sms',
  templateUrl:config.prefix + '/components/settings/sms/settings-sms.component.html'
})

export class SettingsSms{
    constructor(){
      console.log("SettingsSms is up and running");

    }

 }

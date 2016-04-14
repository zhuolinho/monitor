import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'settings-access',
  templateUrl:config.prefix + '/components/settings/access/settings-access.component.html'
})

export class SettingsAccess{
    constructor(){
      console.log("SettingsAccess is up and running");

    }

 }

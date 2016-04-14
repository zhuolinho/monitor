import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'settings-address',
  templateUrl:config.prefix + '/components/settings/address/settings-address.component.html'
})

export class SettingsAddress{
    constructor(){
      console.log("SettingsAddress is up and running");

    }

 }

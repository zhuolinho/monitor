
import {Component, provide} from 'angular2/core';
import {config} from '../../config';
declare var jQuery:any;

@Component({
  selector:'settings',
  templateUrl:config.prefix + '/components/settings/settings.component.html'
})

export class Settings{

    constructor(){
    console.log("Settings is up and running");

    }
 }

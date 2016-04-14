import {Component, provide} from 'angular2/core';
import {config} from '../../../config';
declare var jQuery:any;

@Component({
  selector:'settings-formula',
  templateUrl:config.prefix + '/components/settings/formula/settings-formula.component.html'
})

export class SettingsFormula{
    constructor(){
      console.log("SettingsFormula is up and running");

    }

 }

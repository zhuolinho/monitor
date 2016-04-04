import {Component, Input} from 'angular2/core';
import {RouterLink,ROUTER_DIRECTIVES} from 'angular2/router';
import {config} from '../../config'

declare var jQuery:any;

@Component({
    selector: 'navigator',
    templateUrl: config.prefix +  'layout_components/navigator/navigator.html',
    directives: [RouterLink, ROUTER_DIRECTIVES],
    styleUrls:[config.prefix +'layout_components/navigator/resources/css/style.css']
})

export class Navigator {
   navigations:any[];

    constructor() {
      this.navigations = [
        {link:'Home', title:'首页', icon:'dashboard'},
        {link:'Monitor', title:'实时监控', icon:'videocam'},
        {link:'Gps', title:'GPS ', icon:'my_location'}
      ]
      }
}

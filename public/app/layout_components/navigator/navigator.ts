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
   menu:number=0;
   url:string="#/admin/monitor";
   constructor() {
      this.navigations = [
          {link:['/Admin','Home'], title:'首页', icon:'dashboard'},
          {link:['/Admin','Monitor'], title:'实时监控', icon:'videocam'},
          {link:['/Admin','Gps'], title:'GPS ', icon:'my_location'},
          {link:['/Admin','Settings'], title:'设置 ', icon:'settings'}
        ]
    }
    shiftMenu() {
      this.menu++;
      if (this.menu % 3 == 0) {
        this.url = "#/admin/monitor";
      } else if (this.menu % 3 == 1) {
        this.url = "#/admin/gps";
      } else if (this.menu % 3 == 2) {
        this.url = "#/admin/home";
      }
    }
}

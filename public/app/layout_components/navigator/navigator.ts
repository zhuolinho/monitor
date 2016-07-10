import {Component, Input, AfterViewInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouterLink,ROUTER_DIRECTIVES} from 'angular2/router';
import {config} from '../../config'

declare var jQuery:any;

@Component({
    selector: 'navigator',
    templateUrl: config.prefix +  'layout_components/navigator/navigator.html',
    directives: [RouterLink, ROUTER_DIRECTIVES,CORE_DIRECTIVES],
    styleUrls:[config.prefix +'layout_components/navigator/resources/css/style.css']
})

export class Navigator implements AfterViewInit {
   navigations:any[];
   menu:number=0;
   url:string="#/admin/monitor";
   constructor() {
      this.navigations = [
          {link:['/Admin','Home'], title:'首页', icon:'dashboard'},
          {link:['/Admin','Monitor'], title:'实时监控', icon:'videocam'},
          {link:['/Admin','Gps'], title:'GPS ', icon:'my_location'},
          {link:['/Admin','Settings'], title:'设置 ', icon:'settings'}
        ];
    }

    ngAfterViewInit(){
      jQuery('.sidebar-collapse').sideNav();
        console.log('button-collapse');
    }

    // shiftMenu() {
    //   this.menu++;
    //   if (this.menu % 3 == 0) {
    //     this.url = "#/admin/monitor";
    //   } else if (this.menu % 3 == 1) {
    //     this.url = "#/admin/gps";
    //   } else if (this.menu % 3 == 2) {
    //     this.url = "#/admin/home";
    //   }
    // }
}

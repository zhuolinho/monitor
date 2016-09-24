import {Component, Input, AfterViewInit} from '@angular/core';
// import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink} from '@angular/router';
import {config} from '../../config'

declare var jQuery:any;

@Component({
    selector: 'navigator',
    templateUrl: config.prefix +  'layout_components/navigator/navigator.html',
    // directives: [RouterLink, ROUTER_DIRECTIVES,CORE_DIRECTIVES],
    styleUrls:[config.prefix +'layout_components/navigator/resources/css/style.css']
})

export class Navigator implements AfterViewInit {
   navigations:any[];
   constructor() {
      this.navigations = [
          {link:['/admin/home'], title:'首页', icon:'dashboard'},
          {link:['/admin/monitor'], title:'实时监控', icon:'videocam'},
          {link:['/admin/gps'], title:'GPS ', icon:'my_location'},
          {link:['/admin/settings'], title:'设置 ', icon:'settings'}
        ];
    }

    ngAfterViewInit(){
      jQuery('.sidebar-collapse').sideNav();
        console.log('button-collapse');
    }
}
